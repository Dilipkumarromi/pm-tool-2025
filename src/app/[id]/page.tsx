/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";
import EditTextDetailsPage from "@/components/model/projectActionDropdown/edit-text";
import { SidebarRight } from "@/components/sidebar-right";
import { useState } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { Smile } from "lucide-react";
import {
  Star,
  Ellipsis
} from "lucide-react";
export default function IssueDetailsPage() {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const onEmojiClick = (emojiData: EmojiClickData) => {
    setShowEmojiPicker(false);
    // Future: insert emoji into editor
  };
 const handleClick = () => {
    setIsActive(!isActive);
  };
  return (
    <>
      <div className="flex flex-col min-h-screen bg-[#fafbfc]">
        <div
          className="border-1 px-4 py-2 flex items-center justify-between"
          style={{
            width: "75%",
            backgroundColor:
              "linear-gradient(to right, #fcfcfc 0%, #fcfcfc 100%)",
          }}
        >
          <h1 className="text-md font-semibold flex items-center gap-3">Issue Details <Star
      size={15}
      color={isActive ? "#f1bd00" : "#A0AEC0"} // Yellow if active, gray if not
      className="cursor-pointer transition-colors duration-300"
      onClick={handleClick}
    /> <Ellipsis size={17} /></h1>
        </div>
        <div className="flex flex-1">
          {/* Main Content */}
          <main
            className="px-12 py-8 overflow-y-auto h-full"
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
              <span className="text-gray-500 hover:text-gray-600 cursor-pointer text-sm">
                + Add sub-issue
              </span>
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
