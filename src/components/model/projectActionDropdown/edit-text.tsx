/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Document from "@tiptap/extension-document";
import FileHandler from "@tiptap/extension-file-handler";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import "../modelStyle.css";

// add these imports for list support
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import { TextStyleKit } from '@tiptap/extension-text-style'
const extensions = [TextStyleKit, StarterKit]
// ✅ Extended Image with width/height and delete button
import { Image as TiptapImage } from "@tiptap/extension-image";

const CustomImage = TiptapImage.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        renderHTML: attributes => {
          return attributes.width ? { width: attributes.width } : {};
        },
      },
      height: {
        default: null,
        renderHTML: attributes => {
          return attributes.height ? { height: attributes.height } : {};
        },
      },
    };
  },

  addNodeView() {
    return ({ node, getPos, editor }) => {
      const container = document.createElement("div");
      container.style.position = "relative";
      container.style.display = "inline-block";

      const img = document.createElement("img");
      img.src = node.attrs.src;
      if (node.attrs.width) img.style.width = `${node.attrs.width}px`;
      if (node.attrs.height) img.style.height = `${node.attrs.height}px`;
      img.style.display = "block";
      img.style.maxWidth = "100%";

      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "×";
      deleteBtn.setAttribute("type", "button");
      deleteBtn.style.position = "absolute";
      deleteBtn.style.top = "4px";
      deleteBtn.style.right = "4px";
      deleteBtn.style.background = "rgba(0,0,0,0.6)";
      deleteBtn.style.color = "white";
      deleteBtn.style.border = "none";
      deleteBtn.style.borderRadius = "50%";
      deleteBtn.style.width = "24px";
      deleteBtn.style.height = "24px";
      deleteBtn.style.cursor = "pointer";
      deleteBtn.style.fontSize = "16px";
      deleteBtn.style.lineHeight = "20px";

      deleteBtn.addEventListener("click", () => {
        const pos = getPos();
        if (typeof pos === "number") {
          editor.chain().deleteRange({ from: pos, to: pos + node.nodeSize }).run();
        }
      });

      container.appendChild(img);
      container.appendChild(deleteBtn);

      return {
        dom: container,
        contentDOM: null,
      };
    };
  },
});

// extend ordered list to carry a listStyle attribute (renders as data-list-style)
const OrderedListExtended = OrderedList.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      listStyle: {
        default: null,
        renderHTML: attrs => {
          return attrs.listStyle ? { "data-list-style": attrs.listStyle } : {};
        },
      },
    };
  },
});

function EditText() {
  const editorRef = React.useRef<HTMLDivElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const img = new Image();
        img.onload = () => {
          if (editorRef.current) {
            const contentEditable = editorRef.current.querySelector('[contenteditable="true"]');
            if (contentEditable) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const editorInstance = (contentEditable as any).editor;
              if (editorInstance) {
                editorInstance
                  .chain()
                  .focus()
                  .setImage({
                    src: result,
                    width: img.naturalWidth,
                    height: img.naturalHeight,
                  })
                  .run();
              }
            }
          }
        };
        img.src = result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div
        style={{
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
       
        <input
          type="file"
          accept="image/*"
    
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />
      </div>
      <div style={{ position: "relative"}}>
        <div
          ref={editorRef}
          style={{
            paddingBottom: "20px",
            overflowY: "hidden",
          }}
        >
          <Tiptap setEditorInstance={undefined} />
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
    immediatelyRender: false,
    autofocus: true,
    content: "",
    extensions: [
      Document,
      Heading,
      Paragraph,
      Text,
      CustomImage,
      // keep FileHandler as-is
      FileHandler.configure({
        allowedMimeTypes: ["*/*"],
        onDrop: (currentEditor, files, pos) => {
          files.forEach((file) => {
            const fileReader = new FileReader();
            fileReader.onload = () => {
              const result = fileReader.result as string;
              const img = new Image();
              img.onload = () => {
                currentEditor
                  .chain()
                  .insertContentAt(pos, {
                    type: "image",
                    attrs: {
                      src: result,
                      width: img.naturalWidth,
                      height: img.naturalHeight,
                    },
                  })
                  .focus()
                  .run();
              };
              img.src = result;
            };
            fileReader.readAsDataURL(file);
          });
        },
        onPaste: (currentEditor, files, htmlContent) => {
          files.forEach((file) => {
            const fileReader = new FileReader();
            fileReader.onload = () => {
              const result = fileReader.result as string;
              const img = new Image();
              img.onload = () => {
                currentEditor
                  .chain()
                  .insertContentAt(currentEditor.state.selection.anchor, {
                    type: "image",
                    attrs: {
                      src: result,
                      width: img.naturalWidth,
                      height: img.naturalHeight,
                    },
                  })
                  .focus()
                  .run();
              };
              img.src = result;
            };
            fileReader.readAsDataURL(file);
          });
        },
      }),
      // Disable StarterKit's built-in list nodes and register our explicit list extensions
      BulletList,
      ListItem,
      OrderedListExtended,
      StarterKit.configure({
        orderedList: false,
        bulletList: false,
        listItem: false,
      }),
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
                  const result = reader.result as string;
                  const img = new Image();
                  img.onload = () => {
                    editor
                      .chain()
                      .focus()
                      .setImage({
                        src: result,
                        width: img.naturalWidth,
                        height: img.naturalHeight,
                      })
                      .run();
                  };
                  img.src = result;
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
