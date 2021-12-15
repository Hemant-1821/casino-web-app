import React from 'react';
import Rules from './Rules/Rules';

const Gaming = () => {

    const [state, setState] = React.useState({
        balance: "120",
        refNo: '20211207123'
    });

    return(
        <div>
            <div className="card container mt-5 bg-dark trading-card text-white" style={{width: "40rem"}}>
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
                <div>
                    <div class="topnav">
                        <a href="#home" className="active">CCON</a>
                        <a href="#news" className="active">DICOR</a>
                        <a href="#contact">POLA</a>
                        <a href="#contact">GRASY</a>
                    </div>
                </div>
                <div className='d-flex justify-content-between align-items-center mb-3'>
                    <div className=''>{"Reference No: "+state.refNo}</div>
                    <div className=''>{"Count down: "+state.timer}</div>
                </div>

            </div>
        </div>
    )
}

export default Gaming;