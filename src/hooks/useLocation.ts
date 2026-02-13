import { useContext } from "react";
import {
  type LocationContextType,
  LocationContext,
} from "../contexts/location-context";

export const useLocation = (): LocationContextType => {
  const context = useContext(LocationContext);

  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }

  return context;
};
