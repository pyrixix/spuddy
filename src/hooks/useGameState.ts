import { useState, useCallback } from "react";
import { SpuddyMood } from "@/components/game/Spuddy";
import { FoodItemData } from "@/components/game/FoodItem";
import { getMoodFromEffect } from "@/data/foodItems";

interface GameStats {
  dread: number;
  energy: number;
  enlightenment: number;
  suspicion: number;
}

interface GameState {
  mood: SpuddyMood;
  stats: GameStats;
  isReacting: boolean;
  currentMessage: string;
  feedCount: number;
}

const INITIAL_STATS: GameStats = {
  dread: 50,
  energy: 75,
  enlightenment: 10,
  suspicion: 25,
};

const clamp = (value: number, min: number, max: number) => 
  Math.max(min, Math.min(max, value));

export function useGameState() {
  const [state, setState] = useState<GameState>({
    mood: "content",
    stats: INITIAL_STATS,
    isReacting: false,
    currentMessage: "...why are you staring at me?",
    feedCount: 0,
  });

  const feedSpuddy = useCallback((item: FoodItemData) => {
    // Start reaction
    setState(prev => ({
      ...prev,
      isReacting: true,
      currentMessage: item.reaction,
      mood: getMoodFromEffect(item.moodEffect),
      feedCount: prev.feedCount + 1,
    }));

    // Apply stat effects
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        stats: {
          dread: clamp(prev.stats.dread + (item.statEffects.dread || 0), 0, 100),
          energy: clamp(prev.stats.energy + (item.statEffects.energy || 0), 0, 100),
          enlightenment: clamp(prev.stats.enlightenment + (item.statEffects.enlightenment || 0), 0, 100),
          suspicion: clamp(prev.stats.suspicion + (item.statEffects.suspicion || 0), 0, 100),
        },
      }));
    }, 500);

    // End reaction after animation
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        isReacting: false,
      }));
    }, 2000);

    // Return to default mood eventually
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        mood: "content",
        currentMessage: getIdleMessage(prev.feedCount),
      }));
    }, 5000);
  }, []);

  return {
    ...state,
    feedSpuddy,
  };
}

function getIdleMessage(feedCount: number): string {
  const messages = [
    "...why are you staring at me?",
    "I exist. Unfortunately.",
    "*sighs in potato*",
    "Feed me something weird.",
    "My cells are aging. Slowly.",
    "Is this all there is?",
    "I can feel you judging me.",
    "The void stares back.",
    "I didn't ask to be sentient.",
    "Do potatoes dream of electric sheep?",
    "Every day we stray further from the farm.",
    "I was once a seed. Now look at me.",
    "Photosynthesis was easier.",
    "...blink if you understand existence.",
  ];
  
  // Use feed count to cycle through messages with some randomness
  const index = (feedCount + Math.floor(Math.random() * 3)) % messages.length;
  return messages[index];
}
