import React, { useRef, useState } from 'react'
import SearchBar from '../searchAndFilter/search/SearchBar'
import NavbarMobile from './NavbarMobile'
import NavbarPC from './NavbarPC'
import { Link, useLocation } from 'react-router-dom'



function Header() {
    const headerRef = useRef(null)
    const [isChangeHeader, changeStatus] = useState(false)
    const location = useLocation();

    document.onscroll = () => {
        if (window.innerWidth < 1024) {
            changeStatus(window.pageYOffset - headerRef.current.offsetTop >= 416)
        }
        else {
            changeStatus(window.pageYOffset - headerRef.current.offsetTop >= 556)
        }
    }

    return (
        <div ref={ headerRef } className={`fixed top-0 right-0 left-0 z-20 h-16 px-3 lg:px-4 flex items-center justify-between bg-gradient-primary`}> 
            <Link to="/">
                <img className="h-12 hidden md:block" src={process.env.PUBLIC_URL + '/img/LogoWhite.png'} alt="Horizontal logo"/>
                <img className="h-12 md:hidden" src={process.env.PUBLIC_URL + '/img/LogoWhiteNoText.png'} alt="logo"/>
            </Link>

            {/* Navbar */}
            <div className="flex items-center lg:space-x-6 space-x-2">
                <div className="overflow-hidden">
                    <div className={`transform translate-x-full origin-left transition duration-500 ${location.pathname !== '/upgrade' && (isChangeHeader || location.pathname !== '/')  && 'translate-x-0'}`} >
                        <SearchBar />
                    </div>
                </div>
                

                <NavbarPC />
                <NavbarMobile />
            </div>
        </div>
    )
}

export default Header
