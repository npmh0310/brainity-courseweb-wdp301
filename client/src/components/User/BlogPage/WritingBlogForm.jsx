import { convertToRaw, EditorState } from "draft-js";
import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { Fragment } from "react";
export default function Index() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [text, setText] = useState();
  const onEditorStateChange = function (editorState) {
    setEditorState(editorState);
    const { blocks } = convertToRaw(editorState.getCurrentContent());
    /*let text = blocks.reduce((acc, item) => {
      acc = acc + item.text;
      return acc;
    }, "");*/
    let text = editorState.getCurrentContent().getPlainText("\u0001");
    setText(text);
  };

  return (
    <div className="block container mx-auto">
      <div className="text-4xl text-center italic uppercase mt-2 text-third font-extrabold">
        Write Blog
      </div>
      <div className="text-third font-bold my-6">
        <div className="text-xl text-third font-medium pb-2">Title: </div>
        <input
          type="text"
          name=""
          id=""
          className="block h-16 w-full text-base rounded-md border-0 py-1.5 pl-7 pr-20 text-third ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
          placeholder="Write your content here..."
        />
      </div>
      <div className="text-xl text-third font-medium pb-2">Content: </div>
      <div className="w-full h-[700px] border-2 mb-2 ">
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={onEditorStateChange}
          mention={{
            separator: " ",
            trigger: "@",
            suggestions: [
              { text: "APPLE", value: "apple" },
              { text: "BANANA", value: "banana", url: "banana" },
              { text: "CHERRY", value: "cherry", url: "cherry" },
              { text: "DURIAN", value: "durian", url: "durian" },
              { text: "EGGFRUIT", value: "eggfruit", url: "eggfruit" },
              { text: "FIG", value: "fig", url: "fig" },
              { text: "GRAPEFRUIT", value: "grapefruit", url: "grapefruit" },
              { text: "HONEYDEW", value: "honeydew", url: "honeydew" },
            ],
          }}
        />
      </div>
      <div className="flex justify-end mb-4">
        <button
          className=" bg-primary hover:bg-[#03ecbe] text-white px-4 lg:px-[40px] py-2 lg:py-[9px] my-1 lg:my-1 transition-transform duration-200 ease-in-out transform hover:scale-105 rounded-full hidden md:flex text-sm font-semibold"
          type="submit"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
