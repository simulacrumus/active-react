import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export function Language() {
  const { i18n } = useTranslation();

  const switchLanguage = (e: React.MouseEvent) => {
    e.preventDefault();
    const newLang = i18n.language === "en" ? "fr" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <Button onClick={switchLanguage} type="button" variant="ghost">
      <span className="text-sm tracking-wide text-foreground">
        {(i18n.language === "en" ? "fr" : "en").toUpperCase()}
      </span>
    </Button>
  );
}
