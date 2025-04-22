import { ItemQueryParams } from "@/types/item.types";
import DataTable from "./data-table";
import { useEffect, useState } from "react";
import { fetchItems } from "@/api/item-service";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { RootState } from "@/lib/store";
import { useSearchParams } from "react-router";
import { resetItemAction, setQueryParams } from "@/lib/features/itemsSlice";
import { convertToNumObjProps } from "@/lib/utils";

const tableFields = [
  "ID",
  "Title",
  "Category",
  "Date",
  "Price",
  "Description",
  "Stock",
  "Rating",
];

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { queryParams, action } = useAppSelector(
    (state: RootState) => state.items
  );
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const params = Object.fromEntries(searchParams.entries());
        const numericFilters = convertToNumObjProps(params);

        const isSearchParamsExist = Object.keys(numericFilters).length > 3;

        if (!isSearchParamsExist) {
          for (const key in queryParams) {
            searchParams.set(
              key,
              queryParams[key as keyof ItemQueryParams].toString()
            );
          }
          setSearchParams(searchParams, { replace: true });
        }

        dispatch(
          setQueryParams({
            ...queryParams,
            ...numericFilters,
          })
        );

        const response = await fetchItems({
          ...queryParams,
          ...numericFilters,
        });

        setData(response);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
        if (action) {
          dispatch(resetItemAction());
        }
      }
    };

    fetchData();
  }, [searchParams, action]);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <p className="mb-4">{error}</p>
      <DataTable mockData={data} fields={tableFields} isLoading={loading} />
    </main>
  );
};
