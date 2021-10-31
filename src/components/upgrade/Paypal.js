import React, { useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

function Paypal({ value }) {
    const history = useHistory();
    const paypal = useRef();

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
                const order = await actions.order.capture();
                console.log(order);
                history.push('/')
            },
            onError: (err) => {
                console.log(err)
            }
        }).render(paypal.current)
    }, [value, history])

    return (
        <div className="flex col-span-2 mt-5 lg:mt-0">
            <div className="m-auto w-full lg:pl-14 z-[2]" ref={paypal}></div>
        </div>
    )
}

export default Paypal
