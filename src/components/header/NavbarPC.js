import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SettingsIcon from '@mui/icons-material/Settings';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DownloadIcon from '@mui/icons-material/Download';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { connect } from 'react-redux';
import { setUser } from '../../actions/index';
import { useRef } from 'react';

function NavbarPC({ user, dispatch }) {
    const loginPageRef = useRef(null);

    const logout = () => {
        dispatch(setUser("", ""));
        loginPageRef.current.click();
    }

    return (
        <div className="hidden h-14 space-x-3 lg:flex items-center text-white">
            <div className="text-white cursor-pointer">Mẹo vặt &amp; Hướng dẫn</div>

            { !user?.type &&
                <div className="text-yellow-400 cursor-pointer flex items-center space-x-1">
                    <EmojiEventsIcon />
                    <span>Nâng cấp</span>
                </div>
            }

            { user ? 
                /* Sign in */
                <button className="relative group">
                    <div className="cursor-pointer flex items-center group">
                        <Avatar src={ user.profilePic } sx={{ width: 32, height: 32 }}/>
                        <ArrowDropDownIcon />
                    </div>
                   
                    <div className="absolute z-[3] top-[130%] right-3 text-black bg-white w-[280px] p-2 rounded-md shadow-lg transform scale-0 group-focus:scale-100 origin-top-right duration-150 ">
                        <div className="flex space-x-4 items-center border-b-2 border-gray-300 pb-2 mb-2">
                            <Avatar src={ user.profilePic } sx={{ width: 40, height: 40 }}/>
                            <div>
                                <div className="font-medium">{ user.name }</div>
                                <div className="text-sm text-gray-500">{ user.email }</div>
                            </div>
                        </div>

                        <div className="flex items-center p-2 space-x-3 text-gray-600 hover:bg-gray-200 cursor-pointer rounded-full">
                            <SettingsIcon />
                            <div>Chỉnh sửa thông tin cá nhân</div>
                        </div>

                        <div className="flex items-center p-2 space-x-3 text-gray-600 hover:bg-gray-200 cursor-pointer rounded-full">
                            <FavoriteIcon />
                            <div>Danh sách yêu thích</div>
                        </div>

                        <div className="flex items-center p-2 space-x-3 text-gray-600 hover:bg-gray-200 cursor-pointer rounded-full">
                            <DownloadIcon />
                            <div>Danh sách đã tải</div>
                        </div>

                        <div className="pt-2 border-t-2 border-gray-300 mt-2">
                            <div onClick={ logout } className="w-full flex items-center p-2 space-x-3 text-white bg-primary cursor-pointer rounded-md">
                                <LogoutIcon />
                                <div>Đăng xuất</div>
                            </div>
                        </div>
                    </div>
                </button>
            :
                /* Not sign in */
                <Link to="./login">
                    <div className="text-white border-white btn btn-animation before:bg-white">
                        <span>Đăng nhập</span>
                    </div>
                </Link>
            }
            <Link ref={ loginPageRef } to="./login" className="hidden"></Link>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null)(NavbarPC)
