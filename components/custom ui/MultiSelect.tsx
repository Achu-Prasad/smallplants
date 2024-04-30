"use client"

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useState } from "react";

interface MultiSelectProps {
  placeholder: string;
  collections: CollectionType[];
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  placeholder,
  collections,
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

//   console.log(value)

  return (
    <div>
      <Command className="overflow-visible bg-white">
        <CommandInput
          placeholder={placeholder}
          value={inputValue}
          onValueChange={setInputValue}
          onBlur={() => setOpen(false)}
          onFocus={() => setOpen(true)}
        />
        <div className="relative mt-2">
          {open && (
            <CommandGroup className="absolute w-full top-0 z-10 overflow-auto border rounded-md shadow-md ">
              {collections.map((collection) => (
                <CommandItem key={collection._id}
                onMouseDown={(e) => e.preventDefault()}
                onSelect = {()=> onChange(collection._id)}>
                  {collection.title}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </div>
      </Command>
    </div>
  );
};

export default MultiSelect;
