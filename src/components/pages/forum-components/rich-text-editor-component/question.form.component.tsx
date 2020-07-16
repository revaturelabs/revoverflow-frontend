import React, { useState } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
//import './draftjs.css';
import { Button, createMuiTheme, makeStyles, ThemeProvider, Box, Container, Typography } from '@material-ui/core';
import { RichTextEditorComponent } from './draftjs';
import { BreadcrumbBarComponent } from '../../breadcrumb-bar.component';


const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#f26925',
        },
        secondary: {
            main: '#3498db',
        },
    },
});

const useStyles = makeStyles({
    boxInternal: {
        color: "#f26925"
    },
    containerTool: {
        paddingTop: 100,
        width: "70%",
        display: "flex",
        flexDirection: "column",
    },
    titleTool: {
        borderStyle: "dashed",
        height: "10vh",
        overflowY: "auto"
    },
    editorTool: {
        borderStyle: "dashed",
        height: "40vh",
        overflowY: "auto"
    },
    buttonInternal: {
        padding: 2,
    }
})

export const QuestionFormComponent: React.FC = () => {
    const classes = useStyles();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const onChange = (editorState: EditorState) => setEditorState(editorState);
    const handleKeyCommand = (command: string, editorState: EditorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            onChange(newState);
            return 'handled';
        } else {
            return 'not-handled';
        }
    }

    //INLINE STYLES, consists of these functions, and an array of buttons to map to span button elements
    const buttonVariant = (name: string) => {
        const currentInLineStyle = editorState.getCurrentInlineStyle();
        if (currentInLineStyle.has(name)) {
            return true;
        } else {
            return false;
        }
    }
    const blockbuttonVariant = (name: string) => {
        const currentInLineStyle = RichUtils.getCurrentBlockType(editorState);
        if (currentInLineStyle == name) {
            return true;
        } else {
            return false;
        }
    }

    const onBoldClick = (event: any) => {
        event.preventDefault();
        onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
    }
    const onItalicClick = (event: any) => {
        event.preventDefault();
        onChange(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
    }
    const onUnderlineClick = (event: any) => {
        event.preventDefault();
        onChange(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
    }
    const onStrikethroughClick = (event: any) => {
        event.preventDefault();
        onChange(RichUtils.toggleInlineStyle(editorState, 'STRIKETHROUGH'));
    }
    const onCodeClick = (event: any) => {
        event.preventDefault();
        onChange(RichUtils.toggleInlineStyle(editorState, 'CODE'));
    }
    const onHead1Click = (event: any) => {
        event.preventDefault();
        onChange(RichUtils.toggleBlockType(editorState, 'header-one'));
    }
    const onHead2Click = (event: any) => {
        event.preventDefault();
        onChange(RichUtils.toggleBlockType(editorState, 'header-two'));
    }
    const onHead3Click = (event: any) => {
        event.preventDefault();
        onChange(RichUtils.toggleBlockType(editorState, 'header-three'));
    }

    const buttons = [
        { function: onBoldClick, name: 'Bold', style: 'BOLD' },
        { function: onItalicClick, name: 'Italic', style: 'ITALIC' },
        { function: onUnderlineClick, name: 'Underline', style: 'UNDERLINE' },
        { function: onStrikethroughClick, name: 'Strikethrough', style: 'STRIKETHROUGH' },
        { function: onCodeClick, name: 'Code', style: 'CODE' }]
    const blockbuttons = [
        { function: onHead1Click, name: 'Header1', block: 'header-one' },
        { function: onHead2Click, name: 'Header2', block: 'header-two' },
        { function: onHead3Click, name: 'Header3', block: 'header-three' }]

    //BLOCK STYLES may go here, unless you work how to put them in their own file and maintain functionality

    const renderRTE = () => {
        return (
            <RichTextEditorComponent />
        )
    }

    return (

        <ThemeProvider theme={theme} >
            <Container className={classes.containerTool}>
                <Typography variant="h4">
                    Ask a Public Question:
            </Typography>
                <Box justifyContent="center" display="flex" flexDirection="column">
                    <form className="form-group">

                        <div className="form-group">
                            <Box justifyContent="center" display="flex"  >
                            <Typography variant="h4" >

                                <label>Question: </label>
                                <input type="text" name="question" placeholder="Question?" className="form-control" required />

                            </Typography>
                            </Box>
                        </div>


                        <div className="form-group">
                            <Box justifyContent="center" display="flex" >
                                <Typography variant="h4">
                                    <label>Content</label>
                                </Typography>

                                {buttons.map(b =>
                                    buttonVariant(b.style) ?
                                        <span className={classes.buttonInternal}>
                                            <Button onMouseDown={b.function} variant='contained' color='primary' size='small' >{b.name}</Button>
                                        </span>
                                        :
                                        <span className={classes.buttonInternal}>
                                            <Button onMouseDown={b.function} size='small' color='secondary' variant='contained' >{b.name} </Button>
                                        </span>)}
                            </Box>
                            <Box justifyContent="center" display="flex"  >
                                {blockbuttons.map(b =>
                                    blockbuttonVariant(b.block) ?
                                        <span className={classes.buttonInternal}>
                                            <Button onMouseDown={b.function} variant='contained' color='primary' size='small' >{b.name}</Button>
                                        </span>
                                        :
                                        <span className={classes.buttonInternal}>
                                            <Button onMouseDown={b.function} size='small' color='secondary' variant='contained'>{b.name}</Button>
                                        </span>)}
                            </Box>
                            {/* // RICH TEXT EDITOR - TEXTAREA HEADER  */}
                            {renderRTE()}
                            {/* // <!-- RICH TEXT EDITOR - TEXTAREA HEADER -->*/}
                        </div>

                        <Box justifyContent="center" display="flex" >
                        <div className="form-group">
                            <input type="hidden" name="creationDate" required />
                        </div>
                        <div className="form-group">
                            <input type="hidden" name="status" value="open" required />
                        </div>
                        <div className="form-group">
                            <input type="hidden" name="userId" value="1" required />
                        </div>
                        <div className="form-group">
                            <input type="submit" name="submit" className="btn btn-secondary" required />
                        </div>
                        </Box>
                    </form>
                </Box >
            </Container>
        </ThemeProvider>
    )
}