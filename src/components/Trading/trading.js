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
            <div className="card container mt-5" style={{width: "25rem"}}>
                <div className="card-body">
                    <h3 className="card-title text-center">Metal Trading</h3>
                    <div className="d-flex my-4">
                        <a href="#" className="btn btn-primary" onClick={onBuyClick}>Buy</a>
                        <div className="ms-2"><a href="#" className="btn btn-primary" onClick={onSellClick}>Sell</a></div>
                    </div>
                    <h4 className="card-title text-center">{state.isBuy ? "Buy" : "Sell"}</h4>
                    <div className="d-flex">
                        <div class="dropdown my-4">
                            <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                Select Metal
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><div class="dropdown-item cursor-pointer" onClick={() => onMetalSelection(platinum)}>{platinum}</div></li>
                                <li><hr class="dropdown-divider" /></li>
                                <li><div class="dropdown-item cursor-pointer"  onClick={() => onMetalSelection(gold)}>{gold}</div></li>
                                <li><hr class="dropdown-divider" /></li>
                                <li><div class="dropdown-item cursor-pointer"  onClick={() => onMetalSelection(silver)}>{silver}</div></li>
                            </ul>
                        </div>
                        <div className="my-4 ms-4"><h4>{state.selectedMetal}</h4></div>
                    </div>
                    <h4 className="card-title">{"Rate: " + state.metalsPrice[state.selectedMetal] + " rs/gm"}</h4>
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupFile01">Amount(in gms)</label>
                        <input type="number" value={state.metalAmt} min={0} class="form-control" id="inputGroupFile01" onChange={(e) => onAmtChange(e)}/>
                    </div>
                    <h5 className="card-title">{"Total Amount: " + (state.metalsPrice[state.selectedMetal]*state.metalAmt) + " rs"}</h5>
                    <button className="btn btn-primary" onClick={onSubmit}>Place order</button>
                </div>
            </div>
        </div>
    );
}

export default Trading;