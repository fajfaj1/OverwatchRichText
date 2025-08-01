import { Message, type ChatMessage } from './Message/Message';
import { memo } from 'react';
export function MessageList({ messages }: { messages: ChatMessage[] }) {
    const MemoizedMessage = memo(Message, (prev, cur) => {
        console.log(prev, cur);
        return (
            prev.message.id === cur.message.id &&
            prev.message.content === cur.message.content &&
            prev.message.author === cur.message.author &&
            prev.message.channel === cur.message.channel
        );
    });

    return messages.map((message) => {
        return <MemoizedMessage key={message.id} message={message} />;
    });
}
