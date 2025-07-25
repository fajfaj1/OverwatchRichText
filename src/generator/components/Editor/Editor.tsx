import './editor.css';
import { Textarea } from '@/components/ui/textarea';
import {
    Card,
    CardFooter,
    CardHeader,
    CardDescription,
    CardContent,
    CardTitle,
} from '@/components/ui/card';
export default function Editor() {
    return (
        <>
            {/* <div className='editor'>
                <div className='toolkit'>Toolkit</div>
                <hr />
                <Textarea placeholder='Have some lucio-oh ohs!' />
                <textarea name='editor-input' id='editor-textarea'></textarea>
            </div> */}
            <Card className='editor'>
                <CardHeader>
                    <CardTitle>Editor</CardTitle>
                </CardHeader>
                <CardDescription>Edit your message here</CardDescription>
                <CardContent>
                    <Textarea></Textarea>
                </CardContent>
                <CardFooter>Toolbox</CardFooter>
            </Card>
        </>
    );
}
