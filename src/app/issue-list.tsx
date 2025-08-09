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
  const [dropdownStates, setDropdownStates] = useState<Record<string, boolean>>({
    todo: true,
    "in progress": true,
    cancel: false,
    done: false,
  });

  const [issueActionDropdown, setIssueActionDropdown] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null
  );

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    setIssueActionDropdown(true);
  };

  const data = [
    {
      type: "todo",
      issue_list: [
        {
          id: 1,
          title: "Connect your tools",
          description: "(3)",
          status: "Open",
          priority: "High",
          type: "todo",
          createdAt: moment("2023-07-25").format("MMM Do YY"),
          icon: [
            {
              name: "filter",
              icon: <IconTimeDuration0 />,
            },
          ],
        },
      ],
    },
    {
      type: "in progress",
      issue_list: [
        {
          id: 2,
          title: "Build dashboard UI",
          description: "(5)",
          status: "In Progress",
          priority: "Medium",
          type: "in progress",
          createdAt: moment("2023-07-26").format("MMM Do YY"),
          icon: [
            {
              name: "filter",
              icon: <IconTimeDuration0 />,
            },
          ],
        },
      ],
    },
    {
      type: "cancel",
      issue_list: [
        {
          id: 3,
          title: "Migrate to new API",
          description: "(2)",
          status: "Cancelled",
          priority: "Low",
          type: "cancel",
          createdAt: moment("2023-07-27").format("MMM Do YY"),
          icon: [
            {
              name: "filter",
              icon: <IconTimeDuration0 />,
            },
          ],
        },
      ],
    },
    {
      type: "done",
      issue_list: [
        {
          id: 4,
          title: "Finalize deployment",
          description: "(1)",
          status: "Closed",
          priority: "High",
          type: "done",
          createdAt: moment("2023-07-28").format("MMM Do YY"),
          icon: [
            {
              name: "filter",
              icon: <IconTimeDuration0 />,
            },
          ],
        },
      ],
    },
  ];

  const toggleDropdown = (type: string) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [type]: !prevState[type],
    }));
  };

  return (
    <div className="bg-white shadow-md rounded-md">
      {data.map((section) => (
        <div key={section.type}>
          {/* Header */}
          <div className="flex items-center justify-between border bg-gray-100">
            <div className="flex items-center justify-between w-full">
              <span
                className="text-sm cursor-pointer"
                onClick={() => toggleDropdown(section.type)}
              >
                <span className="flex cursor-pointer p-1">
                  {dropdownStates[section.type] ? (
                    <IconChevronDown size={12} style={{ margin: "0 auto" }} />
                  ) : (
                    <IconChevronCompactRight
                      size={12}
                      style={{ margin: "0 auto" }}
                    />
                  )}
                  <span className="text-sm ml-2">
                    {section.type.charAt(0).toUpperCase() +
                      section.type.slice(1)}{" "}
                    {section.issue_list.length}
                  </span>
                </span>
              </span>
            </div>
            <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center">
              <span className="material-icons mr-3">+</span>
            </button>
          </div>

          {/* Issue List */}
          {dropdownStates[section.type] && (
            <div className="p-2">
              <ul className="space-y-1">
                {section.issue_list.map((issue, index) => (
                  <li
                    key={index}
                    className="flex justify-between p-1 hover:bg-gray-100"
                    style={{margin:"0px", padding:"0px"}}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      handleRightClick(e);
                    }}
                  >
                    <div className="flex space-x-1 text-sm">
                      <span className="text-gray-500 cursor-pointer">---</span>
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
                          className="text-sm text-gray-500 "  
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
        </div>
      ))}

      {/* ProfileDropdown */}
      {issueActionDropdown && (
        <div className="absolute top-20 right-10">
          <DropdownMenuIssueAction
            dropdownPosition={position}
            isOpen={issueActionDropdown}
            onOpenChange={setIssueActionDropdown}
            onActionSelect={(action) => {
              console.log("Selected:", action);
              setIssueActionDropdown(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
