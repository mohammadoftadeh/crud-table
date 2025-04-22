import type { Value } from "react-multi-date-picker";

interface DateRange {
  start: Value | null;
  end: Value | null;
}

interface PriceRange {
  min: number;
  max: number;
}

export interface Filters {
  dateRange: DateRange;
  priceRange: PriceRange;
  category: string;
}
