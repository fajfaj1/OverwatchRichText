import './popover.css';
import { Button } from '@/components/Button/Button';
export function Popover({
    id,
    title,
    children,
}: {
    id: string;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <>
            <div className='popover' popover='auto' id={id}>
                <h1 className='popover-title'>{title.toUpperCase()}</h1>
                <div className='popover-body'>{children}</div>
                <div className='popover-footer'>
                    <Button size='min' variant='normal'>
                        CANCEL
                    </Button>
                    <Button size='min' variant='outline' disabled={true}>
                        INSERT
                    </Button>
                </div>
            </div>
        </>
    );
}
