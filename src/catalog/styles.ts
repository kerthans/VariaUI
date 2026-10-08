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
  {
    id: "outdoor",
    name: "Outdoor",
    tagline: "Natural materials. Earthy tones. Field-tested details.",
    summary:
      "Forest, bone, and sand with clay and ochre accents. Editorial serif headlines, utilitarian mono labels, topographic lines, and quiet film grain. It should feel carried, not rendered.",
    language: {
      typography:
        "Optical-size serif (Fraunces) for headlines, light and sentence case with italic emphasis; IBM Plex Mono for specs, labels, and markers.",
      color:
        "Forest #1e2b23, bone #f1ebdd, and sand #e3d8bf carry the page. Clay #a3471f on light grounds and ochre #d39a4a on dark grounds mark actions and emphasis.",
      geometry: "Contour rings, ridge lines, elevation profiles, and dashed trail lines. Small 6px radii.",
      layout:
        "Editorial 7/5 headers, full-bleed landscape plates, catalog cards with spec tables, and stages laid out along a route.",
      texture: "Subtle film grain and dashed field-guide rules. No glass, neon, or glossy gradients.",
      imagery: "Landscape and product photography; illustrated ridges and topographic plates as defaults.",
      motion: "Slow, small scale and color shifts on hover. Disabled under reduced motion.",
      mood: "Grounded, durable, quietly adventurous.",
    },
    palette: [
      { name: "Forest", value: "#1e2b23" },
      { name: "Bone", value: "#f1ebdd" },
      { name: "Sand", value: "#e3d8bf" },
      { name: "Moss", value: "#56653f" },
      { name: "Clay", value: "#a3471f" },
      { name: "Ochre", value: "#d39a4a" },
    ],
    typeface: "Fraunces",
    avoid: [
      "stock adventure clichés like compasses and mountain icons as decoration",
      "neon or high-saturation accents",
      "glassmorphism",
      "heavy sans-serif tech headlines",
      "perfectly flat, sterile surfaces",
    ],
    status: "experimental",
  },
] as const satisfies readonly StyleEntry[];
