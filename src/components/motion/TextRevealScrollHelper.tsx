import { Reveal } from "./Reveal";

type Props = { text: string; className?: string };

/** Supporting copy stays readable; a small positional entrance adds polish. */
export function TextRevealScrollHelper({ text, className }: Props) {
  return <Reveal className={className}>{text}</Reveal>;
}
