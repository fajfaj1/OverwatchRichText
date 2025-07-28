import Layout from '../components/Layout/Layout.tsx';
import ChatPreview from './components/ChatPreview/ChatPreview.tsx';
// import ColorTray from './components/colorTray/ColorTray.tsx';
import type { ChatMessage } from './components/ChatPreview/Message/Message.tsx';
import { Toolbox } from './components/Toolbox/Toolbox.tsx';
import './page.css';
import { useState } from 'react';

export default function Page() {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { content: 'Hello There!', author: 'General Kenobi', chat: 'match' },
    ]);
    return (
        <>
            <Layout>
                <div className='flex justify-center'>
                    <div className='generator-wrapper'>
                        <ChatPreview
                            messages={messages}
                            setMessages={setMessages}
                        />
                        {/* <ColorTray /> */}
                        <Toolbox />
                    </div>
                </div>
            </Layout>
        </>
    );
}
