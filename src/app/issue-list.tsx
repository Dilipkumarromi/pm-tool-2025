/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useRef, useState } from "react";
import {
  CircleDotDashed,
  Cable,
  CircleFadingPlus,
  ListPlus,
  PlusCircle,
  MessageCircle,
} from "lucide-react";

import {
  DndContext,
  closestCenter,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  useDroppable,
} from "@dnd-kit/core";
import { Badge } from "@/components/ui/badge";

import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  IconChevronDown,
  IconChevronCompactRight,
  IconCircle,
} from "@tabler/icons-react";
import moment from "moment";

import { DropdownMenuIssueAction } from "@/components/dropdown";
import { IssueStatus } from "@/components/issue-status";

import IssueModel from "@/components/model/IssueModel";
import { UserProfileAssign } from "@/components/profile-dropdown";
import { TooltipMessage } from "@/components/tooltip";
import ChatWindow from "@/components/chat";
// import { CommonDropdown } from "@/components/model/projectActionDropdown/actionDropdown";
 

// Issue type
interface Issue {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  type: string;
  createdAt: string;
}

// Sortable Item
function SortableItem({
  issue,
  sectionType,
  onRightClick,
  onStatusClick,
  isDragging,
  onModalOpen,
  onIssuePriority,
  onChatWindow,
 // 🔹 parent passes button ref
}: // userProfile
{
  issue: Issue;
  sectionType: string;
  onRightClick: (e: React.MouseEvent) => void;
  onStatusClick: (issue: Issue) => void;
  isDragging: boolean;
  onModalOpen: (size?: string) => void;
  onIssuePriority: () => void;
  onChatWindow: () => void;
    // 🔹 optional ref for dropdown
  // userProfile: (size?: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: issue.id.toString(),
      data: {
        type: sectionType,
        id: issue.id,
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: transform ? 999 : "auto",
    backgroundColor: transform ? "#f8f8f8" : "white",
    border: transform ? "1px dashed #60a5fa" : "none",
    boxShadow: transform ? "0 4px 8px rgba(96, 165, 250, 0.4)" : "none",
  };
  const items1 = [
    {
      label: "No assignee",
      icon: <i className="fa-solid fa-circle"></i>,
      key: 1,
    },
    {
      label: "Team members",
      icon: <i className="fa-solid fa-users"></i>,
      key: 2,
    },
    {
      label: "New user",
      icon: <i className="fa-solid fa-user-plus"></i>,
      key: 3,
    },
    {
      label: "Invite and assign...",
      icon: <i className="fa-solid fa-paper-plane"></i>,
      key: 4,
    },
  ];

  return (
    <>
      <li
        ref={setNodeRef}
        style={style}
        className={`flex justify-between p-1 hover:bg-gray-50 text-md ${
          transform ? "select-none" : ""
        }`}
        onContextMenu={(e) => {
          e.preventDefault();
          onRightClick(e);
        }}
      >
        <div className="flex space-x-1 text-sm items-center">
          {/* Drag Handle */}
          <span
            className="text-gray-500 cursor-grab select-none cursor-pointer"
            onClick={() => onIssuePriority()}
          >
            ---
          </span>

          {/* Static ID */}
          <span className="text-gray-500 text-sm">STU-{issue.id}</span>

          {/* Status Circle Icon */}
          <span
            className="text-gray-500 text-sm cursor-pointer"
            onClick={() => onStatusClick(issue)}
          >
            <IconCircle size={17} />
          </span>

          {/* Title & Description */}
          <span
            className="text-gray-800 text-sm"
            {...attributes}
            {...listeners}
          >
            {issue.title}
          </span>

          <span className="text-gray-500 text-sm">{issue.description}</span>

          {/* Cable Icon Button */}
          <span
            className="m-1 ml-4  cursor-pointer"
            onClick={() => {
              onStatusClick(issue); // keep your existing logic
              onChatWindow(); // also open chat window
            }}
          >
            <TooltipMessage message="Group Decurion?">
              <MessageCircle size={15} />
            </TooltipMessage>
          </span>
        </div>

        <div className="flex items-center space-x-1 text-gray-500 text-md">
          {/* <CircleFadingPlus size={15} className="cursor-pointer" /> */}
          <UserProfileAssign />
          <span className="text-sm">{issue.createdAt}</span>
        </div>
      </li>
    </>
  );
}

// Droppable Container
function DroppableContainer({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { setNodeRef } = useDroppable({
    id,
    data: {
      type: id,
    },
  });

  return (
    <div ref={setNodeRef} className="min-h-[40px]">
      {children}
    </div>
  );
}

// Main Component
export function TableDemo() {
  const [dropdownStates, setDropdownStates] = useState<Record<string, boolean>>(
    {
      todo: true,
      "in progress": true,
      cancel: true,
      done: true,
    }
  );

  const [data, setData] = useState([
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
        },
        {
          id: 5,
          title: "Review design specs",
          description: "(2)",
          status: "Open",
          priority: "Low",
          type: "todo",
          createdAt: moment("2023-07-25").format("MMM Do YY"),
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
        },
      ],
    },
  ]);

  const [contextMenuPosition, setContextMenuPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [activeIssueForStatus, setActiveIssueForStatus] =
    useState<Issue | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const toggleDropdown = (type: string) => {
    setDropdownStates((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
    setShowContextMenu(true);
  };

  const handleStatusClick = (issue: Issue) => {
    setActiveIssueForStatus(issue);
  };

  const onDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id as string);
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const sourceType = active.data.current?.type;
    const destinationType = over.data.current?.type;

    if (!sourceType || !destinationType) return;

    const sourceId = active.id;
    const destinationId = over.id;

    const sourceSection = data.find((section) => section.type === sourceType);
    const destinationSection = data.find(
      (section) => section.type === destinationType
    );
    if (!sourceSection || !destinationSection) return;

    const draggedItemIndex = sourceSection.issue_list.findIndex(
      (item) => item.id.toString() === sourceId.toString()
    );
    const draggedItem = sourceSection.issue_list[draggedItemIndex];

    if (sourceType === destinationType) {
      const overIndex = sourceSection.issue_list.findIndex(
        (item) => item.id.toString() === destinationId.toString()
      );

      const updatedList = [...sourceSection.issue_list];
      updatedList.splice(draggedItemIndex, 1);
      updatedList.splice(overIndex, 0, draggedItem);

      const updatedSections = data.map((section) =>
        section.type === sourceType
          ? { ...section, issue_list: updatedList }
          : section
      );
      setData(updatedSections);
    } else {
      const updatedSourceList = [...sourceSection.issue_list];
      updatedSourceList.splice(draggedItemIndex, 1);

      const updatedDestinationList = [
        ...destinationSection.issue_list,
        { ...draggedItem, type: destinationType },
      ];

      const updatedSections = data.map((section) => {
        if (section.type === sourceType) {
          return { ...section, issue_list: updatedSourceList };
        } else if (section.type === destinationType) {
          return { ...section, issue_list: updatedDestinationList };
        }
        return section;
      });

      setData(updatedSections);
    }
  };

  // Find dragged issue for overlay rendering
  const activeIssue =
    activeId &&
    data
      .flatMap((section) => section.issue_list)
      .find((issue) => issue.id.toString() === activeId);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalSize, setModalSize] = useState("md");
  const [openChat, setOpenChat] = useState(false);
  const [priorityOpen, setPriorityOpen] = useState(false);
  const [value, setValue] = useState("")
  const handleOpenModal = (size = "md") => {
    setModalSize(size);
    setModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const modalRef = useRef<{ openModal: () => void; closeModal: () => void }>(
    null
  );
  const chatWindow = () => {
    setOpenChat(true);
  };
  const anchorRef = useRef<HTMLButtonElement>(null) 
  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
    >
      <div className="bg-white  rounded-md relative mb-1">
        {data.map((section) => (
          <SortableContext
            key={section.type}
            items={section.issue_list.map((issue) => issue.id.toString())}
            strategy={verticalListSortingStrategy}
          >
            <div className="flex items-center justify-between border bg-gray-100">
              <div className="flex items-center justify-between w-full">
                <span
                  className="text-sm cursor-pointer"
                  onClick={() => toggleDropdown(section.type)}
                >
                  <span className="flex cursor-pointer p-1">
                    {dropdownStates[section.type] ? (
                      <IconChevronDown size={12} />
                    ) : (
                      <IconChevronCompactRight size={12} />
                    )}

                    <span className="text-sm font-semibold ml-2 capitalize">
                      {section.type} {section.issue_list.length}
                    </span>
                  </span>
                </span>
              </div>

              <button
                className="text-md text-gray-500 hover:text-gray-500 flex items-center"
                onClick={() => modalRef.current?.openModal()}
              >
                {/* <span className="material-icons mr-5 cursor-pointer">+</span> */}
                <TooltipMessage message="Add task">
                  <ListPlus size={20} className="cursor-pointer mr-4" />
                </TooltipMessage>
              </button>
            </div>

            {dropdownStates[section.type] && (
              <div className="p-1">
                <DroppableContainer id={section.type}>
                  <ul className="space-y-1 p-1">
                    {section.issue_list.length > 0 ? (
                      section.issue_list.map((issue) => (
                        <SortableItem
                          key={issue.id}
                          issue={issue}
                          sectionType={section.type}
                          onRightClick={handleRightClick}
                          onStatusClick={handleStatusClick}
                          isDragging={activeId === issue.id.toString()}
                          onModalOpen={handleOpenModal}
                          onChatWindow={chatWindow}
                          onIssuePriority={() => setPriorityOpen((prev) => !prev)} 
                          
                          // userProfile={setUserProfile("sm")}
                        />
                      ))
                    ) : (
                      <li className="h-12 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-md text-gray-400">
                        Drop here
                      </li>
                    )}
                  </ul>
                </DroppableContainer>
              </div>
            )}
          </SortableContext>
        ))}

        {/* Right-click Dropdown */}
        {showContextMenu && contextMenuPosition && (
          <div
            className="absolute z-50"
            style={{ top: contextMenuPosition.y, left: contextMenuPosition.x }}
          >
            <DropdownMenuIssueAction
              dropdownPosition={contextMenuPosition}
              isOpen={showContextMenu}
              onOpenChange={setShowContextMenu}
              onActionSelect={(action) => {
                console.log("Selected:", action);
                setShowContextMenu(false);
              }}
            />
          </div>
        )}

        {/* Icon-click Issue Status Dropdown */}
        {activeIssueForStatus && (
          <div className="absolute top-20 right-10 z-50">
            <IssueStatus
              isOpen={!!activeIssueForStatus}
              dropdownPosition={contextMenuPosition}
              onOpenChange={setShowContextMenu}
              onActionSelect={(action) => {
                console.log("Selected:", action);
                setShowContextMenu(false);
              }}
            />
          </div>
        )}

        {/* Drag Overlay for visual feedback */}
        <DragOverlay>
          {activeIssue ? (
            <div className="bg-white border border-blue-400 shadow-lg rounded px-2 py-1 text-sm text-gray-800 pointer-events-none select-none">
              {activeIssue.title}
            </div>
          ) : null}
        </DragOverlay>

        <IssueModel ref={modalRef} />
        {openChat && (
          <ChatWindow
            chatType="group" // or "single"
            chatName="Project Group"
            avatar="https://i.pravatar.cc/40?img=52"
            members={[
              {
                id: 1,
                name: "Alice",
                avatar: "https://i.pravatar.cc/40?img=40",
              },
              { id: 2, name: "Bob", avatar: "https://i.pravatar.cc/40?img=50" },
            ]}
            onClose={() => setOpenChat(false)}
          />
        )}
        {/* IssuePriority dropdown, controlled by parent */}
        {/* {
          priorityOpen && ( <CommonDropdown />)
        } */}
       
      </div>
    </DndContext>
  );
}
