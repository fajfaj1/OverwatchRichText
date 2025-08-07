import './icon.css';

import { categoryToFilename } from '@/utils/categoryToFilename';

export default function Icon({ category }: { category: string }) {
    return (
        <>
            <img
                className='icon'
                src={`/categories/${categoryToFilename(category)}.webp`}
                height='1em'
                width='1em'
                alt={`${category}`}
            />
        </>
    );
}
