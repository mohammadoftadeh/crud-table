import { fetchCategories } from "@/api/category-service";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setQueryParams } from "@/lib/features/itemsSlice";
import { RootState } from "@/lib/store";
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { setCategories } from "@/lib/features/categoriesSlice";

export const CategorySelect = () => {
  const { queryParams } = useAppSelector((state: RootState) => state.items);
  const { categories } = useAppSelector((state: RootState) => state.categories);
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategoriesFunc = async () => {
      try {
        if (categories.length > 0) return setData(categories);

        setLoading(true);
        const response = await fetchCategories();
        setData(response);
        dispatch(setCategories(response));
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesFunc();
  }, []);

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Category</h3>
      <Select
        value={queryParams.category || "all"}
        onValueChange={(value) => {
          searchParams.set("category", value);
          dispatch(setQueryParams({ ...queryParams, category: value }));

          setSearchParams(searchParams, { replace: true });
        }}
      >
        <SelectTrigger disabled={loading}>
          <SelectValue
            placeholder={loading ? "loading..." : "Select a category"}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {data &&
            data.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
      <p className="mb-4">{error}</p>
    </div>
  );
};
