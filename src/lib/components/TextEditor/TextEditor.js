import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import classes from "../style/TextEditor.module.css";

const TextEditor = ({ onChange, toolbarOnFocus = false }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onChangeHandler = (newEditorState) => {
    setEditorState(newEditorState);
    try {
      onChange(draftToHtml(convertToRaw(newEditorState.getCurrentContent())));
    } catch (error) {}
  };

  return (
    <div>
      {/* Editor */}
      <label htmlFor='text'>
        <Editor
          toolbarOnFocus={toolbarOnFocus}
          editorState={editorState}
          wrapperClassName={classes.editorWrapper}
          editorClassName={classes.editor}
          onEditorStateChange={onChangeHandler}
          localization={{
            locale: "it",
          }}
          placeholder='Inserisci il tuo testo...'
        />
      </label>
    </div>
  );
};

export default TextEditor;
