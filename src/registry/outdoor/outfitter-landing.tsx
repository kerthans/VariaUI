import type { ReactNode } from "react";

import { FieldJournal } from "./field-journal";
import { GearCatalog } from "./gear-catalog";
import styles from "./outfitter-landing.module.css";
import { cx, theme } from "./theme";
import { TrailheadHero } from "./trailhead-hero";

export interface RecipeSection {
  key: string;
  /** Registry id of the component this section is built from, if any. */
  component?: string;
  render: () => ReactNode;
}

export const outfitterLandingSections: RecipeSection[] = [
  {
    key: "hero",
    component: "outdoor-trailhead-hero",
    render: () => (
      <TrailheadHero
        brand="Northfold"
        navigation={[
          { label: "The kit", href: "#kit" },
          { label: "Field journal", href: "#journal" },
          { label: "Stockists", href: "#visit" },
        ]}
        barAction={{ label: "Shop", href: "#kit" }}
        eyebrow="Field Series · Autumn 2026"
        headline="Made for the long way outside."
        emphasis="outside"
        lede="Packs, shells, and shelters built in small batches, then carried for a season before they reach a shelf."
        primaryAction={{ label: "Shop the kit", href: "#kit" }}
        secondaryAction={{ label: "Read the field journal", href: "#journal" }}
        statsTitle="Ridge Pack 38"
        stats={[
          { label: "Weight", value: "1.18 kg" },
          { label: "Volume", value: "38 L" },
          { label: "Fabric", value: "Waxed canvas" },
          { label: "Tested", value: "214 km" },
        ]}
      />
    ),
  },
  {
    key: "kit",
    component: "outdoor-gear-catalog",
    render: () => (
      <div id="kit">
        <GearCatalog
          eyebrow="02 — The kit"
          title="Fewer things, carried further."
          description="Every piece is field-tested for one full season and repaired, not replaced, when it wears."
          action={{ label: "All gear", href: "#kit" }}
          items={[
            {
              name: "Ridge Pack 38",
              category: "Packs",
              price: "€240",
              href: "#",
              badge: "Field-tested",
              specs: [
                { label: "Weight", value: "1.18 kg" },
                { label: "Volume", value: "38 L" },
              ],
              colors: [
                { name: "Moss", value: "#56653f" },
                { name: "Clay", value: "#a3471f" },
                { name: "Stone", value: "#8b8676" },
              ],
            },
            {
              name: "Fold Shell Jacket",
              category: "Outerwear",
              price: "€310",
              href: "#",
              badge: "New",
              specs: [
                { label: "Weight", value: "420 g" },
                { label: "Rating", value: "20k mm" },
              ],
              colors: [
                { name: "Forest", value: "#1e2b23" },
                { name: "Ochre", value: "#d39a4a" },
              ],
            },
            {
              name: "Tarn Two Shelter",
              category: "Shelter",
              price: "€460",
              href: "#",
              specs: [
                { label: "Weight", value: "1.6 kg" },
                { label: "Sleeps", value: "2" },
              ],
              colors: [{ name: "Sand", value: "#d3c4a3" }],
            },
          ]}
        />
      </div>
    ),
  },
  {
    key: "journal",
    component: "outdoor-field-journal",
    render: () => (
      <div id="journal">
        <FieldJournal
          eyebrow="03 — From the field"
          title="Four days on the Vassfjell traverse."
          description="Where the season's kit was tested: notes from the team, one stage at a time."
          summary={[
            { label: "Distance", value: "54 km" },
            { label: "Ascent", value: "3,120 m" },
          ]}
          entries={[
            {
              marker: "Day 01",
              elevation: 420,
              title: "Lake to treeline",
              text: "A wet start through birch forest. The shell earned its keep before lunch.",
              place: "Camp I, Vass lake",
            },
            {
              marker: "Day 02",
              elevation: 1240,
              title: "Over the shoulder",
              text: "Long climb on scree. Pack straps re-tuned twice; the hip belt stayed put.",
              place: "Camp II, north shoulder",
            },
            {
              marker: "Day 03",
              elevation: 1580,
              title: "The high plateau",
              text: "Wind all night. The shelter held at a pitch we had only tried in the yard.",
              place: "Camp III, plateau",
            },
            {
              marker: "Day 04",
              elevation: 610,
              title: "Down to the fjord",
              text: "Knees complained, kit did not. A list of small repairs and one new idea.",
              place: "Fjord road",
            },
          ]}
        />
      </div>
    ),
  },
  {
    key: "visit",
    render: () => (
      <footer id="visit" className={cx(theme.root, theme.grain, styles.footer)}>
        <p className={styles.signoff}>
          See you <em className={styles.emphasis}>out there.</em>
        </p>
        <dl className={styles.columns}>
          <div>
            <dt className={theme.label}>Workshop</dt>
            <dd>Open Thursday to Saturday, repairs by appointment.</dd>
          </div>
          <div>
            <dt className={theme.label}>Write to us</dt>
            <dd>
              <a className={styles.link} href="mailto:hello@example.com">
                hello@example.com
              </a>
            </dd>
          </div>
          <div>
            <dt className={theme.label}>Field letter</dt>
            <dd>One letter per season, sent from wherever the kit is being tested.</dd>
          </div>
        </dl>
        <p className={cx(theme.label, styles.note)}>
          Sample content for the VariaUI Outfitter Landing recipe.
        </p>
      </footer>
    ),
  },
];

export function OutfitterLanding() {
  return (
    <main className={styles.page}>
      {outfitterLandingSections.map((section) => (
        <div key={section.key}>{section.render()}</div>
      ))}
    </main>
  );
}
