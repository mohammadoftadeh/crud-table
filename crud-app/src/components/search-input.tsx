import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export function SearchInput({
  placeholder = "Search...",
  onSearch,
  delay = 300,
  initialValue = "",
}: {
  placeholder?: string;
  onSearch: (query: string) => void;
  delay?: number;
  initialValue?: string;
  resetInput?: boolean;
}) {
  const [query, setQuery] = useState(initialValue);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    onSearch(value);
  }, delay);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <div className="relative w-full max-w-md">
      <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <Input
        type="search"
        placeholder={placeholder}
        className="pl-9 pr-4 py-2"
        value={query}
        onChange={handleChange}
      />
    </div>
  );
}
