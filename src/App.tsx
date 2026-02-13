import { MainLayout } from "./layouts/main";
import { Header } from "./layouts/header";
import SearchLayout from "./layouts/search";
import ScheduleFilters from "./components/schedules/filters";
import ScheduleResults from "./components/schedules/list";
import { ScheduleProvider } from "./contexts/schedule-context";
import { LocationProvider } from "./contexts/location-context";
import { useEffect } from "react";
import { TermsAndConditions } from "./components/common/terms";

export function App() {
  useEffect(() => {
    let deviceId = localStorage.getItem("deviceId");
    if (!deviceId) {
      const generateUuid = () => {
        if (typeof crypto !== "undefined" && crypto.randomUUID) {
          return crypto.randomUUID();
        }
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
          /[xy]/g,
          function (c) {
            const r = (Math.random() * 16) | 0;
            const v = c === "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
          },
        );
      };
      deviceId = generateUuid();
      localStorage.setItem("deviceId", deviceId);
    }
  }, []);

  return (
    <>
      <TermsAndConditions />
      <LocationProvider>
        <ScheduleProvider>
          <MainLayout
            header={<Header />}
            main={
              <SearchLayout
                aside={<ScheduleFilters />}
                content={<ScheduleResults />}
              />
            }
          />
        </ScheduleProvider>
      </LocationProvider>
    </>
  );
}

export default App;
