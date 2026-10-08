import "@fontsource-variable/fraunces";
import "@fontsource-variable/fraunces/wght-italic.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import theme from "./theme.module.css";

export { theme };

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Closed, slightly irregular contour rings around a centre point, as drawn on a
 * topographic map. Deterministic for a given seed so server and client output match.
 */
export function contourPaths({
  cx: centerX,
  cy: centerY,
  rings,
  spacing,
  seed,
}: {
  cx: number;
  cy: number;
  rings: number;
  spacing: number;
  seed: number;
}) {
  const steps = 72;
  return Array.from({ length: rings }, (_, ring) => {
    const radius = spacing * (ring + 1);
    const points = Array.from({ length: steps }, (_, step) => {
      const angle = (step / steps) * Math.PI * 2;
      const wobble =
        1 +
        0.14 * Math.sin(3 * angle + seed) +
        0.07 * Math.sin(5 * angle + seed * 1.7 + ring * 0.35) +
        0.04 * Math.cos(7 * angle - seed * 0.6);
      const x = centerX + Math.cos(angle) * radius * wobble * 1.25;
      const y = centerY + Math.sin(angle) * radius * wobble;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });
    return `M${points.join("L")}Z`;
  });
}
