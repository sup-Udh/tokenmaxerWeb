import Link from "next/link";
import { CodeBlock } from "@/components/docs/ui/CodeBlock";
import { Callout } from "@/components/docs/ui/Callout";

export default function InstallationPage() {
  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-semibold tracking-tight text-white mb-6">Installation</h1>
      <p className="text-lg text-white/60 mb-10">
        CodeBroker is available as a CLI. We recommend it for CI/CD workflows and daily
        development alike.
      </p>

      <h2 id="install-cli" className="text-2xl font-semibold text-white mb-4">Command Line Interface</h2>
      <p className="text-white/70 mb-4">
        The fastest way to get set up is the install script for your platform. It&apos;s fully
        automated — no separate toolchain or configuration required.
      </p>

      <h3 id="macos-linux" className="text-xl font-medium text-white mt-8 mb-4">macOS / Linux</h3>
      <CodeBlock code="curl -fsSL https://www.codebroker.space/install.sh | bash" language="bash" filename="Terminal" />

      <h3 id="windows" className="text-xl font-medium text-white mt-8 mb-4">Windows</h3>
      <p className="text-white/70 mb-4">Run this in PowerShell:</p>
      <CodeBlock code="irm https://www.codebroker.space/install.ps1 | iex" language="powershell" filename="PowerShell" />

      <h2 id="path-setup" className="text-2xl font-semibold text-white mt-12 mb-4">Add CodeBroker to your PATH</h2>
      <p className="text-white/70 mb-4">
        The install script places the <code>codebroker</code> binary in <code>~/.codebroker/bin</code>{" "}
        and appends a line to your shell profile (<code>~/.bashrc</code>, <code>~/.zshrc</code>, or{" "}
        <code>~/.profile</code>, depending on your shell) so that directory is on your{" "}
        <code>PATH</code>. This happens automatically — you don&apos;t need to do it yourself.
      </p>
      <p className="text-white/70 mb-4">
        The one thing you do need to do is open a <strong>new terminal window</strong> (or reload
        your current shell) after installing, since the updated <code>PATH</code> only takes
        effect in shells started after the install script ran:
      </p>
      <CodeBlock code="source ~/.bashrc   # or: source ~/.zshrc" language="bash" filename="Terminal" />
      <p className="text-white/70 mb-4 mt-6">
        To confirm CodeBroker is on your <code>PATH</code> and resolving to the right binary:
      </p>
      <CodeBlock code={`which codebroker\ncodebroker --version`} language="bash" filename="Terminal" />

      <Callout type="warning" title="Command not found?">
        If your shell still can&apos;t find <code>codebroker</code>, add the install directory to
        your <code>PATH</code> manually by adding this line to your shell profile, then restarting
        your terminal:
        <div className="mt-3">
          <code className="block bg-black/40 rounded-lg px-3 py-2 text-white/90">
            export PATH=&quot;$HOME/.codebroker/bin:$PATH&quot;
          </code>
        </div>
      </Callout>

      <h2 id="setup" className="text-2xl font-semibold text-white mt-12 mb-4">Setup</h2>
      <p className="text-white/70 mb-4">
        CodeBroker is initialized per-project, so first <code>cd</code> into the project you want
        to index — this is the directory <code>codebroker init</code> will scan and the directory
        it will stay scoped to:
      </p>
      <CodeBlock code="cd /path/to/your-project" language="bash" filename="Terminal" />

      <p className="text-white/70 mb-4 mt-6">
        Then, from inside that project directory, initialize CodeBroker. This sets up the local
        database and indexes your codebase:
      </p>
      <CodeBlock code="codebroker init" language="bash" filename="Terminal" />

      <p className="text-white/70 mb-4 mt-6">
        Then bind it to your AI coding tools — this instantly hooks up Claude Desktop and
        Antigravity to the current directory, so those tools can query the index you just built.
        Run <code>bind</code> from the same project directory as <code>init</code>; it binds
        whichever project you&apos;re currently standing in.
      </p>
      <CodeBlock code="codebroker bind" language="bash" filename="Terminal" />

      <Callout type="tip" title="All commands">
        Run <code>codebroker help</code> to see every available command, or check the{" "}
        <Link href="/docs/cli" className="underline hover:text-white">CLI reference</Link>{" "}
        for the full list.
      </Callout>

      <h2 id="updating" className="text-2xl font-semibold text-white mt-12 mb-4">Updating CodeBroker</h2>
      <p className="text-white/70 mb-4">
        CodeBroker ships frequently. To pull the latest release, run <code>update</code> from
        anywhere — it doesn&apos;t need to be run inside a project directory, since it updates the
        CLI binary itself rather than any per-project index:
      </p>
      <CodeBlock code="codebroker update" language="bash" filename="Terminal" />
      <p className="text-white/70 mb-4 mt-6">
        This checks the latest release, downloads it if you&apos;re behind, and replaces the
        binary at <code>~/.codebroker/bin/codebroker</code> in place — no need to re-run the
        install script. Your existing per-project indexes (from <code>codebroker init</code>) are
        untouched; run <code>codebroker init</code> again (or{" "}
        <Link href="/docs/cli#reindex-incremental" className="underline hover:text-white">
          reindex-incremental
        </Link>
        ) if a later release changes the index format.
      </p>
    </div>
  );
}
