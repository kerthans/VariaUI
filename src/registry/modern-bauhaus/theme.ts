import "@fontsource-variable/jost";
import theme from "./theme.module.css";

export { theme };

export type BauhausAccent = "red" | "blue" | "yellow" | "ink";

const accentClass: Record<BauhausAccent, string> = {
  red: theme.accentRed,
  blue: theme.accentBlue,
  yellow: theme.accentYellow,
  ink: theme.accentInk,
};

export function accent(value: BauhausAccent) {
  return accentClass[value];
}

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
