import { useTranslation } from "react-i18next";
import { useSchedules } from "../../../hooks/useSchedules";
import { Filter } from "../../common/filter";
import type { Activity } from "@/types";

export default function ActivityFilter() {
  const { t } = useTranslation();
  const { setSelectedActivity, filters, filterOptions } = useSchedules();
  const disabledItems = filterOptions.initialActivities.filter(
    (initialActivity: Activity) =>
      !filterOptions.activities.some(
        (activity: Activity) => activity.id === initialActivity.id,
      ),
  );

  return (
    <Filter
      label={t("common.activity")}
      availableItems={filterOptions.activities}
      disabledItems={disabledItems}
      selected={filters.selectedActivity}
      onSelectionChange={(item) => setSelectedActivity(item as Activity | null)}
      placeholder={`${t("common.select")} ${t("common.activity")}`}
      inputPlaceholder={t("common.search")}
      getKey={(item) => String(item.id)}
      getLabel={(item) => item.title}
      onClear={() => {
        setSelectedActivity(null);
      }}
    />
  );
}
