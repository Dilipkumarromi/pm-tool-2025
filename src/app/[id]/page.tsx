/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";
import EditTextDetailsPage from "@/components/model/projectActionDropdown/edit-text";
import { SidebarRight } from "@/components/sidebar-right";
import { useState } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { Smile, Paperclip, Upload } from "lucide-react";
import { Star, Ellipsis } from "lucide-react";
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
    <>
      <div className="flex flex-col min-h-screen bg-[#fafbfc]">
        <div
          className="border-1 px-4 py-2 flex items-center justify-between "
          style={{
            width: "75%",
            backgroundColor:
              "linear-gradient(to right, #fcfcfc 0%, #fcfcfc 100%)",
          }}
        >
          <h1 className="text-md font-semibold flex items-center gap-3">
            Issue Details{" "}
            <Star
              size={15}
              color={isActive ? "#f1bd00" : "#A0AEC0"} // Yellow if active, gray if not
              className="cursor-pointer transition-colors duration-300"
              onClick={handleClick}
            />{" "}
            <Ellipsis size={17} />
          </h1>
        </div>
        <div className="flex flex-1">
          {/* Main Content */}
          <main
            className="px-12 py-8 overflow-y-auto h-full "
            style={{ width: "75%" }}
          >
            {/* Centered Header Block */}
            <div className="mx-auto max-w-2xl"></div>
            <EditTextDetailsPage />
            <div>
              {/* Emoji Button */}
              <div className="relative mb-4">
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
              <div className="mb-4">
                {addIssue && (
                  <div className="mt-4">
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                      placeholder="Enter issue details..."
                    ></textarea>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        // onClick={handleSaveIssue} // Future: implement save functionality
                      >
                        Save
                      </button>
                      <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={handleAddIssue}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="mb-4">
                <h2 className="text-sm font-semibold ">
                  Activity
                </h2>

                <div className="relative border-l-2 border-gray-200 ml-4 space-y-1 mt-4">
                  {activities.map((item) => (
                    <div key={item.id} className="flex items-start relative">
                      {/* Timeline Dot */}
                      <span className="absolute -left-3 top-1 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs">
                        {item.icon || item.user?.charAt(0)}
                      </span>

                      {/* Content */}
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
                        </div>
                        {item.time && (
                          <div className="text-xs text-gray-400 mt-1">
                            {item.time}
                          </div>
                        )}
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
          <div style={{ width: "20%" }}>
            <SidebarRight />
          </div>
        </div>
      </div>
    </>
  );
}
