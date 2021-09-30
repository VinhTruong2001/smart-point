import React, { useRef, useState } from 'react'
import SearchBar from '../searchAndFilter/search/SearchBar'
import NavbarMobile from './NavbarMobile'
import NavbarPC from './NavbarPC'


function Header() {
    const headerRef = useRef(null)
    const [isChangeHeader, changeStatus] = useState(false)
    
    document.onscroll = () => {
        if (window.innerWidth < 1024) {
            changeStatus(window.pageYOffset - headerRef.current.offsetTop >= 416)
        }
        else {
            changeStatus(window.pageYOffset - headerRef.current.offsetTop >= 556)
        }
    }

    return (
        <div ref={ headerRef } className={`fixed top-0 z-20 h-16 px-1 lg:px-4 flex items-center justify-between w-full ${isChangeHeader ? 'bg-gradient-to-r from-[#fe3847] to-[#171c44]' : 'bg-transparent'}`}> 
            <img className="h-12 hidden md:block" src={process.env.PUBLIC_URL + '/img/LogoWhite.png'} alt="Horizontal logo"/>
            <img className="h-12 md:hidden" src={process.env.PUBLIC_URL + '/img/LogoWhiteNoText.png'} alt="logo"/>

            {/* Navbar */}
            <div className="flex items-center lg:space-x-6 space-x-2">
                <div class="overflow-hidden">
                    <div class={`transform translate-x-full origin-left transition duration-500 ${isChangeHeader && 'translate-x-0'}`} >
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
