import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "../../axios";

function Withdraw(props) {
  const [state, setState] = useState({
    amt: undefined,
    accountNo: undefined,
    ifsc: undefined,
  });

  const [pastRequests, setPastRequests] = useState({});
  const [runUseEffect, setRunUseEffect] = useState(true);

  useEffect(async () => {
    await axiosInstance
      .post("/withdrawRequests", { userId: localStorage.getItem("userId") })
      .then((resp) => {
        setPastRequests({ ...resp.data.requests });
        console.log("past requests", resp.data.requests);
      })
      .catch((e) => {
        console.error(e);
        toast.error("Something went wrong!");
      });
  }, [runUseEffect]);

  const onSubmit = () => {
    if (state.amt > props.amtAvailable) {
      toast.dark("Insufficient Balance!");
      return;
    }
    if (state.amt && state.ifsc && state.accountNo) {
      axiosInstance
        .post("withdraw", {
          userId: localStorage.getItem("userId"),
          amt: state.amt,
          accountNo: state.accountNo,
          ifsc: state.ifsc,
        })
        .then((resp) => {
          toast.info("Request placed!");
          setRunUseEffect(!runUseEffect);
          props.setFetchAmt(!props.fetchAmt);
          setState({
            amt: undefined,
            accountNo: undefined,
            ifsc: undefined,
          });
        })
        .catch((e) => {
          console.error(e);
          toast.dark("Something went wrong!");
        });
    } else {
      toast.dark("Please provide all inputs");
    }
  };

  const onAmtInput = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };

  return (
    <>
      <div
        className="py-3 card container bg-dark trading-card text-white mt-3"
        style={{ width: "65rem" }}
      >
        <div className="card-body px-5">
          <div className="h1 text-center pe-5">Withdraw</div>
          <div className="row mt-5">
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <p className="h4 me-3 mt-1">Amount:</p>
                <input
                  style={{ width: "12rem" }}
                  type="number"
                  className="form-control"
                  id="amt"
                  aria-describedby="Amount"
                  onChange={(e) => onAmtInput(e)}
                />
              </div>
              <div className="d-flex">
                <p className="h4 me-3 mt-1">Account Number:</p>
                <input
                  style={{ width: "20rem" }}
                  type="number"
                  className="form-control"
                  id="accountNo"
                  aria-describedby="Amount"
                  onChange={(e) => onAmtInput(e)}
                />
              </div>
            </div>
            <div className="d-flex justify-content-around mt-5">
              <div className="d-flex">
                <p className="h4 me-3 mt-1">IFSC Code:</p>
                <input
                  style={{ width: "15rem" }}
                  type="text"
                  className="form-control"
                  id="ifsc"
                  aria-describedby="Amount"
                  onChange={(e) => onAmtInput(e)}
                />
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={onSubmit}
              >
                Withdraw Money
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="py-3 card container bg-dark trading-card text-white mt-3"
        style={{ width: "65rem" }}
      >
        <div className="card-body px-5">
          <div className="h1 text-center pe-5">All requests</div>
          {Object.values(pastRequests).map((result) => {
            console.log(result);
            return (
              <div
                className="card container my-2"
                style={{ width: "30rem", color: "black" }}
              >
                <div className="d-flex justify-content-around mt-2">
                  <p>Amount - {result.amt}</p>
                  <p>
                    Status - {result.transactionId ? "Complete" : "Pending"}
                  </p>
                </div>
                {result.transactionId && (
                  <div className="d-flex justify-content-around mt-2">
                    <p>Transaction Id - {result.transactionId}</p>
                    <p>Amount Transferred: {result.amtTrans}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Withdraw;
