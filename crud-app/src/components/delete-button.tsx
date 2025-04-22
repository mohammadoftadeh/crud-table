import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Loader2 } from "lucide-react";

interface DeleteButtonProps {
  onDelete: (...args: any[]) => void;
  itemName?: string;
  variant?:
    | "outline"
    | "destructive"
    | "default"
    | "link"
    | "secondary"
    | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  disabled?: boolean;
  className?: string;
}

export function DeleteButton({
  onDelete,
  itemName = "item",
  variant = "destructive",
  size = "default",
  disabled = false,
  className = "",
}: DeleteButtonProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    onDelete(setLoading);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={variant}
          size={size}
          disabled={disabled}
          className={className}
        >
          Delete
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Confirm deletion</h4>
            <p className="text-sm text-muted-foreground">
              Are you sure you want to delete this <b>"{itemName}"</b>? This
              action cannot be undone.
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              disabled={disabled}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
