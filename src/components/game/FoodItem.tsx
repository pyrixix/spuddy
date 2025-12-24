import { cn } from "@/lib/utils";

export interface FoodItemData {
  id: string;
  name: string;
  emoji: string;
  category: "office" | "abstract" | "cursed" | "nostalgic";
  reaction: string;
  moodEffect: string;
  statEffects: {
    dread?: number;
    energy?: number;
    enlightenment?: number;
    suspicion?: number;
  };
}

interface FoodItemProps {
  item: FoodItemData;
  onClick: (item: FoodItemData) => void;
  disabled?: boolean;
  className?: string;
}

export function FoodItem({ item, onClick, disabled, className }: FoodItemProps) {
  return (
    <button
      onClick={() => onClick(item)}
      disabled={disabled}
      className={cn(
        "food-card",
        `category-${item.category}`,
        className
      )}
    >
      <span className="text-3xl float">{item.emoji}</span>
      <span className="font-retro text-sm text-center leading-tight text-muted-foreground">
        {item.name}
      </span>
    </button>
  );
}
