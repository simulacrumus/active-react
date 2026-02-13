import { useTranslation } from "react-i18next";
import { Language } from "@/components/common/language";
import { ModeToggle } from "@/components/common/mode-toggle";

export function Header() {
  const { t } = useTranslation();
  return (
    <div className="max-w-6xl mx-auto flex items-center justify-between h-full">
      <div className="block gap-2 items-baseline">
        {/* <div className="h-6 w-6 rounded-sm bg-primary flex items-center justify-center text-primary-foreground">
          <PersonStanding className="h-5 w-5" />
        </div> */}
        <h1 className="text-xl tracking-tight font-semibold text-foreground">
          {t("app.title")}
        </h1>
        <h2 className="text-xs text-muted-foreground tracking-tight">
          {t("app.desc")}
        </h2>
      </div>
      <div className="flex justify-end">
        <ModeToggle />
        <Language />
      </div>
    </div>
  );
}
