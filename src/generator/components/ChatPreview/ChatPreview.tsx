import './chatpreview.css';
import { ChatType } from './ChatType';
import type { Chat } from './ChatType';
import { ChatMessageComponent, MessageAuthor } from './ChatMessage';
import type { ChatMessage } from './ChatMessage';
import { createRef } from 'react';

export default function ChatPreview({
    messages,
    setMessages,
}: {
    messages: ChatMessage[];
    setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}) {
    const chatType: Chat = 'match';
    const chatName = chatType.at(0)?.toUpperCase() + chatType.slice(1);

    const messageInputRef = createRef<HTMLInputElement>();

    function checkToSend(event: React.KeyboardEvent) {
        if (messageInputRef.current) {
            if (event.code === 'Enter') {
                const content = messageInputRef.current.value || '';
                // console.log(event);
                setMessages([
                    ...messages,
                    { content, author: 'fajfaj', chat: chatType },
                ]);
                messageInputRef.current.value = '';
            }
        }
    }

    return (
        <>
            <div className='chat'>
                <div className='chatbox'>
                    {messages.map((message, index) => {
                        return (
                            <ChatMessageComponent
                                key={index}
                                message={message}
                            />
                        );
                    })}
                </div>
                <div className='chatinput'>
                    <div className='left chat-match'>
                        <div className='vertical-stripe'></div>
                        <ChatType type={chatType} />
                        <MessageAuthor name={chatName} />
                        <input
                            type='text'
                            className='chatinputfield'
                            placeholder='PRESS TAB TO CYCLE CHANNELS'
                            onKeyDown={checkToSend}
                            ref={messageInputRef}
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
