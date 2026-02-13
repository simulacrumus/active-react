import { CircleX } from "lucide-react";
import { FieldLabel } from "../ui/field";
import { Button } from "../ui/button";
import { Dropdown } from "./dropdown";
import { cn } from "@/lib/utils";
import type { Selectable } from "@/types/Selectable";

export interface FilterProps<T extends Selectable> {
  label: string;
  availableItems: T[];
  disabledItems?: T[];
  selected?: T | null;
  onSelectionChange: (item: T | null) => void;
  placeholder?: string;
  inputPlaceholder?: string;
  getKey: (item: T) => string | number;
  getLabel: (item: T) => string;
  onClear?: () => void;
}

export function Filter<T extends Selectable>({
  label,
  availableItems,
  disabledItems,
  selected,
  onSelectionChange,
  placeholder,
  inputPlaceholder,
  getKey,
  getLabel,
  onClear,
}: FilterProps<T>) {
  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-between">
        <FieldLabel>{label}</FieldLabel>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={cn(
            "text-muted-foreground hover:text-foreground transition-opacity",
            selected === null ? "opacity-0 pointer-events-none" : "opacity-100",
          )}
          onClick={onClear}
          aria-label={label}
        >
          <CircleX />
        </Button>
      </div>
      <Dropdown
        availableItems={availableItems}
        disabledItems={disabledItems}
        selected={selected}
        onSelectionChange={onSelectionChange}
        placeholder={placeholder}
        inputPlaceholder={inputPlaceholder}
        getKey={getKey}
        getLabel={getLabel}
      />
      {/* <FilterComboBox
        availableItems={availableItems}
        disabledItems={disabledItems}
        selected={selected}
        onSelectionChange={onSelectionChange}
        placeholder={placeholder}
        inputPlaceholder={inputPlaceholder}
        getKey={getKey}
        getLabel={getLabel}
      /> */}
    </div>
  );
}
