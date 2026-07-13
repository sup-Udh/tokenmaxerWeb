# CodeBroker — Repository Intelligence Layer

CodeBroker is the discovery, architecture, and context engine for this workspace.
It answers "where is it, what touches it, what breaks" cheaply and fast.
It does not edit code. Discovery runs through CodeBroker; implementation runs
through native tools. Native tools are also the verification layer — CodeBroker
outputs are index-derived and occasionally wrong, and the rules below say
exactly when to double-check.

This file is language-agnostic. It applies the same way whether the workspace
is Python, JavaScript/TypeScript (including JSX/TSX), Rust, or a mix.

## Golden rules

1. **Discovery before implementation.** For any feature/fix/refactor request,
   locate the subsystem and blast radius through CodeBroker before writing
   code. Guessed file paths and cold grep-sweeps waste more context than the
   lookup costs.
2. **Verify cross-file graph edges with generic names.** Edge resolution is
   name-based and can produce false edges — a JS/TS `obj.metadata` property
   access linked to an unrelated `metadata` export, a Python `self.config`
   attribute linked to an unrelated `config` module, a Rust `self.state` field
   linked to an unrelated `state` struct. Before acting on a surprising edge,
   confirm an actual import/use/mod path connects the two files.
3. **Auth, payments, and data-integrity claims get native verification.**
   Impact conclusions in these domains must be confirmed with grep/Read before
   you rely on them.
4. **Budget tokens deliberately.** Every response carries a
   `response_size_hint`. Keep `limit` small on searches; escalate reading
   depth only as needed.
5. **Resolve before you query.** Never pass a guessed `file_path`, subsystem
   name, or ambiguous symbol into `read_symbol_source`, `get_context`,
   `get_edit_context`, or `subsystem_communication` as the first call. Confirm
   it exists first — via `search_codebase`, the response's `candidates` list,
   or `known_subsystems` — then query with the confirmed value. A
   guess-then-retry round trip always costs more than the extra lookup would
   have.
6. **Default every `get_context` / `explore_graph` call to
   `format: "markdown"`.** Never leave `format` unset — the default is `json`,
   which is more verbose for the same information. Only request `json` when a
   field will actually be parsed programmatically downstream.
7. **Merge skeleton + symbol reads when the target symbol is already known.**
   Prefer `read_file_skeleton(file_path, target_symbol="X")` over calling
   `read_file_skeleton` and then `read_symbol_source` separately — it returns
   both in one round trip. Reserve a standalone `read_symbol_source` call for
   multiple non-adjacent symbols (batched via `symbols: [...]`) or when the
   file path is still ambiguous.
8. **Scope repo-wide tools once the target area is known.** `architectural_hotspots`
   and `find_duplicate_logic` run repo-wide only for the one-time, first-look
   orientation pass. Any call made after the relevant subsystem is identified
   should carry `path_scope`, and `find_duplicate_logic` should also set a low
   `limit` unless a full duplicate-code audit is the actual goal.
9. **Treat dynamically-resolved call sites as invisible to the graph.** The
   index models static imports/uses/calls. Anything resolved at runtime
   through a string, config value, macro expansion, or dynamic dispatch will
   not appear as an edge — an empty or missing result there is not proof the
   relationship doesn't exist. See "Language-specific blind spots" below.
   When tracing one of these, go straight to `search_codebase` (mode: "text")
   or a native grep instead of spending a graph call first.

## Session-start protocol (first time in a repo)

Run `repository_stats` once — files, languages, and all page/route/CLI
entrypoints in one call. If the repo is unfamiliar or the task is
architectural, add `architectural_hotspots` to learn which files are
load-bearing before touching anything. Do not open files to "get a feel" for
the repo; these two calls replace that.

## Playbooks by task

### "Where is X?" / "Find the code that does X"
`search_codebase` with `mode: "both"` — it fuses keyword and semantic
(embedding) rankings, so both concrete identifiers and conceptual phrases
("how long ago something happened") work. Exact symbol matches always rank
first. Use `path_scope` to cut noise, and `mode: "semantic"` for purely
conceptual queries. If the response carries `semantic_degraded_reason` (or
`repository_stats` → `semantic_search_available: false`), queries are
keyword-only — search for concrete identifiers, not concepts, and try
synonyms before concluding something doesn't exist.

### "How does X work?"
Escalate reading depth in this order, stopping as soon as you can act:
1. `read_file_skeleton` (with `target_symbol` if already known, per rule 7).
2. `read_symbol_source` — exact bodies; batch related symbols in one call via
   `symbols: [...]`. Disambiguate with `file_path`/`line` if the name is reused.
3. `read_file_snippet` — a known line range.
4. Native full `Read` — only when you need the whole file (imports, module
   state, decorators/attributes/macros, or anything the index doesn't model).

### "What uses X / what breaks if I change X?"
`get_context` (markdown) for callers/callees at a glance; `explore_graph` for
the neighborhood; `shortest_path` for "how are A and B connected";
`subsystem_communication` for directory-to-directory coupling. Remember rule 2
on suspicious edges and rule 9 on dynamically-resolved call sites.
`subsystem_communication` needs exact subsystem paths — if it returns
`did_you_mean`, pick from that list and retry once.

### Before editing a symbol
`get_edit_context` — it returns the exact line boundaries plus callers,
callees, and reverse dependencies in one call. Read every listed caller's
usage before changing a signature or return shape. Then switch to native
Edit/Write. CodeBroker's job ends here.

### After editing
Verify behavior natively (run the code, typecheck/build, run tests) — the
index confirms structure, never correctness. CodeBroker's index is
self-managing and will automatically detect and reindex stale files on the
next read operation.

### Architecture / quality review
`architectural_hotspots` (use `path_scope` on large repos, per rule 8),
`dependency_cycles`, `find_duplicate_logic`, `subsystem_communication`.
Treat duplicate groups as leads, not verdicts — parallel-by-design code
(per-language adapters, per-platform handlers, per-backend trait
implementations) shows up as duplication. Discount hotspot entries under
scratch/generated/build/log paths (e.g. `target/`, `dist/`, `__pycache__/`,
`.next/`); the index does not filter them.

## Language-specific blind spots

The dependency graph is built from static imports/uses/calls. Each ecosystem
has its own way of resolving calls dynamically that the graph cannot see.
When the question involves one of these patterns, skip straight to
`search_codebase` (text mode) or native grep — do not trust an empty graph
result as proof of absence.

- **Python:** decorator-registered handlers (`@app.route`, `@app.get`,
  `@celery.task`) — the graph sees the decorated function, not who dispatches
  into it by URL/task-name string. `importlib`/dynamic `__import__`,
  `getattr`-based duck-typed dispatch, monkey-patching, and `__init__.py`
  re-export barrels all obscure where a symbol is really defined or called
  from.
- **JavaScript/TypeScript (incl. JSX/TSX):** `fetch("/api/...")` or any
  URL-string call into a server route handler — this is the most common case
  and will not appear as an edge between a page/component and its API route.
  Dynamic `import()`, barrel `index.ts` re-exports (can also cause ambiguous
  multi-candidate symbol hits), and framework file-based routing "magic" are
  similarly invisible.
- **Rust:** macro-generated code (`derive` macros, proc macros,
  `macro_rules!`) is expanded at compile time and invisible to static
  parsing — a trait impl produced by `#[derive(...)]` won't show up as
  authored source. `dyn Trait` dynamic dispatch means a call site's real
  target could be any of N `impl` blocks, not one resolvable edge. FFI
  boundaries (`extern "C"`) and anything generated by `build.rs` are not
  modeled at all.

## When native tools are the right first choice

- Non-code files: configs, lockfiles, markdown, CI YAML — the index barely
  models them.
- Confirming a CodeBroker claim before a risky or irreversible action.
- Whole-file context the skeleton hides: import lists, module-level side
  effects, comments, decorators/attributes/macros.
- Any of the language-specific blind spots above.
- A one-line grep you can fully specify — verification greps are normal and
  encouraged, not a policy violation.

## Trust calibration

| Output | Trust | Caveat |
|---|---|---|
| `repository_stats`, entrypoints | High | — |
| `search_codebase` exact/symbol matches | High | Text matches are literal, not semantic |
| Graph edges between same-subsystem files | High | — |
| Cross-file edges on generic names | Medium | Verify the import/use exists (rule 2) |
| `find_duplicate_logic` groups | Medium | Flags intentional parallel structure too |
| Hotspots on unfiltered repos | Medium | May rank scratch/generated/build files |
| Callers/callees involving dynamic dispatch, decorators, or macros | Low | Not modeled — verify natively (rule 9) |
| String/config-resolved call sites (routes, DI tokens, task names) | Not modeled | Always verify natively |

## Anti-patterns

- Acting on an impact claim in auth/payments/data-integrity without native
  confirmation.
- Full-file reads when a skeleton plus one or two symbol reads would answer it.
- Recursive directory scans or blind grep sweeps to "explore" — that is what
  `repository_stats` and `search_codebase` are for.
- Retrying a failed subsystem/symbol name by guessing variants — use the
  `did_you_mean` / candidate list in the error, which is authoritative.
- Treating an empty result as proof of absence. Thin or empty results on a
  question the code clearly should answer means: verify natively.
- Assuming decorator-registered handlers (Python), macro-expanded code
  (Rust), or string-routed endpoints (JS/TS) will appear as graph edges —
  they generally don't (rule 9).
- Calling `read_file_skeleton` and `read_symbol_source` separately when the
  target symbol was already known up front (rule 7).
- Re-running `architectural_hotspots` or `find_duplicate_logic` repo-wide
  after the target subsystem is already identified (rule 8).
