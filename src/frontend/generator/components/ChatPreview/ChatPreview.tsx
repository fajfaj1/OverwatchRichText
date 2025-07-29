import './chatpreview.css';
import { ChannelComponent } from './Message/channel';
import type { ChannelType } from './Message/channel';
import { ChatMessageComponent, MessageAuthor } from './Message/Message';
import { ChatInput } from './Input/Input';
import type { ChatMessage } from './Message/Message';
import { createRef, useEffect, useState } from 'react';

export default function ChatPreview({
    messages,
    setMessages,
}: {
    messages: ChatMessage[];
    setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}) {
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

    return (
        <>
            <div className='chat'>
                <div className='chatbox' ref={chatBoxRef}>
                    {messages.map((message, index) => {
                        return (
                            <ChatMessageComponent
                                key={index}
                                message={message}
                            />
                        );
                    })}
                    <div className='chat_bottom' ref={chatBottomRef} />
                </div>
                <div className='chatinput'>
                    <div className={`left chat-${chatType}`}>
                        <div className='vertical-stripe'></div>
                        <ChannelComponent type={chatType} />
                        <MessageAuthor name={chatName} />
                        <ChatInput
                            messages={messages}
                            setMessages={setMessages}
                            chatType={chatType}
                            setChatType={setChatType}
                        />
                    </div>
                    <div className='locale-badge-space'>
                        <div className='locale-badge'>PL</div>
                    </div>
                </div>
            </div>
        </>
    );
}
