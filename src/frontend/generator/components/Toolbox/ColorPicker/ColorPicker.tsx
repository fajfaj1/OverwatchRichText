// import './color_picker.css';
import { SketchPicker, type RGBColor } from 'react-color';

export function ColorPicker({
    color,
    setColor,
}: {
    color: RGBColor;
    setColor: React.Dispatch<React.SetStateAction<RGBColor>>;
}) {
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
