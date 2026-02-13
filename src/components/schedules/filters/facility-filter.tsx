import { useTranslation } from "react-i18next";
import { useSchedules } from "../../../hooks/useSchedules";
import { Filter } from "../../common/filter";
import type { Facility } from "@/types";

export default function FacilityFilter() {
  const { t } = useTranslation();
  const { setSelectedFacility, filters, filterOptions } = useSchedules();

  const disabledItems = filterOptions.initialFacilities.filter(
    (initialFacility: Facility) =>
      !filterOptions.facilities.some(
        (facility: Facility) => facility.id === initialFacility.id,
      ),
  );

  return (
    <Filter
      label={t("common.facility")}
      availableItems={filterOptions.facilities}
      disabledItems={disabledItems}
      selected={filters.selectedFacility}
      onSelectionChange={(item) => setSelectedFacility(item)}
      placeholder={`${t("common.select")} ${t("common.facility")}`}
      inputPlaceholder={t("common.search")}
      getKey={(item) => String(item.id)}
      getLabel={(item) => item.title}
      onClear={() => {
        setSelectedFacility(null);
      }}
    />
  );
}
