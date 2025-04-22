import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { PaginatedItems } from "@/types/item.types";
import { useSearchParams } from "react-router";

export const PaginateDataTable = ({ data }: { data: PaginatedItems }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Handle pagination
  const paginate = (pageNumber: number) => {
    searchParams.set("page", pageNumber.toString());
    setSearchParams(searchParams, { replace: true });
  };
  const nextPage = () => {
    searchParams.set(
      "page",
      Math.min(data.currentPage + 1, data.totalPages).toString()
    );
    setSearchParams(searchParams, { replace: true });
  };
  const prevPage = () => {
    searchParams.set("page", Math.max(data.currentPage - 1, 1).toString());
    setSearchParams(searchParams, { replace: true });
  };
  const firstPage = () => {
    searchParams.set("page", "1");
    setSearchParams(searchParams, { replace: true });
  };
  const lastPage = () => {
    searchParams.set("page", data.totalPages.toString());
    setSearchParams(searchParams, { replace: true });
  };

  return (
    <>
      {data && (
        <>
          <div className="text-sm text-muted-foreground">
            Showing{" "}
            {Math.trunc(
              Number(searchParams.get("page")) *
                Number(searchParams.get("limit")) -
                Number(searchParams.get("limit")) +
                1
            ).toLocaleString()}{" "}
            to{" "}
            {Math.trunc(
              Number(searchParams.get("page")) *
                Number(searchParams.get("limit"))
            ).toLocaleString()}{" "}
            of {data.totalItems.toLocaleString()} entries
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              onClick={firstPage}
              disabled={data.currentPage === 1}
              size="icon"
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              onClick={prevPage}
              disabled={data.currentPage === 1}
              size="icon"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {Array.from({ length: Math.min(5, data.totalPages) }, (_, i) => {
              let pageNum;
              if (data.totalPages <= 5) {
                pageNum = i + 1;
              } else if (data.currentPage <= 3) {
                pageNum = i + 1;
              } else if (data.currentPage >= data.totalPages - 2) {
                pageNum = data.totalPages - 4 + i;
              } else {
                pageNum = data.currentPage - 2 + i;
              }

              return (
                <Button
                  key={i}
                  variant={data.currentPage === pageNum ? "default" : "outline"}
                  onClick={() => paginate(pageNum)}
                  className="w-9 h-9 p-0"
                >
                  {pageNum}
                </Button>
              );
            })}

            <Button
              variant="outline"
              onClick={nextPage}
              disabled={data.currentPage === data.totalPages}
              size="icon"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              onClick={lastPage}
              disabled={data.currentPage === data.totalPages}
              size="icon"
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </>
  );
};
