import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "@/lib/local-storage";
import { Item, ItemQueryParams, PaginatedItems } from "@/types/item.types";
import axios from "axios";

export const fetchItems = async (
  params: ItemQueryParams = {}
): Promise<PaginatedItems> => {
  // Default values
  const { category, ...filters } = params;

  const isAllCategory = category && category === "all" ? true : false;
  const preparedParams = isAllCategory ? { ...filters } : params;

  // Handle cached items data
  const cachedItemsData =
    getFromLocalStorage<{ params: ItemQueryParams; data: PaginatedItems }[]>(
      "items"
    ) || [];
  if (cachedItemsData && cachedItemsData.length > 0) {
    const isNewReqCached = cachedItemsData.find(
      (item) => JSON.stringify(item.params) === JSON.stringify(preparedParams)
    );

    if (isNewReqCached) {
      return isNewReqCached.data;
    }
  }

  const response = await axios.get<PaginatedItems>(
    `${import.meta.env.VITE_API_BASE_URL}/items`,
    {
      params: preparedParams,
    }
  );

  // Data caching...
  setToLocalStorage<{ params: ItemQueryParams; data: PaginatedItems }[]>(
    "items",
    [
      ...cachedItemsData,
      {
        params: preparedParams,
        data: response.data,
      },
    ]
  );

  return response.data;
};

export const AddItem = async (
  body: Omit<Item, "id" | "date">
): Promise<Item> => {
  const response = await axios.post<Item>(
    `${import.meta.env.VITE_API_BASE_URL}/items`,
    body
  );
  removeFromLocalStorage("items");
  return response.data;
};

export const EditItem = async (
  id: string,
  body: Omit<Item, "id" | "date">
): Promise<Item> => {
  const response = await axios.put<Item>(
    `${import.meta.env.VITE_API_BASE_URL}/items/${id}`,
    body
  );
  removeFromLocalStorage("items");
  return response.data;
};

export const DeleteItem = async (id: string): Promise<any> => {
  const response = await axios.delete<Item>(
    `${import.meta.env.VITE_API_BASE_URL}/items/${id}`
  );
  removeFromLocalStorage("items");
  return response;
};
