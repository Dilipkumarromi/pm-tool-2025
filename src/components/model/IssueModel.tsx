/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef, useImperativeHandle, useState } from "react";

declare global {
  interface Window {
    tiptapEditor: any;
  }
}
import {
  Modal,
  Button,
  Input,
  Toggle,
  ButtonToolbar,
  Dropdown,
  TagGroup,
  Tag,
} from "rsuite";
import GearIcon from "@rsuite/icons/Gear";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Document from "@tiptap/extension-document";
import FileHandler from "@tiptap/extension-file-handler";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";

// Import your CSS file
import "./modelStyle.css"; // Ensure this path matches the file location
import ActionDropdown from "./projectActionDropdown/actionDropdown1";
import EditText from "./projectActionDropdown/edit-text";
interface IssueModelRef {
  openModal: () => void;
  closeModal: () => void;
}

const IssueModel = forwardRef<IssueModelRef>((_props, ref) => {
  const [open, setOpen] = useState(false);
  const [drpOpen, setDrpOpen] = React.useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useImperativeHandle(ref, () => ({
    openModal: handleOpen,
    closeModal: handleClose,
  }));

  const buttonOne = [
    { key: 1, value: "backlog", label: "Backlog", count: 1 },
    { key: 2, value: "todo", label: "Todo", count: 2 },
    { key: 3, value: "in-progress", label: "In Progress", count: 3 },
    { key: 4, value: "done", label: "Done", count: 4 },
    { key: 5, value: "cancel", label: "Cancel", count: 5 },
    { key: 6, value: "duplicate", label: "Duplicate", count: 6 },
  ];
  return (
    <>
     
      <Modal
        size="md"
        open={open}
        onClose={handleClose}
        style={{
          overflow: "unset",
          left: "20px",
          top: "20px",
        }}
        className="w-full max-w-sm sm:max-w-md lg:max-w-1xl h-auto max-h-[85vh] huDKpe cPppzc"        
      >
        <Modal.Header>
          <Modal.Title>
            <div className="modal-header ">
              <TagGroup>
                <Tag size="sm" color="blue">
                  STU
                </Tag>{" "}
                &gt;
                <span className="iLfQjA"> New Issue</span>
              </TagGroup>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="flex flex-col h-full">
          <EditText />
          <div style={{ position: "relative", height: "100%" }}>
            <div
              style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "5px 15px 70px ",
              }}
            >
              <ButtonToolbar style={{ marginBottom: "12px", height: "40px" }}>
                {/* <ActionDropdown data={buttonOne} /> */}
                <ActionDropdown data={buttonOne} open={drpOpen} setOpen={setDrpOpen} />
                <Button startIcon={<GearIcon />} size="sm">
                  Assign
                </Button>
                <Button startIcon={<GearIcon />} size="sm">
                  Setting
                </Button>
                <Button size="sm">...</Button>
              </ButtonToolbar>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <hr className="h-px my-4 bg-gray-300 border-1 dark:bg-gray-700 " />
          <div>
            <Toggle
              className="create-more-toggle"
              style={{ marginRight: "1rem" }}
              size="sm"
            >
              Create more
            </Toggle>
            <Button appearance="primary" className="create-issue-btn" size="sm">
              Create Issue
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
})

export default IssueModel;
