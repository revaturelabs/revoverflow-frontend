import React from 'react';
import { useState } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Button, createMuiTheme, makeStyles, ThemeProvider, Box, Container, Typography } from '@material-ui/core';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import StrikethroughSIcon from '@material-ui/icons/StrikethroughS';
import CodeIcon from '@material-ui/icons/Code';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';


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
});

export const RichTextEditorComponent: React.FC = () => {
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
        if (currentInLineStyle === name) {
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
    const onOrderClick = (event: any) => {
        event.preventDefault();
        onChange(RichUtils.toggleBlockType(editorState, 'ordered-list-item'));
    }
    const onUnorderClick = (event: any) => {
        event.preventDefault();
        onChange(RichUtils.toggleBlockType(editorState, 'unordered-list-item'));
    }

    const buttons = [
        { function: onBoldClick, name: <FormatBoldIcon/>, style: 'BOLD' },
        { function: onItalicClick, name: <FormatItalicIcon/>, style: 'ITALIC' },
        { function: onUnderlineClick, name: <FormatUnderlinedIcon/>, style: 'UNDERLINE' },
        { function: onStrikethroughClick, name: <StrikethroughSIcon/>, style: 'STRIKETHROUGH' },
        { function: onCodeClick, name: <CodeIcon/>, style: 'CODE' }]
    const blockbuttons = [
        { function: onOrderClick, name: <FormatListBulletedIcon/>, block: 'ordered-list-item' },
        { function: onUnorderClick, name: <FormatListNumberedIcon/>, block: 'unordered-list-item' },
        { function: onHead1Click, name: 'H1', block: 'header-one' },
        { function: onHead2Click, name: 'H2', block: 'header-two' },
        { function: onHead3Click, name: 'H3', block: 'header-three' }]

    //BLOCK STYLES may go here, unless you work how to put them in their own file and maintain functionality

    return (
        <ThemeProvider theme={theme} >
            <Container className={classes.containerTool}>
                <Typography variant="h4">
                    Ask a Public Question:
            </Typography>
                <Box>
                    <Box justifyContent="center" display="flex" flexDirection="column">
                        <Box justifyContent="center" display="flex" >
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
                    </Box >
                    <Typography variant="h4" >
                        Title:
                    </Typography>
                    <Typography variant="h4">
                        Content:
                    </Typography>
                    <Box justifyContent="center" display="flex" flexDirection="column" className={classes.editorTool} >
                        <Editor
                            editorState={editorState}
                            handleKeyCommand={handleKeyCommand}
                            onChange={onChange}
                        />
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
        // <div className='rte-root'>
        //     <div className='toolbar'>
        //         <div className='inline-buttons'>
        //             {buttons.map(b =>
        //                 buttonVariant(b.style) ?
        //                     <span>
        //                         <Button onMouseDown={b.function} variant='contained' color='primary' size='small' >{b.name}</Button>
        //                     </span>
        //                     :
        //                     <span>
        //                         <Button onMouseDown={b.function} size='small' >{b.name}</Button>
        //                     </span>)}
        //         </div>
        //         <div className='block-style-buttons'>
        //             {blockbuttons.map(b =>
        //                 blockbuttonVariant(b.block) ?
        //                     <span>
        //                         <Button onMouseDown={b.function} variant='contained' color='primary' size='small' >{b.name}</Button>
        //                     </span>
        //                     :
        //                     <span>
        //                         <Button onMouseDown={b.function} size='small' >{b.name}</Button>
        //                     </span>)}
        //         </div>
        //     </div>
        //     <div className='rte-container'>
        //         <Editor
        //             editorState={editorState}
        //             handleKeyCommand={handleKeyCommand}
        //             onChange={onChange} />
        //     </div>
        // </div>
    )
}