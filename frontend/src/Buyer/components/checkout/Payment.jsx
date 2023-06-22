import React from "react";
import BuyerProductInstance from "../../axios/BuyerProductInstance";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DeleteCart } from "../../../redux-tk/reducers/CartReducer";

function Payment({order}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  console.log(order?.cart);

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    async function displayRazorpay() {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const result = await BuyerProductInstance.post("generate-rzp-orderId", {...order});

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        console.log("from generateRZPOrder",result)
        const { amount, id } = result.data.data.order;

        const options = {
            key: "rzp_test_Ay6XZuAGWShoue", 
            amount: amount,
            currency: "INR",
            name: '22yards Ltd.',
            description: "Test Transaction",
            order_id: id,
            handler: async function (response) {
                const data = {
                    orderCreationId: id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };

                BuyerProductInstance.post("/verify-payment",{...data})
                .then(resp => {
                  if(resp.data.success === false){
                    navigate('/payment-status/'+false);
                  }else{
                    dispatch(DeleteCart())
                    navigate('/payment-status/'+true);
                  }
                })
                .catch(err => alert(err.message));
            },
            prefill: {
                name: order.fullName,
                email: order.email,
                contact: order.mobile,
            },
            notes: {
                cart: order.cart,
            },
            theme: {
                color: "#4555FF",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <div className="text-center p-5 bg-dark">
            <header className="App-header">
                <p>Pay now!</p>
                <button className="btn btn-light" onClick={displayRazorpay}>
                    Pay <h1>₹</h1> {order.totalBillAmount} <br /> now
                </button>
            </header>
        </div>
    );
}

export default Payment;
