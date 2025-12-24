import { cn } from "@/lib/utils";

export type SpuddyMood = 
  | "content" 
  | "anxious" 
  | "ecstatic" 
  | "existential" 
  | "suspicious" 
  | "enlightened"
  | "disgusted"
  | "confused"
  | "ascended";

interface SpuddyProps {
  mood: SpuddyMood;
  isReacting: boolean;
  className?: string;
}

const moodExpressions: Record<SpuddyMood, { leftEye: string; rightEye: string; mouth: string }> = {
  content: {
    leftEye: "●",
    rightEye: "●",
    mouth: "‿",
  },
  anxious: {
    leftEye: "◉",
    rightEye: "◉",
    mouth: "~",
  },
  ecstatic: {
    leftEye: "★",
    rightEye: "★",
    mouth: "D",
  },
  existential: {
    leftEye: "◯",
    rightEye: "◯",
    mouth: "—",
  },
  suspicious: {
    leftEye: "◑",
    rightEye: "◐",
    mouth: "︵",
  },
  enlightened: {
    leftEye: "✧",
    rightEye: "✧",
    mouth: "◡",
  },
  disgusted: {
    leftEye: "×",
    rightEye: "×",
    mouth: "▽",
  },
  confused: {
    leftEye: "?",
    rightEye: "?",
    mouth: "○",
  },
  ascended: {
    leftEye: "∞",
    rightEye: "∞",
    mouth: "☆",
  },
};

const moodColors: Record<SpuddyMood, string> = {
  content: "bg-spud-body",
  anxious: "bg-spud-body brightness-95",
  ecstatic: "bg-gradient-to-br from-amber-300 to-yellow-400",
  existential: "bg-spud-body saturate-50",
  suspicious: "bg-spud-body hue-rotate-15",
  enlightened: "bg-gradient-to-br from-amber-200 via-violet-300 to-purple-400",
  disgusted: "bg-gradient-to-br from-lime-300 to-emerald-400",
  confused: "bg-spud-body",
  ascended: "bg-gradient-to-br from-pink-300 via-violet-400 to-cyan-400",
};

export function Spuddy({ mood, isReacting, className }: SpuddyProps) {
  const expression = moodExpressions[mood];
  const colorClass = moodColors[mood];

  return (
    <div 
      className={cn(
        "relative select-none",
        !isReacting && "potato-idle",
        isReacting && "chaos-spin",
        className
      )}
    >
      {/* Potato body */}
      <div 
        className={cn(
          "relative w-44 h-52 rounded-[45%_55%_50%_50%/55%_55%_45%_45%] transition-all duration-300",
          colorClass
        )}
        style={{
          boxShadow: `
            inset -12px -12px 24px hsla(30, 40%, 30%, 0.25),
            inset 12px 12px 24px hsla(45, 50%, 85%, 0.35),
            0 8px 32px hsla(260, 30%, 20%, 0.15),
            0 2px 8px hsla(260, 30%, 20%, 0.1)
          `
        }}
      >
        {/* Potato spots */}
        <div className="absolute top-8 left-6 w-3 h-2 rounded-full bg-spud-shadow opacity-30" />
        <div className="absolute top-20 right-8 w-4 h-3 rounded-full bg-spud-shadow opacity-25" />
        <div className="absolute bottom-12 left-10 w-2 h-2 rounded-full bg-spud-shadow opacity-30" />

        {/* Eyes container */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2 flex gap-7">
          {/* Left eye */}
          <div className={cn(
            "text-4xl font-bold text-spud-eye transition-transform duration-100",
            !isReacting && "potato-blink"
          )}>
            {expression.leftEye}
          </div>
          {/* Right eye */}
          <div className={cn(
            "text-4xl font-bold text-spud-eye transition-transform duration-100",
            !isReacting && "potato-blink"
          )}>
            {expression.rightEye}
          </div>
        </div>

        {/* Blush marks for certain moods */}
        {(mood === "ecstatic" || mood === "enlightened") && (
          <>
            <div className="absolute top-[100px] left-4 w-7 h-4 rounded-full bg-spud-blush opacity-50 blur-sm" />
            <div className="absolute top-[100px] right-4 w-7 h-4 rounded-full bg-spud-blush opacity-50 blur-sm" />
          </>
        )}

        {/* Mouth */}
        <div className="absolute top-[115px] left-1/2 -translate-x-1/2 text-3xl font-bold text-spud-eye">
          {expression.mouth}
        </div>

        {/* Sweat drop for anxious */}
        {mood === "anxious" && (
          <div className="absolute -top-2 right-3 text-2xl animate-bounce">💧</div>
        )}

        {/* Sparkles for enlightened/ascended */}
        {(mood === "enlightened" || mood === "ascended") && (
          <>
            <div className="absolute -top-4 left-4 text-xl animate-pulse">✨</div>
            <div className="absolute -top-2 right-6 text-base animate-pulse delay-100">✨</div>
            <div className="absolute top-2 -left-2 text-sm animate-pulse delay-200">✨</div>
          </>
        )}

        {/* Stink lines for disgusted */}
        {mood === "disgusted" && (
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-emerald-500 font-bold text-xl">
            ~〰~
          </div>
        )}

        {/* Question marks for confused */}
        {mood === "confused" && (
          <>
            <div className="absolute -top-6 left-1/3 text-xl font-pixel text-primary animate-bounce">?</div>
            <div className="absolute -top-4 right-1/3 text-base font-pixel text-secondary animate-bounce delay-150">?</div>
          </>
        )}
      </div>

      {/* Shadow underneath */}
      <div 
        className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-36 h-5 rounded-full bg-foreground/10 blur-md"
      />
    </div>
  );
}
import { cn } from "@/lib/utils";

export type SpuddyMood = 
  | "content" 
  | "anxious" 
  | "ecstatic" 
  | "existential" 
  | "suspicious" 
  | "enlightened"
  | "disgusted"
  | "confused"
  | "ascended";

interface SpuddyProps {
  mood: SpuddyMood;
  isReacting: boolean;
  className?: string;
}

const moodExpressions: Record<SpuddyMood, { leftEye: string; rightEye: string; mouth: string }> = {
  content: {
    leftEye: "●",
    rightEye: "●",
    mouth: "‿",
  },
  anxious: {
    leftEye: "◉",
    rightEye: "◉",
    mouth: "~",
  },
  ecstatic: {
    leftEye: "★",
    rightEye: "★",
    mouth: "D",
  },
  existential: {
    leftEye: "◯",
    rightEye: "◯",
    mouth: "—",
  },
  suspicious: {
    leftEye: "◑",
    rightEye: "◐",
    mouth: "︵",
  },
  enlightened: {
    leftEye: "✧",
    rightEye: "✧",
    mouth: "◡",
  },
  disgusted: {
    leftEye: "×",
    rightEye: "×",
    mouth: "▽",
  },
  confused: {
    leftEye: "?",
    rightEye: "?",
    mouth: "○",
  },
  ascended: {
    leftEye: "∞",
    rightEye: "∞",
    mouth: "☆",
  },
};

const moodColors: Record<SpuddyMood, string> = {
  content: "bg-spud-body",
  anxious: "bg-spud-body brightness-95",
  ecstatic: "bg-gradient-to-br from-amber-300 to-yellow-400",
  existential: "bg-spud-body saturate-50",
  suspicious: "bg-spud-body hue-rotate-15",
  enlightened: "bg-gradient-to-br from-amber-200 via-violet-300 to-purple-400",
  disgusted: "bg-gradient-to-br from-lime-300 to-emerald-400",
  confused: "bg-spud-body",
  ascended: "bg-gradient-to-br from-pink-300 via-violet-400 to-cyan-400",
};

export function Spuddy({ mood, isReacting, className }: SpuddyProps) {
  const expression = moodExpressions[mood];
  const colorClass = moodColors[mood];

  return (
    <div 
      className={cn(
        "relative select-none",
        !isReacting && "potato-idle",
        isReacting && "chaos-spin",
        className
      )}
    >
      {/* Potato body */}
      <div 
        className={cn(
          "relative w-44 h-52 rounded-[45%_55%_50%_50%/55%_55%_45%_45%] transition-all duration-300",
          colorClass
        )}
        style={{
          boxShadow: `
            inset -12px -12px 24px hsla(30, 40%, 30%, 0.25),
            inset 12px 12px 24px hsla(45, 50%, 85%, 0.35),
            0 8px 32px hsla(260, 30%, 20%, 0.15),
            0 2px 8px hsla(260, 30%, 20%, 0.1)
          `
        }}
      >
        {/* Potato spots */}
        <div className="absolute top-8 left-6 w-3 h-2 rounded-full bg-spud-shadow opacity-30" />
        <div className="absolute top-20 right-8 w-4 h-3 rounded-full bg-spud-shadow opacity-25" />
        <div className="absolute bottom-12 left-10 w-2 h-2 rounded-full bg-spud-shadow opacity-30" />

        {/* Eyes container */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2 flex gap-7">
          {/* Left eye */}
          <div className={cn(
            "text-4xl font-bold text-spud-eye transition-transform duration-100",
            !isReacting && "potato-blink"
          )}>
            {expression.leftEye}
          </div>
          {/* Right eye */}
          <div className={cn(
            "text-4xl font-bold text-spud-eye transition-transform duration-100",
            !isReacting && "potato-blink"
          )}>
            {expression.rightEye}
          </div>
        </div>

        {/* Blush marks for certain moods */}
        {(mood === "ecstatic" || mood === "enlightened") && (
          <>
            <div className="absolute top-[100px] left-4 w-7 h-4 rounded-full bg-spud-blush opacity-50 blur-sm" />
            <div className="absolute top-[100px] right-4 w-7 h-4 rounded-full bg-spud-blush opacity-50 blur-sm" />
          </>
        )}

        {/* Mouth */}
        <div className="absolute top-[115px] left-1/2 -translate-x-1/2 text-3xl font-bold text-spud-eye">
          {expression.mouth}
        </div>

        {/* Sweat drop for anxious */}
        {mood === "anxious" && (
          <div className="absolute -top-2 right-3 text-2xl animate-bounce">💧</div>
        )}

        {/* Sparkles for enlightened/ascended */}
        {(mood === "enlightened" || mood === "ascended") && (
          <>
            <div className="absolute -top-4 left-4 text-xl animate-pulse">✨</div>
            <div className="absolute -top-2 right-6 text-base animate-pulse delay-100">✨</div>
            <div className="absolute top-2 -left-2 text-sm animate-pulse delay-200">✨</div>
          </>
        )}

        {/* Stink lines for disgusted */}
        {mood === "disgusted" && (
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-emerald-500 font-bold text-xl">
            ~〰~
          </div>
        )}

        {/* Question marks for confused */}
        {mood === "confused" && (
          <>
            <div className="absolute -top-6 left-1/3 text-xl font-pixel text-primary animate-bounce">?</div>
            <div className="absolute -top-4 right-1/3 text-base font-pixel text-secondary animate-bounce delay-150">?</div>
          </>
        )}
      </div>

      {/* Shadow underneath */}
      <div 
        className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-36 h-5 rounded-full bg-foreground/10 blur-md"
      />
    </div>
  );
}
