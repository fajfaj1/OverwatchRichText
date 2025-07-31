import './editor.css';
import { Button } from '@/components/Button/Button';
import { Popover } from '@/components/Popover/Popover';
import { ColorPicker } from './ColorPicker/ColorPicker';

import Brush from '@/components/icons/Brush';
import SmileyFace from '@/components/icons/SmileyFace';
import Copy from '@/components/icons/Copy';
import Droplet from '@/components/icons/Droplet';
import Settings from '@/components/icons/Settings';
import Save from '@/components/icons/Save';

import { useState } from 'react';
import type { RGBColor } from 'react-color';

export function Editor() {
    const [content, setContent] = useState('');
    const [color, setColor] = useState<RGBColor>({
        r: 255,
        g: 255,
        b: 255,
        a: 1,
    });

    // Handled by @/generator/components/ChatPreview/Message/Content
    function sendColorApplyEvent() {
        function numberToHex(number: number) {
            if (number === 0) return '00';
            let hex = '';
            const digits = '0123456789ABCDEF'.split('');
            while (number > 0) {
                // console.log(number, hex);
                hex = digits[number % 16] + hex;
                number = Math.floor(number / 16);
            }
            return hex.padStart(2, '0');
        }
        function rgbToHex(color: RGBColor) {
            return (
                '#' +
                numberToHex(color.r) +
                numberToHex(color.g) +
                numberToHex(color.b)
            );
        }

        const event = new CustomEvent('apply-color', {
            detail: {
                hex: rgbToHex(color),
            },
        });
        window.dispatchEvent(event);
    }

    return (
        <>
            <div className='editor'>
                <h3
                    style={{
                        textAlign: 'start',
                        paddingBottom: '5px',
                        color: 'var(--color-foreground)',
                        fontWeight: '700',
                    }}
                >
                    EDITOR
                </h3>
                <div className='editor-toolbar'>
                    <div className='left'>
                        <Button variant='normal' size='min' icon={<Droplet />}>
                            <></>
                        </Button>
                        <Button
                            variant='normal'
                            size='min'
                            icon={<SmileyFace />}
                        >
                            <></>
                        </Button>
                        <Button variant='normal' size='min' icon={<Brush />}>
                            <></>
                        </Button>
                    </div>
                    <div className='right'>
                        <Button variant='normal' size='min' icon={<Settings />}>
                            <></>
                        </Button>
                        <Button variant='normal' size='min' icon={<Copy />}>
                            <></>
                        </Button>
                        <Button variant='highlight' size='min' icon={<Save />}>
                            <></>
                        </Button>
                    </div>
                </div>
                <textarea
                    className='editor-body'
                    placeholder='Type your message here...'
                    maxLength={200}
                    onChange={(e) => {
                        const textArea = e.currentTarget;
                        const corruptedColorTags = /(<FG[0-9A-F]{8}(?!>))/gi;
                        const corruptedGlyphTags =
                            /(<TX0?C00[0-9A-F]{12}(?!>))/gi;
                        textArea.value = textArea.value
                            .replaceAll('\n', '')
                            .replaceAll(corruptedColorTags, '')
                            .replaceAll(corruptedGlyphTags, '');
                        setContent(e.currentTarget.value);
                        console.log(e.currentTarget.value);
                    }}
                    onKeyDown={(e) => {
                        if (e.code === 'Enter') {
                            e.preventDefault();
                        }
                    }}
                ></textarea>
            </div>
        </>
    );
}
