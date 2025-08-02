import './color_picker.css';
import { useState } from 'react';
import { SketchPicker } from 'react-color';
import { Button } from '@/components/Button/Button';
import Check from '@/components/icons/FontAwesome/Check';
import Cross from '@/components/icons/FontAwesome/Cross';

export function ColorPicker({
    insertColor,
    colors,
    popoverId,
}: {
    insertColor: (color: string) => void;
    colors: string[];
    popoverId?: string;
}) {
    const [color, setColor] = useState('#FFFFFFFF');

    return (
        <>
            <div className='color-picker'>
                <SketchPicker
                    color={color}
                    onChange={(color) => {
                        setColor(color.hex);
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
                    >
                        <></>
                    </Button>
                    <Button
                        size='min'
                        variant='highlight'
                        icon={<Check />}
                        onClick={() => insertColor(color)}
                        {...(popoverId
                            ? {
                                  popoverTarget: popoverId,
                                  popoverTargetAction: 'hide',
                              }
                            : {})}
                    >
                        <></>
                    </Button>
                </div>
            </div>
        </>
    );
}
