"use client";
import React, { useState, useRef, useEffect } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { Send, Smile, Paperclip } from "lucide-react";

type Message = {
  id: number;
  sender: string;
  text?: string;
  image?: string;
  file?: string;
  replyTo?: Message;
};

type User = {
  id: number;
  name: string;
  avatar: string;
  email?: string;
  mobile?: string;
};

type ChatWindowProps = {
  chatType: "single" | "group";
  chatName: string;
  avatar: string;
  members?: User[];
  onClose: () => void;
};

export default function ChatWindow({
  chatType,
  chatName,
  avatar,
  members = [],
  onClose,
}: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [chatMembers, setChatMembers] = useState<User[]>(members);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showUserList, setShowUserList] = useState(false);
  const [replyTo, setReplyTo] = useState<Message | null>(null);
  const [dropdownMessageId, setDropdownMessageId] = useState<number | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const availableUsers: User[] = [
    {
      id: 101,
      name: "Alice Johnson",
      avatar: "https://i.pravatar.cc/40?img=11",
      email: "alice@example.com",
      mobile: "111-222-3333",
    },
    {
      id: 102,
      name: "Bob Williams",
      avatar: "https://i.pravatar.cc/40?img=12",
      email: "bob@example.com",
      mobile: "444-555-6666",
    },
    {
      id: 103,
      name: "Charlie Singh",
      avatar: "https://i.pravatar.cc/40?img=13",
      email: "charlie@example.com",
      mobile: "777-888-9999",
    },
    {
      id: 104,
      name: "Daisy Kapoor",
      avatar: "https://i.pravatar.cc/40?img=14",
      email: "daisy@example.com",
      mobile: "999-000-1234",
    },
  ];

  const dropdownUsers = availableUsers.filter(
    (u) => !chatMembers.some((m) => m.id === u.id)
  );

  const sendMessage = (customText?: string) => {
    if (!customText && !newMessage && !file) return;
    const msg: Message = {
      id: Date.now(),
      sender: "You",
      text: customText || newMessage || undefined,
      image:
        file && file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : undefined,
      file: file && !file.type.startsWith("image/") ? file.name : undefined,
      replyTo: replyTo || undefined,
    };
    setMessages((prev) => [...prev, msg]);
    setNewMessage("");
    setFile(null);
    setReplyTo(null);
  };

  const addUser = () => {
    setShowUserList((s) => !s);
  };

  const selectUser = (user: User) => {
    if (chatMembers.find((u) => u.id === user.id)) return;
    setChatMembers((prev) => [...prev, user]);
    setShowUserList(false);
  };

  const removeUser = (id: number) => {
    setChatMembers((prev) => prev.filter((u) => u.id !== id));
  };

  // ✅ Auto-send when emoji is selected
  const onEmojiClick = (emojiData: EmojiClickData) => {
    setShowEmojiPicker(false);
    sendMessage(emojiData.emoji);
  };

  const handleDeleteForEveryone = (id: number) => {
    setMessages(messages.filter((msg) => msg.id !== id));
    setDropdownMessageId(null);
  };

  const handleDeleteForMe = (id: number) => {
    // Replace with "This message was deleted" only for me
    setMessages(
      messages.map((msg) =>
        msg.id === id ? { ...msg, text: "Message deleted for me" } : msg
      )
    );
    setDropdownMessageId(null);
  };
  return (
    <div className="fixed bottom-0 right-6 w-80 bg-white shadow-lg rounded-t-lg border flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between bg-blue-400 text-white p-1 rounded-t-lg relative">
        <div className="flex items-center gap-2">
          <img src={avatar} alt={chatName} className="w-8 h-8 rounded-full" />
          <div className="leading-tight">
            <p className="font-semibold">{chatName}</p>
            {chatType === "group" && (
              <button onClick={addUser} className="text-xs underline ml-1">
                + Add
              </button>
            )}
          </div>
        </div>
        <button onClick={onClose} className="font-bold">
          ×
        </button>

        {/* Dropdown */}
        {chatType === "group" && showUserList && (
          <div className="absolute left-2 -top-2 -translate-y-full w-72 max-h-64 overflow-y-auto
                       bg-white text-gray-800 border rounded shadow-xl z-50"
          >
            <div className="p-2 border-b font-semibold text-sm">Add member</div>
            {dropdownUsers.length === 0 ? (
              <div className="p-3 text-xs text-gray-500">
                No more users to add
              </div>
            ) : (
              dropdownUsers.map((user) => (
                <button
                  key={user.id}
                  onClick={() => selectUser(user)}
                  className="w-full text-left p-2 hover:bg-gray-100 flex items-start gap-2"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full mt-0.5"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium leading-5">
                      {user.name}
                    </div>
                    <div className="text-[11px] text-gray-500">
                      {user.email}
                    </div>
                    <div className="text-[11px] text-gray-500">
                      {user.mobile}
                    </div>
                  </div>
                  <span className="text-blue-400 text-xs mt-1">Add</span>
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {/* Group Members */}
      {chatType === "group" && (
        <div className="flex gap-2 overflow-x-auto p-2 border-b">
          {chatMembers.map((u) => (
            <div key={u.id} className="flex flex-col items-center text-xs">
              <img src={u.avatar} className="w-8 h-8 rounded-full" />
              <p className="mt-1 max-w-[64px] truncate">{u.name}</p>
              <button
                onClick={() => removeUser(u.id)}
                className="text-red-500 text-[10px]"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2 bg-gray-50 max-h-64">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="flex flex-col items-start border-l-2 border-transparent hover:border-blue-300 p-1"
          >
            {msg.replyTo && (
              <div className="text-xs bg-gray-200 px-2 py-1 rounded mb-1 text-gray-600">
                Replying to{" "}
                <span className="font-semibold">{msg.replyTo.sender}</span>:{" "}
                {msg.replyTo.text || msg.replyTo.file || "📷 image"}
              </div>
            )}
            <p className="text-xs font-bold">{msg.sender}</p>
            {msg.text && (
              <p className="bg-blue-100 px-2 py-2 rounded">{msg.text}</p>
            )}
            {msg.image && (
              <img src={msg.image} alt="attachment" className="w-32 rounded" />
            )}
            {msg.file && (
              <div className="flex items-center gap-1 text-sm bg-gray-200 px-2 py-1 rounded">
                📄 {msg.file}
              </div>
            )}
            <div className="flex gap-2 text-xs mt-1">
              <button onClick={() => setReplyTo(msg)} className="text-blue-500">
                ↩ Reply
              </button>
            </div>
            
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* File/Image Preview */}
      {file && (
        <div className="border-t p-2 bg-gray-50 text-xs flex justify-between items-center">
          <div className="flex items-center gap-2">
            {file.type.startsWith("image/") ? (
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                className="w-12 h-12 object-cover rounded"
              />
            ) : (
              <span className="flex items-center gap-1 text-gray-700">
                📄 {file.name}
              </span>
            )}
          </div>
          <button onClick={() => setFile(null)} className="text-red-500 text-xs">
            ✕
          </button>
        </div>
      )}

      {/* Reply Preview */}
      {replyTo && (
        <div className="border-t p-1 bg-gray-100 text-xs flex justify-between items-center">
          <div className="truncate max-w-[70%]">
            Replying to <span className="font-semibold">{replyTo.sender}</span>:{" "}
            {replyTo.text || replyTo.file || "📷 image"}
          </div>
          <button
            onClick={() => setReplyTo(null)}
            className="text-red-500 text-xs"
          >
            ✕
          </button>
        </div>
      )}

      {/* Input Section */}
      <div className="p-2 border-t flex items-center gap-2 relative">
        {/* Text Input */}
        <input
          className="flex-1 border rounded-full px-3 py-2 text-sm focus:outline-none"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (newMessage.trim() || file)) {
              sendMessage();
            }
            if (e.key === "Tab") {
              e.preventDefault();
              setShowEmojiPicker(true);
            }
          }}
        />

        {/* Emoji Button */}
        <div className="relative">
          <button
            type="button"
            className="text-gray-600 hover:text-yellow-500"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <Smile size={22} />
          </button>

          {showEmojiPicker && (
            <div className="absolute bottom-12 right-0 z-50">
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>

        {/* File Attach Button */}
        <div className="relative">
          <input
            type="file"
            id="fileInput"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <button
            type="button"
            onClick={() => document.getElementById("fileInput")?.click()}
            className="text-gray-600 hover:text-green-500"
          >
            <Paperclip size={22} />
          </button>
        </div>

        {/* Send Button */}
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full"
          onClick={() => sendMessage()}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}
