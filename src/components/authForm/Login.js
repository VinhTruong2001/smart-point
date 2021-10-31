import React, { useRef, useEffect, useState } from 'react'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Validator from '../../utils/validator'
import { connect } from 'react-redux';
import { setUser } from '../../actions/index';

function Login({ dispatch }) {
    const history = useHistory();
    const location = useLocation();
    const [isLoginWithEmail, setIsLoginWithEmail] = useState(false)

    // Validtor
    const emailRef = useRef("");
    const passwordRef = useRef("");

    useEffect(() => {
        Validator({
            form: '#loginForm',
            formGroupSelector: '.form-group',
            errorSelector: '.form-message',
            rules: [
                Validator.isRequire('#email', 'Vui lòng nhập vào Email'),
                Validator.isEmail('#email', 'Email không hợp lệ hoặc không đúng'),
                Validator.isRequire('#password', 'Vui lòng nhập mật khẩu'),
            ],
            onSubmit: function() {
                login();
            }
        })
    })

    const loginWithEmail = () => {
        setIsLoginWithEmail(true);
    }

    const backToLoginOptions = () => {
        setIsLoginWithEmail(false);
    }

    const login = () => {
        dispatch(setUser(emailRef.current.value, passwordRef.current.value));
        history.push(location.state?.prevPath || '/');
    }

    return (
        <div className="flex flex-col space-y-8 w-full">
            <h2 className="text-center font-bold text-2xl sm:text-3xl">Đăng nhập vào Smart Points</h2>

            
            {isLoginWithEmail ? 
                /* Login form with Email */
                (<form id="loginForm" className="m-auto w-full px-10 sm:px-16 space-y-2">
                    <div 
                        className="absolute top-4 left-4 cursor-pointer"
                        onClick={ backToLoginOptions }
                    >
                        <ArrowBackIosIcon />
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
                    <div className="form-group space-y-1 pb-4">
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
                    <button type="submit" className="p-2 w-full rounded-full text-center text-white font-medium bg-[#fe3847]">
                        Đăng nhập
                    </button>
                </form>)
            :
                /* Login options */
                (<div className="m-auto w-full px-10 sm:px-24 space-y-4">
                    <div 
                        className="flex items-center space-x-4 px-4 h-12 border-2 border-gray-300 rounded-full cursor-pointer hover:bg-gray-300"
                        onClick={ loginWithEmail }
                    >
                        
                        <PersonOutlineIcon className="text-gray-600"/>
                        <span className="font-semibold text-gray-600">Đăng nhập bằng Email</span>
                    </div>
                    <div className="flex items-center space-x-4 px-4 h-12 border-2 border-gray-300 rounded-full cursor-pointer hover:bg-gray-300">
                        <img alt="google logo" src={process.env.PUBLIC_URL + '/img/Google.icon.svg'}/>
                        <span className="font-semibold text-gray-600">Đăng nhập qua Google</span>
                    </div>
                </div>) 
            }
            
            <div className="m-auto">
                <span>Bạn chưa có tài khoản? </span>
                <Link to="./register" className="text-primary font-medium">Đăng ký</Link>  
            </div>
        </div>
    )
}

export default connect(null, null)(Login)
