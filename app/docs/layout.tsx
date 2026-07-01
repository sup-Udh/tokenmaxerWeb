import { TopNavbar } from "@/components/docs/TopNavbar";
import { SidebarNavigation } from "@/components/docs/SidebarNavigation";
import { TableOfContents } from "@/components/docs/TableOfContents";
import { DocsFooter } from "@/components/docs/DocsFooter";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[var(--color-brand)] selection:text-white flex flex-col">
      <TopNavbar />
      <div className="flex-1 max-w-[1600px] w-full mx-auto px-4 md:px-6 flex items-start justify-center gap-8 lg:gap-12 relative">
        <SidebarNavigation />
        <main className="flex-1 min-w-0 max-w-[900px] py-12 lg:py-16">
          <div className="prose prose-invert prose-brand max-w-none">
            {children}
          </div>
          <DocsFooter />
        </main>
        <TableOfContents />
      </div>
    </div>
  );
}
