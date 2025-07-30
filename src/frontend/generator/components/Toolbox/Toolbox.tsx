import './toolbox.css';
import { Button } from '@/components/Button/Button';
import { Popover } from '@/components/Popover/Popover';
import { ColorPicker } from './ColorPicker/ColorPicker';

import Brush from '@/components/icons/Brush';
import SmileyFace from '@/components/icons/SmileyFace';
import Copy from '@/components/icons/Copy';
import Droplet from '@/components/icons/Droplet';
import Settings from '@/components/icons/Settings';

export function Toolbox() {
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
                >
                    <ColorPicker />
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
