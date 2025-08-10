'use client'
import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
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
} from "@tabler/icons-react";
import moment from "moment";

import { DropdownMenuIssueAction } from "@/components/dropdown";

// SortableItem Component
interface Issue {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  type: string;
  createdAt: string;
}

function SortableItem({
  issue,
  sectionType,
  onRightClick,
}: {
  issue: Issue;
  sectionType: string;
  onRightClick: (e: React.MouseEvent) => void;
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
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex justify-between p-1 hover:bg-gray-100 cursor-grab"
      onContextMenu={(e) => {
        e.preventDefault();
        onRightClick(e);
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
        <span className="text-sm text-gray-500">{issue.createdAt}</span>
      </div>
    </li>
  );
}

// DroppableContainer for handling empty lists
function DroppableContainer({ id, children }: { id: string; children: React.ReactNode }) {
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

export function TableDemo() {
  const [dropdownStates, setDropdownStates] = useState<Record<string, boolean>>({
    todo: true,
    "in progress": true,
    cancel: false,
    done: false,
  });

  const [issueActionDropdown, setIssueActionDropdown] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    setIssueActionDropdown(true);
  };

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

  const toggleDropdown = (type: string) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [type]: !prevState[type],
    }));
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const sourceType = active.data.current?.type;
    const destinationType = over.data.current?.type;

    if (!sourceType || !destinationType) return;

    const sourceId = active.id;
    const destinationId = over.id;

    const sourceSection = data.find((section) => section.type === sourceType);
    const destinationSection = data.find((section) => section.type === destinationType);

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

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <div className="bg-white shadow-md rounded-md">
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
                    <span className="text-sm ml-2 capitalize">
                      {section.type} ({section.issue_list.length})
                    </span>
                  </span>
                </span>
              </div>
              <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center">
                <span className="material-icons mr-3">+</span>
              </button>
            </div>

            {dropdownStates[section.type] && (
              <div className="p-2">
                <DroppableContainer id={section.type}>
                  <ul className="space-y-1 min-h-[40px]">
                    {section.issue_list.length > 0 ? (
                      section.issue_list.map((issue) => (
                        <SortableItem
                          key={issue.id}
                          issue={issue}
                          sectionType={section.type}
                          onRightClick={handleRightClick}
                        />
                      ))
                    ) : (
                      <li className="h-12 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-sm text-gray-400">
                        Drop here
                      </li>
                    )}
                  </ul>
                </DroppableContainer>
              </div>
            )}
          </SortableContext>
        ))}

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
    </DndContext>
  );
}
