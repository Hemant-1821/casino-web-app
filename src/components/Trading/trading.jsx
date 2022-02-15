import React from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "../../axios";

function Trading() {
  const platinum = "platinum";
  const gold = "gold";
  const silver = "silver";

  const initialState = {
    isBuy: true,
    metalsPrice: {
      [gold]: undefined,
      [silver]: undefined,
      [platinum]: undefined,
    },
    selectedMetal: gold,
    metalAmt: 0,
    availableBal: undefined,
    totalHoldings: {
      [gold]: undefined,
      [silver]: undefined,
      [platinum]: undefined,
    },
  };

  const [state, setState] = React.useState(initialState);
  const [runUseEffect, setRunUseEffect] = React.useState(false);

  React.useEffect(async () => {
    if (!localStorage.getItem("userId")) {
      toast.error("Undefined user id. Please try re logging In");
      return;
    }
    const metalPrices = await axiosInstance
      .get("/trading/price")
      .then((res) => {
        return {
          [gold]: res.data.gold,
          [silver]: res.data.silver,
          [platinum]: res.data.platinum,
        };
      });

    await axiosInstance
      .get("/user", {
        params: {
          userId: localStorage.getItem("userId"),
        },
      })
      .then((resp) => {
        setState({
          ...state,
          metalAmt: 0,
          metalsPrice: { ...metalPrices },
          availableBal: resp.data.user.wallet.totalAmt,
          totalHoldings: {
            [gold]: resp.data.user.metals.gold,
            [silver]: resp.data.user.metals.silver,
            [platinum]: resp.data.user.metals.platinum,
          },
        });
      });
    setRunUseEffect(false);
  }, [runUseEffect]);

  const onBuyOrSellClick = (isBuy) => {
    setState({ ...state, isBuy });
  };

  const onMetalSelection = (metal) => {
    setState({ ...state, selectedMetal: metal });
  };

  const onAmtChange = (e) => {
    setState({ ...state, metalAmt: e.target.value });
  };

  const onSubmit = () => {
    if (
      (state.metalAmt > 0 &&
        state.isBuy &&
        state.metalsPrice[state.selectedMetal] * state.metalAmt <=
          state.availableBal) ||
      (!state.isBuy &&
        state.metalAmt <= state.totalHoldings[state.selectedMetal])
    ) {
      axiosInstance
        .post(
          "/trading/order",
          {
            type: state.isBuy ? "Buy" : "Sell",
            metal: state.selectedMetal,
            rate: state.metalsPrice[state.selectedMetal],
            weight: state.metalAmt,
            userId: localStorage.getItem("userId"),
          },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((res) => {
          setRunUseEffect(true);
        })
        .catch((err) => console.log(err));
    } else {
      console.log("Not valid!");
    }
  };

  return (
    <div>
      <div
        className="card container margin-top bg-dark trading-card text-white"
        style={{ width: "25rem" }}
      >
        <div className="card-body">
          <h3 className="card-title text-center">Metal Trading</h3>
          <div className="p mt-4">
            {"Available Balance: ₹" + state.availableBal}
          </div>
          <div className="d-flex my-4 justify-content-center">
            <div
              role="button"
              className="btn btn-light"
              onClick={() => onBuyOrSellClick(true)}
              tabIndex={0}
              onKeyDown={() => onBuyOrSellClick(true)}
            >
              Buy
            </div>
            <div className="ms-2">
              <div
                role="button"
                className="btn btn-light"
                onClick={() => onBuyOrSellClick(false)}
                tabIndex={0}
                onKeyDown={() => onBuyOrSellClick(false)}
              >
                Sell
              </div>
            </div>
          </div>
          <h4 className="card-title text-center">
            {state.isBuy ? "Buy" : "Sell"}
          </h4>
          <div className="p mt-4">
            {`Current holdings of ${state.selectedMetal} : ${
              state.totalHoldings[state.selectedMetal]
            } gms`}
          </div>
          <div
            className="d-flex justify-content-between mx-5 my-3"
            onChange={(e) => onMetalSelection(e.target.value)}
          >
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="metal"
                id={platinum}
                value={platinum}
                checked={state.selectedMetal === platinum}
              />
              <label className="form-check-label" htmlFor={platinum}>
                {platinum}
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="metal"
                id={gold}
                value={gold}
                checked={state.selectedMetal === gold}
              />
              <label className="form-check-label" htmlFor={gold}>
                {gold}
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="metal"
                id={silver}
                value={silver}
                checked={state.selectedMetal === silver}
              />
              <label className="form-check-label" htmlFor={silver}>
                {silver}
              </label>
            </div>
          </div>
          <h4 className="card-title">
            {`Rate: ${state.metalsPrice[state.selectedMetal]} ₹/gm`}
          </h4>
          <div className="input-group mb-3">
            <label htmlFor="inputGroupFile01" className="input-group-text">
              Amount(in gms)
              <input
                type="number"
                value={state.metalAmt}
                min={0}
                className="form-control"
                id="inputGroupFile01"
                onChange={(e) => onAmtChange(e)}
              />
            </label>
          </div>
          <h5 className="card-title">
            {`Total Amount: ${
              state.metalsPrice[state.selectedMetal] * state.metalAmt
            } ₹`}
          </h5>
          <div className="d-flex justify-content-center my-4">
            <button type="button" className="btn btn-light" onClick={onSubmit}>
              Place order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trading;
