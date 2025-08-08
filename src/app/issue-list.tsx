import React, { useState } from "react";
import { IconTimeDuration0 } from "@tabler/icons-react";
import { IconChevronDown } from "@tabler/icons-react";
import { IconChevronCompactRight } from "@tabler/icons-react";
import { IconCircle } from "@tabler/icons-react";
import moment from "moment";

import { IconCheck, IconX } from "@tabler/icons-react";
import AllDropdown from "@/components/all-dropdown";
import ProfileDropdownWithNested from "@/components/profile-dropdown";
import { DropdownMenuIssueAction } from "@/components/dropdown";

export function TableDemo() {
  const [dropdownVisible, setDropdownVisible] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to toggle AllDropdown visibility
  const [profileDropdown,setProfileDropdown] = useState(false);
  const [hoveredUser, setHoveredUser] = useState(false); // State to toggle ProfileDropdown visibility
  const [issueActionDropdown, setIssueActionDropdown] = useState(false); // State for issue action dropdown
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const data = [
    {
      id: 4,
      title: "Connect your tools",
      description: "(3)",
      status: "Open",
      priority: "High",
      createdAt: moment("2023-07-25").format("MMM Do YY"),
      icon: [
        {
          name: "filter",
          icon: <IconTimeDuration0 />,
          onClick: () => setProfileDropdown(!profileDropdown), // Toggle dropdown visibility
        },
      ],
    },
    // Other data items...
  ];
  const statusOptions = [
    { id: 1, label: "Backlog", icon: <IconCircle size={16} /> },
    { id: 2, label: "Todo", icon: <IconCircle size={16} /> },
    { id: 3, label: "In Progress", icon: <IconCircle size={16} /> },
    { id: 4, label: "Done", icon: <IconCheck size={16} /> },
    { id: 5, label: "Canceled", icon: <IconX size={16} /> },
    { id: 6, label: "Duplicate", icon: <IconX size={16} /> },
  ];
  const dropdownName=[
    "All Issues",
    "My Issues",
    "Assigned to me",
    "Reported by me",
    "Issues I am watching",
    "Issues in my projects",
    "Issues in my teams",
  ]
  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault()
    setPosition({ x: event.clientX, y: event.clientY })
    setIssueActionDropdown(!issueActionDropdown);
  }
  return (
    <div className="bg-white shadow-md rounded-md">
      {/* Header */}
      <div className="flex items-center justify-between  border-b">
        <div className="flex items-center justify-between w-full">
          <span
            className="text-sm  cursor-pointer"
            // onClick={() => setDropdownVisible(!dropdownVisible)}
          >
            <span
              className="flex cursor-pointer p-1"
              onClick={() => setDropdownVisible(!dropdownVisible)}
            >
              {dropdownVisible ? (
                <IconChevronDown size={12} style={{ margin: "0 auto" }} />
              ) : (
                <IconChevronCompactRight
                  size={12}
                  style={{ margin: "0 auto" }}
                />
              )}
              <span className="text-sm ml-2">Todo {data.length}</span>
            </span>
          </span>
        </div>
        <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center">
          <span className="material-icons mr-3">+</span>
        </button>
      </div>

      {/* Table */}
      {dropdownVisible && (
        <div className="p-2">
          <ul className="space-y-1 ">
            {data.map((issue, index) => (
              <li
                key={index}
                className="flex justify-between p-1 hover:bg-gray-100"
                onContextMenu={(e) => {
                  e.preventDefault();
                 
                  handleClick(e);
                }}
              >
                <div className="flex space-x-2 text-sm">
                    <span
                    className="text-gray-500 cursor-pointer"
                     
                    >
                    ---
                    </span>
                  <span className="text-gray-500">STU-{issue.id}</span>
                  <span className="text-gray-500">
                    <IconCircle size={17} />
                  </span>

                  <span className="text-gray-800">{issue.title}</span>
                  <span className="text-gray-500">{issue.description}</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-500">
                  {issue.icon.map((iconItem, index) => (
                      <button
                        key={index}
                        // onClick={() => {
                        //   iconItem.onClick();
                        // }}
                        className="text-sm text-gray-500 hover:text-gray-700"
                      >
                        {iconItem.icon}
                      </button> 
                  ))}

                  <span className="text-sm text-gray-500">
                    {issue.createdAt}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* AllDropdown */}
      {dropdownOpen && (
        <div className="absolute top-20 right-10">
          <AllDropdown isOpen={dropdownOpen} />
       
        </div>
      )}
      {/* ProfileDropdown */}
        <div className="z-2 float-left">
          {/* ProfileDropdown */}
          
          {issueActionDropdown && (
          //   <div className="absolute z-10 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg">
          //     <ul className="py-1 text-sm text-gray-700">
          // <li className="flex justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer">
          //   <span className="flex items-center gap-2">
          //     <span className="text-gray-400">🌤</span>No Assignee
          //   </span>
          //   <span className="text-gray-400 text-xs">0</span>
          // </li>

          // {/* Nested user with hover */}
          // <li
          //   className="relative px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
          //   onMouseEnter={() => setHoveredUser(true)}
          //   onMouseLeave={() => setHoveredUser(false)}
          // >
          //   <img
          //     src="https://i.pravatar.cc/24"
          //     alt="avatar"
          //     className="w-6 h-6 rounded-full"
          //   />
          //   romi.indan
          //   <span className="ml-auto text-green-500">✔</span>

          //   {/* Hover card */}
          //   {hoveredUser && (
          //     <div className="absolute top-0 left-full ml-2 w-64 bg-white rounded-lg border border-gray-200 shadow-lg p-4 text-sm z-50">
          //       <div className="flex items-center gap-3">
          //   <img
          //     src="https://i.pravatar.cc/40"
          //     alt="avatar"
          //     className="w-10 h-10 rounded-full"
          //   />
          //   <div>
          //     <div className="font-semibold">Dilip kumar romi</div>
          //     <div className="text-gray-500">
          //       romi.indan • <span className="text-green-600">Online</span>
          //     </div>
          //   </div>
          //       </div>
          //       <hr className="my-2" />
          //       <div className="flex items-center gap-2 text-gray-500">
          //   <span>🕒</span> 20:13 local time
          //       </div>
          //       <div className="flex items-center gap-2 text-gray-500 mt-1">
          //   <span>🎓</span> Student test
          //       </div>
          //     </div>
          //   )}
          // </li>

          // <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-500">
          //   Invite and assign...
          // </li>
          //     </ul>
          //   </div>
          <DropdownMenuIssueAction dropdownPosition={{ x: position.x, y: position.y }} />
          
          )}
        </div>
    </div>
  );
}
