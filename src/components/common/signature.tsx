export function Signature() {
  return (
    <div className="py-2">
      <small className="text-xs text-muted-foreground leading-none font-small">
        {/* Made by{" "} */}
        <a
          href={"https://github.com/simulacrumus"}
          target="_blank"
          rel="noopener noreferrer"
          className="underline-offset-2 text-muted-foreground font-small hover:text-primary hover:underline transition-colors"
        >
          © Emrah Kinay
        </a>
      </small>
    </div>
  );
}
