import { cn } from "@/lib/utils";
import { FoodItem, FoodItemData } from "./FoodItem";
import { useState } from "react";

interface FoodInventoryProps {
  items: FoodItemData[];
  onFeed: (item: FoodItemData) => void;
  disabled?: boolean;
  className?: string;
}

const categoryLabels: Record<FoodItemData["category"], { label: string; emoji: string }> = {
  office: { label: "Office", emoji: "💼" },
  abstract: { label: "Abstract", emoji: "🌀" },
  cursed: { label: "Cursed", emoji: "☠️" },
  nostalgic: { label: "Retro", emoji: "📼" },
};

export function FoodInventory({ items, onFeed, disabled, className }: FoodInventoryProps) {
  const [activeCategory, setActiveCategory] = useState<FoodItemData["category"]>("office");
  
  const categories: FoodItemData["category"][] = ["office", "abstract", "cursed", "nostalgic"];
  const filteredItems = items.filter(item => item.category === activeCategory);

  return (
    <div className={cn("glass-panel", className)}>
      <div className="panel-header">
        <span className="text-lg">🍽️</span>
        <span className="panel-title">Feed Spuddy</span>
      </div>
      
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "pill-button text-sm",
              activeCategory === cat && "active"
            )}
          >
            {categoryLabels[cat].emoji} {categoryLabels[cat].label}
          </button>
        ))}
      </div>

      {/* Food items grid */}
      <div className="grid grid-cols-3 gap-3 max-h-64 overflow-y-auto p-1">
        {filteredItems.map((item) => (
          <FoodItem
            key={item.id}
            item={item}
            onClick={onFeed}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}
