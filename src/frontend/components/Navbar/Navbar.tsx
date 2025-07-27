import './Navbar.css';

export default function Navbar() {
    return (
        <>
            <nav className='navbar'>
                <header className='titlebar'>
                    <h1 className='page-header'>Overwatch</h1>
                    <h2 className='page-subheader'>Rich text generator</h2>
                </header>
                <ul className='links'>
                    <li>
                        <a href='/generator/'>GENERATOR</a>
                    </li>
                    <li>
                        <a href='/about/'>ABOUT</a>
                    </li>
                </ul>
            </nav>
        </>
    );
}
