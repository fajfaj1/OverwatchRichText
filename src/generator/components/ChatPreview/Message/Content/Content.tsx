import './content.css';
import { ContentRedactor } from './ContentRedactor';

export function Content({
    content,
    placeholder,
}: {
    content: string;
    placeholder?: string;
}) {
    return (
        <>
            <div
                className={`chat-message-content ${
                    content === '' ? 'empty' : 'populated'
                }`}
            >
                <ContentRedactor
                    content={(content === '' ? placeholder : content) || ''}
                />
            </div>
        </>
    );
}
