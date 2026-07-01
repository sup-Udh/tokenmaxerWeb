import { TerminalBlock } from "@/components/docs/ui/TerminalBlock";
import { CodeBlock } from "@/components/docs/ui/CodeBlock";

export default function ExamplesPage() {
  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-semibold tracking-tight text-white mb-6">Examples</h1>
      <p className="text-lg text-white/60 mb-10">
        Practical use cases and examples showing how to use CodeBroker in everyday development scenarios.
      </p>

      <section className="mb-12 border-t border-[#232323] pt-8">
        <h2 id="authentication-flow" className="text-2xl font-semibold text-white mb-4">1. Understanding Authentication Flow</h2>
        <p className="text-white/70 mb-4">
          When tasked with modifying the login logic, you need to know exactly which files touch the authentication provider and session handlers.
        </p>
        <TerminalBlock 
          command='codebroker query "login handler flow"' 
          output="✓ Found Entrypoint: src/api/auth.ts (loginHandler)
→ src/services/authProvider.ts
→ src/models/Session.ts

Generated context capsule 'auth_flow.md' (2,104 tokens)" 
        />
      </section>

      <section className="mb-12 border-t border-[#232323] pt-8">
        <h2 id="impact-analysis" className="text-2xl font-semibold text-white mb-4">2. Impact Analysis</h2>
        <p className="text-white/70 mb-4">
          Before refactoring a widely used utility function, check the blast radius to see what will break.
        </p>
        <TerminalBlock 
          command='codebroker impact src/utils/dateFormatter.ts:formatDate' 
          output="Impact Analysis for formatDate:
- Directly used in 14 files.
- Transitive dependencies touch 3 React components.
- Risk level: HIGH

See full list in 'impact_report.md'" 
        />
      </section>

      <section className="mb-12 border-t border-[#232323] pt-8">
        <h2 id="llm-context" className="text-2xl font-semibold text-white mb-4">3. Generating LLM Context</h2>
        <p className="text-white/70 mb-4">
          Prepare a highly optimized context payload for an external LLM agent (like Claude or GPT-4) without relying on the MCP server.
        </p>
        <CodeBlock 
          code='codebroker capsule create --query "database migration script" --out context.md' 
          language="bash" 
          filename="Terminal"
        />
        <p className="text-white/70 mt-4">
          The resulting `context.md` will contain the exact implementations of your DB schema, migrations, and ORM config, tightly packed without any irrelevant UI components.
        </p>
      </section>
    </div>
  );
}
