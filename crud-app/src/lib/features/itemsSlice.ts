import { Item, ItemQueryParams } from "@/types/item.types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface ItemsState {
  queryParams: ItemQueryParams;
  action: "update" | "add" | "delete" | null;
  isMutateLoading: boolean;
  isOpenDialog: boolean;
  itemEditing: Item | null;
}

const initialState: ItemsState = {
  queryParams: {
    page: 1,
    limit: 10,
    minPrice: 0,
    maxPrice: 1000,
  },
  action: null,
  isMutateLoading: false,
  isOpenDialog: false,
  itemEditing: null,
};

export const itemsSlice = createSlice({
  name: "items",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setQueryParams: (state, action: PayloadAction<ItemQueryParams>) => {
      state.queryParams = action.payload;
    },
    setIsMutateLoading: (state, action: PayloadAction<boolean>) => {
      state.isMutateLoading = action.payload;
    },
    setIsOpenDialog: (state, action: PayloadAction<boolean>) => {
      state.isOpenDialog = action.payload;
    },
    setItemEditing: (state, action: PayloadAction<Item>) => {
      state.isOpenDialog = true;
      state.itemEditing = action.payload;
    },
    resetItemEditing: (state) => {
      state.itemEditing = null;
    },
    addItem: (state) => {
      state.action = "add";
    },
    editItem: (state) => {
      state.action = "update";
    },
    deleteItem: (state) => {
      state.action = "delete";
    },
    resetItemAction: (state) => {
      state.action = null;
    },
  },
});

export const {
  setQueryParams,
  setIsMutateLoading,
  setIsOpenDialog,
  setItemEditing,
  resetItemEditing,
  addItem,
  editItem,
  deleteItem,
  resetItemAction,
} = itemsSlice.actions;

export default itemsSlice.reducer;
