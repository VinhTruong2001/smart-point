import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Link } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Avatar } from '@mui/material';
import { connect } from 'react-redux';

function NavbarPC({ user }) {
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
                <div className="flex items-center cursor-pointer">
                    <Avatar src={ user.profilePic } sx={{ width: 32, height: 32 }}/>
                    <ArrowDropDownIcon />
                </div>
            :
                /* Not sign in */
                <Link to="./login">
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
