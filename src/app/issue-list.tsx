"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation"; // Correct router import
import {
  CircleDotDashed,
  Cable,
  CircleFadingPlus,
  ListPlus,
  PlusCircle,
  MessageCircle,
  Move,
  CircleX,
  Headset,
} from "lucide-react";
import "./new-globals.css";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  useDroppable,
} from "@dnd-kit/core";
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
  IconAdjustmentsHorizontal,
  IconFilter2,
  IconCopy,
  IconPercentage60,
  IconForbidFilled,
} from "@tabler/icons-react";
import moment from "moment";

import { DropdownMenuIssueAction } from "@/components/dropdown";
import { IssueStatus } from "@/components/issue-status";
import IssueModel from "@/components/model/IssueModel";
import { UserProfileAssign } from "@/components/profile-dropdown";
import { TooltipMessage } from "@/components/tooltip";
import ChatWindow from "@/components/chat";
import { CommonDropdown } from "@/components/model/projectActionDropdown/actionDropdown";
import { Button } from "rsuite";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { encryptQuery } from "@/lib/encryption";

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
  onStatus,
}: {
  issue: Issue;
  sectionType: string;
  onRightClick: (e: React.MouseEvent) => void;
  onStatusClick: (issue: Issue) => void;
  isDragging: boolean;
  onModalOpen: (size?: string) => void;
  onIssuePriority: (e: React.MouseEvent) => void;
  onChatWindow: () => void;
  onStatus: (e: React.MouseEvent) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: issue.id.toString(),
      data: {
        type: sectionType,
        id: issue.id,
      },
    });

  const router = useRouter();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: transform ? 999 : "auto",
    backgroundColor: transform ? "#f8f8f8" : "white",
    border: transform ? "1px dashed #60a5fa" : "none",
    boxShadow: transform ? "0 4px 8px rgba(96, 165, 250, 0.4)" : "none",
  };

  const handleNavigate = (id: number): void => {
    // router.push(`/issue-details/${encodeURI(encryptQuery(id))}`);
    router.push(`/issue-details/4`);
  };

  return (
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
      <div className="flex space-x-1 text-sm gap-2 items-center px-1">
        {/* Drag Handle */}
        <span
          className="text-gray-500 cursor-grab select-none cursor-pointer"
          onClick={onIssuePriority}
        >
          ---
        </span>

        {/* Static ID */}
        <span
          className="text-gray-500 text-sm cursor-all-scroll"
          {...attributes}
          {...listeners}
          aria-describedby={`DndDescribedBy-${issue.id}`} // stable id
        >
          STU-{issue.id}
        </span>

        {/* Status Circle Icon */}
        <span
          className="text-gray-500 text-sm cursor-pointer"
          onClick={() => onStatusClick(issue)}
        >
          <IconCircle size={17} onClick={onStatus} />
        </span>

        {/* Title & Description */}
        <span
          className="text-gray-800 text-sm cursor-pointer"
          onClick={() => handleNavigate(issue.id)}
        >
          {issue.title}
        </span>

        <span className="text-gray-500 text-sm">{issue.description}</span>

        {/* Cable Icon Button */}
        <span
          className="m-1 ml-2 cursor-pointer"
          onClick={() => {
            onStatusClick(issue);
            onChatWindow();
          }}
        >
          <Headset size={15} color="green" />
          {/* <TooltipMessage message="Group Decurion?">
            
          </TooltipMessage> */}
        </span>
      </div>

      <div className="flex items-center space-x-1 text-gray-500 text-md">
        <UserProfileAssign />
        <span className="text-sm">{issue.createdAt}</span>
      </div>
    </li>
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
      icon: <CircleX size={18} color="red" />,
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
      icon: <CircleX size={18} color="green" />,
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
      icon: <CircleX size={18} color="blue" />,
      issue_list: [
        {
          id: 3,
          title: "Migrate to new API",
          description: "(2)",
          status: "Cancelled",
          priority: "Low",
          type: "cancel",
          createdAt: moment("2023-07-27").format("MMM Do YY"),
          icon: <CircleX />,
        },
      ],
    },
    {
      type: "done",
      icon: <CircleX size={18} color="red" />,
      issue_list: [
        {
          id: 4,
          title: "Finalize deployment",
          description: "(1)",
          status: "Closed",
          priority: "High",
          type: "done",
          createdAt: moment("2023-07-28").format("MMM Do YY"),
          icon: <CircleX />,
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

    const sourceSection = data.find((section) => section.type === sourceType);
    const destinationSection = data.find(
      (section) => section.type === destinationType
    );
    if (!sourceSection || !destinationSection) return;

    const draggedItemIndex = sourceSection.issue_list.findIndex(
      (item) => item.id.toString() === active.id.toString()
    );
    const draggedItem = sourceSection.issue_list[draggedItemIndex];

    if (sourceType === destinationType) {
      const overIndex = sourceSection.issue_list.findIndex(
        (item) => item.id.toString() === over.id.toString()
      );

      const updatedList = [...sourceSection.issue_list];
      updatedList.splice(draggedItemIndex, 1);
      updatedList.splice(overIndex, 0, draggedItem);

      setData((prevData) =>
        prevData.map((section) =>
          section.type === sourceType
            ? { ...section, issue_list: updatedList }
            : section
        )
      );
    } else {
      const updatedSourceList = [...sourceSection.issue_list];
      updatedSourceList.splice(draggedItemIndex, 1);

      const updatedDestinationList = [
        ...destinationSection.issue_list,
        { ...draggedItem, type: destinationType },
      ];

      setData((prevData) =>
        prevData.map((section) => {
          if (section.type === sourceType) {
            return { ...section, issue_list: updatedSourceList };
          } else if (section.type === destinationType) {
            return { ...section, issue_list: updatedDestinationList };
          }
          return section;
        })
      );
    }
  };

  // Drag Overlay issue
  const activeIssue =
    activeId &&
    data
      .flatMap((section) => section.issue_list)
      .find((issue) => issue.id.toString() === activeId);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalSize, setModalSize] = useState("md");
  const [openChat, setOpenChat] = useState(false);
  const [priorityOpen, setPriorityOpen] = useState(false);
  const [isStatus, setStatus] = useState(false);
  const [priorityDropdownPos, setPriorityDropdownPos] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const modalRef = useRef<{ openModal: () => void; closeModal: () => void }>(
    null
  );

  const chatWindow = () => {
    setOpenChat(true);
  };

  return (
    <>
      <header className="bg-background sticky top-0 flex h-12 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-0" />
        <div className="flex justify-between items-center w-full">
          {/* Left */}
          <div className="float-right p-1 ml-5 gap-2 flex">
            <Button appearance="subtle" size="sm" title="All issue">
              <IconCopy size={17} /> All issue
            </Button>
            <Button appearance="subtle" size="sm" title="Action">
              <IconPercentage60 /> Action
            </Button>
            <Button appearance="subtle" size="sm" title="Backlogs">
              <IconForbidFilled /> Backlogs
            </Button>
          </div>
          {/* Right */}
          <div className="float-left p-1 mr-5 gap-2 flex">
            <Button appearance="subtle" title="Filter">
              <IconFilter2 />
            </Button>
            <Button appearance="subtle" size="sm" title="Display">
              <IconAdjustmentsHorizontal /> Display
            </Button>
          </div>
        </div>
      </header>

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
      >
        <div className="bg-white rounded-md relative mb-1">
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
                    <span className="flex cursor-pointer p-1 items-center">
                      <span className="flex items-center justify-center">
                        {dropdownStates[section.type] ? (
                          <IconChevronDown size={12} />
                        ) : (
                          <IconChevronCompactRight size={12} />
                        )}
                      </span>

                      <span className="text-sm font-semibold ml-2 capitalize">
                        <div className="flex items-center gap-1">
                          <span className="flex items-center justify-center p-0 rounded-full bg-gray-100">
                            {section.icon}
                          </span>
                          <span className="px-0 py-1">{section.type}</span>
                          <span className="px-2 py-1">
                            {section.issue_list.length}
                          </span>
                        </div>
                      </span>
                    </span>
                  </span>
                </div>
                <button
                  className="text-md text-gray-500 flex items-center"
                  onClick={() => modalRef.current?.openModal()}
                >
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
                            onModalOpen={() => modalRef.current?.openModal()}
                            onChatWindow={chatWindow}
                            onIssuePriority={(e) => {
                              const rect = (
                                e.target as HTMLElement
                              ).getBoundingClientRect();
                              setPriorityDropdownPos({
                                x: rect.left,
                                y: rect.bottom,
                              });
                              setPriorityOpen(true);
                              setStatus(false);
                            }}
                            onStatus={(e) => {
                              const rect = (
                                e.target as HTMLElement
                              ).getBoundingClientRect();
                              setPriorityDropdownPos({
                                x: rect.left,
                                y: rect.bottom,
                              });
                              setPriorityOpen(true);
                              setStatus(true);
                            }}
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

          {/* Right-click Menu */}
          {showContextMenu && contextMenuPosition && (
            <div
              className="absolute z-50"
              style={{
                top: contextMenuPosition.y,
                left: contextMenuPosition.x,
              }}
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

          {/* Status Dropdown */}
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

          {/* Drag Overlay */}
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
              chatType="group"
              chatName="Project Group"
              avatar="https://i.pravatar.cc/40?img=52"
              members={[
                {
                  id: 1,
                  name: "Alice",
                  avatar: "https://i.pravatar.cc/40?img=40",
                },
                {
                  id: 2,
                  name: "Bob",
                  avatar: "https://i.pravatar.cc/40?img=50",
                },
              ]}
              onClose={() => setOpenChat(false)}
            />
          )}

          {/* Priority Dropdown */}
          {priorityOpen && priorityDropdownPos && (
            <CommonDropdown
              open={priorityOpen}
              frameworks={
                isStatus
                  ? [
                      { value: "low", label: "Low" },
                      { value: "medium", label: "Medium" },
                      { value: "high", label: "High" },
                    ]
                  : [
                      { value: "todo", label: "To Do" },
                      { value: "in_progress", label: "In Progress" },
                      { value: "done", label: "Done" },
                      { value: "cancel", label: "Cancelled" },
                    ]
              }
              onOpenChange={setPriorityOpen}
              style={{
                position: "absolute",
                zIndex: 50,
                left: priorityDropdownPos.x,
                top: priorityDropdownPos.y,
              }}
            />
          )}
        </div>
      </DndContext>
    </>
  );
}

export default TableDemo;
