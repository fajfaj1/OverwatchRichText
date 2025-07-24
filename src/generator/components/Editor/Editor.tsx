import './editor.css';
export default function Editor() {
    return (
        <>
            <div className='editor'>
                <div className='toolkit'>Toolkit</div>
                <hr />
                <textarea name='editor-input' id='editor-textarea'></textarea>
            </div>
        </>
    );
}
