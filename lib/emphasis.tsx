/**
 * Tiny markup for editable text: wrap words in *asterisks* to render them
 * in the italic serif accent font, e.g. "Cutting stories *frame by frame.*"
 */
export type Token = { word: string; em: boolean };

export function tokenize(text: string): Token[] {
  let on = false;
  return text.split(/\s+/).filter(Boolean).map((raw) => {
    let w = raw;
    let em = on;
    if (w.startsWith("*")) {
      on = true;
      em = true;
      w = w.slice(1);
    }
    if (/\*[^\w]*$/.test(w)) {
      w = w.replace(/\*([^\w]*)$/, "$1");
      on = false;
    }
    return { word: w, em };
  });
}

/** Strip the asterisks (for meta tags, aria labels, etc.) */
export const plain = (text: string) => text.replace(/\*/g, "");

/** Render text with *emphasis* as serif italic. */
export function Emph({ text, className = "accent-serif" }: { text: string; className?: string }) {
  const toks = tokenize(text);
  return (
    <>
      {toks.map((t, i) => (
        <span key={i}>
          {t.em ? <em className={className}>{t.word}</em> : t.word}
          {i < toks.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}
