import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SettingsIcon from '@mui/icons-material/Settings';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DownloadIcon from '@mui/icons-material/Download';
import LogoutIcon from '@mui/icons-material/Logout';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Link, useHistory } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { connect } from 'react-redux';
import { setUser } from '../../actions/index';
import callApi from '../../utils/apiCaller'


function NavbarPC({ user, dispatch }) {
    const history = useHistory();
    const userSession = JSON.parse(sessionStorage.getItem("session"))

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
        <div className="hidden h-14 space-x-3 lg:flex items-center text-white">
            <Link to="/upload" className="text-white cursor-pointer space-x-2">
                Đăng tải Template
                <UploadFileIcon />
            </Link>

            { !user?.userInfo?.isPremium &&
                <Link to="/upgrade">
                    <div className="text-yellow-400 cursor-pointer flex items-center space-x-1">
                        <EmojiEventsIcon />
                        <span>Nâng cấp</span>
                    </div>
                </Link>
            }

            { user || userSession ? 
                /*  Sign in */
                <div className="relative group h-11 flex items-center">
                    <div className="cursor-pointer flex items-center">
                        <Avatar src={ user?.userInfo?.profilePic || user?.userInfo?.defaultGooglePhotoUrl } sx={{ width: 32, height: 32 }}/>
                        <ArrowDropDownIcon />
                    </div>
                   
                    <div className="absolute z-[3] top-[101%] right-3 text-black bg-white w-[280px] p-2 rounded-md shadow-lg transform scale-0 group-hover:scale-100 origin-top-right duration-200 ">
                        <div className="flex space-x-4 items-center border-b-2 border-gray-300 pb-2 mb-2">
                            <Avatar src={ user?.userInfo?.profilePic || user?.userInfo?.defaultGooglePhotoUrl } sx={{ width: 40, height: 40 }}/>
                            <div>
                                <div className="font-medium">{ user?.userInfo?.displayName }</div>
                                <div className="text-sm text-gray-500">{ user?.userInfo?.email }</div>
                            </div>
                        </div>

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
                <Link to="/login">
                    <div className="text-white border-white btn btn-animation before:bg-white">
                        <span>Đăng nhập</span>
                    </div>
                </Link>
            }
        </div>
    )
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null)(NavbarPC)
