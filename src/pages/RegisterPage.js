import React from 'react'
import { Link } from 'react-router-dom'
import Register from '../components/authForm/Register'

function RegisterPage() {
    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 flex z-20 bg-gradient-to-r from-[#fe3847] to-[#171c44]">
            <div className="relative m-auto py-10 bg-white w-[350px] sm:w-[520px] min-h-[420px] max-h-[640px] lg:max-h-full rounded-lg shadow-lg">
                {/* Logo */}
                <div className="w-full flex border-b border-gray-300 py-3 mb-4">
                    <Link to="./" className="m-auto">
                        <img 
                            alt="logo" 
                            src={process.env.PUBLIC_URL + '/img/LogoRed.png'}
                            className="w-[250px] m-auto"
                        />
                    </Link>
                </div>

                {/* Form */}
                <Register />
            </div>
        </div>
    )
}

export default RegisterPage
