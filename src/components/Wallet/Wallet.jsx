import React from "react";
import { axiosInstance } from "../../axios";

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
function Wallet(props) {
  const [amt, setAmt] = React.useState(0);
  const [amtAvailable, setAmtAvailable] = React.useState(0);

  React.useEffect(() => {
    axiosInstance
      .get("/user", {
        params: {
          userId: localStorage.getItem("userId"),
        },
      })
      .then((resp) => {
        setAmtAvailable(resp.data.user.wallet.totalAmt);
      });
  }, []);

  const displayRazorpay = async () => {
    const orderId = await axiosInstance
      .post("/razorpay", { amt })
      .then((order) => {
        return order.data.orderId;
      });
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: "rzp_test_Mw3xJon25Hkpmy", // Enter the Key ID generated from the Dashboard
      amount: (amt * 100).toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Acme Corp",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderId, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      async handler(response) {
        await axiosInstance
          .post("/verification", {
            amt,
            orderId,
            paymentResp: response,
            userId: localStorage.getItem("userId"),
          })
          .then((resp) => {
            setAmtAvailable(resp.data.totalAmt);
          });
      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const paymentObj = new window.Razorpay(options);
    paymentObj.open();
  };

  const onAmtInput = (e) => {
    setAmt(e.target.value);
  };

  return (
    <div className="margin-top">
      <div
        className="py-3 card container bg-dark trading-card text-white"
        style={{ width: "65rem" }}
      >
        <div className="card-body">
          <div className="h1 text-center pe-5">Wallet</div>
          <div className="d-flex mt-5">
            <div
              className="d-flex flex-column align-items-center"
              style={{ width: "30rem" }}
            >
              <div className="h5">Balance Available:</div>
              <div className="h2">{"₹ " + amtAvailable}</div>
            </div>
            {/* <div className="vl"  style={{width:'10rem'}}></div> */}
            <div
              className="d-flex flex-column align-items-center"
              style={{ width: "30rem" }}
            >
              <div className="d-flex">
                <p className="h4 me-3 mt-1">Enter amount:</p>
                <input
                  style={{ width: "12rem" }}
                  type="number"
                  className="form-control"
                  id="amt"
                  aria-describedby="Amount"
                  onChange={(e) => onAmtInput(e)}
                />
              </div>
              <div className="text-center mt-3">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={displayRazorpay}
                >
                  Add Money
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wallet;
