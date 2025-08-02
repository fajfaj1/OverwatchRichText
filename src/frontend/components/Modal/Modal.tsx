import './popover.css';
import { Button } from '@/components/Button/Button';
export function Modal({
    id,
    title,
    subTitle,
    children,
    buttonLabels,
    onConfirm,
}: {
    id: string;
    title: string;
    subTitle: string;
    children: React.ReactNode;
    buttonLabels: {
        cancel: string;
        confirm: string;
    };
    onConfirm: () => void;
}) {
    return (
        <>
            <div className='popover' popover='manual' id={id}>
                <div className='popover-header'>
                    <h1 className='popover-title'>{title.toUpperCase()}</h1>
                    <h3 className='popover-sub-title'>
                        {subTitle.toUpperCase()}
                    </h3>
                </div>

                <div className='popover-body'>
                    <div className='popover-content'>{children}</div>
                </div>
                <div className='popover-footer'>
                    <Button
                        size='min'
                        variant='normal'
                        popoverTarget={id}
                        popoverTargetAction='hide'
                    >
                        {buttonLabels.cancel.toUpperCase()}
                    </Button>
                    <Button
                        size='min'
                        variant='highlight'
                        popoverTarget={id}
                        popoverTargetAction='hide'
                        onClick={() => {
                            onConfirm();
                        }}
                    >
                        {buttonLabels.confirm.toUpperCase()}
                    </Button>
                </div>
            </div>
        </>
    );
}
