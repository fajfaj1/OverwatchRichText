import './channel.css';
import Diamond from '@/components/icons/Diamond';
import ThreeSilhouettes from '@/components/icons/ThreeSilhouettes';
import TwoSilhouettes from '@/components/icons/TwoSilhouettes';

export type ChannelType = 'match' | 'team' | 'group';

export function ChannelIcon({ type }: { type: ChannelType }) {
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
