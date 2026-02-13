import type { Selectable } from "./Selectable";

export interface Activity extends Selectable {
  id: number;
  title: string;
  icon: string;
}
