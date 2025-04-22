import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import { useRef, useEffect } from "react";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineUnderline,
} from "react-icons/ai";
import { BiImageAdd, BiLink, BiUpload } from "react-icons/bi";
import {
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatAlignLeft,
  MdFormatAlignCenter,
  MdFormatAlignRight,
} from "react-icons/md";

type Props = {
  content: string;
  onChange: (html: string) => void;
};

export default function TiptapEditor({ content, onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc pl-4",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal pl-4",
        },
      }),
      ListItem.configure({
        HTMLAttributes: {
          class: "list-item",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph", "listItem"],
      }),
      TextStyle,
      Underline,
      Image,
      Link.configure({
        HTMLAttributes: {
          class: "text-blue-500 hover:underline",
        },
      }),
    ],
    content,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  const addImageByUrl = () => {
    const url = window.prompt("Enter image URL");
    if (url) editor?.chain().focus().setImage({ src: url }).run();
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      editor
        ?.chain()
        .focus()
        .setImage({ src: reader.result as string })
        .run();
    };
    reader.readAsDataURL(file);
  };

  const setLink = () => {
    const url = window.prompt("Enter URL");
    if (url)
      editor
        ?.chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
  };

  return (
    <div className="border rounded-md bg-white">
      {/* Toolbar */}
      {editor && (
        <div className="flex flex-wrap gap-2 px-3 py-2 border-b bg-gray-50 text-xl">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "text-blue-600" : ""}
          >
            <AiOutlineBold />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "text-blue-600" : ""}
          >
            <AiOutlineItalic />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive("underline") ? "text-blue-600" : ""}
          >
            <AiOutlineUnderline />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "text-blue-600" : ""}
          >
            <MdFormatListBulleted />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "text-blue-600" : ""}
          >
            <MdFormatListNumbered />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={
              editor.isActive({ textAlign: "left" }) ? "text-blue-600" : ""
            }
          >
            <MdFormatAlignLeft />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={
              editor.isActive({ textAlign: "center" }) ? "text-blue-600" : ""
            }
          >
            <MdFormatAlignCenter />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={
              editor.isActive({ textAlign: "right" }) ? "text-blue-600" : ""
            }
          >
            <MdFormatAlignRight />
          </button>
          <button onClick={setLink}>
            <BiLink />
          </button>
          <button onClick={addImageByUrl}>
            <BiImageAdd />
          </button>
          <button onClick={triggerFileSelect}>
            <BiUpload />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            hidden
          />
        </div>
      )}

      {/* Editor Content */}
      <div className="p-3 min-h-[200px]">
        {editor ? <EditorContent editor={editor} /> : "Loading editor..."}
      </div>
    </div>
  );
}
