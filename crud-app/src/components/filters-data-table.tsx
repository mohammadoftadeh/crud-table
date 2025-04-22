import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { CardContent } from "@/components/ui/card";
import DatePicker from "react-multi-date-picker";
import { CategorySelect } from "./category-select";
import { useSearchParams } from "react-router";

export const FiltersDataTable = ({
  resetFilters,
}: {
  resetFilters: () => void;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4">
          {/* Date Range Filter */}
          <div className="flex flex-col gap-4">
            <div className="grid gap-1">
              <h3 className="text-sm font-medium">Start Date</h3>
              <DatePicker
                value={searchParams.get("startDate") || undefined}
                onChange={(val) => {
                  if (val) {
                    searchParams.set("startDate", val.format("YYYY-MM-DD"));
                  } else {
                    searchParams.delete("startDate");
                  }
                  setSearchParams(searchParams, { replace: true });
                }}
                onOpenPickNewDate={false}
                format="YYYY/MM/DD"
                style={{ height: "40px" }}
              />
            </div>
            <div className="grid-gap-1">
              <h3 className="text-sm font-medium">End Date</h3>
              <DatePicker
                value={searchParams.get("endDate") || undefined}
                onChange={(val) => {
                  if (val) {
                    searchParams.set("endDate", val.format("YYYY-MM-DD"));
                  } else {
                    searchParams.delete("endDate");
                  }
                  setSearchParams(searchParams, { replace: true });
                }}
                onOpenPickNewDate={false}
                format="YYYY/MM/DD"
                style={{ height: "40px" }}
              />
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Price Range</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>${Number(searchParams.get("minPrice")).toFixed(2)}</span>
                <span>${Number(searchParams.get("maxPrice")).toFixed(2)}</span>
              </div>
              <Slider
                defaultValue={[0, 1000]}
                max={1000}
                step={10}
                onValueChange={(value) => {
                  searchParams.set("minPrice", value[0].toString());
                  searchParams.set("maxPrice", value[1].toString());
                  setSearchParams(searchParams, { replace: true });
                }}
              />
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={Number(searchParams.get("minPrice")) || 0}
                  onChange={(e) => {
                    searchParams.set("minPrice", e.target.value || "0");
                    setSearchParams(searchParams, { replace: true });
                  }}
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={Number(searchParams.get("maxPrice")) || 1000}
                  onChange={(e) => {
                    searchParams.set("maxPrice", e.target.value || "1000");
                    setSearchParams(searchParams, { replace: true });
                  }}
                />
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <CategorySelect />
        </div>
        <Button variant="outline" onClick={resetFilters} className="mt-4">
          Reset Filters
        </Button>
      </CardContent>
    </>
  );
};
