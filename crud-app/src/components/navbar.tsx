import { AddItemDialog } from "./add-item-dialog";
import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b bg-white/40 dark:bg-neutral-800/40 backdrop-blur">
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex items-center justify-between">
          <strong>crud-app</strong>
          <div className="flex items-center gap-4">
            <AddItemDialog />
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
