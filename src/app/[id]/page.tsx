/* eslint-disable @next/next/no-img-element */
"use client";

import EditText from "@/components/model/projectActionDropdown/edit-text";
import { SidebarRight } from "@/components/sidebar-right";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useRouter } from "next/router";
export default function IssueDetailsPage() {
  // const router = useRouter()
  // const { id } = router.query;
  // console.log("dynamic page",id)
  return (
    <>
      <div className="flex flex-col min-h-screen bg-[#fafbfc]">
        <div className="flex flex-1">
          {/* Main Content */}
          <main
            className="px-12 py-8 overflow-y-auto h-full"
            style={{ width: "75%" }}
          >
            {/* Centered Header Block */}
            <div className="mx-auto max-w-2xl"></div>
             <EditText />
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
