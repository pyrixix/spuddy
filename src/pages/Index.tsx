import { Spuddy } from "@/components/game/Spuddy";
import { SpeechBubble } from "@/components/game/SpeechBubble";
import { StatsPanel } from "@/components/game/StatsPanel";
import { FoodInventory } from "@/components/game/FoodInventory";
import { useGameState } from "@/hooks/useGameState";
import { foodItems } from "@/data/foodItems";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const Index = () => {
  const { mood, stats, isReacting, currentMessage, feedSpuddy, feedCount } = useGameState();
  const [screenEffect, setScreenEffect] = useState<string>("");

  // Apply screen effects when reacting
  useEffect(() => {
    if (isReacting) {
      const effects = ["shake", "flash", "glitch"];
      const randomEffect = effects[Math.floor(Math.random() * effects.length)];
      setScreenEffect(randomEffect);
      
      setTimeout(() => setScreenEffect(""), 500);
    }
  }, [isReacting, feedCount]);

  const statsData = [
    { 
      name: "Existential Dread", 
      value: stats.dread, 
      maxValue: 100,
      gradient: "from-red-400 to-rose-500"
    },
    { 
      name: "Spud Energy", 
      value: stats.energy, 
      maxValue: 100,
      gradient: "from-emerald-400 to-teal-500"
    },
    { 
      name: "Enlightenment", 
      value: stats.enlightenment, 
      maxValue: 100,
      gradient: "from-violet-400 to-purple-500"
    },
    { 
      name: "Suspicion", 
      value: stats.suspicion, 
      maxValue: 100,
      gradient: "from-amber-400 to-orange-500"
    },
  ];

  return (
    <div className={cn(
      "min-h-screen bg-background p-4 md:p-8 overflow-hidden",
      screenEffect
    )}>
      {/* CRT Scanline overlay */}
      <div className="crt-overlay" />

      {/* Header */}
      <header className="text-center mb-8 md:mb-12">
        <h1 className="font-pixel text-xl md:text-3xl text-primary mb-3 tracking-wide">
          🥔 SPUDDY 🥔
        </h1>
        <p className="font-retro text-xl md:text-2xl text-muted-foreground">
          The Sentient Potato Simulator v1.0
        </p>
      </header>

      {/* Main game area */}
      <div className="max-w-5xl mx-auto grid lg:grid-cols-[280px_1fr_320px] gap-6 md:gap-8 items-start">
        
        {/* Stats Panel - Left */}
        <div className="order-2 lg:order-1 space-y-4">
          <StatsPanel stats={statsData} />
          
          {/* Feed counter */}
          <div className="feed-counter">
            <span>TIMES FED</span>
            <span className="text-foreground font-bold">{feedCount}</span>
          </div>
        </div>

        {/* Spuddy - Center */}
        <div className="order-1 lg:order-2 flex flex-col items-center gap-6 py-4">
          <SpeechBubble 
            message={currentMessage} 
            isVisible={true}
          />
          
          <Spuddy 
            mood={mood} 
            isReacting={isReacting}
          />

          {/* Current mood indicator */}
          <div className="mood-badge">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Mood: {mood}
          </div>
        </div>

        {/* Food Inventory - Right */}
        <div className="order-3">
          <FoodInventory 
            items={foodItems}
            onFeed={feedSpuddy}
            disabled={isReacting}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center mt-12 font-retro text-lg text-muted-foreground">
        <p>Keep Spuddy alive... or don't. They'll judge you either way.</p>
      </footer>
    </div>
  );
};

export default Index;
