import './toolbox.css';
import { Button } from '@/components/Button/Button';
import Brush from '@/components/icons/Brush';
import SmileyFace from '@/components/icons/SmileyFace';
import Copy from '@/components/icons/Copy';
import Droplet from '@/components/icons/Droplet';
import Settings from '@/components/icons/Settings';
export function Toolbox() {
    return (
        <>
            <div className='toolbox'>
                <Button variant='normal'>
                    <Droplet />
                    FONT COLOR
                </Button>
                <Button variant='normal'>
                    <SmileyFace /> INSERT EMOJI
                </Button>
                <Button variant='normal'>
                    <Brush /> GRADIENT
                </Button>
                <Button variant='normal'>
                    <Settings /> SETTINGS
                </Button>
                <Button variant='highlight'>
                    <Copy /> COPY MESSAGE
                </Button>
            </div>
        </>
    );
}
