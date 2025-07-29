import './message.css';
import { Channel } from './Channel/Channel';
import type { ChannelType } from './Channel/Channel';
import { Content } from './Content/Content';

export type ChatMessage = {
    content: string;
    author: string;
    chat: ChannelType;
};

function Author({ name }: { name: string }) {
    return <>[{name}]</>;
}

function Message({ message }: { message: ChatMessage }) {
    return (
        <>
            <div className={`chatmessage chat-${message.chat}`}>
                <Channel type={message.chat} />
                <Author name={message.author} />
                <Content editable={false} content={message.content} />
            </div>
        </>
    );
}

export { Channel, Author, Content, Message };
