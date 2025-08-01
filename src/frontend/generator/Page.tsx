import Layout from '../components/Layout/Layout.tsx';
import ChatPreview from './components/ChatPreview/ChatPreview.tsx';
import type { ChannelType } from './components/ChatPreview/Message/Channel/Channel.tsx';
// import ColorTray from './components/colorTray/ColorTray.tsx';
import type { ChatMessage } from './components/ChatPreview/Message/Message.tsx';
import { Editor } from './components/Editor/Editor.tsx';
import './page.css';
import { useState } from 'react';

export default function Page() {
    function id() {
        const digits = '0123456789ABCDEF'.split('');
        let key = Math.floor(Math.random() * 10 ** 10);
        let id = '';
        while (key > 0) {
            id = digits[key % 16] + id;
            key = Math.floor(key / 16);
        }
        return id.padStart(9, '0');
    }

    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            content: 'Hello There!',
            author: 'General Kenobi',
            channel: 'match',
            id: id(),
        },
        {
            content: '<FG000000FF> test',
            author: 'Test',
            channel: 'match',
            id: id(),
        },
        {
            content: '<TXC0000000003849A>',
            author: 'Test',
            channel: 'match',
            id: id(),
        },
    ]);

    const [currentMessageContent, setCurrentMessageContent] = useState('');
    const [channel, setChannel] = useState<ChannelType>('match');

    function sendMessage() {
        setMessages((prev) => {
            return [
                ...prev,
                {
                    content: currentMessageContent,
                    author: 'user',
                    channel: channel,
                    id: id(),
                },
            ];
        });
    }
    function changeChannel() {
        const channels: ChannelType[] = ['match', 'team', 'group'];
        setChannel(
            channels[(channels.findIndex((value) => value === channel) + 1) % 3]
        );
    }
    return (
        <>
            <Layout>
                <div className='flex justify-center'>
                    <div className='generator-wrapper'>
                        <Editor
                            setCurrentMessageContent={setCurrentMessageContent}
                            sendMessage={sendMessage}
                            changeChannel={changeChannel}
                        />
                        <ChatPreview
                            messages={messages}
                            setMessages={setMessages}
                            currentMessage={currentMessageContent}
                            currentChannel={channel}
                        />
                    </div>
                </div>
            </Layout>
        </>
    );
}
