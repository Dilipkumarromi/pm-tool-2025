/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";
import EditTextDetailsPage from "@/components/model/projectActionDropdown/edit-text";
import { SidebarRight } from "@/components/sidebar-right";
import { useState } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { Smile, Paperclip, Upload } from "lucide-react";
import { Star, Ellipsis } from "lucide-react";
import EditTextDetailsRecreate from "@/components/model/projectActionDropdown/issue-details-re-create";
const activities = [
  {
    id: 1,
    type: "create",
    text: "Linear created the issue",
    time: "2mo ago",
    icon: "🔗",
  },
  {
    id: 2,
    type: "assign",
    user: "Dilip kumar romi",
    text: "self-assigned the issue and added to project Assign",
    time: "7w ago",
    avatar:
      "https://www.dashboard.iihn.in/upload-file/director_signature-1698897916308.png",
  },
  {
    id: 3,
    type: "priority",
    user: "Dilip kumar romi",
    text: "set priority to Urgent and added label",
    label: "Feature",
    time: "7w ago",
    avatar:
      "https://www.dashboard.iihn.in/upload-file/director_signature-1698897916308.png",
  },
  {
    id: 4,
    type: "comment",
    user: "Dilip kumar romi",
    text: "Test",
    time: "7w ago",
    avatar:
      "https://www.dashboard.iihn.in/upload-file/director_signature-1698897916308.png",
    comment: true,
  },
  {
    id: 5,
    type: "status",
    user: "Dilip kumar romi",
    text: "moved from Done to Backlog",
    time: "5w ago",
    avatar:
      "https://www.dashboard.iihn.in/upload-file/director_signature-1698897916308.png",
  },
  {
    id: 6,
    type: "due-date",
    user: "Dilip kumar romi",
    text: "changed the due date from Aug 9 to Aug 22",
    time: "5w ago",
    avatar:
      "https://www.dashboard.iihn.in/upload-file/director_signature-1698897916308.png",
  },
];
export default function IssueDetailsPage() {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [addIssue, setAddIssue] = useState(false);
  const onEmojiClick = (emojiData: EmojiClickData) => {
    setShowEmojiPicker(false);
    // Future: insert emoji into editor
  };
  const handleClick = () => {
    setIsActive(!isActive);
  };
  const handleAddIssue = () => {
    setAddIssue(!addIssue);
  };
  return (
    <div className="flex flex-col h-screen bg-[#fafbfc]">
      {/* Header - Fixed height */}
      <div
        className="border-1 px-4 py-2 flex items-center justify-between"
        style={{
          width: "75%",
          background: "linear-gradient(to right, #fcfcfc 0%, #fcfcfc 100%)",
        }}
      >
        <h1 className="text-md font-semibold flex items-center gap-3">
          Issue Details{" "}
          <Star
            size={15}
            color={isActive ? "#f1bd00" : "#A0AEC0"}
            className="cursor-pointer transition-colors duration-300"
            onClick={handleClick}
          />{" "}
          <Ellipsis size={17} />
        </h1>
      </div>

      {/* Main Area - Only this should scroll */}
      <div className="flex flex-1 overflow-hidden">
        {/* Scrollable Main Content */}
        <main className="px-12 py-8 overflow-y-auto" style={{ width: "75%" }}>
          {/* Your editable content */}
          <EditTextDetailsPage />

          {/* Emoji + Add Issue */}
          <div>
            <div className="relative">
              <button
                type="button"
                className="text-gray-600 hover:text-yellow-500"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <Smile size={15} />
              </button>

              {showEmojiPicker && (
                <div className="absolute bottom-12 right-0 z-50">
                  <EmojiPicker onEmojiClick={onEmojiClick} />
                </div>
              )}
            </div>
            <span
              className="text-gray-500 hover:text-gray-600 cursor-pointer text-sm"
              onClick={handleAddIssue}
            >
              + Add sub-issue
            </span>

            {addIssue && (
              <div >
                <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-200">
                 <EditTextDetailsRecreate />

                  <div className="flex justify-between items-center pt-2">
                    <div className="flex space-x-2">
                      <button className="flex items-center px-3 py-1 text-sm font-semibold rounded-md bg-yellow-100 text-yellow-800 border border-yellow-300">
                        <span className="mr-1">🏆</span>
                        STU
                      </button>
                      <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-md">
                        <span className="text-xl">...</span>{" "}
                      </button>
                      <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-md">
                        <span className="text-xl">⚙️</span>{" "}
                      </button>
                      <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-md">
                        <span className="text-xl">⛭</span>{" "}
                      </button>
                      <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-md">
                        <span className="text-xl">...</span>{" "}
                      </button>
                    </div>

                    <div className="flex space-x-3 items-center">
                      <button
                        className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
                        aria-label="Attach file"
                      >
                        <span className="text-xl">📎</span>{" "}
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-md text-sm font-medium">
                        Cancel
                      </button>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm font-medium transition duration-150 ease-in-out">
                        Create
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Activity */}
            <div className="mb-4">
              <hr className="m-4" />
              <h2 className="text-sm font-semibold">Activity</h2>
              <div className="relative border-l-2 border-gray-200 ml-4 space-y-4 mt-4">
                {activities.map((item) => (
                  <div key={item.id} className="flex items-start relative">
                    <span className="absolute -left-3 top-1 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs">
                      {item.icon || item.user?.charAt(0)}
                    </span>
                    <div className="ml-6">
                      <div className="text-sm text-gray-700">
                        {item.user && (
                          <span className="font-sm">{item.user} </span>
                        )}
                        {item.text}{" "}
                        {item.label && (
                          <span className="ml-1 text-purple-500 font-medium">
                            • {item.label}
                          </span>
                        )}
                        {item.time && (
                          <span className="text-sm text-black-400 ">
                            {item.time}
                          </span>
                        )}
                      </div>
                      {item.comment && (
                        <div className="border rounded-lg p-3 mt-2 bg-gray-50">
                          <p className="text-sm text-gray-800">
                            {item.comment}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* Sidebar */}
        <div style={{ width: "20%" }} className="h-full overflow-hidden">
          <SidebarRight />
        </div>
      </div>
    </div>
  );
}
