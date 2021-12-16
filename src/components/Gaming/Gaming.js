import React from 'react';
import Rules from './Rules/Rules';

const Gaming = () => {
    const ccon = "CCON";
    const dicor = "DICOR";
    const pola = "POLA";
    const grasy = "GRASY";
    const green = "GREEN";
    const purple = "PURPLE";
    const red = "RED";

    const [state, setState] = React.useState({
        balance: '120',
        refNo: '20211207123',
        selectedSlot: dicor,
        selectedColor: red,
        amt: 1000,
        number: 3,
    });

    const onSlotSelect = (slot) => {
        setState({...state, selectedSlot: slot});
    }

    const onColorSelect = (color) => {
        setState({...state, selectedColor: color});
    }

    const onAmtClick = (amt) => {
        setState({...state, amt});
    }

    const onNumberClick = (number) => {
        setState({...state, number});
    }

    return(
        <div>
            <div className="card container margin-top bg-dark trading-card text-white px-4 mb-5" style={{width: "37rem"}}>
                <div className="card-body">
                    <h3 className="card-title text-center">Gaming</h3>
                </div>
                <div className='d-flex justify-content-end'>
                    <button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Rules
                    </button>
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <Rules />
                    </div>
                </div>
                <div className='d-flex justify-content-between align-items-center my-3'>
                    <div className=''>{"Balance: "+state.balance+" INR"}</div>
                    <div className='btn btn-light'>Recharge</div>
                </div>
                <div class="topnav my-2">
                    <div onClick={() => onSlotSelect(ccon)} className={state.selectedSlot === ccon ? "active" : ""}>{ccon}</div>
                    <div onClick={() => onSlotSelect(dicor)} className={state.selectedSlot === dicor ? "active" : ""}>{dicor}</div>
                    <div onClick={() => onSlotSelect(pola)} className={state.selectedSlot === pola ? "active" : ""}>{pola}</div>
                    <div onClick={() => onSlotSelect(grasy)} className={state.selectedSlot === grasy ? "active" : ""}>{grasy}</div>
                </div>
                <div className='d-flex justify-content-between align-items-center mb-3'>
                    <div className=''>{"Reference No: "+state.refNo}</div>
                    <div className=''>{"Count down: "+state.timer}</div>
                </div>
                <div className='d-flex justify-content-between mx-5 mb-4'>
                    <button onClick={() => onColorSelect(green)} className='btn btn-outline-light green'>Join Green</button>
                    <button onClick={() => onColorSelect(purple)} className='btn btn-outline-light purple'>Join Purple</button>
                    <button onClick={() => onColorSelect(red)} className='btn btn-outline-light red'>Join Red</button>
                </div>
                <div className='mx-auto h4'>Selected Color: {state.selectedColor}</div>
                <div className='mx-auto'>Your Trade on:</div>
                <div className='d-flex justify-content-between'>
                    <button className='btn btn-light btn-width' onClick={() => onAmtClick(10)}>10</button>
                    <button className='btn btn-light btn-width' onClick={() => onAmtClick(100)}>100</button>
                    <button className='btn btn-light btn-width' onClick={() => onAmtClick(500)}>500</button>
                    <button className='btn btn-light btn-width' onClick={() => onAmtClick(1000)}>1000</button>
                    <button className='btn btn-light btn-width' onClick={() => onAmtClick(5000)}>5000</button>
                </div>
                <div className='d-flex justify-content-between my-2'>
                    <button className='btn btn-light btn-width' onClick={() => onAmtClick(10000)}>10000</button>
                    <button className='btn btn-light btn-width' onClick={() => onAmtClick(50000)}>50000</button>
                    <button className='btn btn-light btn-width' onClick={() => onAmtClick(100000)}>100000</button>
                    <button className='btn btn-light btn-width' onClick={() => onAmtClick(200000)}>200000</button>
                </div>
                <div class="mt-1 mb-3 mx-auto">
                    <input type="number" value={state.amt} min={1} className="form-control amt-input" aria-label="amount" aria-describedby="basic-addon1" />
                </div>
                <div className='d-flex mx-auto'>
                    <button className='btn btn-light btn-width me-2'>Confirm</button>
                    <button className='btn btn-light btn-width' onClick={() => onAmtClick(0)}>Clear</button>
                </div>
                <div className='my-3 mx-auto'>Individual Numbers:</div>
                <div className='d-flex justify-content-between'>
                    <button className='btn btn-light btn-width' onClick={() => onNumberClick(0)}>0</button>
                    <button className='btn btn-light btn-width' onClick={() => onNumberClick(1)}>1</button>
                    <button className='btn btn-light btn-width' onClick={() => onNumberClick(2)}>2</button>
                    <button className='btn btn-light btn-width' onClick={() => onNumberClick(3)}>3</button>
                    <button className='btn btn-light btn-width' onClick={() => onNumberClick(4)}>4</button>
                </div>
                <div className='d-flex justify-content-between mt-2'>
                    <button className='btn btn-light btn-width' onClick={() => onNumberClick(5)}>5</button>
                    <button className='btn btn-light btn-width' onClick={() => onNumberClick(6)}>6</button>
                    <button className='btn btn-light btn-width' onClick={() => onNumberClick(7)}>7</button>
                    <button className='btn btn-light btn-width' onClick={() => onNumberClick(8)}>8</button>
                    <button className='btn btn-light btn-width' onClick={() => onNumberClick(9)}>9</button>
                </div>
                <div className='h4 my-3 mx-auto mb-4'>Selected Number: {state.number}</div>
            </div>
        </div>
    )
}

export default Gaming;