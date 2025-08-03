"use client";
// import"./components.css"
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { SidebarContent } from "@/components/ui/sidebar";
import { TableDemo } from "./issue-list";
 
 
const IssueDetailPage: React.FC = () => {
  return (
    <>
      <SidebarContent>
      <TableDemo/>
      
      </SidebarContent>
    </>
  );
};

export default IssueDetailPage;
