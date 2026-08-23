import { profile } from "@/data/profile";

/*
 * The hero portrait.
 *
 * Not the photograph. scripts/generate-portrait.mjs redraws the studio
 * headshot as a 45-degree halftone screen — roughly five thousand circles,
 * sized by local brightness — and this renders that SVG as a CSS mask filled
 * with the accent gradient (see .halftone-portrait in index.css).
 *
 * Two reasons it is worth the trouble. A passport-style headshot is the wrong
 * register beside the rest of this page, and the source photograph is only
 * 354px wide, so any straight crop is visibly soft the moment it is displayed
 * at hero size. The halftone is vector, so it stays sharp at any size — which
 * is what lets it run this large — and its dot grid reads as a deliberate
 * print treatment rather than a low-resolution photo.
 *
 * Deliberately unframed: no card, no border, no panel behind it. The screen is
 * generated with its lower edge dissolving to nothing, so the figure fades
 * into the page instead of needing a box to stop it. That also means the
 * element's aspect ratio has to match the SVG's exactly, or `contain` would
 * letterbox it and the dissolve would stop meeting the bottom edge.
 */
const Portrait = () => (
  <div
    role="img"
    aria-label={`${profile.name}, halftone portrait`}
    className="halftone-portrait mx-auto aspect-[250/344] w-[17rem] sm:w-[20rem] lg:mx-0 lg:w-[23rem] xl:w-[25rem]"
  />
);

export default Portrait;
