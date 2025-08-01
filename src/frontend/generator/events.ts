import type { ChannelType } from './components/ChatPreview/Message/Channel/Channel';

export type SendMessageEventPayload = {
    author: string;
    content: string;
    channel: ChannelType;
};
