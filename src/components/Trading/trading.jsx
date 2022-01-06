import React from 'react';
import { axiosInstance } from '../../axios';

function Trading() {
  const platinum = 'Platinum';
  const gold = 'Gold';
  const silver = 'Silver';

  const [state, setState] = React.useState({
    isBuy: true,
    metalsPrice: {
      [gold]: undefined,
      [silver]: undefined,
      [platinum]: undefined,
    },
    selectedMetal: gold,
    metalAmt: 0,
  });

  React.useEffect(() => {
    // axiosInstance.get("/get_metal_rates.php").then((res) => {
    //   setState({
    //     ...state,
    //     metalsPrice: {
    //       [gold]: res.data.gold,
    //       [silver]: res.data.silver,
    //       [platinum]: res.data.platinum,
    //     },
    //   });
    // });
  }, []);

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
    if (state.metalAmt > 0) {
      axiosInstance
        .post(
          '/place_metal_order.php',
          {
            type: state.isBuy ? 'Buy' : 'Sell',
            metal: state.selectedMetal,
            rate: state.metalsPrice[state.selectedMetal],
            weight: state.metalAmt,
          },
          { headers: { 'Content-Type': 'application/json' } },
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    } else {
      console.log('Not valid!');
    }
  };

  return (
    <div>
      <div
        className="card container margin-top bg-dark trading-card text-white"
        style={{ width: '25rem' }}
      >
        <div className="card-body">
          <h3 className="card-title text-center">Metal Trading</h3>
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
            {state.isBuy ? 'Buy' : 'Sell'}
          </h4>
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
            {`Rate: ${state.metalsPrice[state.selectedMetal]} rs/gm`}
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
            } rs`}
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
