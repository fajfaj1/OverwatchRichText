import Layout from '../components/Layout/Layout.tsx';
import ChatPreview from './components/ChatPreview/ChatPreview.tsx';
import Toolbox from './components/Toolbox/Toolbox.tsx';
import type { ChatMessage } from './components/ChatPreview/ChatMessage.tsx';
import './page.css';
import { useState } from 'react';

export default function Page() {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { content: 'Hello There!', author: 'General Kenobi', chat: 'match' },
    ]);
    return (
        <>
            <Layout>
                <div className='generator-wrapper'>
                    <Toolbox />
                    <ChatPreview
                        messages={messages}
                        setMessages={setMessages}
                    />
                </div>
            </Layout>
        </>
    );
}
