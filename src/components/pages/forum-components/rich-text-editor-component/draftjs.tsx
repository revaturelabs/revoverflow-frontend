import React from 'react';
import { useState } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './draftjs.css';
import { Button } from '@material-ui/core';


export const RichTextEditorComponent: React.FC = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const onChange = (editorState: EditorState) => setEditorState(editorState);
    const handleKeyCommand = (command: string, editorState: EditorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if(newState) {
            onChange(newState);
            return 'handled';
        }else {
            return 'not-handled';
        }
    }

    //INLINE STYLES, consists of these functions, and an array of buttons to map to span button elements
    const buttonVariant = (name: string) => {
        const currentInLineStyle = editorState.getCurrentInlineStyle();
        if(currentInLineStyle.has(name)) {
            return true;
        }else {
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
    
    const buttons = [
        {function: onBoldClick, name: 'Bold', style: 'BOLD'},
        {function: onItalicClick, name: 'Italic', style: 'ITALIC'},
        {function: onUnderlineClick, name: 'Underline', style: 'UNDERLINE'},
        {function: onStrikethroughClick, name: 'Strikethrough', style: 'STRIKETHROUGH'},
        {function: onCodeClick, name: 'Code', style: 'CODE'}]

    //BLOCK STYLES may go here, unless you work how to put them in their own file and maintain functionality

    return(
        <div className='rte-root'>
            <div className='toolbar'>
                <div className='inline-buttons'>
                    {buttons.map(b =>
                    buttonVariant(b.style) ?
                    <span>
                    <Button onMouseDown={b.function} variant='contained' color='primary' size='small' >{b.name}</Button>
                    </span>
                    :
                    <span>
                    <Button onMouseDown={b.function} size='small' >{b.name}</Button>
                    </span>)}
                </div>
                <div className='block-style-buttons'>
                    
                </div>
            </div>
            <div className='rte-container'>
                <Editor 
                editorState={editorState}
                handleKeyCommand={handleKeyCommand}
                onChange={onChange}/>
            </div>
        </div>
    )
}