"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";

interface MultiTextProps {
  placeholder: string;
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiText: React.FC<MultiTextProps> = ({
  placeholder,
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");

  const addTag = (item: string) => {
    onChange(item);
    setInputValue("");
  };

  return (
    <div>
      <Input
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addTag(inputValue);
          }
        }}
      />
      <div className="flex gap-1 flex-warp mt-4">
        {value.map((tag, index) => (
          <Badge key={index} className="bg-green-600 text-white">
            {tag}{" "}
            <div
              className="ml-1 rounded-full outline-none hover:bg-black-2"
              onClick={() => onRemove(tag)}
            >
              <X className="h-3 w-3" />
            </div>
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default MultiText;