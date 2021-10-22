import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Link } from 'react-router-dom';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import { Avatar } from '@mui/material';

function NavbarPC() {
    return (
        <div className="hidden h-14 space-x-3 lg:flex items-center text-white">
            <div className="text-white cursor-pointer">Mẹo vặt & Hướng dẫn</div>
            <div className="text-yellow-400 cursor-pointer flex items-center space-x-1">
                <EmojiEventsIcon />
                <span>Nâng cấp</span>
            </div>

            {/* Not sign in */}
            <Link to="./login">
                <div className="text-white border-white btn btn-animation before:bg-white">
                    <span>Đăng nhập</span>
                </div>
            </Link>

            {/* Sign in */}
            {/* <div className="flex items-center cursor-pointer">
                <Avatar sx={{ width: 32, height: 32 }}/>
                <ArrowDropDownIcon />
            </div> */}
        </div>
    )
}

export default NavbarPC
