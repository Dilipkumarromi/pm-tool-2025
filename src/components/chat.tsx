"use client"
import React, { useState } from "react"

type Message = {
  id: number
  sender: string
  text?: string
  image?: string
  file?: string
}

type User = {
  id: number
  name: string
  avatar: string
  email?: string
  mobile?: string
}

type ChatWindowProps = {
  chatType: "single" | "group"
  chatName: string
  avatar: string
  members?: User[]
  onClose: () => void
}

export default function ChatWindow({
  chatType,
  chatName,
  avatar,
  members = [],
  onClose,
}: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [chatMembers, setChatMembers] = useState<User[]>(members)

  // ↓ NEW: controls the add-user dropdown visibility
  const [showUserList, setShowUserList] = useState(false)

  // ↓ Mock list for the dropdown (replace with your data source as needed)
  const availableUsers: User[] = [
    { id: 101, name: "Alice Johnson",  avatar: "https://i.pravatar.cc/40?img=11", email: "alice@example.com",  mobile: "111-222-3333" },
    { id: 102, name: "Bob Williams",   avatar: "https://i.pravatar.cc/40?img=12", email: "bob@example.com",    mobile: "444-555-6666" },
    { id: 103, name: "Charlie Singh",  avatar: "https://i.pravatar.cc/40?img=13", email: "charlie@example.com",mobile: "777-888-9999" },
    { id: 104, name: "Daisy Kapoor",   avatar: "https://i.pravatar.cc/40?img=14", email: "daisy@example.com",  mobile: "999-000-1234" },
  ]

  // ↓ Hide users already in the group from the dropdown
  const dropdownUsers = availableUsers.filter(
    u => !chatMembers.some(m => m.id === u.id)
  )

  const sendMessage = () => {
    if (!newMessage && !file) return
    const msg: Message = {
      id: Date.now(),
      sender: "You",
      text: newMessage || undefined,
      image: file && file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
      file: file && !file.type.startsWith("image/") ? file.name : undefined,
    }
    setMessages(prev => [...prev, msg])
    setNewMessage("")
    setFile(null)
  }

  // ✅ Keep the same function name used by your header button (`onClick={addUser}`)
  //    but repurpose it to toggle the dropdown (no external API change).
  const addUser = () => {
    setShowUserList(s => !s)
  }

  // ↓ Called when clicking a user inside the dropdown; logic stays the same (add + close)
  const selectUser = (user: User) => {
    if (chatMembers.find(u => u.id === user.id)) return
    setChatMembers(prev => [...prev, user])
    setShowUserList(false)
  }

  const removeUser = (id: number) => {
    setChatMembers(prev => prev.filter(u => u.id !== id))
  }

  return (
    <div className="fixed bottom-0 right-4 w-80 bg-white shadow-lg rounded-t-lg border flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between bg-blue-600 text-white p-2 rounded-t-lg relative">
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
        <button onClick={onClose} className="font-bold">×</button>

        {/* Dropdown (opens UPWARD so it doesn't get cut off at the bottom) */}
        {chatType === "group" && showUserList && (
          <div
            className="
              absolute left-2
              -top-2 -translate-y-full  /* anchor to header and open upward */
              w-72 max-h-64 overflow-y-auto
              bg-white text-gray-800 border rounded shadow-xl z-50
            "
          >
            <div className="p-2 border-b font-semibold text-sm">Add member</div>

            {dropdownUsers.length === 0 ? (
              <div className="p-3 text-xs text-gray-500">No more users to add</div>
            ) : (
              dropdownUsers.map(user => (
                <button
                  key={user.id}
                  onClick={() => selectUser(user)}
                  className="
                    w-full text-left p-2 hover:bg-gray-100 flex items-start gap-2
                  "
                >
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm font-medium leading-5">{user.name}</div>
                    <div className="text-[11px] text-gray-500">{user.email}</div>
                    <div className="text-[11px] text-gray-500">{user.mobile}</div>
                  </div>
                  <span className="text-blue-600 text-xs mt-1">Add</span>
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
      <div className="flex-1 overflow-y-auto p-2 space-y-2 bg-gray-50">
        {messages.map((msg) => (
          <div key={msg.id} className="flex flex-col items-start">
            <p className="text-xs font-bold">{msg.sender}</p>
            {msg.text && <p className="bg-blue-100 px-2 py-1 rounded">{msg.text}</p>}
            {msg.image && <img src={msg.image} alt="attachment" className="w-32 rounded" />}
            {msg.file && (
              <div className="flex items-center gap-1 text-sm bg-gray-200 px-2 py-1 rounded">
                📄 {msg.file}
              </div>
            )}
            <button className="text-xs text-blue-500">👍 Like</button>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-2 border-t flex gap-1">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded px-2 py-1 text-sm"
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="hidden"
          id="fileUpload"
        />
        <label htmlFor="fileUpload" className="cursor-pointer text-blue-600 px-2">
          📎
        </label>
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-3 rounded"
        >
          Send
        </button>
      </div>
    </div>
  )
}
