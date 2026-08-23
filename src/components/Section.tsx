import Reveal from "@/components/Reveal";

/*
 * Section shell: consistent vertical rhythm, a labelled heading, and the
 * scroll offset the sticky header needs.
 *
 * The heading rule is an <h2> plus a decorative hairline that runs to the edge
 * of the column. It is what gives the page its structure at a glance without
 * spending a colour or a box on every section.
 */
const Section = ({
  id,
  label,
  title,
  intro,
  children,
}: {
  id?: string;
  /** Small-caps kicker, e.g. "Experience". */
  label: string;
  /** Optional larger heading under the kicker. */
  title?: string;
  intro?: string;
  children: React.ReactNode;
}) => (
  <section id={id} className="measure scroll-mt-24 py-20 sm:py-24">
    <Reveal>
      <div className="flex items-center gap-4">
        <h2 className="eyebrow whitespace-nowrap">{label}</h2>
        <span aria-hidden="true" className="h-px flex-1 bg-border" />
      </div>

      {title && (
        <p className="mt-5 text-balance text-[clamp(1.5rem,3.4vw,2rem)] font-semibold leading-tight tracking-tight">
          {title}
        </p>
      )}

      {intro && (
        <p className="prose-measure mt-3 text-pretty text-muted">{intro}</p>
      )}
    </Reveal>

    <div className="mt-10">{children}</div>
  </section>
);

export default Section;
