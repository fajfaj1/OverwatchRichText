import './message.css';
import { ChannelIcon } from './Channel/Channel';
import type { ChannelType } from './Channel/Channel';
import { Content } from './Content/Content';

export type ChatMessage = {
    id: string;
    content: string;
    author: string;
    channel: ChannelType;
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
            <div className={`chat-message chat-${message.channel}`}>
                <ChannelIcon type={message.channel} />
                <Author name={message.author} />
                <Content content={message.content} />
            </div>
        </>
    );
}

export { ChannelIcon, Author, Content, Message };
