import './color_picker.css';
import { useState } from 'react';
import { SketchPicker, type RGBColor } from 'react-color';
import { Button } from '@/components/Button/Button';
import Check from '@/components/icons/FontAwesome/Check';

export function ColorPicker({
    insertColor,
    popoverId,
}: {
    insertColor: (color: RGBColor) => void;
    popoverId?: string;
}) {
    const [color, setColor] = useState<RGBColor>({
        r: 255,
        g: 255,
        b: 255,
        a: 1,
    });
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
                    presetColors={['#000000ff', '#ffffffff']}
                />
                <div className='color-picker-footer'>
                    <Button size='min' variant='highlight' icon={<Check />}>
                        <></>
                    </Button>
                </div>
            </div>
        </>
    );
}
