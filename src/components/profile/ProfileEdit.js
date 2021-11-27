import { Avatar } from '@mui/material'
import React, { useRef, useState } from 'react'
import { connect } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import callApi from '../../utils/apiCaller'
import { setUser } from '../../actions'

function ProfileEdit({ user, dispatch }) {
    const displayNameRef = useRef();
    const phoneRef = useRef();
    const currentPasswordRef = useRef();
    const newPasswordRef = useRef();
    const newPasswordConfirmRef = useRef();
    const filePickerRef = useRef();
    const [newAvatar, setAvatar] = useState(null);
    const [preAvatar, setPreviewAva] = useState(null);

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
        form_data.append('displayName', displayNameRef.current.value);
        form_data.append('email', user?.userInfo.email);
        form_data.append('profilePic', newAvatar, newAvatar.name);
        form_data.append('phone', phoneRef.current.value);
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

    return (<>
        <form onSubmit={ uploadToServer } className="relative">
            {/* Edit profile */}
           <div className="flex flex-col space-y-3 justify-center items-center pb-20">
                <div className="relative">
                    <Avatar src={ preAvatar || user?.userInfo.profilePic } sx={{ width: 100, height: 100 }}/>
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
                <div className="border border-gray-300 p-2 rounded-lg cursor-pointer">
                    Thay đổi mật khẩu
                </div>

                <button type="submit" className="text-white bg-primary p-2 rounded-lg">
                    Cập nhật
                </button>
            </div>
        </form>

        <form className="pt-10">
            <h3 className="font-bold text-primary text-2xl">Thay đổi mật khẩu</h3>
            <div className="ml-10 w-[40%]">
                <div className="form-group space-y-1 pt-2">
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
                    <span className="form-message"></span>
                </div>
                <div className="form-group space-y-1 pt-2">
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
                <div className="form-group space-y-1 pt-2">
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
            </div>
        </form>
    </>)
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null)(ProfileEdit)
