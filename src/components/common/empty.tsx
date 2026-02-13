import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Frown } from "lucide-react";
interface EmptyOutlineProps {
  title: React.ReactNode;
  description: React.ReactNode;
  buttonTitle?: React.ReactNode;
  onButtonClick?: () => void;
}

export function EmptyOutline({
  title,
  description,
  buttonTitle,
  onButtonClick,
}: EmptyOutlineProps) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Frown />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        {buttonTitle && (
          <Button variant="outline" size="sm" onClick={onButtonClick}>
            {buttonTitle}
          </Button>
        )}
      </EmptyContent>
    </Empty>
  );
}
