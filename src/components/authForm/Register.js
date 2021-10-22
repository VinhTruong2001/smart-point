import React, { useRef, useEffect, useState } from 'react'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';
import Validator from '../../utils/validator'

function Register() {
    const [isRegWithEmail, setIsRegWithEmail] = useState(false)

    // Validtor
    const fullnameRef = useRef("");
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const passwordComformRef = useRef("");

    useEffect(() => {
        Validator({
            form: '#registerForm',
            formGroupSelector: '.form-group',
            errorSelector: '.form-message',
            rules: [
                Validator.isRequire('#fullname', 'Vui lòng nhập vào họ tên của bạn'),
                Validator.isRequire('#email', 'Vui lòng nhập vào Email'),
                Validator.isEmail('#email', 'Email không hợp lệ hoặc không đúng'),
                Validator.isRequire('#password', 'Vui lòng nhập mật khẩu'),
                Validator.minLength('#password', 6),
                Validator.isRequire('#passwordConform', 'Vui lòng nhập lại mật khẩu'),
                Validator.isConfirmed('#passwordConform', function() {
                    return document.querySelector('#registerForm #password').value;
                }, 'Mật khẩu nhập lại không chính xác'),
            ],
            // onSubmit: function() {
            //     login();
            // }
        })
    })

    const RegWithEmail = () => {
        setIsRegWithEmail(true);
    }

    const backToLoginOptions = () => {
        setIsRegWithEmail(false);
    }

    return (
        <div className="flex flex-col space-y-12 w-full">
            <h2 className="text-center font-bold px-10 sm:px-0 text-2xl sm:text-3xl">Đăng ký tài khoản Smart Points</h2>

            {isRegWithEmail ? 
                /* Register form with Email */
                (<form id="registerForm" className="m-auto w-full px-10 sm:px-16 space-y-2">
                    <div 
                        className="absolute top-4 left-4 cursor-pointer"
                        onClick={ backToLoginOptions }
                    >
                        <ArrowBackIosIcon />
                    </div>
                    <div className="form-group space-y-1 pt-2">
                        <label className="font-medium">Tên của bạn</label>
                        <div className="border border-gray-300 rounded-full overflow-hidden px-2 bg-gray-100 form-control">
                            <input 
                                ref={ fullnameRef }
                                type="text" 
                                name="fullname"
                                id="fullname" 
                                placeholder="Nhập vào tên của bạn"
                                className="p-2 outline-none w-full bg-transparent"
                            /> 
                        </div>
                        <span className="form-message"></span>
                    </div>
                    <div className="form-group space-y-1 pt-2">
                        <label className="font-medium">Email</label>
                        <div className="border border-gray-300 rounded-full overflow-hidden px-2 bg-gray-100 form-control">
                            <input 
                                ref={ emailRef }
                                type="text" 
                                name="email"
                                id="email" 
                                placeholder="Địa chỉ Email"
                                className="p-2 outline-none w-full bg-transparent"
                            /> 
                        </div>
                        <span className="form-message"></span>
                    </div>
                    <div className="form-group space-y-1">
                        <div className="border border-gray-300 rounded-full overflow-hidden px-2 bg-gray-100 form-control">
                            <input 
                                ref={ passwordRef }
                                type="password" 
                                name="password"
                                id="password" 
                                placeholder="Mật khẩu"
                                className="p-2 outline-none w-full bg-transparent"
                            /> 
                        </div>
                        <span className="form-message"></span>
                    </div>
                    <div className="form-group space-y-1 pb-4">
                        <div className="border border-gray-300 rounded-full overflow-hidden px-2 bg-gray-100 form-control">
                            <input 
                                ref={ passwordComformRef }
                                type="password" 
                                name="passwordConform"
                                id="passwordConform" 
                                placeholder="Nhập lại mật khẩu"
                                className="p-2 outline-none w-full bg-transparent"
                            /> 
                        </div>
                        <span className="form-message"></span>
                    </div>
                    <button className="p-2 w-full rounded-full text-center text-white font-medium bg-[#fe3847]">
                        Đăng ký
                    </button>
                </form>)
            :
                /* Register options */
                (<div className="m-auto w-full px-10 sm:px-24 space-y-4">
                    <div 
                        className="flex items-center space-x-4 px-4 h-12 border-2 border-gray-300 rounded-full cursor-pointer hover:bg-gray-300"
                        onClick={ RegWithEmail }
                    >
                        <PersonOutlineIcon className="text-gray-600"/>
                        <span className="font-semibold text-gray-600">Đăng ký bằng Email</span>
                    </div>
                    <div className="flex items-center space-x-4 px-4 h-12 border-2 border-gray-300 rounded-full cursor-pointer hover:bg-gray-300">
                        <img alt="google logo" src={process.env.PUBLIC_URL + '/img/Google.icon.svg'}/>
                        <span className="font-semibold text-gray-600">Đăng ký qua Google</span>
                    </div>
                </div>)
            }
            

            <div className="m-auto">
                    <span>Bạn đã có tài khoản? </span>
                    <Link to="./login" className="text-primary font-medium">Đăng nhập</Link>  
            </div>
        </div>
    )
}

export default Register
