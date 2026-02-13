import { useEffect, useState, useCallback } from "react";

export type Lang = {
  code: string;
  label: string;
  short?: string;
};

const STORAGE_KEY: string = "language";

export function useLanguage(defaultLang: string = "en") {
  const [lang, setLang] = useState<string>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ?? defaultLang;
    } catch {
      return defaultLang;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore (e.g. private mode)
    }
  }, [lang]);

  const changeLanguage = useCallback((newLang: string) => {
    setLang(newLang);
  }, []);

  return { lang, setLang: changeLanguage };
}
