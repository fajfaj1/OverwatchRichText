import { ChatType } from './ChatType';
import type { Chat } from './ChatType';

export type ChatMessage = { content: string; author: string; chat: Chat };

export function MessageAuthor({ name }: { name: string }) {
    return <>[{name}]</>;
}

export function ChatMessageComponent({ message }: { message: ChatMessage }) {
    return (
        <div className={`chatmessage chat-${message.chat}`}>
            <ChatType type='match' />
            <MessageAuthor name={message.author} /> {message.content}
        </div>
    );
}
