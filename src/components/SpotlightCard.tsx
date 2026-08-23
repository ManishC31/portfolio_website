import { useSpotlight } from "@/hooks/use-spotlight";

/*
 * A card that lights up under the cursor. Exists so the hook's three pointer
 * handlers do not have to be repeated at every call site, and so a card
 * rendered inside a .map() can still have its own state — hooks cannot be
 * called in a loop, but a component can.
 *
 * `glow: "fill"` washes the card's interior, which suits a large panel;
 * "border" lights only the frame, which is what small cards want, since a
 * wash behind two lines of text just makes them harder to read.
 */
const SpotlightCard = ({
  children,
  className = "",
  glow = "fill",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  glow?: "fill" | "border";
  as?: "div" | "article";
}) => {
  const spotlight = useSpotlight<HTMLDivElement>();

  return (
    <Tag
      {...spotlight}
      className={`card ${
        glow === "fill" ? "card-spotlight" : "card-spotlight-border"
      } ${className}`}
    >
      {children}
    </Tag>
  );
};

export default SpotlightCard;
