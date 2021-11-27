import React, { useRef, useState, useEffect } from 'react'
import Validator from '../utils/validator'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Paypal from '../components/upgrade/Paypal'
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

function Upgrade({ user }) {
    const history = useHistory();
    const location = useLocation();

    const fullnameRef = useRef();
    const emailRef = useRef();
    const addressRef = useRef();
    const cityRef = useRef();
    const price1Ref = useRef();
    const price2Ref = useRef();
    const [checkout, setCheckout] = useState(false);
    
    useEffect(() => {
        if (!user) {
            history.push('/login', { prevPath: location.pathname })
        }
    }, [user, history, location])

    useEffect(() => {
        Validator({
            form: '#checkOutForm',
            formGroupSelector: '.form-group',
            errorSelector: '.form-message',
            rules: [
                Validator.isRequire('#fullname', 'Vui lòng nhập họ và tên'),
                Validator.isRequire('#email', 'Vui lòng nhập vào Email'),
                Validator.isEmail('#email', 'Email không hợp lệ hoặc không đúng'),
                Validator.isRequire('#address', 'Vui lòng nhập địa chỉ'),
                Validator.isRequire('#city', 'Vui lòng nhập tỉnh/thành'),
            ],
            onSubmit: function() {
                fullnameRef.current.disabled = true;
                emailRef.current.disabled = true;
                addressRef.current.disabled = true;
                cityRef.current.disabled = true;
                if (price1Ref.current.checked) {
                    price2Ref.current.disabled = true;
                }
                else {
                    price1Ref.current.disabled = true;
                }

                fullnameRef.current.parentElement.classList.add('bg-gray-200')
                emailRef.current.parentElement.classList.add('bg-gray-200')
                addressRef.current.parentElement.classList.add('bg-gray-200')
                cityRef.current.parentElement.classList.add('bg-gray-200')
                setCheckout(true);
            }
        })
    })

    return (
        <div>
            <div className="bg-gradient-primary h-40 text-center">
                <EmojiEventsIcon className="text-yellow-400" sx={{ width: 60, height: 60 }}/>
                <div className="text-white font-semibold text-xl mt-4">
                    Nâng cấp lên tài khoản 
                    <span className="text-yellow-300"> Premium</span>
                    <br></br> 
                    để tải được nhiều Template chất lượng hơn
                </div>
            </div>

            <div className="body-container py-10">
                {/* Checkout form */}
                <form id="checkOutForm" className="grid grid-cols-1 lg:grid-cols-3">
                    <div className="col-span-2 space-y-4">
                        <h2 className="text-primary font-bold uppercase text-2xl mb-4">Thông tin cá nhân</h2>

                        <div className="form-group space-y-1 pt-2 flex items-center space-x-3 lg:space-x-0">
                            <label className="font-medium w-[20%] lg:text-xl">Họ và tên*</label>
                            <div className="flex-1">
                                <div className="border border-gray-300 px-2 rounded-md form-control">
                                    <input 
                                        ref={ fullnameRef }
                                        type="text" 
                                        name="fullname"
                                        id="fullname" 
                                        className="p-2 outline-none w-full bg-transparent"
                                    /> 
                                </div>
                                <span className="form-message"></span>
                            </div>
                        </div>
                        <div className="form-group space-y-1 pt-2 flex items-center space-x-3 lg:space-x-0">
                            <label className="font-medium w-[20%] lg:text-xl">Email*</label>
                            <div className="flex-1">
                                <div className="border border-gray-300 px-2 rounded-md form-control">
                                    <input 
                                        ref={ emailRef }
                                        type="text" 
                                        name="email"
                                        id="email"
                                        className="p-2 outline-none w-full bg-transparent"
                                        defaultValue={user?.userInfo.email}
                                    /> 
                                </div>
                                <span className="form-message"></span>
                            </div>
                        </div>
                        <div className="form-group space-y-1 pt-2 flex items-center space-x-3 lg:space-x-0">
                            <label className="font-medium w-[20%] lg:text-xl">Địa chỉ*</label>
                            <div className="flex-1">
                                <div className="border border-gray-300 px-2 rounded-md form-control">
                                    <input 
                                        ref={ addressRef }
                                        type="text" 
                                        name="address"
                                        id="address"
                                        className="p-2 outline-none w-full bg-transparent"
                                    /> 
                                </div>
                                <span className="form-message"></span>
                            </div>
                        </div>
                        <div className="form-group space-y-1 pt-2 pb-5 flex items-center space-x-3 lg:space-x-0">
                            <label className="font-medium w-[20%] lg:text-xl">Tỉnh/Thành*</label>
                            <div className="flex-1">
                                <div className="border border-gray-300 px-2 rounded-md form-control">
                                    <input 
                                        ref={ cityRef }
                                        type="text" 
                                        name="city"
                                        id="city"
                                        className="p-2 outline-none w-full bg-transparent"
                                    /> 
                                </div>
                                <span className="form-message"></span>
                            </div>
                        </div>
                    </div>
                   
                    {/* Price */}
                    <div className="space-y-4 w-full">
                        {/* Monthly */}
                        <label className="block relative h-36 rounded-lg bg-gradient-primary lg:ml-32 p-3 cursor-pointer">
                            <div className="text-yellow-200 space-x-2 uppercase font-bold flex items-center">
                                <EmojiEventsIcon />
                                <span className="">Gói 1 tháng</span>
                            </div>
                            <div className="text-white">
                                <span className="text-2xl font-bold">$3.99</span> 
                                <span>/tháng</span>
                            </div>
                            <div className="italic text-white mt-4">Số tiền phải thanh toán: $3.99</div>
                            <div className="absolute top-3 right-3">
                                <input ref={ price1Ref } type="radio" name="price" value={3.99} defaultChecked/>
                            </div>
                        </label>

                        {/* One year */}
                        <label className="block relative h-36 rounded-lg bg-gradient-primary lg:ml-32 p-3 cursor-pointer">
                            <div className="text-yellow-200 space-x-2 uppercase font-bold flex items-center">
                                <EmojiEventsIcon className="" />
                                <span className="">Gói 1 năm</span>
                            </div>
                            <div className="text-white">
                                <span className="text-2xl font-bold">$2.33</span>
                                <span>/tháng</span>
                            </div>
                            <div className="italic text-white mt-4">Số tiền phải thanh toán: $27.99</div>
                            <div className="absolute top-3 right-3">
                                <input ref={ price2Ref } type="radio" name="price" value={27.99}/>
                            </div>
                        </label>
                    </div>

                    { checkout ? (
                        <Paypal value={document.querySelector("input[name='price']:checked").value}/>
                        ) : (
                            <button 
                                type="submit"
                                className="col-span-2 bg-primary text-white font-semibold rounded-md py-3 mt-5"
                            >
                                Tiến hành thanh toán
                            </button>
                    )}
                </form>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null)(Upgrade)
