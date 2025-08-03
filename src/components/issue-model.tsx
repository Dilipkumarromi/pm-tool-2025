import React from "react";

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
// import ActionDropdown from "./projectActionDropdown/actionDropdown";

export default function IssueModel() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const buttonOne=[
      { key: 1, value: "backlog", label: "Backlog", count: 1 },
      { key: 2, value: "todo", label: "Todo", count: 2 },
      { key: 3, value: "in-progress", label: "In Progress", count: 3 },
      { key: 4, value: "done", label: "Done", count: 4 },
      { key: 5, value: "cancel", label: "Cancel", count: 5 },
      { key: 6, value: "duplicate", label: "Duplicate", count: 6 },
    ]
  return (
    <>
      <Button appearance="primary" onClick={handleOpen}>
        Open Modal
      </Button>

      <Modal
        size="md"
        open={open}
        onClose={handleClose}
        style={{
          overflow: "unset",
        }}
      >
        <Modal.Header>
          <Modal.Title>
            <div className="modal-header">
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
        <Modal.Body>
          <div
            style={{
              position: "sticky",
              top: 0,
              background: "#fff",
              zIndex: 2,
              // maxHeight:"300px"
            }}
          >
            <input
              className="issue-title-input"
              style={{
                border: "none",
                outline: "none",
                fontWeight: "bold",
                fontSize: "20px",
                width: "100%",
                padding: "10px 0px",
              }}
              placeholder="Enter issue title here..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  // Assuming that the Tiptap editor instance is globally accessible
                  // working like tab
                }
              }}
            />
          </div>
          <div style={{ position: "relative", height: "100%" }}>
            <div
              style={{
                paddingBottom: "25px",
                overflowY: "-moz-hidden-unscrollable",
              }}
            >
              <Tiptap />
            </div>
            <div
              style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "10px 20px 70px ",
              }}
            >
                
              <ButtonToolbar style={{ marginBottom: "10px", height: "40px" }}>
                {/* <Dropdown
                  placement="bottomStart"
                  trigger="click"
                  container={() => document.body}
                  renderToggle={(props, ref) => {
                    const { container, menuClassName, ...buttonProps }: any =
                      props;
                    return (
                      <span ref={ref}>
                        <Button
                          {...buttonProps}
                          startIcon={<GearIcon />}
                          size="sm"
                        >
                          Priority
                        </Button>
                      </span>
                    );
                  }}
                  menuClassName="action-dropdown-menu-above-modal"
                >
                  <ActionDropdown />
                </Dropdown> */}
                {/* <ActionDropdown data={buttonOne} style={{ marginRight: "8px" }} /> */}
                <Button startIcon={<GearIcon />} size="md" style={{ marginRight: "8px" }}>
                  Assign
                </Button>
                <Button startIcon={<GearIcon />} size="md" style={{ marginRight: "8px" }}>
                  Setting
                </Button>
                <Button size="md">...</Button>
              </ButtonToolbar>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700 " />
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
}

const Tiptap = () => {
  const editor = useEditor({
    immediatelyRender: true,
    autofocus: true,
    content: "",
    extensions: [
      Document,
      Heading,
      Paragraph,
      Text,
      Image,
      FileHandler.configure({
        allowedMimeTypes: ["*/*"], // Allow all file types
        onDrop: (currentEditor, files, pos) => {
          files.forEach((file) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
              currentEditor
                .chain()
                .insertContentAt(pos, {
                  type: "image",
                  attrs: { src: fileReader.result },
                })
                .focus()
                .run();
            };
          });
        },
        onPaste: (currentEditor, files, htmlContent) => {
          files.forEach((file) => {
            if (htmlContent) {
              console.log(htmlContent);
              return false;
            }
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
              currentEditor
                .chain()
                .insertContentAt(currentEditor.state.selection.anchor, {
                  type: "image",
                  attrs: { src: fileReader.result },
                })
                .focus()
                .run();
            };
          });
        },
      }),
      StarterKit,
      Placeholder.configure({
        placeholder: "Write something …",
      }),
    ],
    onUpdate: ({ editor }) => {
      const dom = editor.view.dom;
      if (editor.getText().trim().length > 0) {
        dom.style.marginBottom = "0px";
      } else {
        dom.style.marginBottom = "0px";
      }
    },
    editorProps: {
      attributes: {
        style:
          "overflow-y: auto; border: none; padding: 0px; margin: 0px; outline: none; max-height: 350px; margin-bottom: 70px;",
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-1xl m-5 focus:outline-none; min-height: 70px;",
      },
    },
  });

  return <EditorContent editor={editor} />;
};

