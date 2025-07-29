import './input.css';
import type { ChatMessage } from '../Message/Message';
import type { ChannelType } from '../Message/channel';
import { createRef } from 'react';
export function ChatInput({
    messages,
    setMessages,
    chatType,
    setChatType,
}: {
    messages: ChatMessage[];
    setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
    chatType: ChannelType;
    setChatType: React.Dispatch<React.SetStateAction<ChannelType>>;
}) {
    const inputRef = createRef<HTMLInputElement>();
    function checkToSend(event: React.KeyboardEvent) {
        if (inputRef.current) {
            if (event.code === 'Enter') {
                const content = inputRef.current.value || '';
                // console.log(event);
                setMessages([
                    ...messages,
                    { content, author: 'fajfaj', chat: chatType },
                ]);
                inputRef.current.value = '';
            } else if (event.code === 'Tab') {
                switch (chatType) {
                    case 'match':
                        setChatType('team');
                        break;
                    case 'team':
                        setChatType('group');
                        break;
                    case 'group':
                        setChatType('match');
                        break;
                    default:
                        setChatType('match');
                        break;
                }

                event.preventDefault();
            }
        }
    }

    return (
        <>
            <input
                type='text'
                className='chatinputfield'
                placeholder='PRESS TAB TO CYCLE CHANNELS'
                onKeyDown={checkToSend}
                ref={inputRef}
            />
        </>
    );
}
