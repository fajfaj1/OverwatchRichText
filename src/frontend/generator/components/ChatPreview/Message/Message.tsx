import './message.css';
import { ChannelComponent } from './channel';
import type { ChannelType } from './channel';
import { ChatMessageContent } from './MessageContent';

export type ChatMessage = {
    content: string;
    author: string;
    chat: ChannelType;
};

export function MessageAuthor({ name }: { name: string }) {
    return <>[{name}]</>;
}

export function ChatMessageComponent({ message }: { message: ChatMessage }) {
    return (
        <>
            <div className={`chatmessage chat-${message.chat}`}>
                <ChannelComponent type={message.chat} />
                <MessageAuthor name={message.author} />
                <ChatMessageContent content={message.content} />
            </div>
        </>
    );
}
