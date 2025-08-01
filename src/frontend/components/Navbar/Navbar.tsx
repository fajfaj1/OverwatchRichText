import './Navbar.css';
import { useState } from 'react';

export default function Navbar() {
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
    const hamburgerState = isHamburgerOpen ? 'shown' : 'hidden';
    function toggleHamburger() {
        setIsHamburgerOpen(!isHamburgerOpen);
    }

    return (
        <>
            <div className='navbar'>
                <div className='mobile-header'>
                    <header className='titlebar'>
                        <h1 className='page-header'>Overwatch</h1>
                        <h2 className='page-subheader'>Rich text generator</h2>
                    </header>
                    <button
                        className='hamburger-button'
                        onClick={toggleHamburger}
                    >
                        ☰
                    </button>
                </div>
                <div className={`links-wrapper ${hamburgerState}`}>
                    {' '}
                    <ul className='links'>
                        <li>
                            <a href='/generator/'>GENERATOR</a>
                        </li>
                        <li>
                            <a href='/about/'>ABOUT</a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}
