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
        const bytes = new Uint8Array(16);
        crypto.getRandomValues(bytes);
        bytes[6] = (bytes[6] & 0x0f) | 0x40;
        bytes[8] = (bytes[8] & 0x3f) | 0x80;
        return [...bytes]
          .map((b, i) =>
            [4, 6, 8, 10].includes(i)
              ? `-${b.toString(16).padStart(2, "0")}`
              : b.toString(16).padStart(2, "0"),
          )
          .join("");
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
