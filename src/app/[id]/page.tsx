/* eslint-disable @next/next/no-img-element */
"use client";

import EditText from "@/components/model/projectActionDropdown/edit-text";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useRouter } from "next/router";
export default function IssueDetailsPage() {
  // const router = useRouter()
  // const { id } = router.query;
  // console.log("dynamic page",id)
  return (
    <>
      <div className="flex flex-col min-h-screen bg-[#fafbfc]">
        {/* Header */}
        <div className="flex items-center px-6 py-4 border-b bg-white">
          <SidebarTrigger className="-ml-0" />
          <span className="text-orange-500 font-semibold mr-2">
            Student test
          </span>
          <span className="mx-1 text-gray-400">{">"}</span>
          <span className="font-semibold">STU-6</span>
          <span className="ml-2 text-gray-400">★</span>
          <div className="ml-auto flex items-center space-x-2">
            <span className="text-gray-500">9 / 12</span>
            <button className="ml-2 px-2 py-1 border rounded text-gray-500">
              ▼
            </button>
          </div>
        </div>

        <div className="flex flex-1">
          {/* Main Content */}
          <div className="flex-1 px-12 py-8">
            <div className="flex flex-col h-full">
            <EditText/>
            </div>
      
            {/* Issue creation box */}
            <div className="bg-white border rounded-lg shadow-sm p-4 mb-6">
              <input
                className="w-full text-md font-medium mb-1 outline-none"
                placeholder="Issue title..."
              />
              <textarea
                className="w-full text-sm text-gray-600 mb-2 outline-none resize-none"
                placeholder="Add description..."
                rows={2}
              />
              <div className="flex items-center space-x-2 mb-2">
                <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded text-xs font-semibold">
                  STU
                </span>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg width="18" height="18" fill="none" stroke="currentColor">
                    <circle cx="9" cy="9" r="8" />
                  </svg>
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg width="18" height="18" fill="none" stroke="currentColor">
                    <circle cx="9" cy="9" r="8" />
                  </svg>
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                  ...
                </button>
              </div>
              <div className="flex items-center justify-end space-x-2">
                <button className="text-gray-400 hover:text-gray-600 px-2 py-1">
                  Cancel
                </button>
                <button className="bg-blue-600 text-white px-4 py-1 rounded">
                  Create
                </button>
              </div>
            </div>
            {/* Activity */}
            <div className="mt-8">
              <h2 className="text-md font-semibold mb-2">Activity</h2>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <img
                  src="https://i.pravatar.cc/40?img=60"
                  alt="avatar"
                  className="w-6 h-6 rounded-full mr-2"
                />
                <span className="mr-2 font-medium">romi.indan</span>
                <span>created the issue • 16d ago</span>
                <span className="ml-auto text-xs text-gray-400 cursor-pointer">
                  Unsubscribe
                </span>
              </div>
              <textarea
                className="w-full border rounded px-3 py-2 text-sm mb-2 outline-none resize-none"
                placeholder="Leave a comment..."
                rows={2}
              />
              <div className="flex items-center justify-between">
                <button className="text-gray-400 hover:text-gray-600">
                  <svg width="18" height="18" fill="none" stroke="currentColor">
                    <circle cx="9" cy="9" r="8" />
                  </svg>
                </button>
                <button className="bg-blue-600 text-white px-4 py-1 rounded">
                  ↑
                </button>
              </div>
            </div>
          </div>
          {/* Sidebar */}
          <div className="w-72 border-l bg-white px-6 py-8">
            <div className="mb-6">
              <div className="text-xs text-gray-400 mb-1">Properties</div>
              <div className="flex items-center mb-2">
                <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs font-semibold mr-2">
                  Todo
                </span>
              </div>
              <button className="flex items-center text-gray-600 mb-2">
                <span className="mr-2">---</span>
                <span>Set priority</span>
              </button>
              <button className="flex items-center text-gray-600 mb-2">
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  className="mr-2"
                >
                  <circle cx="8" cy="8" r="7" />
                </svg>
                <span>Assign</span>
              </button>
            </div>
            <div className="mb-6">
              <div className="text-xs text-gray-400 mb-1">Labels</div>
              <button className="flex items-center text-gray-600 mb-2">
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  className="mr-2"
                >
                  <rect x="3" y="7" width="10" height="2" />
                </svg>
                <span>Add label</span>
              </button>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Project</div>
              <button className="flex items-center text-gray-600 mb-2">
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  className="mr-2"
                >
                  <polygon points="2,2 14,2 14,14 2,14" />
                </svg>
                <span>Add to project</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
