"use client"; // Ensures this component is rendered on the client side

// Importing UI primitives from shadcn/ui and utility functions
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "@/components/ui/select";
import { ChevronDown, ChevronUp } from "lucide-react"; // Dropdown icons
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils"; // Utility for conditional className joining

// Type definitions for select items and groupings
type WSelectItem = {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
};

type WSelectGroup = {
  label?: string;
  items: WSelectItem[];
};

type WSelectProps = {
  groups?: WSelectGroup[];
  placeholder?: string;
  placeholderIcon?: React.ReactNode;
  value?: string;
  onChange?: (value: string) => void;
  error?: boolean;
  disabled?: boolean;
};

export default function WSelect({
  groups = [],
  placeholder = "Select",
  placeholderIcon,
  value,
  onChange,
  error,
  disabled,
}: WSelectProps) {
  const [open, setOpen] = useState(false); // Tracks whether dropdown is open
  const triggerRef = useRef<HTMLButtonElement>(null); // Ref to SelectTrigger
  const [triggerWidth, setTriggerWidth] = useState<number | null>(null); // Used for syncing dropdown width with trigger

  // When dropdown opens, measure trigger width
  useEffect(() => {
    if (open && triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  }, [open]);

  // Flatten all items across groups into one array
  const flatItems = groups.flatMap((group) => group.items);
  const selectedItem = flatItems.find((item) => item.value === value); // Find selected item

  return (
    <Select
      value={value}
      onValueChange={onChange}
      open={open}
      onOpenChange={setOpen}
      disabled={disabled}
    >
      {/* Trigger button for the dropdown */}
      <SelectTrigger
        ref={triggerRef}
        className={cn(
          "w-full px-3 py-2 border rounded-xl bg-light shadow-menu",
          "text-label-s text-fg-hushed",
          "flex items-center justify-between gap-2",
          "border-accent",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <div className="flex items-center gap-2 w-full">
          {selectedItem ? (
            // Show selected item with icon and blue text
            <>
              {selectedItem.icon && (
                <span className="w-6 h-6 min-w-[24px] min-h-[24px] rounded-[6px] bg-brand flex items-center justify-center">
                  <span className="w-4 h-4 text-brand-primary flex items-center justify-center">
                    {selectedItem.icon}
                  </span>
                </span>
              )}
              <span className="text-label-s text-blue-500">
                {selectedItem.label}
              </span>
            </>
          ) : (
            // Show placeholder if nothing selected
            <>
              {placeholderIcon && (
                <span className="text-icon w-4 h-4 flex items-center justify-center text-fg-hushed">
                  {placeholderIcon}
                </span>
              )}
              <span className="text-label-s text-fg-hushed">{placeholder}</span>
            </>
          )}
        </div>
        {/* Chevron icon for dropdown toggle */}
        {open ? (
          <ChevronUp className="text-icon w-4 h-4" />
        ) : (
          <ChevronDown className="text-icon w-4 h-4" />
        )}
      </SelectTrigger>

      {/* Dropdown menu content */}
      <SelectContent
        style={{ width: triggerWidth ?? "auto" }} // Sync width with trigger
        className="bg-light rounded-xl shadow-menu mt-1 z-50"
        side="bottom"
        position="popper"
      >
        {groups?.map((group, idx) => (
          <SelectGroup key={idx}>
            {/* Optional group label */}
            {group.label && (
              <SelectLabel className="px-3 py-1 text-label-xs text-gray-500">
                {group.label}
              </SelectLabel>
            )}

            {/* Render each item in group */}
            {group.items.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
                className={cn(
                  "px-3 py-2.5 rounded-md cursor-pointer",
                  "hover:bg-muted",
                  "data-[state=checked]:bg-blue-50",
                  "flex gap-3 items-center"
                )}
              >
                {/* Icon container */}
                {item.icon && (
                  <span className="w-6 h-6 min-w-[24px] min-h-[24px] rounded-[6px] bg-brand-muted flex items-center justify-center">
                    <span className="w-4 h-4 text-brand-primary flex items-center justify-center">
                      {item.icon}
                    </span>
                  </span>
                )}

                {/* Text: label and optional description */}
                <div className="flex flex-col justify-center">
                  <span className="text-label-s">
                    <span className={value === item.value ? "text-blue-500" : "text-fg-default"}>
                      {item.label}
                    </span>
                  </span>
                  {item.description && (
                    <p className="text-label-xs text-gray-500">
                      {item.description}
                    </p>
                  )}
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}
