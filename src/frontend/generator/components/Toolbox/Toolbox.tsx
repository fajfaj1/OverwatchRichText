import './toolbox.css';
import {
    Card,
    CardFooter,
    CardHeader,
    CardDescription,
    CardAction,
    CardContent,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
export default function Editor() {
    return (
        <>
            <Card className='editor text-left'>
                <CardHeader>
                    <CardTitle>Toolbox</CardTitle>
                    <CardDescription>
                        Here you can find tools to personalise your message
                    </CardDescription>
                    <CardAction>
                        <Button variant='link'>How does it work?</Button>
                    </CardAction>
                </CardHeader>
                <CardContent>Content</CardContent>
                <CardFooter>Toolbox</CardFooter>
            </Card>
        </>
    );
}
