import './chatType.css';
import Diamond from '@/components/icons/Diamond';
import ThreeSilhouettes from '@/components/icons/ThreeSilhouettes';
import TwoSilhouettes from '@/components/icons/TwoSilhouettes';

export type Chat = 'match' | 'team' | 'group';

export function ChatType({ type }: { type: Chat }) {
    if (type === 'match') {
        return (
            <>
                <div className='chat-type-icon'>
                    <Diamond />
                </div>
            </>
        );
    } else if (type === 'team') {
        return (
            <>
                <div style={{ fontSize: '20px' }}>
                    <ThreeSilhouettes />
                </div>
            </>
        );
    } else if (type === 'group') {
        return (
            <>
                <div style={{ fontSize: '20px' }}>
                    <TwoSilhouettes />
                </div>
            </>
        );
    }
}
