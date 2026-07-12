import { CodeBlock } from "@/components/docs/ui/CodeBlock";

const commands = [
  { name: "init", description: "Initializes the database and indexes the codebase" },
  { name: "query", description: "Queries the graph for a specific symbol" },
  { name: "dependents", description: "" },
  { name: "context", description: "" },
  { name: "knowledge", description: "" },
  { name: "metrics", description: "" },
  { name: "analytics", description: "" },
  { name: "dashboard", description: "" },
  {
    name: "reindex-incremental",
    description:
      "Re-parses only the given files and re-links their edges, instead of a full repository rebuild. Faster for small edits.",
  },
  { name: "bind", description: "Instantly hooks up Claude Desktop and Antigravity to the current directory" },
  { name: "validate", description: "Validates the structure and health of the compiled graph" },
  { name: "inspect", description: "Inspects a single relationship's deterministic resolution trace" },
  { name: "validate-tools", description: "Validates Repository Capability (Tool Agreements & Graph Completeness)" },
  { name: "analyze-resolution", description: "Analyzes the resolution pipeline and outputs aggregate statistics" },
  { name: "summary", description: "Prints a high-level summary of the project" },
  { name: "overview", description: "Prints a logical overview of the project's subsystems" },
  { name: "hotspots", description: "Prints project structural hotspots" },
  { name: "architecture", description: "Prints architectural layers inferred from dependencies" },
  { name: "entrypoints", description: "Prints categorized entrypoints" },
  { name: "prepare-context", description: "Prepares context for a subsystem" },
  { name: "update", description: "Updates the CodeBroker CLI to the latest release" },
  { name: "help", description: "Print this message or the help of the given subcommand(s)" },
];

export default function CLIPage() {
  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-semibold tracking-tight text-white mb-6">CLI Reference</h1>
      <p className="text-lg text-white/60 mb-10">
        The CodeBroker CLI is a blazing fast local code graph — every command below is available
        once you&apos;ve run <code>codebroker init</code>. Run <code>codebroker help</code> at any
        time to see this list from your terminal.
      </p>

      <CodeBlock
        code={`A blazing fast local code graph\n\nUsage: codebroker <COMMAND>\n\nOptions:\n  -h, --help  Print help`}
        language="text"
        filename="codebroker help"
      />

      <h2 id="commands" className="text-2xl font-semibold text-white mt-12 mb-4">Commands</h2>
      <div className="overflow-x-auto rounded-xl border border-[#232323]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#232323] bg-white/5 text-left">
              <th className="px-4 py-3 font-medium text-white/70 whitespace-nowrap">Command</th>
              <th className="px-4 py-3 font-medium text-white/70">Description</th>
            </tr>
          </thead>
          <tbody>
            {commands.map((cmd, i) => (
              <tr
                key={cmd.name}
                id={cmd.name}
                className={i !== commands.length - 1 ? "border-b border-[#232323]" : ""}
              >
                <td className="px-4 py-3 align-top font-mono text-[var(--color-brand)] whitespace-nowrap">
                  {cmd.name}
                </td>
                <td className="px-4 py-3 align-top text-white/70">
                  {cmd.description || <span className="text-white/30">—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
