import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { connect } from 'react-redux'
import callApi from '../../utils/apiCaller'
import { setUser } from '../../actions';

function Paypal({ dispatch, uid, token, value }) {
    const paypal = useRef();
    const [isSuccess, setIsSuccess] = useState(null)
    
    useEffect(() => {
        window.paypal.Buttons({
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            description: "Upgrade account",
                            amount: {
                                currency_code: "USD",
                                value,
                            }
                        }
                    ]
                })
            },
            onApprove: async (data, actions) => {
                // eslint-disable-next-line
                const order = await actions.order.capture();
                callApi('PATCH', `/api/userdata/update-premium/${uid}/1`).then(res => {
                    setIsSuccess(true)
                    dispatch(setUser({
                        userInfo: res.data,
                        token
                    }))
                })
                console.log(order)
            },
            onError: (err) => {
                setIsSuccess(false)
            }
        }).render(paypal.current)
    }, [value, uid, token, dispatch])

    return (<>
        <div className="flex col-span-2 mt-5 lg:mt-0">
            <div className="m-auto w-full lg:pl-14 z-[2]" ref={paypal}></div>
        </div>
        { isSuccess &&
                <div className="absolute top-0 h-screen left-0 right-0 flex">
                    <div className="fixed top-0 h-screen left-0 right-0 z-20 bg-black opacity-50"></div>
                    <div className="m-auto w-screen z-30 bg-white py-2 lg:py-4 mx-4 lg:mx-80 text-center">
                        <CheckCircleOutlineIcon className="text-green-400 mb-3" sx={{ width: 100, height: 100 }}/>
                        <div className="space-y-5">
                            <span className="font-bold lg:text-2xl">Thanh toán thành công</span>
                            <div className="flex justify-around">
                                <Link to="/" className="btn !bg-green-400 text-white">
                                    OK
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>                
            }
            { isSuccess===false &&
                <div className="absolute top-0 h-screen left-0 right-0 flex">
                    <div className="fixed top-0 h-screen left-0 right-0 z-20 bg-black opacity-50"></div>
                    <div className="m-auto w-screen z-30 bg-white py-2 lg:py-4 mx-4 lg:mx-80 text-center">
                        <CancelOutlinedIcon className="text-red-400 mb-3" sx={{ width: 100, height: 100 }}/>
                        <div className="space-y-5">
                            <span className="font-bold lg:text-2xl">Thanh toán thất bại</span>
                            <div className="flex justify-center">
                                <button 
                                    className="btn !bg-red-400 text-white !px-10"
                                    onClick={ () => setIsSuccess(null) }
                                >
                                    Thử lại
                                </button>
                            </div>
                        </div>
                    </div>
                </div>                
            }
    </>)
}

export default connect(null, null)(Paypal)
