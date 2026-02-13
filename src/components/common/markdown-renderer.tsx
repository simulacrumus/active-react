// Markdown.tsx
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MarkdownProps = {
  content: string;
};

export function Markdown({ content }: MarkdownProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="scroll-m-20 font-bold tracking-tight mt-4 mb-2">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="scroll-m-20 font-semibold tracking-tight mt-3 mb-2">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="scroll-m-20 font-semibold mt-2 mb-1">{children}</h3>
        ),
        p: ({ children }) => <p className="leading-7 mt-1 mb-2">{children}</p>,
        ul: ({ children }) => (
          <ul className="list-disc pl-6 mt-1 mb-2 space-y-1">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal pl-6 mt-1 mb-2 space-y-1">{children}</ol>
        ),
        li: ({ children }) => <li className="leading-7">{children}</li>,
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 pl-4 italic text-muted-foreground my-2">
            {children}
          </blockquote>
        ),
        hr: () => <hr className="my-4 border-muted" />,
        a: ({ href, children }) => (
          <a
            href={href}
            className="font-medium underline underline-offset-4 hover:text-primary"
          >
            {children}
          </a>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
