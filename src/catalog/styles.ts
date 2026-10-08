import type { StyleEntry } from "./types";

export const styles = [
  {
    id: "modern-bauhaus",
    name: "Modern Bauhaus",
    tagline: "Functional geometry. Bold typography. Deliberate composition.",
    summary:
      "Warm paper and ink with red, blue, and yellow used as structural accents. Large type, strong grids, asymmetric layouts, and clear boundaries. Nothing is decorative for its own sake.",
    language: {
      typography:
        "Geometric sans (Jost). Heavy uppercase display set tight; calm sentence-case body; tracked uppercase labels.",
      color:
        "Paper #f2ede1 and ink #141414 carry the page. Red, blue, and yellow appear as shapes and rules, rarely as text.",
      geometry: "Circles, quarter discs, rectangles, and bars. Square corners only.",
      layout:
        "12-column grid with visible 2px rules. Asymmetric splits such as 8/4 and 7/5. Headline lines offset by grid steps.",
      texture: "Flat color and drafting-style hairlines. No gradients, shadows, or glass.",
      imagery: "Built-in geometric plates; photography optional and framed by rules.",
      motion: "Short, functional state changes only. Disabled under reduced motion.",
      mood: "Confident, constructive, editorial.",
    },
    palette: [
      { name: "Paper", value: "#f2ede1" },
      { name: "Ink", value: "#141414" },
      { name: "Red", value: "#c8341f" },
      { name: "Blue", value: "#1d4b9b" },
      { name: "Yellow", value: "#f0b400" },
    ],
    typeface: "Jost",
    avoid: [
      "primary-color circle clichés used as decoration",
      "glassmorphism",
      "neon or purple gradients",
      "rounded pill shapes",
      "soft drop shadows",
    ],
    status: "experimental",
  },
] as const satisfies readonly StyleEntry[];
