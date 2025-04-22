import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMediaQuery } from "usehooks-ts";
import { ItemForm } from "./item-form";
import { RootState } from "@/lib/store";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { resetItemEditing, setIsOpenDialog } from "@/lib/features/itemsSlice";

export const AddItemDialog = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { isMutateLoading, isOpenDialog, itemEditing } = useAppSelector(
    (state: RootState) => state.items
  );
  const dispatch = useAppDispatch();

  return (
    <>
      {isDesktop ? (
        <Dialog
          open={isOpenDialog}
          onOpenChange={(open) => {
            if (!open && itemEditing) {
              dispatch(resetItemEditing());
            }
            dispatch(setIsOpenDialog(open));
          }}
        >
          <DialogTrigger asChild>
            <Button type="button" className="w-fit cursor-pointer">
              <Plus className="size-5" />
              New Item
            </Button>
          </DialogTrigger>
          <DialogContent className="min-w-80 px-0">
            <DialogHeader className="px-4">
              <DialogTitle>
                {itemEditing ? "Update Item" : "New Item"}
              </DialogTitle>
              <DialogDescription>
                Add or edit the item you want.
              </DialogDescription>
            </DialogHeader>
            <ItemForm>
              <DialogFooter className="pt-2 px-4">
                <div className="flex w-full justify-between gap-2">
                  <Button
                    type="submit"
                    className="grow cursor-pointer"
                    size={"lg"}
                    disabled={isMutateLoading}
                  >
                    {isMutateLoading ? (
                      <>
                        <Loader2 className="animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save"
                    )}
                  </Button>
                  <DialogClose asChild>
                    <Button
                      variant={"secondary"}
                      size={"lg"}
                      disabled={isMutateLoading}
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                </div>
              </DialogFooter>
            </ItemForm>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer
          open={isOpenDialog}
          onOpenChange={(open) => dispatch(setIsOpenDialog(open))}
        >
          <DrawerTrigger asChild>
            <Button type="button" className="w-fit cursor-pointer">
              <Plus className="size-5" />
              New Item
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>
                {itemEditing ? "Update Item" : "New Item"}
              </DrawerTitle>
              <DrawerDescription className="text-xs sm:text-sm">
                Add or edit the item you want.
              </DrawerDescription>
            </DrawerHeader>
            <ItemForm className="h-full overflow-y-auto">
              <DrawerFooter className="bg-white dark:bg-neutral-800 sticky bottom-0 pt-2">
                <div className="flex justify-between gap-2">
                  <Button
                    className="grow cursor-pointer"
                    size={"lg"}
                    disabled={isMutateLoading}
                  >
                    {isMutateLoading ? (
                      <>
                        <Loader2 className="animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save"
                    )}
                  </Button>
                  <DrawerClose asChild>
                    <Button
                      variant={"secondary"}
                      size={"lg"}
                      disabled={isMutateLoading}
                    >
                      Cancel
                    </Button>
                  </DrawerClose>
                </div>
              </DrawerFooter>
            </ItemForm>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};
