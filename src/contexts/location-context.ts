import React, {
  createContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { useTranslation } from "react-i18next";

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export type PermissionState = "granted" | "denied" | "prompt";
export interface LocationContextType {
  location: Coordinates | null;
  permission: PermissionState | null;
  isLoading: boolean;
  error: string | null;
  requestLocation: () => Promise<boolean>;
  clearLocation: () => void;
  watchLocation: () => void;
  stopWatching: () => void;
  isWatching: boolean;
  calculateDistance: (location: Coordinates) => number | null;
}

export const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

interface LocationProviderProps {
  children: ReactNode;
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}

export const LocationProvider: React.FC<LocationProviderProps> = ({
  children,
  enableHighAccuracy = true,
  timeout = 10000,
  maximumAge = 100000,
}) => {
  const { t } = useTranslation();
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [permission, setPermission] = useState<PermissionState | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [watchId, setWatchId] = useState<number | null>(null);
  const [isWatching, setIsWatching] = useState(false);

  useEffect(() => {
    if ("permissions" in navigator) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((result) => {
          setPermission(result.state as PermissionState);

          result.addEventListener("change", () => {
            setPermission(result.state as PermissionState);
          });
        })
        .catch(() => {
          // Permissions API not supported, will be determined on first request
          setPermission("prompt");
        });
    } else {
      setPermission("prompt");
    }
  }, []);

  const geoOptions: PositionOptions = {
    enableHighAccuracy,
    timeout,
    maximumAge,
  };

  const handleSuccess = useCallback((position: GeolocationPosition) => {
    const coords: Coordinates = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };

    setLocation(coords);
    setPermission("granted");
    setError(null);
    setIsLoading(false);
  }, []);

  const handleError = useCallback((err: GeolocationPositionError) => {
    let errorMessage: string;

    switch (err.code) {
      case err.PERMISSION_DENIED:
        errorMessage = t("error.location.permissionDenied");
        setPermission("denied");
        break;
      case err.POSITION_UNAVAILABLE:
        errorMessage = t("error.location.positionUnavailable");
        break;
      case err.TIMEOUT:
        errorMessage = t("error.location.timeout");
        break;
      default:
        errorMessage = t("error.location.unknown");
    }

    setError(errorMessage);
    setIsLoading(false);
  }, [t]);

  const requestLocation = useCallback(async (): Promise<boolean> => {
    if (!navigator.geolocation) {
      setError(t("error.location.notSupported"));
      return false;
    }

    setIsLoading(true);
    setError(null);

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          handleSuccess(position);
          resolve(true);
        },
        (error) => {
          handleError(error);
          resolve(false);
        },
        geoOptions
      );
    });
  }, [handleSuccess, handleError, geoOptions]);

  const watchLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError(t("error.location.notSupported"));
      return;
    }

    if (watchId !== null) {
      return; // Already watching
    }

    setIsLoading(true);
    setError(null);

    const id = navigator.geolocation.watchPosition(
      handleSuccess,
      handleError,
      geoOptions
    );

    setWatchId(id);
    setIsWatching(true);
  }, [watchId, handleSuccess, handleError, geoOptions]);

  const stopWatching = useCallback(() => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
      setIsWatching(false);
    }
  }, [watchId]);

  const clearLocation = useCallback(() => {
    setLocation(null);
    setError(null);
    stopWatching();
  }, [stopWatching]);

  useEffect(() => {
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);

  const calculateDistance = (target: Coordinates): number | null => {
    if (!location) return null;

    const { latitude: lat1, longitude: lon1 } = location;
    const { latitude: lat2, longitude: lon2 } = target;
    const R = 6371000; // Radius in meters

    const toRad = (deg: number) => (deg * Math.PI) / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // distance in meters
  };

  const value: LocationContextType = {
    location,
    permission,
    isLoading,
    error,
    requestLocation,
    clearLocation,
    watchLocation,
    stopWatching,
    isWatching,
    calculateDistance,
  };

  return React.createElement(LocationContext.Provider, { value }, children);
};

