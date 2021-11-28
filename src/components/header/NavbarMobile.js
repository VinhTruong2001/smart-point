import React from 'react'
import '../../styles/navbarMobile.css'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DownloadIcon from '@mui/icons-material/Download';
import { Avatar } from '@mui/material';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import callApi from '../../utils/apiCaller';
import { setUser } from '../../actions';

function NavbarMobile({ user, dispatch }) {
    const history = useHistory()
    
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

    return (
        <div className="block lg:hidden relative">
            <input type="checkbox" id="toggleNav"/>
            <label htmlFor="toggleNav" className="menu-btn"></label>
            
            <div className="line first"></div>
            <div className="line second"></div>
            <div className="line third"></div>

            <label htmlFor="toggleNav" className="hidden overlay bg-black opacity-50 fixed z-2 top-0 bottom-0 right-0 left-0"></label>
            <div className="navbar-mobile-list fixed z-2 top-0 bottom-0 right-0 left-1/2 md:left-2/3 bg-white shadow-lg flex flex-col space-y-5 items-end px-2 pt-16">
                { user ?
                    /* Sign in */
                    <div className="flex w-full space-x-2 justify-between items-center cursor-pointer border-b border-gray-400 pb-3">
                        <div className="flex items-center space-x-2">
                            <Avatar src={ user?.userInfo?.profilePic } sx={{ width: 32, height: 32 }}/>
                            <span >{ user?.userInfo?.displayName }</span>
                        </div>
                        <ArrowDropDownIcon />
                        
                        <div className="">
                            <Link to={`/profile/${user?.userInfo?.uid}`}>
                                <div className="flex items-center p-2 space-x-3 text-gray-600 hover:bg-gray-200 cursor-pointer rounded-full">
                                    <SettingsIcon />
                                    <div>Chỉnh sửa thông tin cá nhân</div>
                                </div>
                            </Link>

                            <Link to="/favorite" className="flex items-center p-2 space-x-3 text-gray-600 hover:bg-gray-200 cursor-pointer rounded-full">
                                <FavoriteIcon />
                                <div>Danh sách yêu thích</div>
                            </Link>

                            <Link to="/downloaded" className="flex items-center p-2 space-x-3 text-gray-600 hover:bg-gray-200 cursor-pointer rounded-full">
                                <DownloadIcon />
                                <div>Danh sách đã tải</div>
                            </Link>

                            <div className="pt-2 border-t-2 border-gray-300 mt-2">
                                <div onClick={ logout } className="w-full flex items-center p-2 space-x-3 text-white bg-primary cursor-pointer rounded-md">
                                    <LogoutIcon />
                                    <div>Đăng xuất</div>
                                </div>
                            </div>
                        </div>
                    </div>
                :
                    /* Not sign in */
                    <Link to="./login">
                        <div className="cursor-pointer mx-auto py-2 text-center w-full border-black border btn">
                            <span>Đăng nhập</span>
                        </div>
                    </Link>
                }
    
                
                { !user?.userInfo?.type && 
                    <Link to='./upgrade'>
                        <div className="text-yellow-400 cursor-pointer flex items-center space-x-1">
                            <EmojiEventsIcon />
                            <span>Nâng cấp</span>
                        </div>
                    </Link>
                }  

                <Link to="/upload" className="cursor-pointer flex items-center">
                    <UploadFileIcon className="mr-2"/>
                    Đăng tải Template
                </Link> 
            </div>
        </div>
    )
}
function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null)(NavbarMobile)
