import type { ReactNode } from "react";
import { Check, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

/*
 * Coded illustrations, one per project.
 *
 * These stand in for screenshots. They are drawn in markup rather than shipped
 * as images so they stay sharp at any size and cost no extra requests.
 *
 * They are illustrations, not data: every string and figure inside a mock is
 * invented to suggest what the product does, and the whole tree is hidden from
 * assistive technology. Nothing here should be read as a claim about a
 * project. The factual copy lives in src/data/projects.ts.
 *
 * Greyscale throughout, like the rest of the site.
 */

type Tone = "light" | "dark";

const WINDOW_SHADOW = "shadow-[0_30px_60px_-30px_rgba(0,0,0,0.28)]";

/** A small application window: title bar with three dots, then the body. */
const MockWindow = ({
  title,
  tone = "light",
  children,
}: {
  title: string;
  tone?: Tone;
  children: ReactNode;
}) => {
  const dark = tone === "dark";

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[18px] text-left",
        dark
          ? "bg-[#1b1b1b] text-white ring-1 ring-inset ring-white/10"
          : cn("bg-white text-ink", WINDOW_SHADOW),
      )}
    >
      <div
        className={cn(
          "flex h-9 items-center gap-3 border-b px-3.5",
          dark ? "border-white/10" : "border-line-soft bg-[#fafafa]",
        )}
      >
        <span className="flex shrink-0 gap-[5px]">
          {[0, 1, 2].map((dot) => (
            <span
              key={dot}
              className={cn(
                "size-[9px] rounded-full",
                dark ? "bg-white/20" : "bg-line-strong",
              )}
            />
          ))}
        </span>
        <span
          className={cn(
            "truncate font-mono text-[10.5px] tracking-[0.04em]",
            dark ? "text-white/50" : "text-subtle",
          )}
        >
          {title}
        </span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
};

/** A grey bar standing in for a line of text. */
const Bar = ({ className }: { className?: string }) => (
  <span className={cn("block h-1.5 rounded-full bg-line", className)} />
);

/* ---------------------------------------------------- AI Interview Platform */

const SCORES = [
  { label: "Correctness", width: "86%", delay: "0s" },
  { label: "Depth", width: "68%", delay: "0.25s" },
  { label: "Clarity", width: "92%", delay: "0.5s" },
];

const InterviewMock = () => (
  <MockWindow title="interview / session">
    <div className="flex items-center justify-between gap-3">
      <span className="chip">Generated question</span>
      <span className="flex items-center gap-1.5 font-mono text-[10.5px] tracking-[0.04em] text-subtle">
        <span className="size-1.5 animate-blink rounded-full bg-ink" />
        scoring
      </span>
    </div>

    <p className="mt-3 text-[14px] font-medium leading-[1.45] tracking-[-0.01em]">
      How would you keep a cache consistent with its source of truth under
      concurrent writes?
    </p>

    <div className="relative mt-3.5 overflow-hidden rounded-xl bg-surface p-3">
      <span className="label">Candidate response</span>
      <div className="mt-2.5 space-y-2">
        <Bar className="w-[94%] bg-line-strong" />
        <Bar className="w-[81%] bg-line-strong" />
        <Bar className="w-[58%] bg-line-strong" />
      </div>
      <span className="absolute inset-y-0 left-0 w-[30%] animate-sweep bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.75),transparent)]" />
    </div>

    <div className="mt-3.5 space-y-2.5">
      {SCORES.map((score) => (
        <div key={score.label} className="flex items-center gap-3">
          <span className="w-[82px] shrink-0 text-[11.5px] font-medium text-body">
            {score.label}
          </span>
          <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
            <span className="block h-full" style={{ width: score.width }}>
              <span
                className="block h-full origin-left animate-fill rounded-full bg-ink"
                style={{ animationDelay: score.delay }}
              />
            </span>
          </span>
        </div>
      ))}
    </div>
  </MockWindow>
);

/* ------------------------------------------------------------------ DocRAG */

const FILES = ["handbook.pdf", "policy.pdf", "terms.pdf"];

const EXCHANGES = [
  {
    question: "What is the notice period?",
    answer: "Thirty days, given in writing.",
    source: "handbook.pdf, p. 12",
  },
  {
    question: "Who approves remote work?",
    answer: "Your line manager, case by case.",
    source: "policy.pdf, p. 3",
  },
];

/** `detailed` adds a second exchange and the input row, for the large tile. */
const DocRagMock = ({ detailed }: { detailed: boolean }) => (
  <MockWindow title="docrag / contracts">
    <div className="flex gap-3">
      <ul className="hidden w-[108px] shrink-0 flex-col gap-1.5 min-[420px]:flex">
        {FILES.map((file, index) => (
          <li
            key={file}
            className={cn(
              "flex items-center gap-2 rounded-lg px-2 py-1.5 text-[11.5px] font-medium",
              index === 0 ? "bg-surface text-ink" : "text-subtle",
            )}
          >
            <FileText size={12} strokeWidth={2} className="shrink-0" />
            <span className="truncate">{file}</span>
          </li>
        ))}
      </ul>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        {EXCHANGES.slice(0, detailed ? 2 : 1).map((exchange) => (
          <div key={exchange.question} className="flex flex-col gap-2">
            <p className="ml-auto max-w-[88%] rounded-2xl rounded-br-md bg-ink px-3 py-2 text-[12.5px] leading-[1.4] text-white">
              {exchange.question}
            </p>
            <div className="max-w-[94%] self-start rounded-2xl rounded-bl-md bg-surface px-3 py-2 text-[12.5px] leading-[1.45]">
              {exchange.answer}
              <span className="mt-1.5 flex items-center gap-1 text-[10.5px] text-subtle">
                <FileText size={10} strokeWidth={2} className="shrink-0" />
                {exchange.source}
              </span>
            </div>
          </div>
        ))}

        {detailed && (
          <div className="mt-2 flex h-9 items-center rounded-full border border-line px-3.5 text-[12px] text-faint">
            Ask about these documents
            <span className="ml-0.5 h-3.5 w-px animate-blink bg-ink" />
          </div>
        )}
      </div>
    </div>
  </MockWindow>
);

/* ---------------------------------------------------------------- Invoicer */

const LINES = [
  { width: "w-[64%]", amount: "1,200.00" },
  { width: "w-[48%]", amount: "500.00" },
  { width: "w-[56%]", amount: "300.00" },
];

const InvoiceMock = () => (
  <div className={cn("rounded-[16px] bg-white p-4 text-left text-ink", WINDOW_SHADOW)}>
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-[13px] font-semibold tracking-[-0.01em]">Invoice</span>
      <span className="font-mono text-[10.5px] text-subtle">#0042</span>
    </div>

    <div className="mt-3">
      {LINES.map((line) => (
        <div
          key={line.amount}
          className="flex items-center justify-between gap-3 border-b border-line-soft py-2"
        >
          <Bar className={line.width} />
          <span className="shrink-0 font-mono text-[10.5px] text-body">
            {line.amount}
          </span>
        </div>
      ))}
    </div>

    <div className="mt-2.5 flex items-center justify-between font-mono text-[10.5px] text-subtle">
      <span>Tax 19%</span>
      <span>380.00</span>
    </div>
    <div className="mt-1.5 flex items-baseline justify-between">
      <span className="text-[12px] font-semibold">Total</span>
      <span className="text-[15px] font-semibold tracking-[-0.02em]">€2,380.00</span>
    </div>

    <span className="chip mt-3.5">
      <Check size={11} strokeWidth={2.6} />
      PDF saved
    </span>
  </div>
);

/* ---------------------------------------------------------------- LumoChat */

const ChatMock = ({ tone }: { tone: Tone }) => {
  const dark = tone === "dark";

  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-[16px] p-3.5 text-left text-[12.5px] leading-[1.4]",
        dark ? "bg-white/[0.07] text-white" : cn("bg-white text-ink", WINDOW_SHADOW),
      )}
    >
      <div className="flex items-center gap-2 pb-1">
        <span
          className={cn(
            "relative flex size-6 items-center justify-center rounded-full text-[10px] font-semibold",
            dark ? "bg-white/15" : "bg-surface",
          )}
        >
          L
          <span
            className={cn(
              "absolute -bottom-px -right-px size-2 rounded-full ring-2",
              dark ? "bg-white ring-[#1f1f1f]" : "bg-ink ring-white",
            )}
          />
        </span>
        <span className="font-medium">Lena</span>
        <span
          className={cn(
            "font-mono text-[10px] tracking-[0.04em]",
            dark ? "text-white/50" : "text-subtle",
          )}
        >
          online
        </span>
      </div>

      <p
        className={cn(
          "max-w-[88%] self-start rounded-2xl rounded-bl-md px-3 py-2",
          dark ? "bg-white/10" : "bg-surface",
        )}
      >
        Did the upload go through?
      </p>
      <p
        className={cn(
          "max-w-[88%] self-end rounded-2xl rounded-br-md px-3 py-2",
          dark ? "bg-white text-ink" : "bg-ink text-white",
        )}
      >
        Yes, compressed and sent.
      </p>
      <span
        className={cn(
          "flex items-center gap-1 self-start rounded-2xl rounded-bl-md px-3 py-2.5",
          dark ? "bg-white/10" : "bg-surface",
        )}
      >
        {["0s", "0.15s", "0.3s"].map((delay) => (
          <span
            key={delay}
            className={cn(
              "size-[5px] animate-typing rounded-full",
              dark ? "bg-white" : "bg-ink",
            )}
            style={{ animationDelay: delay }}
          />
        ))}
      </span>
    </div>
  );
};

/* ----------------------------------------- Expression-based recommendation */

const EQ = ["0s", "0.2s", "0.4s", "0.1s"];

const ExpressionMock = () => (
  <div
    className={cn(
      "mx-auto w-[176px] rounded-[26px] bg-white p-2 text-left text-ink",
      WINDOW_SHADOW,
    )}
  >
    <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-[19px] bg-surface">
      {/* Face, then the detection frame around it. */}
      <span className="relative flex size-[74px] items-center justify-center rounded-full border-2 border-line-strong">
        <span className="absolute left-[19px] top-[25px] size-[5px] rounded-full bg-faint" />
        <span className="absolute right-[19px] top-[25px] size-[5px] rounded-full bg-faint" />
        <span className="absolute bottom-[17px] h-[9px] w-[26px] rounded-b-full border-b-2 border-faint" />
      </span>
      <span className="absolute inset-[22%_18%] rounded-[10px] border border-dashed border-ink/40" />
      <span className="chip absolute bottom-2 left-2 h-5 bg-white px-2 text-[9.5px]">
        happy
      </span>
    </div>

    <div className="flex items-center gap-2.5 px-1.5 pb-1.5 pt-2.5">
      <span className="flex h-5 items-end gap-[3px]">
        {EQ.map((delay) => (
          <span
            key={delay}
            className="h-full w-[3px] origin-bottom animate-eq rounded-full bg-ink"
            style={{ animationDelay: delay }}
          />
        ))}
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-1.5">
        <Bar className="w-[80%] bg-line-strong" />
        <Bar className="w-[52%]" />
      </span>
    </div>
  </div>
);

/* ------------------------------------------------------------------ lookup */

interface MockOptions {
  tone: Tone;
  detailed: boolean;
}

/** Keyed by Project.id. A project with no entry simply renders no visual. */
const MOCKS: Record<string, (options: MockOptions) => ReactNode> = {
  "ai-interview-platform": () => <InterviewMock />,
  docrag: ({ detailed }) => <DocRagMock detailed={detailed} />,
  invoicer: () => <InvoiceMock />,
  lumochat: ({ tone }) => <ChatMock tone={tone} />,
  "expression-music-recommendation": () => <ExpressionMock />,
};

const ProjectMock = ({
  id,
  tone = "light",
  detailed = false,
  framed = false,
  className,
}: {
  id: string;
  /** The surface the mock sits on. Only LumoChat has a dark variant. */
  tone?: Tone;
  /**
   * Ask for the fuller version of the illustration, where one exists. For
   * slots with room to fill: the large home page tile and the project page.
   */
  detailed?: boolean;
  /**
   * Stand the mock on its own grey panel, for use directly on the white page.
   * Inside a card, which is already that grey, leave this off.
   */
  framed?: boolean;
  className?: string;
}) => {
  const render = MOCKS[id];
  if (!render) return null;

  const mock = (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none select-none", className)}
    >
      {render({ tone, detailed })}
    </div>
  );

  return framed ? (
    <div className="rounded-[28px] bg-surface p-[clamp(20px,4vw,48px)]">{mock}</div>
  ) : (
    mock
  );
};

export default ProjectMock;
