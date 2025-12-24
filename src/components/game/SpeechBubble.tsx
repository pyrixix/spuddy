import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface SpeechBubbleProps {
  message: string;
  isVisible: boolean;
  className?: string;
}

export function SpeechBubble({ message, isVisible, className }: SpeechBubbleProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!isVisible || !message) {
      setDisplayedText("");
      return;
    }

    setIsTyping(true);
    setDisplayedText("");
    
    let index = 0;
    const interval = setInterval(() => {
      if (index < message.length) {
        setDisplayedText(message.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [message, isVisible]);

  if (!isVisible) return null;

  return (
    <div className={cn("speech-bubble max-w-xs min-h-[60px]", className)}>
      <p className="font-retro text-xl leading-relaxed text-foreground">
        {displayedText}
        {isTyping && <span className="animate-pulse text-primary">▌</span>}
      </p>
    </div>
  );
}
