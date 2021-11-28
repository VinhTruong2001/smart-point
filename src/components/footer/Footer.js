import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div className="text-white py-10 bg-[#181b44] mt-10 body-container grid grid-cols-1 gap-y-5 sm:grid-cols-2 xl:grid-cols-3 sm:gap-x-28 sm:gap-y-7">
            <div>
                <div className="font-medium text-2xl mb-3">Thiết kế chuyên nghiệp</div>
                <p className="text-lg">Các mẫu Template của Smart Points bao gồm đầy đủ các thành phần hỗ trợ việc truyền tải nội dung của bạn đồng thời gây ấn tượng với người nghe.</p>
            </div>
            <div>
                <div className="font-medium text-2xl mb-3">Hỗ trợ mua bán các Template</div>
                <p className="text-lg">Smart Points cung cấp môi trường cho các nhà thiết kế template có thể chia sẻ các mẫu template của mình hoặc có thể bán chúng cho những người dùng đã nâng cấp tài khoản.</p>
            </div>
            <div>
                <div className="font-medium text-2xl mb-3">Liên hệ</div>
                <div className="flex items-center space-x-4">
                    <Link to="/">
                        <FacebookIcon />
                    </Link>
                    <Link to="/">
                        <InstagramIcon />
                    </Link>
                    <Link to="/">
                        <TwitterIcon />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Footer
