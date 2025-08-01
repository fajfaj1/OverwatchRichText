import './chatpreview.css';
import type { ChannelType } from './Message/Channel/Channel';
import { Author, ChannelIcon, Content } from './Message/Message';

import type { ChatMessage } from './Message/Message';
import { MessageList } from './MessageList';
import { createRef, useEffect } from 'react';

export default function ChatPreview({
    messages,
    currentMessage,
    currentChannel,
}: {
    messages: ChatMessage[];
    currentMessage: string;
    currentChannel: ChannelType;
}) {
    const currentChannelName =
        currentChannel.at(0)?.toUpperCase() + currentChannel.slice(1);

    const chatBottomRef = createRef<HTMLDivElement>();
    const chatBoxRef = createRef<HTMLDivElement>();

    useEffect(() => {
        setTimeout(() => {
            chatBottomRef.current?.scrollIntoView({
                behavior: 'smooth',
            });
        }, 0);
    });

    return (
        <>
            <div className='chat'>
                <div className='chat-body' ref={chatBoxRef}>
                    <MessageList messages={messages} />
                    <div className='chat_bottom' ref={chatBottomRef} />
                </div>
                <div className='chat-input-wrapper'>
                    <div className='chat-input'>
                        <div className={`left chat-${currentChannel}`}>
                            <div className='vertical-stripe'></div>
                            <ChannelIcon type={currentChannel} />
                            <Author name={currentChannelName} />
                            <span style={{ color: 'white' }}>
                                <Content
                                    content={currentMessage}
                                    placeholder='PRESS TAB TO CYCLE CHANNELS'
                                />
                            </span>
                        </div>
                        <div
                            className='right' /* style={{ visibility: 'hidden' }} */
                        >
                            <div className='locale-badge-space'>
                                <div className='locale-badge'>PL</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
