import './colorTray.css';
import Brush from '../../../components/icons/Brush';

export default function Editor() {
    return (
        <>
            <div className='color-tray'>
                <button className='tray-button'>
                    <Brush />
                </button>
                <div className='used-colors'>
                    <button className='tray-button'>
                        <div className='circle'></div>
                    </button>
                    <button className='tray-button'>
                        <div className='circle'></div>
                    </button>
                    <button className='tray-button'>
                        <div className='circle'></div>
                    </button>
                </div>
            </div>
        </>
    );
}
