import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Document from "@tiptap/extension-document";
import FileHandler from "@tiptap/extension-file-handler";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import "../modelStyle.css";
function EditTextDetailsPage() {
  return (
    <>
      <div
        style={{
          position: "sticky",
          top: 0,
          background: "#fff",
          zIndex: 2,
        }}
      >
        <input
          className="issue-title-input"
          style={{
            border: "none",
            outline: "none",
            fontWeight: "bold",
            fontSize: "15px",
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
        <div style={{ paddingBottom: "20px" }}>
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
        ></div>
      </div>
    </>
  );
}
const Tiptap = () => {
  const editor = useEditor({
    immediatelyRender: false,
    autofocus: true,
    content: "",
    extensions: [
      Document,
      Heading,
      Paragraph,
      Text,
      Image,
      FileHandler.configure({
        allowedMimeTypes: ["*/*"],
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
        placeholder: "Add description…",
      }),
    ],
    onUpdate: ({ editor }) => {
      const dom = editor.view.dom;
      dom.style.marginBottom = "0px";
    },
    editorProps: {
      attributes: {
        style:
          "overflow-y: auto; border: none; padding: 0px; margin: 0px; outline: none; max-height: 350px; margin-bottom: 70px;",
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-1xl m-5 focus:outline-none min-height: 70px",
      },
    },
  });

  // Add clipboard image paste support
  React.useEffect(() => {
    if (!editor) return;
    const dom = editor.view.dom;
    const handlePaste = (event: ClipboardEvent) => {
      const items = event.clipboardData?.items;
      if (items) {
        for (const item of items) {
          if (item.type.indexOf("image") !== -1) {
            const file = item.getAsFile();
            if (file) {
              const reader = new FileReader();
              reader.onload = () => {
                editor
                  .chain()
                  .focus()
                  .setImage({ src: reader.result as string })
                  .run();
              };
              reader.readAsDataURL(file);
              event.preventDefault();
              return;
            }
          }
        }
      }
    };
    dom.addEventListener("paste", handlePaste);
    return () => {
      dom.removeEventListener("paste", handlePaste);
    };
  }, [editor]);

  return <EditorContent editor={editor} />;
};

export default EditTextDetailsPage;
