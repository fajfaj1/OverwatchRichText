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
            content: '<FG5BB95FFF>Boop! <TX0C00000000003E7A>',
            author: 'Lúcio',
            channel: 'team',
            id: generateID(),
        },
        {
            content: '<FGFFFFFFFF>Someone call the <FGEC7573FF>Whambulance!!!',
            author: 'Mercy',
            channel: 'group',
            id: generateID(),
        },
        {
            content: 'And dey say, And dey say, And dey say',
            author: 'Doomfist',
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
