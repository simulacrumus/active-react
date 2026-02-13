import { useState, type JSX } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface DropdownProps<T> {
  availableItems: T[];
  disabledItems?: T[];
  selected?: T | null;
  onSelectionChange: (item: T | null) => void;
  placeholder?: string;
  inputPlaceholder?: string;
  getKey: (item: T) => string | number;
  getLabel: (item: T) => string;
}

export function Dropdown<T>({
  availableItems = [],
  disabledItems = [],
  selected = null,
  onSelectionChange,
  placeholder = "Select an option",
  inputPlaceholder = "Search...",
  getKey,
  getLabel,
}: DropdownProps<T>): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredKey, setHoveredKey] = useState<string | number | null>(null);
  const { t } = useTranslation();

  const handleItemClick = (item: T): void => {
    const newSelection =
      selected && getKey(selected) === getKey(item) ? null : item;
    onSelectionChange(newSelection);
    setIsOpen(false);
  };

  const getButtonText = (): string => {
    if (!selected) return placeholder;
    const found =
      availableItems.find((item) => getKey(item) === getKey(selected)) ??
      disabledItems?.find((item) => getKey(item) === getKey(selected));
    return found ? getLabel(found) : placeholder;
  };

  const allItems = [...availableItems, ...(disabledItems || [])];

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger
        className="w-full"
        render={
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isOpen}
            className={cn(
              "w-full justify-between",
              selected ? "font-semibold" : "text-muted-foreground",
            )}
          >
            {getButtonText()}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        }
      ></PopoverTrigger>
      <PopoverContent className="p-0" align="start">
        <Command>
          <CommandInput placeholder={inputPlaceholder} />
          <CommandList>
            <CommandEmpty>{t("common.noResultsFound")}</CommandEmpty>
            <CommandGroup>
              {allItems.map((item) => {
                const key = getKey(item);
                const label = getLabel(item);
                const isSelected = selected && getKey(selected) === key;
                const isDisabled = disabledItems?.some(
                  (d) => getKey(d) === key,
                );

                return (
                  <CommandItem
                    key={key}
                    value={label}
                    onSelect={() => handleItemClick(item)}
                    onMouseEnter={() => setHoveredKey(key)}
                    onMouseLeave={() => setHoveredKey(null)}
                    className={cn(
                      isDisabled ? "text-muted-foreground" : "text-foreground",
                    )}
                  >
                    <span className="flex-1">{label}</span>
                    {isSelected &&
                      (hoveredKey === key ? (
                        <X className="ml-2 h-4 w-4" />
                      ) : (
                        <Check className="ml-2 h-4 w-4" />
                      ))}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
