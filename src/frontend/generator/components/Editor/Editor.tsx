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
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const [id, setID] = useState(generateID());
    const [content, setContent] = useState('');
    const [channel, setChannel] = useState<ChannelType>('match');
    const [usedColors, setUsedColors] = useState<string[]>([]);
    // const [selection, setSelection] = useSt;

    const message: ChatMessage = useMemo<ChatMessage>(() => {
        return {
            content: content,
            channel: channel,
            id: id,
            author: 'user',
        };
    }, [content, channel, id]);

    function sendMessage() {
        const sendMessageEvent = new CustomEvent('send-message', {
            detail: message,
        });
        window.dispatchEvent(sendMessageEvent);
        if (textareaRef.current) {
            textareaRef.current.value = '';
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
        }
    }
    function onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const textArea = e.currentTarget;
        // const corruptedColorTags =
        //     /(<FG[0-9A-F]{8}(?!>))/gi;
        // const corruptedGlyphTags =
        //     /(<TX0?C00[0-9A-F]{12}(?!>))/gi;
        textArea.value = textArea.value.replaceAll('\n', '');
        // .replaceAll(corruptedColorTags, '')
        // .replaceAll(corruptedGlyphTags, '');
        setContent(textArea.value);
        const colorTags = [
            ...textArea.value.matchAll(/(?<=<FG)([0-9A-F]{8})(?=>)/gi),
        ];
        setUsedColors(colorTags.map((match) => '#' + match[0]));
    }

    function insertColor(color: string) {}

    useEffect(() => {
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
                                        insertColor={insertColor}
                                        colors={usedColors}
                                        popoverId='color-picker-popover'
                                    />
                                }
                                id='color-picker-popover'
                            >
                                <Tooltip text='Insert color marker'>
                                    <Button
                                        variant='normal'
                                        size='min'
                                        icon={<Font />}
                                        popoverTarget='color-picker-popover'
                                        popoverTargetAction='show'
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
