import type { ReactNode } from "react";

interface SearchLayoutProps {
  aside: ReactNode;
  content: ReactNode;
}

export default function SearchLayout({ aside, content }: SearchLayoutProps) {
  return (
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
      <aside className="hidden md:block md:w-1/3 md:sticky md:top-16 md:self-start md:shrink-0">
        {aside}
      </aside>
      <div className="w-full md:w-2/3 mt-6">{content}</div>
    </div>
  );
}
