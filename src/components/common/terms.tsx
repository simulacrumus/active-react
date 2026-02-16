import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Markdown } from "./markdown-renderer";
import { useLanguage } from "./../../hooks/useLanguage";

export function TermsAndConditions() {
  const [content, setContent] = useState("");
  const [termsAccepted, setTermsHasAccepted] = useState(() => {
    return localStorage.getItem("termsAccepted") === "true";
  });
  const { lang } = useLanguage();

  useEffect(() => {
    const termsFile = lang === "fr" ? "/terms_fr.md" : "/terms_en.md";
    fetch(termsFile)
      .then((res) => res.text())
      .then(setContent);
  }, [lang]);

  useEffect(() => {
    const accepted = localStorage.getItem("termsAccepted");
    if (accepted === "true") {
      setTermsHasAccepted(true);
    }
  }, []);

  function onAccept() {
    // console.log("Terms accepted");
    localStorage.setItem("termsAccepted", "true");
    setTermsHasAccepted(true);
  }

  const { t } = useTranslation();

  return (
    <Dialog open={!termsAccepted}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{t("terms.title")}</DialogTitle>
          <DialogDescription>{t("terms.desc")}</DialogDescription>
        </DialogHeader>
        <div className="no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4">
          <Markdown content={content} />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onAccept}>
            {t("terms.action")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
