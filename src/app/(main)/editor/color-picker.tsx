import { PaletteIcon } from "lucide-react";
import { useState } from "react";
import { Color, ColorChangeHandler, TwitterPicker } from "react-color";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ColorPickerProps {
  color: Color | undefined;
  onChange: ColorChangeHandler;
}

export default function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [showPopover, setShowPopover] = useState(false);

  return (
    <Popover open={showPopover} onOpenChange={setShowPopover}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          // className="bg-background/80 hover:bg-background/90 dark:bg-background/60 dark:hover:bg-background/80 h-8 w-8 shrink-0 rounded-md border-2 backdrop-blur-sm sm:h-10 sm:w-10"
          // aria-label="Choose color"
          title="Change resume color"
        >
          <PaletteIcon className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="border-none bg-transparent shadow-none"
        align="end"
        // sideOffset={8}
      >
        <TwitterPicker
          color={color}
          onChange={onChange}
          triangle="top-right"
          // styles={{
          //   default: {
          //     card: {
          //       backgroundColor: "transparent",
          //       boxShadow: "none",
          //       border: "none",
          //     },
          //   },
          // }}
        />
      </PopoverContent>
    </Popover>
  );
}
