import React, { useRef, useEffect, useState } from 'react'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Validator from '../../utils/validator'
import callApi from '../../utils/apiCaller' 
import { connect } from 'react-redux';
import { setUser } from '../../actions/index';

function Register({ dispatch }) {
    const history = useHistory();
    const location = useLocation();
    const [isRegWithEmail, setIsRegWithEmail] = useState(false)

    // Validtor
    const fullnameRef = useRef();
    const genderMaleRef = useRef();
    const genderFemaleRef = useRef();
    const dateOfBirthRef = useRef();
    const phoneNumberRef = useRef();
    const emailRef = useRef();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const passwordComformRef = useRef();

    useEffect(() => {
        Validator({
            form: '#registerForm',
            formGroupSelector: '.form-group',
            errorSelector: '.form-message',
            rules: [
                Validator.isRequire('#fullname', 'Vui lòng nhập vào tên hiển thị'),
                Validator.isRequire('#dateOfBirth', 'Vui lòng nhập vào ngày sinh'),
                Validator.isRequire('#phoneNumber', 'Vui lòng nhập vào số điện thoại'),
                Validator.isNumber('#phoneNumber', 'Số điện thoại không hợp lệ'),
                Validator.minLength('#phoneNumber', 9,'Số điện thoại phải có ít nhất 9 số'),
                Validator.maxLength('#phoneNumber', 11, 'Số điện thoại không được nhiều hơn 11 số'),
                Validator.isRequire('#email', 'Vui lòng nhập vào Email'),
                Validator.isEmail('#email', 'Email không hợp lệ hoặc không đúng'),
                Validator.isRequire('#password', 'Vui lòng nhập mật khẩu'),
                Validator.minLength('#password', 6),
                Validator.isRequire('#passwordConform', 'Vui lòng nhập lại mật khẩu'),
                Validator.isConfirmed('#passwordConform', function() {
                    return document.querySelector('#registerForm #password').value;
                }, 'Mật khẩu nhập lại không chính xác'),
            ],
            onSubmit: function() {
                register();
            }
        })
    })

    const RegWithEmail = () => {
        setIsRegWithEmail(true);
    }

    const backToLoginOptions = () => {
        setIsRegWithEmail(false);
    }

    const register = () => {
        const userAccount = JSON.stringify({
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        })

        const userInfo = JSON.stringify({
            displayName: fullnameRef.current.value,
            email: emailRef.current.value,
            phone: phoneNumberRef.current.value,
            isPremium: false,
            gender: genderMaleRef.current.checked ? genderMaleRef.current.value : genderFemaleRef.current.value,
            dateOfBirth: dateOfBirthRef.current.value
        })

        const userAccountLogin = JSON.stringify({
            username: usernameRef.current.value,
            password: passwordRef.current.value
        })

        callApi(
            'POST', 
            '/api/register/', 
            userAccount, 
            {'Content-Type': 'application/json'}
        ).then(resReg => {
            callApi(
                'PUT', 
                `/api/userdata/${resReg.data.user.uid}`, 
                userInfo, 
                {'Content-Type': 'application/json'}
            ).then(resUID => {
                callApi(
                    'POST',
                    '/api/login/',
                    userAccountLogin,
                    {'Content-Type': 'application/json'}
                ).then(resToken => {
                    const userSession = {
                        userInfo: resUID.data,
                        token: resToken.data.token
                    }

                    dispatch(setUser(userSession));
                    history.push(location.state?.prevPath || '/');
                })
            })
        }).catch(err => console.error(err));
    }

    return (
        <div className="flex flex-col space-y-12 w-full">
            <h2 className="text-center font-bold px-10 sm:px-0 text-2xl sm:text-3xl">Đăng ký tài khoản Smart Points</h2>

            {isRegWithEmail ? 
                /* Register form with Email */
                (<form id="registerForm" className="m-auto w-full px-10 sm:px-16 space-y-2 max-h-[300px] overflow-y-scroll lg:max-h-full lg:overflow-y-hidden">
                    <div 
                        className="absolute top-4 left-4 cursor-pointer"
                        onClick={ backToLoginOptions }
                    >
                        <ArrowBackIosIcon />
                    </div>
                    <div className="form-group space-y-1 pt-2">
                        <label className="font-medium">Tên hiển thị</label>
                        <div className="border border-gray-300 rounded-full overflow-hidden px-2 bg-gray-100 form-control">
                            <input 
                                ref={ fullnameRef }
                                type="text" 
                                name="fullname"
                                id="fullname" 
                                placeholder="Nhập vào tên hiển thị"
                                className="p-2 outline-none w-full bg-transparent"
                            /> 
                        </div>
                        <span className="form-message"></span>
                    </div>
                    <div className="form-group space-y-1 pt-2">
                        <div className=" flex items-center space-x-5">
                            <label className="font-medium">Giới tính</label>
                            <div className="form-control flex space-x-5">
                                <div className="flex items-center space-x-2">
                                    <input 
                                        ref={ genderMaleRef }
                                        type="radio" 
                                        name="gender"
                                        id="gender-male" 
                                        value="M"
                                        className="bg-transparent"
                                        defaultChecked
                                    /> 
                                    <label htmlFor="gender-male">Nam</label>
                                </div>
                            <div className="flex items-center space-x-2">
                                    <input 
                                        ref={ genderFemaleRef }
                                        type="radio" 
                                        name="gender"
                                        value="F"
                                        id="gender-female" 
                                        className="bg-transparent"
                                    />
                                    <label htmlFor="gender-female">Nữ</label>  
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group space-y-1 pt-2">
                        <label className="font-medium">Ngày sinh</label>
                        <div className="border border-gray-300 rounded-full overflow-hidden px-2 bg-gray-100 form-control">
                            <input 
                                ref={ dateOfBirthRef }
                                type="date"
                                name="dateOfBirth"
                                id="dateOfBirth" 
                                placeholder="mm/dd/yyyy"
                                className="p-2 outline-none w-full bg-transparent"
                            /> 
                        </div>
                        <span className="form-message"></span>
                    </div>
                    <div className="form-group space-y-1 pt-2">
                        <label className="font-medium">Số điện thoại</label>
                        <div className="border border-gray-300 rounded-full overflow-hidden px-2 bg-gray-100 form-control">
                            <input 
                                ref={ phoneNumberRef }
                                type="tel" 
                                name="phoneNumber"
                                id="phoneNumber" 
                                placeholder="Số điện thoại của bạn"
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
                    <div className="form-group space-y-1 pt-2">
                        <label className="font-medium">Tên đăng nhập</label>
                        <div className="border border-gray-300 rounded-full overflow-hidden px-2 bg-gray-100 form-control">
                            <input 
                                ref={ usernameRef }
                                type="text"
                                name="username"
                                id="username" 
                                placeholder="Tên đăng nhập"
                                className="p-2 outline-none w-full bg-transparent"
                            /> 
                        </div>
                        <span className="form-message"></span>
                    </div>
                    <div className="form-group space-y-1 pt-2">
                        <label className="font-medium">Mật khẩu</label>
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

export default connect(null, null)(Register)
