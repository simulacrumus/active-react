import { useTranslation } from "react-i18next";
import ScheduleItem from "./item";
import ScheduleFilters from "./filters";
import MobileFiltersButton from "../common/mobile-filters-button";
import { useSchedules } from "../../hooks/useSchedules";
import { EmptyOutline } from "../common/empty";
import { ItemGroup } from "../ui/item";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { Separator } from "../ui/separator";

export default function ScheduleResults() {
  const { t } = useTranslation();

  const {
    schedules,
    isLoadingNextPageSchedules,
    error,
    hasMoreSchedules,
    isLoadingSchedules,
    loadMoreSchedules,
  } = useSchedules();

  const sentinelRef = useInfiniteScroll({
    onLoadMore: loadMoreSchedules,
    hasMore: hasMoreSchedules,
    isLoading: isLoadingNextPageSchedules,
    threshold: 200,
  });

  if (isLoadingSchedules) {
    return (
      <div className="flex justify-center py-6">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-300" />
      </div>
    );
  }

  if (error) {
    return (
      <EmptyOutline title={error} description={t("schedule.empty.desc")} />
    );
  }

  return (
    <div className="space-y-4 md:rounded-xl md:bg-card md:border">
      <div className="flex justify-between gap-2">
        <div className="flex w-full items-end justify-between gap-2">
          <h4 className="md:hidden scroll-m-20 font-semibold tracking-tight">
            {t("common.schedules")}
          </h4>
          <MobileFiltersButton children={<ScheduleFilters />} />
        </div>
      </div>
      {schedules.length === 0 && !isLoadingSchedules && (
        <EmptyOutline
          title={t("schedule.empty.title")}
          description={t("schedule.empty.desc")}
        />
      )}
      <ItemGroup className="gap-0">
        {schedules.map((schedule) => (
          <div key={schedule.id}>
            <ScheduleItem key={schedule.id} schedule={schedule} />
            <Separator />
          </div>
        ))}
      </ItemGroup>
      {isLoadingNextPageSchedules && (
        <div className="flex justify-center py-6">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-300" />
        </div>
      )}
      {!hasMoreSchedules && schedules.length > 0 && (
        <div className="text-center text-sm py-4">
          <span>{t("common.caughtAll")}</span>
        </div>
      )}
      <div ref={sentinelRef} className="h-4" />
    </div>
  );
}
