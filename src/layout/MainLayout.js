import React from 'react';
import './MainLayout.scss'

import logo from '../assets/images/logo.png'
import {
    BrowserRouter as Router,
    Link,
    useLocation
} from "react-router-dom";

const MainLayout = ({children}) => {
    const { pathname } = useLocation();
    console.log(pathname);
    return (
        <div className={"mainContent"}>
            <aside>
                <img src={logo} aria-label={"The Personal Website of Dr. Hanan Kassab Hassan, PhD"} />
                <nav>
                    <div className={`menuLink ${pathname !== '/' ? 'active' : ''}`}>
                        {pathname !== '/' && <Link to={'/'}>Home</Link> }
                        {pathname === '/' && <>Home</>}
                    </div>
                    <div className={`menuLink ${pathname !== '/articles' ? 'active' : ''}`}>
                        {pathname !== '/articles' && <Link to={'/articles'}>Articles</Link> }
                        {pathname === '/articles' && <>Articles</>}
                    </div>
                    <div className={`menuLink ${pathname !== '/about' ? 'active' : ''}`}>
                        {pathname !== '/about' && <Link to={'/about'}>About</Link>}
                        {pathname === '/about' && <>About</>}
                    </div>
                    <div className={`menuLink ${pathname !== '/contact' ? 'active' : ''}`}>
                        {pathname !== '/contact' && <Link to={'/contact'}>Contact</Link>}
                        {pathname === '/contact' && <>Contact</>}
                    </div>
                </nav>
            </aside>
            <section>
                {children}
            </section>
        </div>
    );
}

export default MainLayout;
