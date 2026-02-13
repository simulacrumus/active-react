import {
  Item,
  ItemContent,
  ItemTitle,
  ItemDescription,
} from "@/components/ui/item";
import { DAYS_OF_WEEK } from "@/constants/filters";
import { useLocation } from "@/hooks/useLocation";
import type { Schedule } from "@/types/Schedule";
import { MapPinIcon, ClockIcon, Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ScheduleItemProps {
  schedule: Schedule;
}

export default function ScheduleItem({ schedule }: ScheduleItemProps) {
  const { calculateDistance } = useLocation();
  const { t, i18n } = useTranslation();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(
      i18n.language === "fr" || i18n.language === "fr-CA" ? "fr-CA" : "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      },
    );
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const h = parseInt(hours);
    const locale = i18n.language;

    if (locale === "fr" || locale === "fr-CA") {
      return minutes === "00" ? `${h} h` : `${h} h ${minutes}`;
    } else {
      const ampm = h >= 12 ? "PM" : "AM";
      const hour12 = h % 12 || 12;
      return `${hour12}:${minutes} ${ampm}`;
    }
  };

  const getDistanceString = ({
    longitude,
    latitude,
  }: {
    longitude: number;
    latitude: number;
  }) => {
    if (!calculateDistance) return null;
    const distanceMeters = calculateDistance({ longitude, latitude });
    if (distanceMeters == null) return null;
    if (distanceMeters < 1000) {
      return `${Math.round(distanceMeters)} m`;
    }
    return `${(distanceMeters / 1000).toFixed(1)} km`;
  };

  return (
    <Item className="px-0 py-4 md:px-4">
      <ItemContent className="flex flex-col gap-2">
        <ItemTitle className="font-bold">{schedule.activity.title}</ItemTitle>
        <ItemDescription className="line-clamp-none">
          {/* Avoid <div> as descendant of <p>. Use <span> or fragment if ItemDescription renders as <p> */}
          <span className="flex flex-col gap-1">
            <span className="flex items-center gap-2">
              <MapPinIcon className="size-3.5" />
              <a
                href={schedule.facility.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-2 text-muted-foreground font-medium hover:text-primary hover:underline transition-colors"
              >
                {schedule.facility.title}
              </a>
              {getDistanceString({
                longitude: schedule.facility.longitude,
                latitude: schedule.facility.latitude,
              }) && (
                <>
                  {" "}
                  &bull;{" "}
                  {getDistanceString({
                    longitude: schedule.facility.longitude,
                    latitude: schedule.facility.latitude,
                  })}
                </>
              )}
            </span>
            <span className="flex items-center gap-2">
              <ClockIcon className="size-3.5" />
              <span>
                {t(
                  `dayOfWeek.${DAYS_OF_WEEK[schedule.dayOfWeek - 1].title}.full`,
                )}{" "}
                &bull; {formatTime(schedule.startTime)} -{" "}
                {formatTime(schedule.endTime)}
              </span>
            </span>
            {schedule.periodStartDate && schedule.periodEndDate && (
              <span className="flex items-center gap-2">
                <Calendar className="size-3.5" />
                <span>
                  {formatDate(schedule.periodStartDate)} -{" "}
                  {formatDate(schedule.periodEndDate)}
                </span>
              </span>
            )}
          </span>
        </ItemDescription>
      </ItemContent>
    </Item>
  );
}
