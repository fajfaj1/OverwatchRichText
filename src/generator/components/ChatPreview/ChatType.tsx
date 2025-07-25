export type Chat = 'match' | 'team' | 'group';

export function ChatType({ type }: { type: Chat }) {
    let icon = '';
    switch (type) {
        case 'match':
            icon = 'M';
            break;
        case 'team':
            icon = 'T';
            break;
        case 'group':
            icon = 'G';
            break;
    }

    return (
        <>
            <span className={`icon-${type}`}>{icon}</span>
        </>
    );
}
