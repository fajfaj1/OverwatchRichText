import './color_picker.css';
import { useState } from 'react';
import { SketchPicker, type RGBColor } from 'react-color';
import { Button } from '@/components/Button/Button';
import Check from '@/components/icons/FontAwesome/Check';
import Cross from '@/components/icons/FontAwesome/Cross';

export function ColorPicker({
    colors,
    popoverId,
    onConfirm,
    onCancel,
}: {
    colors: string[];
    popoverId?: string;
    onConfirm?: (color: string) => void;
    onCancel?: () => void;
}) {
    const [color, setColor] = useState<RGBColor>({
        r: 255,
        g: 255,
        b: 255,
        a: 1,
    });

    function rgbToHex(rgb: RGBColor) {
        let hex = '#';
        function toBase16(number: number) {
            let base16 = '';
            const digits = [
                '0',
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                'A',
                'B',
                'C',
                'D',
                'E',
                'F',
            ];
            while (number > 0) {
                base16 = digits[Math.floor(number % 16)] + base16;
                number = Math.floor(number / 16);
            }
            return base16.padStart(2, '0');
        }
        [rgb.r, rgb.g, rgb.b].forEach((value) => {
            hex += toBase16(value);
        });
        rgb.a = rgb.a || 1;
        console.log(rgb.a);
        hex += toBase16(rgb.a * 255);
        return hex;
    }

    return (
        <>
            <div className='color-picker'>
                <SketchPicker
                    color={color}
                    onChange={(color) => {
                        setColor(color.rgb);
                    }}
                    styles={{
                        default: {
                            picker: {
                                backgroundColor: 'transparent',
                                color: 'var(--color-background)',
                                borderRadius: '2px',
                                boxShadow: 'none',
                            },
                        },
                    }}
                    presetColors={colors}
                />
                <div className='color-picker-footer'>
                    <Button
                        size='min'
                        variant='normal'
                        icon={<Cross />}
                        {...(popoverId
                            ? {
                                  popoverTarget: popoverId,
                                  popoverTargetAction: 'hide',
                              }
                            : {})}
                        onClick={() => {
                            if (onCancel) onCancel();
                        }}
                    >
                        <></>
                    </Button>
                    <Button
                        size='min'
                        variant='highlight'
                        icon={<Check />}
                        onClick={() => {
                            if (onConfirm) onConfirm(rgbToHex(color));
                        }}
                    >
                        <></>
                    </Button>
                </div>
            </div>
        </>
    );
}
