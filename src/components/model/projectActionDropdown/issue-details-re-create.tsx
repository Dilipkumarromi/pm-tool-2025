// EditTextDetailsPage.tsx
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
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";

function EditTextDetailsRecreate() {
  return (
    <div className="w-full max-w-3xl mx-auto bg-white shadow-md rounded-md overflow-hidden">
      {/* Sticky Title Input */}
      <div className="sticky top-0 bg-white z-10 p-4 border-b">
        <input
          type="text"
          placeholder="Enter issue title here..."
          className="w-full text-base font-semibold border-none outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter") e.preventDefault();
          }}
        />
      </div>

      {/* Editor */}
      <div className="relative h-full px-4 py-6">
        <Tiptap />
      </div>

      {/* Bottom Padding for Floating Buttons */}
      <div className="fixed bottom-0 left-0 right-0 px-6 py-4 bg-white border-t flex justify-end gap-3">
        <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm">
          Cancel
        </button>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm">
          Create
        </button>
      </div>
    </div>
  );
}

const Tiptap = () => {
  const editor = useEditor({
    autofocus: true,
    content: "",
    extensions: [
      Document,
      Heading,
      Paragraph,
      Text,
      Image,
      OrderedList,
      BulletList,
      ListItem,
      FileHandler.configure({
        allowedMimeTypes: ["*/*"],
        onDrop: (editor, files, pos) => {
          files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
              editor
                .chain()
                .insertContentAt(pos, {
                  type: "image",
                  attrs: { src: reader.result },
                })
                .focus()
                .run();
            };
            reader.readAsDataURL(file);
          });
        },
        onPaste: (editor, files, htmlContent) => {
          files.forEach((file) => {
            if (htmlContent) return false;
            const reader = new FileReader();
            reader.onload = () => {
              editor
                .chain()
                .insertContentAt(editor.state.selection.anchor, {
                  type: "image",
                  attrs: { src: reader.result },
                })
                .focus()
                .run();
            };
            reader.readAsDataURL(file);
          });
        },
      }),
      StarterKit,
      Placeholder.configure({
        placeholder: "Add description…",
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl focus:outline-none min-h-[200px] mb-[80px]",
      },
    },
  });

  // Clipboard image paste support
  React.useEffect(() => {
    if (!editor) return;
    const dom = editor.view.dom;

    const handlePaste = (event: ClipboardEvent) => {
      const items = event.clipboardData?.items;
      if (items) {
        for (const item of items) {
          if (item.type.includes("image")) {
            const file = item.getAsFile();
            if (file) {
              const reader = new FileReader();
              reader.onload = () => {
                editor
                  .chain()
                  .focus()
                  .setImage({ src: reader.result })
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

export default EditTextDetailsRecreate;
