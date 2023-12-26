import React, { useState, useEffect, useRef } from "react";
import JoditEditor from "jodit-react";

const Editor = ({ defaultContent, editorHandler }) => {
  const [content, setContent] = useState("");
  const editor = useRef(null);
  useEffect(() => {
    try {
      if (defaultContent) {
        // Parse the JSON string
        const parsedContent = JSON.parse(defaultContent.data);
        // Access the header.text property and convert it to a string
        const htmlContent = parsedContent.header.text;
        setContent(htmlContent);
      } else {
        setContent("");
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  }, [defaultContent]);

  const onDragOver = (event) => {
    event.preventDefault();
    // Allow the drop
    event.dataTransfer.dropEffect = "copy";
  };

  const onDrop = (event) => {
    console.log(editor.current); // Add this line
    const draggedValue = event.dataTransfer.getData("taskName");
    alert("I'm here: " + draggedValue);
    console.log(draggedValue, "hererere");
    // Insert the dragged value at the current cursor position
    editor.current.editor.selection.insertHTML(draggedValue, false);
    // Call the handler with the updated content
    // editorHandler(editor.current.editor.value);
  };

  const onDragEnter = (event) => {
    console.log("Drag entered");
  };

  useEffect(() => {
    if (editorHandler) editorHandler(content)
  }, [content]);

  console.log(content, "This is the content of the")
  return (
    <JoditEditor
      value={content}
      ref={editor}
      onBlur={(cnt) => { setContent(cnt) }}
      tabIndex={1}
    // onDrop={(event) => onDrop(event)}
    // onDragOver={(event) => onDragOver(event)}
    // onDragEnter={(event) => onDragEnter(event)}
    />
  );
};

export default Editor;
