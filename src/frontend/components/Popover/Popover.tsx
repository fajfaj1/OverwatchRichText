import './popover.css';
import { Button } from '@/components/Button/Button';
export function Popover({
    id,
    title,
    children,
    buttonLabels,
}: {
    id: string;
    title: string;
    children: React.ReactNode;
    buttonLabels: {
        cancel: string;
        confirm: string;
    };
}) {
    return (
        <>
            <div className='popover' popover='auto' id={id}>
                <h1 className='popover-title'>{title.toUpperCase()}</h1>
                <div className='popover-body'>{children}</div>
                <div className='popover-footer'>
                    <Button size='min' variant='normal'>
                        {buttonLabels.cancel.toUpperCase()}
                    </Button>
                    <Button size='min' variant='highlight'>
                        {buttonLabels.confirm.toUpperCase()}
                    </Button>
                </div>
            </div>
        </>
    );
}
