import { ChatType } from './ChatType';
import type { Chat } from './ChatType';
import { ChatMessageContent } from './ChatMessageContent';

export type ChatMessage = { content: string; author: string; chat: Chat };

export function MessageAuthor({ name }: { name: string }) {
    return <>[{name}]</>;
}

export function ChatMessageComponent({ message }: { message: ChatMessage }) {
    return (
        <>
            <div className={`chatmessage chat-${message.chat}`}>
                <ChatType type='match' />
                <MessageAuthor name={message.author} />
                <ChatMessageContent content={message.content} />
            </div>
        </>
    );
}
