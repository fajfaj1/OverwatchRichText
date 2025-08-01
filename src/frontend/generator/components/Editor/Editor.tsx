import './editor.css';
import { Button } from '@/components/Button/Button';
import { Popover } from '@/components/Popover/Popover';
import { ColorPicker } from './ColorPicker/ColorPicker';
import { Tooltip } from '@/components/Tooltip/Tooltip';

import Brush from '@/components/icons/Brush';
import SmileyFace from '@/components/icons/SmileyFace';
import Copy from '@/components/icons/Copy';
import Droplet from '@/components/icons/Droplet';
import Settings from '@/components/icons/Settings';
import Send from '@/components/icons/Send';

import { useEffect, useMemo, useRef, useState } from 'react';

import type { ChannelType } from '../ChatPreview/Message/Channel/Channel';
import { generateID } from '../ChatPreview/Message/generateID';
import type { ChatMessage } from '../ChatPreview/Message/Message';
// import type { RGBColor } from 'react-color';

export function Editor() {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const [id, setID] = useState(generateID());
    const [content, setContent] = useState('');
    const [channel, setChannel] = useState<ChannelType>('match');

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

    useEffect(() => {
        function updatePreview() {
            const updatePreviewEvent = new CustomEvent('update-preview', {
                detail: message,
            });
            window.dispatchEvent(updatePreviewEvent);
        }
        updatePreview();
    }, [message]);

    // const [color, setColor] = useState<RGBColor>({
    //     r: 255,
    //     g: 255,
    //     b: 255,
    //     a: 1,
    // });

    // Handled by @/generator/components/ChatPreview/Message/Content
    // function sendColorApplyEvent() {
    //     function numberToHex(number: number) {
    //         if (number === 0) return '00';
    //         let hex = '';
    //         const digits = '0123456789ABCDEF'.split('');
    //         while (number > 0) {
    //             // console.log(number, hex);
    //             hex = digits[number % 16] + hex;
    //             number = Math.floor(number / 16);
    //         }
    //         return hex.padStart(2, '0');
    //     }
    //     function rgbToHex(color: RGBColor) {
    //         return (
    //             '#' +
    //             numberToHex(color.r) +
    //             numberToHex(color.g) +
    //             numberToHex(color.b)
    //         );
    //     }

    //     const event = new CustomEvent('apply-color', {
    //         detail: {
    //             hex: rgbToHex(color),
    //         },
    //     });
    //     window.dispatchEvent(event);
    // }

    return (
        <>
            <div className='editor'>
                <h3>EDITOR</h3>
                <div>
                    <div className='editor-toolbar'>
                        <div className='left'>
                            <Tooltip text='Insert color marker'>
                                <Button
                                    variant='normal'
                                    size='min'
                                    icon={<Droplet />}
                                >
                                    <></>
                                </Button>
                            </Tooltip>
                            <Tooltip text='Insert a glyph'>
                                <Button
                                    variant='normal'
                                    size='min'
                                    icon={<SmileyFace />}
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
                    {/* <h4>MESSAGE</h4> */}
                    <textarea
                        className='editor-body'
                        placeholder='Type your message here...'
                        maxLength={200}
                        onChange={(e) => {
                            const textArea = e.currentTarget;
                            // const corruptedColorTags =
                            //     /(<FG[0-9A-F]{8}(?!>))/gi;
                            // const corruptedGlyphTags =
                            //     /(<TX0?C00[0-9A-F]{12}(?!>))/gi;
                            textArea.value = textArea.value.replaceAll(
                                '\n',
                                ''
                            );
                            // .replaceAll(corruptedColorTags, '')
                            // .replaceAll(corruptedGlyphTags, '');
                            setContent(e.currentTarget.value);
                            console.log(e.currentTarget.value);
                        }}
                        onKeyDown={onKeyDown}
                        ref={textareaRef}
                    ></textarea>
                </div>
            </div>
        </>
    );
}
