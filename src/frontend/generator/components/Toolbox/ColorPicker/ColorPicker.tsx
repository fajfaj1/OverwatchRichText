// import './color_picker.css';
import { SketchPicker, type RGBColor } from 'react-color';
import { useState } from 'react';

export function ColorPicker() {
    const [color, setColor] = useState<RGBColor>({
        r: 255,
        g: 255,
        b: 255,
        a: 1,
    });
    console.log(color);
    return (
        <>
            <SketchPicker
                color={color}
                onChange={(color) => {
                    setColor(color.rgb);
                }}
                styles={{
                    default: {
                        picker: {
                            backgroundColor: 'var(--color-foreground)',
                            color: 'var(--color-background)',
                            width: '300px',
                            borderRadius: '2px',
                        },
                    },
                }}
                presetColors={['#000000ff', '#ffffffff']}
            />
        </>
    );
}
