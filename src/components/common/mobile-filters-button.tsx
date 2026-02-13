import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Filter as FilterIcon } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useSchedules } from "../../hooks/useSchedules";

interface MobileFiltersButtonProps {
  title?: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  buttonText?: string;
  isActive?: boolean;
}

export default function MobileFiltersButton({
  title,
  description,
  children,
  footer,
  buttonText,
  isActive,
}: MobileFiltersButtonProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { isAnyFilterApplied } = useSchedules();

  return (
    <div className="block md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={
            <Button
              variant={isAnyFilterApplied() ? "default" : "outline"}
              className="w-full"
              onClick={() => setOpen(true)}
            >
              <FilterIcon className="mr-2 h-4 w-4" />
              <p className={isActive === false ? "text-muted-foreground" : ""}>
                {buttonText || t("common.filters")}
              </p>
            </Button>
          }
        ></SheetTrigger>
        <SheetContent side={"bottom"} className={"pb-12 w-full"}>
          <SheetHeader>
            <SheetTitle>{title || t("common.filters")}</SheetTitle>
            {description && <SheetDescription>{description}</SheetDescription>}
          </SheetHeader>
          <div className="grid flex-1 auto-rows-min px-4">{children}</div>
          {footer && <SheetFooter>{footer}</SheetFooter>}
        </SheetContent>
      </Sheet>
    </div>
  );
}
