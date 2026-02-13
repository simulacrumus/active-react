import { Check, ChevronsUpDown } from "lucide-react";
import { useSchedules } from "@/hooks/useSchedules";

import { useTranslation } from "react-i18next";
import { Field, FieldLabel } from "../ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Command, CommandGroup, CommandItem, CommandList } from "../ui/command";
import { useState } from "react";
import type { ScheduleSort } from "@/types";
import { cn } from "@/lib/utils";
import { useLocation } from "@/hooks/useLocation";

export default function ScheduleSort() {
  const { t } = useTranslation();
  const { sort, setSelectedSort, sortOptions } = useSchedules();
  const {} = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (item: ScheduleSort): void => {
    setSelectedSort(item);
    setIsOpen(false);
  };

  return (
    <Field className="w-full pt-3">
      <FieldLabel>{t("common.sort")}</FieldLabel>
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
                sort ? "font-semibold" : "text-muted-foreground",
              )}
            >
              {t(`common.${sort.toLowerCase()}`)}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          }
        ></PopoverTrigger>
        <PopoverContent className="p-0" align="start">
          <Command>
            <CommandList>
              <CommandGroup>
                {sortOptions.map((scheduleSort: ScheduleSort) => (
                  <CommandItem
                    key={scheduleSort}
                    value={scheduleSort}
                    onSelect={() => handleItemClick(scheduleSort)}
                  >
                    <span className="flex-1">
                      {t(`common.${scheduleSort.toLowerCase()}`)}
                    </span>
                    {sort === scheduleSort && (
                      <Check className="ml-2 h-4 w-4" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </Field>
  );
}
