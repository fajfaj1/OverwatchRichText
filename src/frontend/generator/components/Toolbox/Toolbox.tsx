import './toolbox.css';
import { Button } from '@/components/Button/Button';
import Brush from '@/components/icons/Brush';
import Copy from '@/components/icons/Copy';
import Droplet from '@/components/icons/Droplet';
export function Toolbox() {
    return (
        <>
            <div className='toolbox'>
                <Button variant='normal'>
                    <Droplet />
                    FONT COLOR
                </Button>
                <Button variant='normal'>
                    <Brush /> GRADIENT
                </Button>
                <Button variant='highlight'>
                    <Copy /> COPY MESSAGE
                </Button>
            </div>
        </>
    );
}
