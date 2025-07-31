import './chatpreview.css';
import type { ChannelType } from './Message/Channel/Channel';
import { Message, Author, ChannelIcon, Content } from './Message/Message';

import type { ChatMessage } from './Message/Message';
import { createRef, useEffect, useState } from 'react';

export default function ChatPreview({
    messages,
    setMessages,
}: {
    messages: ChatMessage[];
    setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}) {
    const [content, setContent] = useState('');
    const [chatType, setChatType] = useState<ChannelType>('match');
    const chatName = chatType.at(0)?.toUpperCase() + chatType.slice(1);

    const chatBottomRef = createRef<HTMLDivElement>();
    const chatBoxRef = createRef<HTMLDivElement>();

    useEffect(() => {
        setTimeout(() => {
            chatBottomRef.current?.scrollIntoView({
                behavior: 'smooth',
            });
        }, 0);
    });

    // function checkToSend(event: React.KeyboardEvent<HTMLDivElement>) {
    //     if (event?.currentTarget) {
    //         else if (event.code === 'Tab') {
    //             switch (chatType) {
    //                 case 'match':
    //                     setChatType('team');
    //                     break;
    //                 case 'team':
    //                     setChatType('group');
    //                     break;
    //                 case 'group':
    //                     setChatType('match');
    //                     break;
    //                 default:
    //                     setChatType('match');
    //                     break;
    //             }

    //             event.preventDefault();
    //         }
    //     }
    // }

    return (
        <>
            <div className='chat'>
                <div className='chat-body' ref={chatBoxRef}>
                    {messages.map((message, index) => {
                        return <Message key={index} message={message} />;
                    })}
                    <div className='chat_bottom' ref={chatBottomRef} />
                </div>
                <div className='chat-input-wrapper'>
                    <div className='chat-input'>
                        <div className={`left chat-${chatType}`}>
                            <div className='vertical-stripe'></div>
                            <ChannelIcon type={chatType} />
                            <Author name={chatName} />
                            <Content
                                content={content}
                                placeholder='PRESS TAB TO CYCLE CHANNELS'
                            />
                        </div>
                        <div className='right' style={{ visibility: 'hidden' }}>
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
