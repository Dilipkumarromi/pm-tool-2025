import { useState } from "react";

export default function ProfileDropdownWithNested({ isOpen }: { isOpen: boolean }) {
  const [open, setOpen] = useState<boolean>(!isOpen);
  
  const [hoveredUser, setHoveredUser] = useState(false);

  return (
    <div className="relative inline-block text-left">
      {/* Dropdown */}
      {open && (
        <div className="absolute z-10 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg">
          <ul className="py-1 text-sm text-gray-700">
            <li className="flex justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <span className="flex items-center gap-2">
                <span className="text-gray-400">🌤</span>No Assignee
              </span>
              <span className="text-gray-400 text-xs">0</span>
            </li>

            {/* Nested user with hover */}
            <li
              className="relative px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
              onMouseEnter={() => setHoveredUser(true)}
              onMouseLeave={() => setHoveredUser(false)}
            >
              <img
                src="https://i.pravatar.cc/24"
                alt="avatar"
                className="w-6 h-6 rounded-full"
              />
              romi.indan
              <span className="ml-auto text-green-500">✔</span>

              {/* Hover card */}
              {hoveredUser && (
                <div className="absolute top-0 left-0 w-64 bg-white rounded-lg border border-gray-200 shadow-lg p-4 text-sm z-50">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://i.pravatar.cc/40"
                      alt="avatar"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="font-semibold">Dilip kumar romi</div>
                      <div className="text-gray-500">romi.indan • <span className="text-green-600">Online</span></div>
                    </div>
                  </div>
                  <hr className="my-2" />
                  <div className="flex items-center gap-2 text-gray-500">
                    <span>🕒</span> 20:13 local time
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 mt-1">
                    <span>🎓</span> Student test
                  </div>
                </div>
              )}
            </li>

            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-500">
              Invite and assign...
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
