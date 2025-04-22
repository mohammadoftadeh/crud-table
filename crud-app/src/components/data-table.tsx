import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown, ArrowUp, ArrowDown, Filter } from "lucide-react";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSearchParams } from "react-router";
import { SearchInput } from "./search-input";
import { PaginatedItems } from "@/types/item.types";
import { useAppDispatch } from "@/hooks/redux";
import {
  setQueryParams,
  deleteItem as deleteItemAction,
  setItemEditing,
} from "@/lib/features/itemsSlice";
import { Skeleton } from "./ui/skeleton";
import { PaginateDataTable } from "./paginate-data-table";
import { FiltersDataTable } from "./filters-data-table";
import { DeleteButton } from "./delete-button";
import { DeleteItem } from "@/api/item-service";

export default function DataTable({
  mockData,
  fields,
  isLoading,
}: {
  mockData: PaginatedItems;
  fields: string[];
  isLoading: boolean;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortField, setSortField] = useState<string | null>(
    searchParams.get("sortBy")
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">(
    (searchParams.get("sortOrder") as "asc" | "desc") || "asc"
  );
  const [showFilters, setShowFilters] = useState(false);
  const [query, setQuery] = useState(searchParams.get("search") || "");
  const dispatch = useAppDispatch();

  // Handle sort
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
      searchParams.set("sortOrder", sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
      searchParams.set("sortBy", field);
      searchParams.set("sortOrder", "asc");
    }
    setSearchParams(searchParams, { replace: true });
  };

  // Render sort icon
  const renderSortIcon = (field: string) => {
    if (sortField !== field) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />;
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="ml-2 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4" />
    );
  };

  // Reset filters
  const resetFilters = () => {
    dispatch(
      setQueryParams({
        page: 1,
        limit: 10,
        minPrice: 0,
        maxPrice: 1000,
      })
    );
    setSearchParams({}, { replace: true });
  };

  const handleSearch = (query: string) => {
    setQuery(query);
    if (query) {
      searchParams.set("search", query);
    } else {
      searchParams.delete("search");
      dispatch(setQueryParams({ ...setQueryParams, search: "" }));
    }
    setSearchParams(searchParams, { replace: true });
  };

  const handleDelete = async (id: string, cb: (...args: any[]) => void) => {
    try {
      cb(true);
      await DeleteItem(id);
      dispatch(deleteItemAction());
    } catch (err) {
      alert(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      cb(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle className="mb-2">Product Data</CardTitle>
            <CardDescription>
              A list of all products with detailed information
            </CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
            <Select
              value={searchParams.get("limit") || "10"}
              onValueChange={(value) => {
                searchParams.set("limit", value);
                setSearchParams(searchParams, { replace: true });
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Items per page" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 per page</SelectItem>
                <SelectItem value="10">10 per page</SelectItem>
                <SelectItem value="20">20 per page</SelectItem>
                <SelectItem value="50">50 per page</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      {showFilters && (
        <>
          <FiltersDataTable resetFilters={resetFilters} />
        </>
      )}

      <CardContent>
        <div className="mb-4">
          <SearchInput onSearch={handleSearch} initialValue={query} />
        </div>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {fields.map((field, idx) => (
                  <TableHead key={idx}>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort(field.toLowerCase())}
                      className="flex items-center"
                    >
                      {field} {renderSortIcon(field.toLowerCase())}
                    </Button>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <>
                  {Array.from(
                    { length: Number(searchParams.get("limit")) },
                    (_, i) => (
                      <TableRow key={i}>
                        {Array.from({ length: 8 }, (_, idx) => (
                          <TableCell key={idx} className="text-center">
                            <Skeleton className="w-full h-5 rounded-none" />
                          </TableCell>
                        ))}
                      </TableRow>
                    )
                  )}
                </>
              ) : mockData && mockData.items.length > 0 ? (
                mockData.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell className="flex flex-col">
                      <span>{item.title}</span>
                      <div className="flex items-center gap-1">
                        <Button
                          type="button"
                          variant={`link`}
                          className="p-1 text-blue-600 h-fit cursor-pointer"
                          onClick={() => {
                            dispatch(setItemEditing(item));
                          }}
                        >
                          Edit
                        </Button>
                        <DeleteButton
                          variant={`link`}
                          className="p-1 text-destructive h-fit cursor-pointer"
                          onDelete={(cb) =>
                            handleDelete(item.id.toString(), cb)
                          }
                          itemName={item.title}
                        />
                      </div>
                    </TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{format(new Date(item.date), "PP")}</TableCell>
                    <TableCell>${item.price.toFixed(2)}</TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {item.description}
                    </TableCell>
                    <TableCell>{item.stock}</TableCell>
                    <TableCell>{item.rating}/5</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    No results found. Try adjusting your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <PaginateDataTable data={mockData} />
      </CardFooter>
    </Card>
  );
}
