import { useTranslation } from "react-i18next";
import { useSchedules } from "../../hooks/useSchedules";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FacilityFilter from "./filters/facility-filter";
import ActivityFilter from "./filters/activity-filter";
import DayFilter from "./filters/day-filter";
import HourFilter from "./filters/hour-filter";
import { Signature } from "../common/signature";
import ScheduleSort from "./sort";

export default function ScheduleFilters() {
  const { t } = useTranslation();
  const {
    isFiltersChanged,
    isSortChanged,
    applyFilters,
    isAnyFilterApplied,
    isAnyTemporaryFilterApplied,
    resetFilters,
  } = useSchedules();

  const desktop = (
    <Card className="w-full max-w-lg mt-6">
      <CardHeader>
        <CardTitle>{t("common.filters")}</CardTitle>
        {/* <CardDescription>{t("common.filter.desc")}</CardDescription> */}
      </CardHeader>
      <CardContent>
        <ActivityFilter />
        <FacilityFilter />
        <DayFilter />
        <HourFilter />
        <ScheduleSort />
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          variant={"default"}
          className="w-full"
          disabled={isFiltersChanged && isSortChanged}
          onClick={applyFilters}
        >
          {t("common.apply")}
        </Button>
        <Button
          className="w-full"
          variant="ghost"
          onClick={resetFilters}
          disabled={!isAnyFilterApplied()}
        >
          {t("common.reset")}
        </Button>
      </CardFooter>
    </Card>
  );
  const mobile = (
    <div className="space-y-2">
      <ActivityFilter />
      <FacilityFilter />
      <DayFilter />
      <HourFilter />
      <ScheduleSort />
      <div className="space-y-2 mt-6">
        <Button
          variant={"default"}
          className="w-full"
          disabled={isFiltersChanged && isSortChanged}
          onClick={applyFilters}
        >
          {t("common.apply")}
        </Button>
        <Button
          className="w-full"
          variant="ghost"
          onClick={resetFilters}
          disabled={!isAnyTemporaryFilterApplied()}
        >
          {t("common.reset")}
        </Button>
      </div>
    </div>
  );
  return (
    <>
      <div className="hidden md:block">{desktop}</div>
      <div className="block md:hidden">{mobile}</div>
      <Signature />
    </>
  );
}
