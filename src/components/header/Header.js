import React from 'react'
import NavbarMobile from './NavbarMobile'
import NavbarPC from './NavbarPC'


function Header() {
    return (
        // bg-gradient-to-r from-gradient-left to-gradient-right
        <div className="fixed top-0 z-20 h-16 px-4 flex items-center justify-between w-full bg-transparent"> 
            <img className="h-12 hidden md:block" src={process.env.PUBLIC_URL + '/img/LogoWhite.png'} alt="Horizontal logo"/>
            <img className="h-12 md:hidden" src={process.env.PUBLIC_URL + '/img/LogoWhiteNoText.png'} alt="logo"/>

            {/* Navbar */}
            <NavbarPC />
            <NavbarMobile />
        </div>
    )
}

export default Header
