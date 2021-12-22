import React from 'react';

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        }
        document.body.appendChild(script);
    })
};
const Wallet = () => { 
    const displayRazorpay = async() => {

        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
        if(!res){
            alert('Razorpay SDK failed to load. Are you online?');
            return;
        }

        const options = {
            "key": "rzp_test_Mw3xJon25Hkpmy", // Enter the Key ID generated from the Dashboard
            "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Acme Corp",
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": function (response){
                alert(response.razorpay_payment_id);
                alert(response.razorpay_order_id);
                alert(response.razorpay_signature)
            },
            "prefill": {
                "name": "Gaurav Kumar",
                "email": "gaurav.kumar@example.com",
                "contact": "9999999999"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        const paymentObj = new window.Razorpay(options);
        paymentObj.open();
    };

    return(
        <div className='margin-top'>
            <div className="py-3 card container bg-dark trading-card text-white" style={{width: "25rem"}}>
                <div className="card-body">
                    <div className='h3 text-center'>Wallet</div>
                    <button className='btn btn-primary' onClick={displayRazorpay}>Add Money</button>
                </div>
            </div>
        </div>
    );
};

export default Wallet;