import './message.css';
import { ChannelIcon } from './Channel/Channel';
import type { ChannelType } from './Channel/Channel';
import { Content } from './Content/Content';

export type ChatMessage = {
    content: string;
    author: string;
    chat: ChannelType;
};

function Author({ name }: { name: string }) {
    return (
        <>
            <span>[{name}]</span>
        </>
    );
}

function Message({ message }: { message: ChatMessage }) {
    return (
        <>
            <div className={`chat-message chat-${message.chat}`}>
                <ChannelIcon type={message.chat} />
                <Author name={message.author} />
                <Content content={message.content} />
            </div>
        </>
    );
}

export { ChannelIcon, Author, Content, Message };
