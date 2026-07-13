import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Legal | CodeBroker",
  description:
    "CodeBroker's Terms of Service, Privacy Policy, and open-source license information.",
};

const EFFECTIVE_DATE = "July 13, 2026";
const CONTACT_EMAIL = "legal@codebroker.space";

const sections = [
  { id: "terms-of-service", name: "Terms of Service" },
  { id: "privacy-policy", name: "Privacy Policy" },
  { id: "license", name: "License" },
];

export default function LegalPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />

      <Container className="py-32 md:py-40">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            Legal
          </h1>
          <p className="text-white/50 mb-12">Last updated: {EFFECTIVE_DATE}</p>

          {/* Section nav */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2 mb-16 pb-8 border-b border-white/10">
            {sections.map((s) => (
              <Link
                key={s.id}
                href={`#${s.id}`}
                className="text-sm text-white/55 hover:text-white transition-colors"
              >
                {s.name}
              </Link>
            ))}
          </nav>

          <div className="prose prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-p:text-white/70 prose-p:leading-relaxed prose-li:text-white/70 prose-a:text-[var(--color-brand)]">
            {/* ---------------- Terms of Service ---------------- */}
            <section id="terms-of-service" className="scroll-mt-24">
              <h2>Terms of Service</h2>
              <p>
                These Terms of Service (&quot;Terms&quot;) govern your access to and use of
                CodeBroker, including our website, CLI, and MCP server (collectively, the
                &quot;Service&quot;). By installing, accessing, or using the Service, you agree
                to be bound by these Terms. If you do not agree, do not use the Service.
              </p>

              <h3>1. Use of the Service</h3>
              <p>
                You may use CodeBroker to index, analyze, and query source code repositories
                that you own or are authorized to access. You are responsible for ensuring that
                your use of the Service complies with any license, confidentiality, or
                contractual obligations that apply to the code you index.
              </p>

              <h3>2. Acceptable Use</h3>
              <p>You agree not to:</p>
              <ul>
                <li>Use the Service to index or process code you do not have the right to access;</li>
                <li>Attempt to reverse engineer, decompile, or circumvent the Service&apos;s security or licensing mechanisms;</li>
                <li>Use the Service in a manner that disrupts, overburdens, or impairs its infrastructure;</li>
                <li>Use the Service for any unlawful purpose or in violation of any applicable regulation.</li>
              </ul>

              <h3>3. Intellectual Property</h3>
              <p>
                CodeBroker and its original content, features, and functionality are owned by
                the CodeBroker team and are protected by applicable intellectual property laws.
                Your source code, and any index or context derived from it, remains your
                property. See the <a href="#license">License</a> section for terms governing the
                CodeBroker software itself.
              </p>

              <h3>4. Disclaimer of Warranties</h3>
              <p>
                The Service is provided &quot;as is&quot; and &quot;as available,&quot; without
                warranties of any kind, whether express or implied, including but not limited to
                warranties of merchantability, fitness for a particular purpose, or
                non-infringement. Index results, impact analysis, and other output are
                derived from static and heuristic analysis and may be incomplete or inaccurate;
                you are responsible for independently verifying anything you rely on.
              </p>

              <h3>5. Limitation of Liability</h3>
              <p>
                To the maximum extent permitted by law, CodeBroker and its contributors shall
                not be liable for any indirect, incidental, special, consequential, or punitive
                damages, or any loss of data, revenue, or profits, arising out of or related to
                your use of the Service.
              </p>

              <h3>6. Changes to the Terms</h3>
              <p>
                We may update these Terms from time to time. Material changes will be reflected
                by updating the &quot;Last updated&quot; date above. Continued use of the
                Service after changes take effect constitutes acceptance of the revised Terms.
              </p>

              <h3>7. Contact</h3>
              <p>
                Questions about these Terms can be sent to{" "}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
              </p>
            </section>

            {/* ---------------- Privacy Policy ---------------- */}
            <section id="privacy-policy" className="scroll-mt-24 mt-16 pt-16 border-t border-white/10">
              <h2>Privacy Policy</h2>
              <p>
                This Privacy Policy describes how CodeBroker collects, uses, and protects
                information when you use our website and Service.
              </p>

              <h3>1. Information We Collect</h3>
              <ul>
                <li>
                  <strong>Account &amp; usage data:</strong> basic information such as your
                  email address, and anonymized usage metrics (e.g. feature usage, error rates)
                  used to improve the Service.
                </li>
                <li>
                  <strong>Local indexing data:</strong> when you run the CodeBroker CLI or MCP
                  server, repository indexing happens locally on your machine by default. Source
                  code content is not uploaded to our servers unless you explicitly opt in to a
                  cloud or hosted feature.
                </li>
                <li>
                  <strong>Website analytics:</strong> standard web analytics (e.g. page views,
                  referrers) collected when you browse codebroker.space.
                </li>
              </ul>

              <h3>2. How We Use Information</h3>
              <p>We use collected information to:</p>
              <ul>
                <li>Provide, maintain, and improve the Service;</li>
                <li>Diagnose and fix technical issues;</li>
                <li>Communicate with you about updates, security notices, or support requests;</li>
                <li>Understand aggregate usage trends.</li>
              </ul>

              <h3>3. Data Sharing</h3>
              <p>
                We do not sell your personal information. We may share information with
                service providers who help us operate the Service (e.g. hosting, analytics),
                bound by confidentiality obligations, or when required by law.
              </p>

              <h3>4. Data Retention &amp; Security</h3>
              <p>
                We retain information only as long as necessary for the purposes described
                above and take reasonable technical and organizational measures to protect it
                against unauthorized access, alteration, or loss.
              </p>

              <h3>5. Your Rights</h3>
              <p>
                Depending on your jurisdiction, you may have the right to access, correct, or
                delete your personal information, or to object to certain processing. To
                exercise these rights, contact us at{" "}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
              </p>

              <h3>6. Changes to This Policy</h3>
              <p>
                We may update this Privacy Policy periodically. Changes will be reflected by
                updating the &quot;Last updated&quot; date above.
              </p>
            </section>

            {/* ---------------- License ---------------- */}
            <section id="license" className="scroll-mt-24 mt-16 pt-16 border-t border-white/10">
              <h2>License</h2>
              <p>
                Unless otherwise noted, CodeBroker&apos;s website content is © {new Date().getFullYear()} CodeBroker.
                All rights reserved.
              </p>
              <p>
                CodeBroker&apos;s CLI and MCP server may include open-source components, each
                governed by their own respective licenses. Where CodeBroker software is
                distributed under an open-source license, the applicable license text is
                included alongside the source distribution (e.g. a <code>LICENSE</code> file in
                the relevant repository).
              </p>
              <p>
                For questions about licensing terms for a specific component or use case
                (including commercial or enterprise licensing), contact{" "}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
              </p>
            </section>
          </div>
        </div>
      </Container>

      <Footer />
    </main>
  );
}
