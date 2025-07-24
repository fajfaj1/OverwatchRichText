import './Layout.css';
import Navbar from '../Navbar/Navbar.tsx';
import * as React from 'react';
import '../../assets/big_noodle_titling.ttf';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className='page'>
                <Navbar />
                {children}
            </div>
        </>
    );
}
