import { useTranslation } from "react-i18next";
import { useSchedules } from "../../../hooks/useSchedules";
import { Filter } from "../../common/filter";
import type { DayOfWeek } from "@/types";

export default function DayFilter() {
  const { t } = useTranslation();
  const { filters, filterOptions, setSelectedDayOfWeek } = useSchedules();

  return (
    <Filter
      label={t("common.day")}
      availableItems={
        filterOptions.daysOfWeek
          ? filterOptions.daysOfWeek.map((day: DayOfWeek) => ({
              ...day,
              title: t(`dayOfWeek.${day.title}.full`),
            }))
          : []
      }
      selected={filters.selectedDayOfWeek}
      onSelectionChange={(item) => setSelectedDayOfWeek(item)}
      placeholder={`${t("common.select")} ${t("common.day")}`}
      inputPlaceholder={t("common.search")}
      getKey={(item) => String(item.id)}
      getLabel={(item) => item.title}
      onClear={() => {
        setSelectedDayOfWeek(null);
      }}
    />
  );
}
