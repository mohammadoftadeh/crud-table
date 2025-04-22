import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { RootState } from "@/lib/store";
import { fetchCategories } from "@/api/category-service";
import { setCategories } from "@/lib/features/categoriesSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { convertToNumObjProps } from "@/lib/utils";
import {
  addItem as addItemAction,
  editItem as editItemAction,
  resetItemEditing,
  setIsMutateLoading,
  setIsOpenDialog,
} from "@/lib/features/itemsSlice";
import { AddItem, EditItem } from "@/api/item-service";
import { Item } from "@/types/item.types";

const formSchema = z.object({
  title: z.string().min(2).max(255),
  description: z.string().min(2).max(255),
  category: z.string({
    required_error: "Please select a category",
  }),
  price: z
    .string()
    .transform((val) => val && val.trim())
    .refine(
      (val) => {
        return (
          /^(0(\.\d+)?|[1-9]\d*(\.\d+)?)$/.test(val) && Number(val) <= 1000
        );
      },
      {
        message:
          "Please enter valid price, Greater than or equal to 0 and less than or equal to 1000",
      }
    ),
  stock: z
    .string()
    .transform((val) => val && val.trim())
    .refine(
      (val) => {
        return /^[0-9]+$/.test(val) && Number(val) >= 0;
      },
      {
        message: "Please enter valid stock number, Greater than or equal to 0",
      }
    ),
  rating: z
    .string()
    .transform((val) => val && val.trim())
    .refine(
      (val) => {
        return /^[1-5]$/.test(val);
      },
      {
        message: "Please enter valid rating number: 1 to 5",
      }
    ),
});

export const ItemForm = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { categories } = useAppSelector((state: RootState) => state.categories);
  const { itemEditing } = useAppSelector((state: RootState) => state.items);
  const dispatch = useAppDispatch();
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: itemEditing?.title ?? "",
      description: itemEditing?.description ?? "",
      price: itemEditing?.price.toString() ?? "0",
      stock: itemEditing?.stock.toString() ?? "0",
      rating: itemEditing?.rating.toString() ?? "1",
      category: itemEditing?.category ?? undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const convertToNum = convertToNumObjProps(values);
    try {
      dispatch(setIsMutateLoading(true));
      if (itemEditing) {
        await EditItem(
          itemEditing.id.toString(),
          convertToNum as Omit<Item, "id" | "date">
        );
        dispatch(editItemAction());
      } else {
        await AddItem(convertToNum as Omit<Item, "id" | "date">);
        dispatch(addItemAction());
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      dispatch(setIsMutateLoading(false));
      dispatch(resetItemEditing());
      dispatch(setIsOpenDialog(false));
    }
  }

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
    <div className={className ?? ""}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col gap-4 p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger disabled={loading} className="w-full">
                          <SelectValue
                            placeholder={
                              loading ? "loading..." : "Select a category"
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {data &&
                          data.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    {error && <FormDescription>{error}</FormDescription>}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {children}
        </form>
      </Form>
    </div>
  );
};
