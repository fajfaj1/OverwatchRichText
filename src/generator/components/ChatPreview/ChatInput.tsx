import { useState } from 'react';
import {
    ChannelIcon,
    Author,
    Content,
    type ChatMessage,
} from './Message/Message';

export function ChatInput() {
    const [message, setMessage] = useState<ChatMessage>({
        id: '000000000',
        content: '',
        author: 'unknown',
        channel: 'match',
    });
    function capitalize(text: string) {
        return text[0].toUpperCase() + text.slice(1);
    }

    window.addEventListener(
        'update-preview',
        (e: CustomEventInit<ChatMessage>) => {
            if (e.detail) setMessage(e.detail);
        }
    );

    return (
        <div className='chat-input'>
            <div className={`left chat-${message.channel}`}>
                <div className='vertical-stripe'></div>
                <ChannelIcon type={message.channel} />
                <Author name={capitalize(message.channel)} />
                <span style={{ color: 'white' }}>
                    <Content
                        content={message.content}
                        placeholder='PRESS TAB TO CYCLE CHANNELS'
                    />
                </span>
            </div>
            <div className='right' /* style={{ visibility: 'hidden' }} */>
                <div className='locale-badge-space'>
                    <div className='locale-badge'>PL</div>
                </div>
            </div>
        </div>
    );
}
