import { Button } from "./ui/button";
import { Sun } from "lucide-react";

export function ModeToggle() {
  const theme = "dark";

  return (
    <div>
      <Button
        variant="ghost"
        size="icon"
        // className={cn(
        //   "h-9 w-9",
        //   theme === "dark" ? "text-red-500" : "text-blue-500"
        // )}

        // className={`h-9 w-9 ${
        //   theme === "dark" ? "text-red-500" : "text-blue-500"
        // }`}

        className="h-9 w-9"
      >
        <Sun/>
      </Button>
    </div>
  );
}
