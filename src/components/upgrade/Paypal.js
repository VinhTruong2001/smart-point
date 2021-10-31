import React, { useRef, useEffect } from 'react'

function Paypal({ value }) {
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
            },
            onError: (err) => {
                console.log(err)
            }
        }).render(paypal.current)
    }, [value])

    return (
        <div className="flex">
            <div className="m-auto w-full pl-20" ref={paypal}></div>
        </div>
    )
}

export default Paypal
