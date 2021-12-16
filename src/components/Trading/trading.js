import React from 'react';

const Trading = () => {
    const platinum = 'Platinum';
    const gold = 'Gold';
    const silver = 'Silver';

    const [state, setState] = React.useState({
        isBuy: true,
        price: 10,
        metalsPrice: {
            [gold]: "10",
            [silver]: "20",
            [platinum]: "30", 
        },
        selectedMetal: gold,
        metalAmt: 0,
    });

    const onBuyClick = () => {
        setState({...state, isBuy: true});
    };

    const onSellClick = () => {
        setState({...state, isBuy: false});
    };

    const onMetalSelection = (metal) => {
        setState({...state, selectedMetal: metal});
    } 

    const onAmtChange = (e) => {
        setState({...state, metalAmt: e.target.value});
    }

    const onSubmit = () => {
        console.log(state);
    }

    return(
        <div>
            <div className="card container margin-top bg-dark trading-card text-white" style={{width: "25rem"}}>
                <div className="card-body">
                    <h3 className="card-title text-center">Metal Trading</h3>
                    <div className="d-flex my-4 justify-content-center">
                        <div className="btn btn-light" onClick={onBuyClick}>Buy</div>
                        <div className="ms-2"><div className="btn btn-light" onClick={onSellClick}>Sell</div></div>
                    </div>
                    <h4 className="card-title text-center">{state.isBuy ? "Buy" : "Sell"}</h4>
                    <div className='d-flex justify-content-between mx-5 my-3'  onChange={(e) => onMetalSelection(e.target.value)}>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="metal" id={platinum} value={platinum} checked={state.selectedMetal === platinum}/>
                            <label class="form-check-label" for={platinum}>{platinum}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="metal" id={gold} value={gold} checked={state.selectedMetal === gold}/>
                            <label class="form-check-label" for={gold}>{gold}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="metal" id={silver} value={silver} checked={state.selectedMetal === silver}/>
                        <label class="form-check-label" for={silver}>{silver}</label>
                        </div>
                    </div>
                    <h4 className="card-title">{"Rate: " + state.metalsPrice[state.selectedMetal] + " rs/gm"}</h4>
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupFile01">Amount(in gms)</label>
                        <input type="number" value={state.metalAmt} min={0} class="form-control" id="inputGroupFile01" onChange={(e) => onAmtChange(e)}/>
                    </div>
                    <h5 className="card-title">{"Total Amount: " + (state.metalsPrice[state.selectedMetal]*state.metalAmt) + " rs"}</h5>
                    <div className='d-flex justify-content-center my-4'>
                        <button className="btn btn-light" onClick={onSubmit}>Place order</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Trading;