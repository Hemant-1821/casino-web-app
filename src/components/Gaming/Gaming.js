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
        balance: "120",
        refNo: '20211207123',
        selectedSlot: dicor,
        selectedColor: red,
    });

    const onSlotSelect = (slot) => {
        setState({...state, selectedSlot: slot});
    }

    const onColorSelect = (color) => {
        setState({...state, selectedColor: color});
    }

    return(
        <div>
            <div className="card container my-5 bg-dark trading-card text-white" style={{width: "40rem"}}>
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
                    <button onClick={() => onColorSelect(green)} className='btn btn-primary green'>Join Green</button>
                    <button onClick={() => onColorSelect(purple)} className='btn btn-primary purple'>Join Purple</button>
                    <button onClick={() => onColorSelect(red)} className='btn btn-primary red'>Join Red</button>
                </div>
                <div className='mx-auto h4'>Selected Color: {state.selectedColor}</div>
                <div className='mx-auto'>Your Trade on:</div>
                <div className='d-flex justify-content-between'>
                    <button className='btn btn-light btn-width'>10</button>
                    <button className='btn btn-light btn-width'>100</button>
                    <button className='btn btn-light btn-width'>500</button>
                    <button className='btn btn-light btn-width'>1000</button>
                    <button className='btn btn-light btn-width'>5000</button>
                </div>
                <div className='d-flex justify-content-between my-2'>
                    <button className='btn btn-light btn-width'>10000</button>
                    <button className='btn btn-light btn-width'>50000</button>
                    <button className='btn btn-light btn-width'>100000</button>
                    <button className='btn btn-light btn-width'>200000</button>
                </div>
                <div class="mt-1 mb-3 mx-auto">
                    <input type="text" className="form-control amt-input" aria-label="amount" aria-describedby="basic-addon1" />
                </div>
                <div className='d-flex mx-auto'>
                    <button className='btn btn-light btn-width me-2'>Confirm</button>
                    <button className='btn btn-light btn-width'>Clear</button>
                </div>
                <div className='my-3 mx-auto'>Individual Numbers:</div>
            </div>
        </div>
    )
}

export default Gaming;