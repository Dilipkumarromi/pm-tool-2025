import React, { useState } from 'react';

const statuses = [
  { id: 1, name: 'Backlog', icon: 'loading' },
  { id: 2, name: 'Todo', icon: 'circle' },
  { id: 3, name: 'In Progress', icon: 'dot-yellow' },
  { id: 4, name: 'Done', icon: 'check' },
  { id: 5, name: 'Canceled', icon: 'x' },
  { id: 6, name: 'Duplicate', icon: 'x' },
];

const AllDropdown = () => {
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(1); // Default to Backlog

  const getIcon = (status: { icon: string; }) => {
    switch (status.icon) {
      case 'loading':
        return <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-transparent"></span>;
      case 'circle':
        return <span className="h-3 w-3 rounded-full border-2 border-gray-500"></span>;
      case 'dot-yellow':
        return <span className="text-yellow-500 text-lg">●</span>;
      case 'check':
        return <span className="text-blue-600">✔</span>;
      case 'x':
        return <span className="text-gray-400 text-lg">✕</span>;
      default:
        return null;
    }
  };

  return (
    <div className="relative inline-block text-left">
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex w-52 items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
      >
        <span>Change status...</span>
        <kbd className="ml-2 rounded bg-gray-100 px-1 py-0.5 text-xs text-gray-500">S</kbd>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-10 mt-2 w-52 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <ul className="py-1 text-sm text-gray-700">
            {statuses.map((status) => (
              <li
                key={status.id}
                onClick={() => {
                  setSelectedStatus(status.id);
                  setOpen(false);
                }}
                className={`flex cursor-pointer items-center justify-between px-4 py-2 ${
                  selectedStatus === status.id ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  {getIcon(status)}
                  <span>{status.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  {selectedStatus === status.id && <span className="text-gray-500">✔</span>}
                  <span className="text-xs text-gray-400">{status.id}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AllDropdown;
