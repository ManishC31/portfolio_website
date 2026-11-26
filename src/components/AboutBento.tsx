import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  Boxes,
  Database,
  Globe,
  Languages,
  Sparkles,
  Waypoints,
  Zap,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

const { trackRecord, now, background, focus } = profile.about;

/*
 * Icons are matched to items by position. They are decoration only, so a list
 * that grows past its icons simply repeats the last one rather than breaking.
 */
const NOW_ICONS: LucideIcon[] = [Boxes, Globe, Sparkles];
const FOCUS_ICONS: LucideIcon[] = [Waypoints, Database, Zap, Sparkles];

const iconAt = (icons: LucideIcon[], index: number) =>
  icons[Math.min(index, icons.length - 1)];

// "English C1 · German A2 · Marathi (native)" -> one token per language.
const languages = profile.languages.split(" · ");

/** The statement each card leads with. Larger on the two wide cards. */
const headline = (wide: boolean) =>
  cn(
    "text-balance font-semibold tracking-[-0.03em]",
    wide
      ? "text-[clamp(24px,2.5vw,34px)] leading-[1.16]"
      : "text-[clamp(22px,2vw,26px)] leading-[1.2]",
  );

/*
 * The About section, as a two-row bento: a wide card and a narrow one, then the
 * mirror image. Each card leads with one sentence at heading size and hands its
 * supporting facts to a structure that can be scanned (figures, a list, tokens)
 * instead of a paragraph of small text.
 */
const AboutBento = () => (
  <div className="mt-14 grid grid-cols-1 gap-3 lg:grid-cols-3">
    {/* Track record: wide */}
    <Reveal as="article" className="card min-h-[340px] items-start lg:col-span-2">
      <span className="chip">{trackRecord.label}</span>

      <h3 className={cn(headline(true), "mt-7 max-w-[640px]")}>
        {trackRecord.headline}
      </h3>
      <p className="mt-3.5 max-w-[560px] text-pretty text-[17px] leading-[1.55] text-body">
        {trackRecord.text}
      </p>

      <ul className="mt-auto grid w-full grid-cols-1 gap-x-8 gap-y-5 pt-10 sm:grid-cols-3">
        {trackRecord.facts.map((fact) => (
          <li key={fact.label} className="border-t border-line-strong pt-4">
            <p className="text-[28px] font-semibold leading-none tracking-[-0.035em]">
              {fact.value}
            </p>
            <p className="mt-2 text-[15px] leading-[1.4] text-muted">{fact.label}</p>
          </li>
        ))}
      </ul>
    </Reveal>

    {/* Right now: narrow, dark */}
    <Reveal
      as="article"
      delay={70}
      className="card card-dark min-h-[340px] items-start"
    >
      <span className="chip">
        <span className="size-1.5 animate-blink rounded-full bg-white" />
        {now.label}
      </span>

      <h3 className={cn(headline(false), "mt-7")}>{now.headline}</h3>

      <ul className="mt-auto w-full pt-10">
        {now.items.map((item, index) => {
          const Icon = iconAt(NOW_ICONS, index);
          return (
            <li
              key={item}
              className="flex items-center gap-3.5 border-t border-white/10 py-3.5 text-[16px] leading-[1.35] last:pb-0"
            >
              <span
                aria-hidden="true"
                className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-white/10"
              >
                <Icon size={17} strokeWidth={1.9} />
              </span>
              {item}
            </li>
          );
        })}
      </ul>
    </Reveal>

    {/* Background: narrow */}
    <Reveal as="article" className="card min-h-[320px] items-start">
      <span className="chip">{background.label}</span>

      <h3 className={cn(headline(false), "mt-7")}>{background.headline}</h3>

      <div className="mt-auto flex w-full flex-col gap-4 pt-10">
        <ul className="flex flex-wrap gap-2">
          {background.items.map((item) => (
            <li key={item} className="token gap-2">
              <BadgeCheck size={16} strokeWidth={1.9} aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
        <div className="border-t border-line-strong pt-4">
          <p className="label flex items-center gap-2">
            <Languages size={13} strokeWidth={2} aria-hidden="true" />
            Languages
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {languages.map((language) => (
              <li key={language} className="token">
                {language}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>

    {/* Focus: wide */}
    <Reveal
      as="article"
      delay={70}
      className="card min-h-[320px] items-start lg:col-span-2"
    >
      <span className="chip">{focus.label}</span>

      <h3 className={cn(headline(true), "mt-7 max-w-[640px]")}>
        {focus.headline}
      </h3>

      <ul className="mt-auto grid w-full grid-cols-1 gap-3 pt-10 sm:grid-cols-2">
        {focus.items.map((item, index) => {
          const Icon = iconAt(FOCUS_ICONS, index);
          return (
            <li
              key={item}
              className="flex items-center gap-3.5 rounded-[18px] bg-white p-3.5 pr-5 text-[16px] font-medium leading-[1.35]"
            >
              <span
                aria-hidden="true"
                className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-surface"
              >
                <Icon size={18} strokeWidth={1.9} />
              </span>
              <span className="text-pretty">{item}</span>
            </li>
          );
        })}
      </ul>
    </Reveal>
  </div>
);

export default AboutBento;
