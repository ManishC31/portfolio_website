/*
 * Continuously scrolling strip of tool names.
 *
 * The track is the list rendered twice; the animation translates it by exactly
 * -50%, which lands the copy where the original started. That only works if
 * the two halves are byte-identical in width, which is why the spacing lives
 * on each chip as a margin rather than as a `gap` on the flex container — a
 * gap would add one extra unit at the join and the loop would visibly stutter
 * once per cycle.
 *
 * Duration scales with the number of items so a longer list does not scroll
 * proportionally faster.
 *
 * aria-hidden: the Stack section lists every one of these as real text a few
 * screens further down. Announcing them twice would be noise, and an infinite
 * marquee is hostile to a screen reader.
 */

const TechMarquee = ({ items }: { items: readonly string[] }) => {
  const half = (
    <ul className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="chip-lg mr-3">
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <div
      aria-hidden="true"
      className="fade-edges relative overflow-hidden py-2"
    >
      <div
        className="flex w-max animate-marquee hover:[animation-play-state:paused]"
        style={
          { "--marquee-duration": `${items.length * 3.4}s` } as React.CSSProperties
        }
      >
        {half}
        {half}
      </div>
    </div>
  );
};

export default TechMarquee;
