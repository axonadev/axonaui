import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { convertFromHTML } from "draft-convert";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import classes from "../style/TextEditor.module.css";

const TextEditor = ({
  onChange,
  toolbarOnFocus = false,
  size,
  testoPredefinito = "",
}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (testoPredefinito || testoPredefinito.length > 0) {
      // Contenuto HTML predefinito
      const initialHTML = `<p>${testoPredefinito}</p>`;

      // Converte il testo HTML in un oggetto ContentState
      const contentState = convertFromHTML(initialHTML);
      if (contentState) {
        // Se la conversione ha avuto successo, crea un EditorState iniziale con il contenuto
        const initialEditorState = EditorState.createWithContent(contentState);
        setEditorState(initialEditorState);
      }
    }
  }, []);

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
          editorStyle={{ height: size }}
          toolbar={{
            options: [
              "inline",
              "fontSize",
              "fontFamily",
              "colorPicker",
              "list",
              "textAlign",
              "emoji",
              "image",
            ],
          }}
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
