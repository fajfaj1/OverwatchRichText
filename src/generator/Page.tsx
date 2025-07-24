import Layout from '../components/Layout/Layout.tsx';
// import ChatPreview from './components/ChatPreview/ChatPreview.tsx';
import Editor from './components/Editor/Editor.tsx';
import './page.css';

export default function Page() {
    return (
        <>
            <Layout>
                <div className='generator-wrapper'>
                    <Editor />
                    {/* <ChatPreview /> */}
                </div>
            </Layout>
        </>
    );
}
