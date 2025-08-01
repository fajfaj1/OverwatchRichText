import './chatpreview.css';
import { ChatInput } from './ChatInput';

import { MessageList } from './MessageList';

export default function ChatPreview() {
    return (
        <>
            <div className='chat'>
                <div className='chat-body'>
                    <MessageList />
                </div>
                <div className='chat-input-wrapper'>
                    <ChatInput />
                </div>
            </div>
        </>
    );
}
