import React,{useState} from "react";
import { IconTimeDuration0 } from "@tabler/icons-react";
import { IconChevronDown } from "@tabler/icons-react";
import { IconChevronCompactRight } from "@tabler/icons-react";
import { IconCircle } from "@tabler/icons-react";
import moment from "moment";
import Dropdown from "../components/all-dropdown";
import { IconCheck, IconX } from "@tabler/icons-react";

export function TableDemo() {
  const [dropdownVisible,setDropdownVisible]=useState(true);
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
          onClick: () => console.log("Filter clicked"),
        },
      ],
    },
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
          onClick: () => console.log("Filter clicked"),
        },
      ],
    },
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
          onClick: () => console.log("Filter clicked"),
        },
      ],
    },
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
          onClick: () => console.log("Filter clicked"),
        },
      ],
    },
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
          onClick: () => console.log("Filter clicked"),
        },
      ],
    },
  ];
  const statusOptions = [
    { id: 1, label: "Backlog", icon: <IconCircle size={16} /> },
    { id: 2, label: "Todo", icon: <IconCircle size={16} /> },
    { id: 3, label: "In Progress", icon: <IconCircle size={16} /> },
    { id: 4, label: "Done", icon: <IconCheck size={16} /> },
    { id: 5, label: "Canceled", icon: <IconX size={16} /> },
    { id: 6, label: "Duplicate", icon: <IconX size={16} /> },
  ];

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
                {dropdownVisible ? 
                <IconChevronDown size={12} style={{ margin: "0 auto" }} /> : 
                <IconChevronCompactRight size={12} style={{ margin: "0 auto" }} />
                }
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
            {data.map((issue,index) => (
              <li
                key={index}
                className="flex justify-between p-1 hover:bg-gray-100"
              >
                <div className="flex space-x-2 text-sm">
                <span className="text-gray-500">---</span>
                  <span className="text-gray-500">STU-{issue.id}</span>
                  <span className="text-gray-500"><IconCircle size={17}/></span>
                  
                  <span className="text-gray-800">{issue.title}</span>
                  <span className="text-gray-500">{issue.description}</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-500">
                  {issue.icon.map((iconItem, index) => (
                    <button
                      key={index}
                      onClick={iconItem.onClick}
                      className="text-gray-500 hover:text-gray-700"
                      title={iconItem.name}
                    >
                      {iconItem.icon}
                    </button>
                  ))}

                  <span className="text-sm text-gray-500">{issue.createdAt}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
