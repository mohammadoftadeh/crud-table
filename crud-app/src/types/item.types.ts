export interface Item {
  id: number;
  title: string;
  category: string;
  date: string; // ISO format
  price: number;
  description: string;
  stock: number;
  rating: number;
}

export interface ItemQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  startDate?: string; // ISO format - YYYY-MM-DD
  endDate?: string; // ISO format - YYYY-MM-DD
  minRating?: number;
  minStock?: number;
  sortBy?: "id" | "title" | "category" | "date" | "price" | "stock" | "rating";
  sortOrder?: "asc" | "desc";
  [key: string]: any;
}

export interface PaginatedItems {
  items: Item[] | [];
  totalItems: number;
  page: number;
  currentPage: number;
  limit: number;
  totalPages: number;
}
