import './toolbox.css';
import { Button } from '@/components/Button/Button';
import { Popover } from '@/components/Popover/Popover';
import { ColorPicker } from './ColorPicker/ColorPicker';

import Brush from '@/components/icons/Brush';
import SmileyFace from '@/components/icons/SmileyFace';
import Copy from '@/components/icons/Copy';
import Droplet from '@/components/icons/Droplet';
import Settings from '@/components/icons/Settings';

import { useState } from 'react';
import type { RGBColor } from 'react-color';

export function Toolbox() {
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
            <div className='toolbox'>
                <Button
                    size='full'
                    variant='normal'
                    popoverTarget='color-picker-popover'
                >
                    <Droplet />
                    FONT COLOR
                </Button>
                <Popover
                    id='color-picker-popover'
                    title='choose color'
                    subTitle='for your selection'
                    buttonLabels={{ cancel: 'cancel', confirm: 'apply' }}
                    onConfirm={sendColorApplyEvent}
                >
                    <ColorPicker color={color} setColor={setColor} />
                </Popover>

                <Button size='full' variant='normal'>
                    <SmileyFace /> INSERT EMOJI
                </Button>
                <Button size='full' variant='normal'>
                    <Brush /> GRADIENT
                </Button>
                <Button size='full' variant='normal'>
                    <Settings /> SETTINGS
                </Button>
                <Button size='full' variant='highlight'>
                    <Copy /> COPY MESSAGE
                </Button>
            </div>
        </>
    );
}
