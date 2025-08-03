import './editor.css';
import { Button } from '@/components/Button/Button';
import { Tooltip } from '@/components/Tooltip/Tooltip';
import { Popover } from '@/components/Popover/Popover';

import Image from '@/components/icons/FontAwesome/Image';
import Copy from '@/components/icons/FontAwesome/Copy';
import Settings from '@/components/icons/FontAwesome/Settings';
import Send from '@/components/icons/FontAwesome/Send';
import Brush from '@/components/icons/FontAwesome/Brush';
import Font from '@/components/icons/FontAwesome/Font';

import { useEffect, useMemo, useRef, useState } from 'react';

import type { ChannelType } from '../ChatPreview/Message/Channel/Channel';
import { generateID } from '../ChatPreview/Message/generateID';
import type { ChatMessage } from '../ChatPreview/Message/Message';
import { ColorPicker } from './ColorPicker/ColorPicker';

// import type { RGBColor } from 'react-color';

export function Editor() {
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const [id, setID] = useState(generateID());
    const [content, setContent] = useState('');
    const [channel, setChannel] = useState<ChannelType>('match');
    const [usedColors, setUsedColors] = useState<string[]>([]);

    let previousContent = '';
    let undoneContent = '';

    const message: ChatMessage = useMemo<ChatMessage>(() => {
        return {
            content: content,
            channel: channel,
            id: id,
            author: 'user',
        };
    }, [content, channel, id]);

    function updateUsedColors(textarea: HTMLTextAreaElement) {
        const colorTagMatches = [
            ...textarea.value.matchAll(/(?<=<FG)([0-9A-F]{8})(?=>)/gi),
        ];
        const colors = colorTagMatches.map((match) => '#' + match[0]);
        setUsedColors([...new Set(colors)]);
    }
    function normalizeTextareaValue(textarea: HTMLTextAreaElement) {
        // textarea.value = textarea.value.replaceAll('\n', '');
    }

    function sendMessage() {
        const sendMessageEvent = new CustomEvent('send-message', {
            detail: message,
        });
        window.dispatchEvent(sendMessageEvent);
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.setRangeText('', 0, textarea.value.length);
        }
        setContent('');
        setID(generateID());
    }

    function changeChannel() {
        const channels: ChannelType[] = ['match', 'team', 'group'];
        setChannel(
            channels[(channels.findIndex((value) => value === channel) + 1) % 3]
        );
    }

    function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.code === 'Enter') {
            e.preventDefault();
            sendMessage();
        } else if (e.code === 'Tab') {
            e.preventDefault();
            changeChannel();
        } else if (e.ctrlKey && e.code === 'KeyZ') {
            const textarea = textareaRef.current;
            if (!textarea)
                throw new Error(
                    `Failed to perform CTRL + Z, textareaRef.current is null.`
                );
            undoneContent = textarea.value;
            textarea.value = previousContent;
        } else if (e.ctrlKey && e.code === 'KeyY') {
            const textarea = textareaRef.current;
            if (!textarea)
                throw new Error(
                    `Failed to perform CTRL + Y, textareaRef.current is null.`
                );
            textarea.value = undoneContent;
        }
    }
    function onChange() {
        const textarea = textareaRef.current;
        if (!textarea)
            throw new Error(
                `Failed to handle textarea change event, textareaRef.current is null.`
            );
        normalizeTextareaValue(textarea);
        setContent(textarea.value);
        updateUsedColors(textarea);
    }

    function insertColor(color: string) {
        const textarea = textareaRef.current;
        if (!textarea)
            throw new Error(`Failed to insert color tag, textareRef is null.`);

        if (!/^#[0-9A-F]{8}$/.test(color))
            throw new Error(
                `Failed to insert color tag, color picker didnt return a valid hex code.`
            );
        color = color.slice(1).toUpperCase();

        function getTextSelection() {
            const start = textarea?.selectionStart;
            const end = textarea?.selectionEnd;
            if (start === undefined || end === undefined)
                throw new Error(
                    `Failed to insert color tag, selectionStart or selectionEnd is undefined.`
                );
            return { start, end };
        }
        const selection = getTextSelection();

        textarea.focus();
        previousContent = textarea.value;

        const previousTag = textarea.value
            .slice(0, selection.start)
            .match(/<FG[0-9A-F]{8}> *$/i);

        if (previousTag) {
            if (previousTag.index === undefined) return;
            textarea.setRangeText(
                '',
                previousTag.index,
                previousTag.index + 12,
                'preserve'
            );
        }
        textarea.setRangeText(
            `<FG${color}>`,
            selection.start,
            selection.start,
            'end'
        );

        // onChange();
    }

    useEffect(() => {
        console.log(`Reload`);
        function updatePreview() {
            const updatePreviewEvent = new CustomEvent('update-preview', {
                detail: message,
            });
            window.dispatchEvent(updatePreviewEvent);
        }
        updatePreview();
    }, [message]);

    return (
        <>
            <div className='editor'>
                <h3>EDITOR</h3>
                <div>
                    <div className='editor-toolbar'>
                        <div className='left'>
                            <Popover
                                content={
                                    <ColorPicker
                                        colors={usedColors}
                                        popoverId='color-picker-popover'
                                        onConfirm={(color) => {
                                            setIsColorPickerOpen(false);
                                            insertColor(color);
                                        }}
                                        onCancel={() =>
                                            setIsColorPickerOpen(false)
                                        }
                                    />
                                }
                                isOpen={isColorPickerOpen}
                                setIsOpen={setIsColorPickerOpen}
                            >
                                <Tooltip text='Insert color marker'>
                                    <Button
                                        variant='normal'
                                        size='min'
                                        icon={<Font />}
                                        onClick={() => {
                                            setIsColorPickerOpen(true);
                                        }}
                                    >
                                        <></>
                                    </Button>
                                </Tooltip>
                            </Popover>

                            <Tooltip text='Insert a glyph'>
                                <Button
                                    variant='normal'
                                    size='min'
                                    icon={<Image />}
                                >
                                    <></>
                                </Button>
                            </Tooltip>
                            <Tooltip text='Insert a gradient'>
                                <Button
                                    variant='normal'
                                    size='min'
                                    icon={<Brush />}
                                >
                                    <></>
                                </Button>
                            </Tooltip>
                        </div>
                        <div className='right'>
                            <Tooltip text='Change settings'>
                                <Button
                                    variant='normal'
                                    size='min'
                                    icon={<Settings />}
                                >
                                    <></>
                                </Button>
                            </Tooltip>
                            <Tooltip text='Copy your message'>
                                <Button
                                    variant='normal'
                                    size='min'
                                    icon={<Copy />}
                                >
                                    <></>
                                </Button>
                            </Tooltip>
                            <Tooltip text='Send message'>
                                <Button
                                    variant='highlight'
                                    size='min'
                                    icon={<Send />}
                                    onClick={sendMessage}
                                >
                                    <></>
                                </Button>
                            </Tooltip>
                        </div>
                    </div>
                </div>
                <div>
                    <textarea
                        className='editor-body'
                        placeholder='Type your message here...'
                        maxLength={200}
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                        ref={textareaRef}
                    ></textarea>
                </div>
            </div>
        </>
    );
}
