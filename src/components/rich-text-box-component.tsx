/**
 * @file
 * @author D. Jared Chase
 * @author Milton Reyes
 * @author Jerry Pujals
 */

import React, { ChangeEvent, useEffect } from "react";
import { useState } from "react";
import { Editor, EditorState, RichUtils, convertToRaw, ContentState, ContentBlock, convertFromRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
  Box,
} from "@material-ui/core";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import HttpIcon from "@material-ui/icons/Http";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";
import StrikethroughSIcon from "@material-ui/icons/StrikethroughS";
import CodeIcon from "@material-ui/icons/Code";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import * as questionRemote from "../remotes/question.remote";
import { useHistory } from "react-router";
import { AnyARecord } from "dns";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#f26925",
    },
    secondary: {
      main: "#3498db",
    },
  },
});

const useStyles = makeStyles({
  // boxInternal: {
  //     color: "#f26925"
  // },

  // titleTool: {
  //     borderStyle: "solid",
  //     borderColor: "#f26925",
  //     height: "6vh",
  //     overflowY: "auto",
  //     width:"50vw"
  // },
  editorTool: {
    borderStyle: "solid",
    borderColor: "#f26925",
    height: "20vh",
    width: "100%",
    overflowY: "auto",
    fontSize: 20,
    padding: 10,

  },
  // buttonInternal: {
  //     padding: 2,
  //     marginBottom: 3
  // },
  // font: {
  //     fontSize: 25,
  //     paddingLeft: 10
  // }
});

const styleMap = {
  HIGHLIGHT: {
    padding: 4,
    backgroundColor: "#D3D3D3",
  },
};

export interface RichTextBoxComponentProps {
    defaultText?:any
    id?:string
    placeholder?:string
    handleChange:(e: any) => void
  }

export const RichTextBoxComponent: React.FC<RichTextBoxComponentProps> = (props) => {
  const classes = useStyles();

  let defaultTextParsed:any = props.defaultText
  let textIsPlain:boolean = false
  //try to parse into an object
  try{
    defaultTextParsed = convertFromRaw(JSON.parse(props.defaultText))
    textIsPlain = false
  }
  //this catch will run if the string was not an object
  //we will simply treat it as plain text at this point
  catch(e){
    defaultTextParsed = props.defaultText ?? ''
    textIsPlain = true
  }
  const [editorState, setEditorState] = useState(
    (textIsPlain)?
      EditorState.createWithContent(ContentState.createFromText(defaultTextParsed))
    :
      EditorState.createWithContent(defaultTextParsed)
          );
  const onChange = (editorState: EditorState) => {
    setEditorState(editorState)
    props.handleChange(JSON.stringify(convertToRaw(editorState.getCurrentContent())))
  };


      
  const handleKeyCommand = (command: string, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return "handled";
    } else {
      return "not-handled";
    }
  };

 

  return (
    <ThemeProvider theme={theme}>
        <Box className={classes.editorTool}>
          <Editor
            customStyleMap={styleMap}
            editorState={editorState}
            placeholder={props.placeholder}
            handleKeyCommand={handleKeyCommand}
            onChange={onChange}
            readOnly={props.defaultText?true:false}
          />
        </Box>
    </ThemeProvider>
  );
};
