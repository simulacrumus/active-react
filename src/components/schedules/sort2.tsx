import * as React from "react";
import { toast } from "sonner";
import { ArrowUpDown } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import { FieldLabel } from "../ui/field";

export default function ScheduleSort22() {
  const [sortOption, setSortOption] = React.useState<string>("time");

  React.useEffect(() => {
    const saved = localStorage.getItem("sortOption");
    if (saved) {
      setSortOption(saved);
    }
  }, []);

  const { t } = useTranslation();

  const handleValueChange = (value: string | null) => {
    if (!value) return;

    if (value === "nearby") {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          () => {
            setSortOption(value);
            localStorage.setItem("sortOption", value);
          },
          (error) => {
            console.error("Location access denied or failed", error);
            let errorMessage = "Could not access location.";

            if (error.code === error.PERMISSION_DENIED) {
              errorMessage =
                "Location access was denied. Please enable it in settings to use 'Nearby' sort.";
            } else if (error.code === error.POSITION_UNAVAILABLE) {
              errorMessage = "Location information is unavailable.";
            } else if (error.code === error.TIMEOUT) {
              errorMessage = "The request to get user location timed out.";
            }

            toast.error(errorMessage);

            setSortOption("time");
            localStorage.setItem("sortOption", "time");
          },
        );
      } else {
        console.error("Geolocation not supported");
        toast.error("Geolocation is not supported by your browser.");
        setSortOption("time");
        localStorage.setItem("sortOption", "time");
      }
    } else {
      setSortOption(value);
      localStorage.setItem("sortOption", value);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-between">
        <FieldLabel>{"Test"}</FieldLabel>
      </div>
      <Select value={sortOption} onValueChange={handleValueChange}>
        <SelectTrigger className="bg-background w-full ">
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            <SelectValue placeholder={t("schedule.sort.sort_by")} />
          </div>
        </SelectTrigger>
        <SelectContent align="start">
          <SelectGroup>
            <SelectItem value="time">{t("schedule.sort.time")}</SelectItem>
            <SelectItem value="nearby">{t("schedule.sort.nearby")}</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
