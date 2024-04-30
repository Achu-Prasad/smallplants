"use client";

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
import { Badge } from "../ui/badge";
import { X } from "lucide-react";

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

  let selected: CollectionType[];

  if (value.length === 0) {
    selected = [];
  } else {
    selected = value.map((id) =>
      collections.find((collection) => collection._id === id)
    ) as CollectionType[];
  }
  const selectables = collections.filter((collection)=> !selected.includes(collection))

  //   console.log(value)

  return (
    <div>
      <Command className="overflow-visible bg-white">
        <div className="flex flex-wrap gap-1 border rounded-md">
          {selected.map((collection) => (
            <Badge key={collection._id}>
              {collection.title}
              <button
                className="ml-1 rounded-full outline-none hover:bg-black-2"
                onClick={() => onRemove(collection._id)}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}

          <CommandInput
            placeholder={placeholder}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
          />
        </div>

        <div className="relative mt-2">
          {open && (
            <CommandGroup className="absolute w-full top-0 z-10 overflow-auto border rounded-md shadow-md ">
              {selectables.map((collection) => (
                <CommandItem className="hover:bg-grey-2 cursor-pointer"
                  key={collection._id}
                  onMouseDown={(e) => e.preventDefault()}
                  onSelect={() => {
                    onChange(collection._id)
                    setInputValue("")
                  }
                }
                >
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
