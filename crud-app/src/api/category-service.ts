import { getFromLocalStorage, setToLocalStorage } from "@/lib/local-storage";
import axios from "axios";

export const fetchCategories = async (): Promise<string[]> => {
  // Handle cached categories data
  const cachedCategoriesData = getFromLocalStorage<string[]>("categories");
  if (cachedCategoriesData) {
    return cachedCategoriesData;
  }

  const response = await axios.get<string[]>(
    `${import.meta.env.VITE_API_BASE_URL}/categories`
  );

  // Data caching...
  setToLocalStorage<string[]>("categories", response.data);

  return response.data;
};
