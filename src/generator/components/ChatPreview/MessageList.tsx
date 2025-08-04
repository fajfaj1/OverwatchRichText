import { Message, type ChatMessage } from './Message/Message';
import { createRef, useEffect, useState, memo } from 'react';
import { generateID } from './Message/generateID';
export function MessageList() {
    const MemoizedMessage = memo(Message, (prev, cur) => {
        console.log(prev, cur);
        return (
            prev.message.id === cur.message.id &&
            prev.message.content === cur.message.content &&
            prev.message.author === cur.message.author &&
            prev.message.channel === cur.message.channel
        );
    });

    const chatBottomRef = createRef<HTMLDivElement>();
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            content: 'Hello There!',
            author: 'General Kenobi',
            channel: 'match',
            id: generateID(),
        },
        {
            content: '<FG000000FF> test',
            author: 'Test',
            channel: 'match',
            id: generateID(),
        },
        {
            content: '<TXC0000000003849A>',
            author: 'Test',
            channel: 'match',
            id: generateID(),
        },
    ]);

    useEffect(() => {
        setTimeout(() => {
            chatBottomRef.current?.scrollIntoView({
                behavior: 'smooth',
            });
        }, 0);

        function saveMessage(e: CustomEventInit<ChatMessage>) {
            const message = e.detail;
            if (message !== undefined) {
                setMessages((prev) => [...prev, message]);
            }
        }
        window.addEventListener('send-message', saveMessage);
        return () => window.removeEventListener('send-message', saveMessage);
    });

    return (
        <>
            {messages.map((message) => {
                return <MemoizedMessage key={message.id} message={message} />;
            })}
            <div className='chat_bottom' ref={chatBottomRef} />
        </>
    );
}
