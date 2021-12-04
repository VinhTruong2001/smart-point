import { Avatar } from '@mui/material'
import React, { useRef, useState, useEffect } from 'react'
import { connect } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import callApi from '../../utils/apiCaller'
import { setUser } from '../../actions'
import Validator from '../../utils/validator'
import { useHistory } from 'react-router';

function ProfileEdit({ user, dispatch }) {
    const history = useHistory();
    const displayNameRef = useRef();
    const phoneRef = useRef();
    const currentPasswordRef = useRef();
    const currentPasswordErrorRef = useRef();
    const newPasswordRef = useRef();
    const newPasswordConfirmRef = useRef();
    const filePickerRef = useRef();
    const [newAvatar, setAvatar] = useState(null);
    const [preAvatar, setPreviewAva] = useState(null);

    const [isChangePassword, setIsChangePassword] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        Validator({
            form: '#changePasswordForm',
            formGroupSelector: '.form-group',
            errorSelector: '.form-message',
            rules: [
                Validator.isRequire('#currentPassword', 'Vui lòng nhập mật khẩu hiện tại của bạn'),
                Validator.isRequire('#newPassword', 'Vui lòng nhập mật khẩu'),
                Validator.isRequire('#newPasswordConfirm', 'Vui lòng nhập lại mật khẩu'),
                Validator.isConfirmed('#newPasswordConfirm', function() {
                    return document.querySelector('#changePasswordForm #newPassword').value;
                }, 'Mật khẩu nhập lại không chính xác'),
            ],
            onSubmit: function() {
                changePassword();
            }
        })
    })

    const uploadAvatarFile = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            setAvatar(e.target.files[0]);
            reader.readAsDataURL(e.target.files[0]);
        }
        
        reader.onload = (readerEvent) => {
            setPreviewAva(readerEvent.target.result)
        }
    }

    const uploadToServer = (e) => {
        e.preventDefault();
        const userUid = user?.userInfo.uid;
        let form_data = new FormData();
        form_data.append('displayName', displayNameRef.current.value.trim());
        form_data.append('email', user?.userInfo.email);
        form_data.append('profilePic', newAvatar, newAvatar.name);
        form_data.append('phone', phoneRef.current.value.trim());
        form_data.append('gender', user?.userInfo.gender);
        form_data.append('dateOfBirth', user?.userInfo.dateOfBirth);
        
        callApi(
            "PUT", 
            `/api/userdata/${userUid}`, 
            form_data, 
            {'Content-Type': 'multipart/form-data'}
        ).then(res => { 
            const userConfig = {
                userInfo: res.data,
                token: user?.token
            }
            dispatch(setUser(userConfig))
        })
    }

    const logout = () => {
        callApi(
            'POST', 
            '/api/logout/', 
            null, 
            {'Authorization': `Token ${user.token}`}
        ).then(() => {
            dispatch(setUser(null));
            history.push('/login');
        })
    }

    const clearForm = () => {
        currentPasswordRef.current.value = '';
        newPasswordRef.current.value = '';
        newPasswordConfirmRef.current.value = '';
        setIsSuccess(false);
    }

    const changePassword = () => {
        let form_data = new FormData();
        form_data.append('old_password', currentPasswordRef.current.value)
        form_data.append('new_password', newPasswordRef.current.value)

        callApi(
            'PUT', 
            '/api/change-password/', 
            form_data, 
            {
                'Authorization': `Token ${user?.token}`,
                'Content-Type': 'multipart/form-data'
            }
        ).then(() => {
            setIsSuccess(true)
        }).catch(err => {
            if (err.response.data.old_password) {
                currentPasswordErrorRef.current.innerText = "Mật khẩu hiện tại không đúng"
                currentPasswordErrorRef.current.parentElement.classList.add('invalid')
            }
        })
    } 

    return (<>
        <form onSubmit={ uploadToServer } className="relative">
            {/* Edit profile */}
           <div className="flex flex-col space-y-3 justify-center items-center pb-20">
                <div className="relative">
                    <Avatar src={ preAvatar || (user?.userInfo?.profilePic ? "http://localhost:8000" + user?.userInfo?.profilePic : user?.userInfo?.defaultGooglePhotoUrl) } sx={{ width: 100, height: 100 }}/>
                    <label htmlFor="avatarUpload" className="absolute right-0 bottom-0 flex items-center text-white p-1 rounded-full bg-primary cursor-pointer">
                        <EditIcon fontSize="small"/>
                    </label>
                    <input 
                        ref={ filePickerRef }
                        onChange={ uploadAvatarFile } 
                        type="file" 
                        name="avatarUpload" 
                        id="avatarUpload"
                        className="hidden"
                    />
                </div>
                <div className="flex items-center">
                    <input 
                        ref={ displayNameRef }
                        type="text"
                        name="displayName"
                        id="displayName" 
                        className="min-w-400 text-center text-primary text-2xl lg:text-3xl font-bold outline-none pb-2 border-b border-primary" 
                        defaultValue={ user?.userInfo.displayName }
                    />
                    <label htmlFor="displayName" className="text-primary">
                        <ModeEditOutlineOutlinedIcon fontSize="small"/>
                    </label>
                </div>
                <div className="text-gray-400">
                    { user?.userInfo.email }
                </div>
                <div className="flex items-center">
                    <input 
                        ref={ phoneRef }
                        type="text"
                        name="phone" 
                        id="phone"
                        className="min-w-200 text-center text-gray-400 pb-[2px] border-b border-gray-400 outline-none" 
                        defaultValue={ user?.userInfo.phone }
                    />
                    <label htmlFor="phone" className="text-primary cursor-pointer">
                        <ModeEditOutlineOutlinedIcon fontSize="small"/>
                    </label>
                </div>
           </div>

            {/* Change password model and Update button */}
            <div className="absolute bottom-0 right-0 flex space-x-4">
                <div onClick={() => setIsChangePassword(!isChangePassword)} className="border border-gray-300 p-2 rounded-lg cursor-pointer">
                    Thay đổi mật khẩu
                </div>

                <button type="submit" className="text-white bg-primary p-2 rounded-lg">
                    Cập nhật
                </button>
            </div>
        </form>
            
        <form id="changePasswordForm" className={`pt-10 w-full transform scale-y-0 transition duration-300 origin-top ${isChangePassword && 'scale-y-100'}`}>
            <h3 className="font-bold text-primary text-center text-2xl">Thay đổi mật khẩu</h3>
            <div className="w-full flex flex-col items-center ">
                <div className="form-group w-full lg:w-[40%] space-y-1 pt-2">
                    <label className="font-medium">Mật khẩu hiện tại</label>
                    <div className="border border-gray-300 rounded-full overflow-hidden px-2 bg-gray-100 form-control">
                        <input 
                            ref={ currentPasswordRef }
                            type="password" 
                            name="currentPassword"
                            id="currentPassword" 
                            placeholder="Nhập mật khẩu hiện tại của bạn"
                            className="p-2 outline-none w-full bg-transparent"
                        /> 
                    </div>
                    <span ref={currentPasswordErrorRef} className="form-message"></span>
                </div>
                <div className="form-group w-full lg:w-[40%] space-y-1 pt-2">
                    <label className="font-medium">Mật khẩu mới</label>
                    <div className="border border-gray-300 rounded-full overflow-hidden px-2 bg-gray-100 form-control">
                        <input 
                            ref={ newPasswordRef }
                            type="password" 
                            name="newPassword"
                            id="newPassword" 
                            placeholder="Nhập mật khẩu mới"
                            className="p-2 outline-none w-full bg-transparent"
                        /> 
                    </div>
                    <span className="form-message"></span>
                </div>
                <div className="form-group w-full lg:w-[40%] space-y-1 pt-2">
                    <label className="font-medium">Nhập lại mật khẩu mới</label>
                    <div className="border border-gray-300 rounded-full overflow-hidden px-2 bg-gray-100 form-control">
                        <input 
                            ref={ newPasswordConfirmRef }
                            type="password" 
                            name="newPasswordConfirm"
                            id="newPasswordConfirm" 
                            placeholder="Nhập lại mật khẩu mới"
                            className="p-2 outline-none w-full bg-transparent"
                        /> 
                    </div>
                    <span className="form-message"></span>
                </div>
                <button className="btn !bg-primary text-white w-full lg:w-[40%] mt-5">
                    Cập nhật
                </button>
            </div>
        </form>

        { isSuccess &&
                <div className="absolute top-0 h-screen left-0 right-0 flex">
                    <div className="fixed top-0 h-screen left-0 right-0 z-20 bg-black opacity-50"></div>
                    <div className="m-auto z-30 bg-white p-2 lg:p-4 text-center">
                        <CheckCircleOutlineIcon className="text-green-400 mb-3" sx={{ width: 100, height: 100 }}/>
                        <div className="space-y-5">
                            <span className="font-bold lg:text-2xl">Thay đổi mật khẩu thành công</span>
                            <div className="flex justify-around">
                                <button 
                                    className="btn !bg-green-400 text-white"
                                    onClick={ () => {
                                        clearForm();
                                        logout();
                                    } }
                                >
                                    Đăng nhập lại
                                </button>
                            </div>
                        </div>
                    </div>
                </div>                
            }
    </>)
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null)(ProfileEdit)
