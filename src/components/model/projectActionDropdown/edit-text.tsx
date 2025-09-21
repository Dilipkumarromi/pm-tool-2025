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

function EditText() {
  const editorRef = React.useRef<HTMLDivElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Handler for image upload button
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (editorRef.current) {
          const contentEditable = editorRef.current.querySelector('[contenteditable="true"]');
          if (contentEditable) {
            // Use Tiptap's editor instance to insert image
            const editorInstance = (contentEditable as any).editor;
            if (editorInstance) {
              editorInstance
                .chain()
                .focus()
                .setImage({ src: reader.result as string })
                .run();
            }
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 2,
        }}
      >
        <input
          className="issue-title-input"
          style={{
            border: "none",
            outline: "none",
            fontWeight: "bold",
            fontSize: "25px",
            width: "100%",
            padding: "10px 0px",
          }}
          placeholder="Enter issue title here..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (editorRef.current) {
                const contentEditable = editorRef.current.querySelector('[contenteditable="true"]');
                if (contentEditable) (contentEditable as HTMLElement).focus();
              }
            }
          }}
        />
        {/* Image upload button */}
        <button
          type="button"
          style={{ marginLeft: "10px", padding: "6px 12px" }}
          onClick={() => fileInputRef.current?.click()}
        >
          Upload Image
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />
      </div>
      <div style={{ position: "relative", height: "100%" }}>
        <div
          ref={editorRef}
          style={{
            paddingBottom: "20px",
            overflowY: "hidden",
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
        ></div>
      </div>
    </>
  );
}

const Tiptap = ({ setEditorInstance }) => {
  const editor = useEditor({
    immediatelyRender: false, // Fix SSR warning
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
          "border: none; padding: 0px; margin: 0px; outline: none; margin-bottom: 70px;",
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-1xl m-5 focus:outline-none min-height: 70px",
      },
      handlePaste(view, event) {
        const items = event.clipboardData?.items;
        if (items) {
          for (const item of items) {
            if (item.type.indexOf("image") !== -1) {
              const file = item.getAsFile();
              if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                  // Use editor instance directly
                  editor
                    .chain()
                    .focus()
                    .setImage({ src: reader.result as string })
                    .run();
                };
                reader.readAsDataURL(file);
                event.preventDefault();
                return true;
              }
            }
          }
        }
        return false;
      },
    },
  });

  React.useEffect(() => {
    if (editor && setEditorInstance) setEditorInstance(editor);
  }, [editor, setEditorInstance]);

  return <EditorContent editor={editor} />;
};

export default EditText;
