import { useTranslation } from "react-i18next";
import { useSchedules } from "../../../hooks/useSchedules";
import { Filter } from "../../common/filter";
import type { HourOfDay } from "@/types";

export default function HourFilter() {
  const { t } = useTranslation();
  const { filters, filterOptions, setSelectedHour } = useSchedules();

  return (
    <Filter
      label={t("common.hour")}
      availableItems={
        filterOptions.hoursOfDay
          ? filterOptions.hoursOfDay.map((hour: HourOfDay) => ({
              ...hour,
              title: t(`hourOfDay.${hour.title}`),
            }))
          : []
      }
      selected={filters.selectedHour}
      onSelectionChange={(item) => setSelectedHour(item as HourOfDay | null)}
      placeholder={`${t("common.select")} ${t("common.hour")}`}
      inputPlaceholder={t("common.search")}
      getKey={(item) => String(item.id)}
      getLabel={(item) => item.title}
      onClear={() => {
        setSelectedHour(null);
      }}
    />
  );
}
