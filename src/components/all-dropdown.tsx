import React, { useState } from "react";
import { IconCircle, IconCheck, IconX } from "@tabler/icons-react";

interface DropdownOption {
  id: number;
  label: string;
  icon: React.ReactNode;
}

interface DropdownProps {
  title: string;
  options: DropdownOption[];
  selectedId: number;
  onSelect: (id: number) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ title, options, selectedId, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (id: number) => {
    onSelect(id);
    setIsOpen(false);
  };

  return (
    <div className="relative w-64">
      {/* Dropdown Header */}
      <button
        className="w-full flex items-center justify-between bg-white border rounded-md p-2 shadow-sm hover:bg-gray-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm text-gray-700">{title}</span>
        <span className="material-icons">expand_more</span>
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute mt-2 w-full bg-white border rounded-md shadow-lg z-10">
          <ul className="divide-y divide-gray-200">
            {options.map((option) => (
              <li
                key={option.id}
                className={`flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer ${
                  selectedId === option.id ? "bg-gray-100" : ""
                }`}
                onClick={() => handleSelect(option.id)}
              >
                <div className="flex items-center space-x-2">
                  {option.icon}
                  <span className="text-sm text-gray-700">{option.label}</span>
                </div>
                {selectedId === option.id && <IconCheck size={16} />}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;