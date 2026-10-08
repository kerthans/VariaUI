export type Status = "experimental" | "stable" | "deprecated";

export type ComponentCategory = "hero" | "gallery" | "content" | "navigation" | "footer";

export interface StyleEntry {
  id: string;
  name: string;
  tagline: string;
  summary: string;
  language: {
    typography: string;
    color: string;
    geometry: string;
    layout: string;
    texture: string;
    imagery: string;
    motion: string;
    mood: string;
  };
  avoid: string[];
  status: Status;
}

export interface Provenance {
  type: "original" | "adaptation" | "licensed";
  notes: string;
}

export interface ComponentEntry {
  id: string;
  name: string;
  category: ComponentCategory;
  primaryStyle: string;
  styleIds: string[];
  description: string;
  intent: string;
  useCases: string[];
  traits: string[];
  recommendedWith: string[];
  avoidWith: string[];
  /** Repository-relative paths of every file a user needs to install. */
  files: string[];
  dependencies: string[];
  license: string;
  provenance: Provenance;
  status: Status;
}

export interface RecipeEntry {
  id: string;
  name: string;
  styleId: string;
  description: string;
  scenario: string;
  components: string[];
  status: Status;
}
