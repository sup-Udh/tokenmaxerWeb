import { TerminalBlock } from "@/components/docs/ui/TerminalBlock";
import { CodeBlock } from "@/components/docs/ui/CodeBlock";

export default function CLIPage() {
  const commands = [
    {
      name: "init",
      description: "Initializes the semantic graph database configuration in the current directory.",
      usage: "codebroker init [flags]",
      example: "codebroker init --template node",
      output: "✓ Initialized .codebroker.json"
    },
    {
      name: "index",
      description: "Builds or updates the semantic graph by parsing all tracked files.",
      usage: "codebroker index [flags]",
      example: "codebroker index --workers 8",
      output: "✓ Graph built successfully in 1.4s"
    },
    {
      name: "validate",
      description: "Checks graph integrity and reports on missing references or unresolved dependencies.",
      usage: "codebroker validate",
      example: "codebroker validate",
      output: "Graph Integrity: 100%"
    },
    {
      name: "query",
      description: "Semantically searches the graph and returns exact relevant symbols.",
      usage: 'codebroker query "<search-term>"',
      example: 'codebroker query "authentication flow"',
      output: "Found 3 entrypoints matching 'authentication flow'."
    },
    {
      name: "mcp",
      description: "Starts the Model Context Protocol server for AI integration.",
      usage: "codebroker mcp [flags]",
      example: "codebroker mcp --port 3000",
      output: "Starting CodeBroker MCP Server on port 3000..."
    }
  ];

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-semibold tracking-tight text-white mb-6">CLI Reference</h1>
      <p className="text-lg text-white/60 mb-10">
        The CodeBroker CLI is a powerful tool for indexing, querying, and managing semantic graphs of your repositories. 
      </p>

      <div className="space-y-12">
        {commands.map((cmd) => (
          <section key={cmd.name} className="border-t border-[#232323] pt-8">
            <h2 id={cmd.name} className="text-2xl font-mono text-[var(--color-brand)] mb-2">codebroker {cmd.name}</h2>
            <p className="text-white/80 mb-6">{cmd.description}</p>
            
            <h3 className="text-sm uppercase tracking-wider text-white/50 mb-2">Usage</h3>
            <CodeBlock code={cmd.usage} language="bash" />
            
            <h3 className="text-sm uppercase tracking-wider text-white/50 mb-2 mt-6">Example</h3>
            <TerminalBlock command={cmd.example} output={cmd.output} />
          </section>
        ))}
      </div>
    </div>
  );
}
