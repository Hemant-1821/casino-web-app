import React from 'react';

const Signup = () => {

    const onPhoneInput = (e) => {
        if (e.target.value.length > e.target.maxLength)
            e.target.value = e.target.value.slice(0, e.target.maxLength);
    };

    return(
        <div className='margin-top'>
            <div className="py-3 mb-5 card container bg-dark trading-card text-white" style={{width: "25rem"}}>
                <div className="card-body">
                    <div className='h3 text-center'>Signup</div>
                    <form>
                        <div class="my-2">
                            <label for="exampleInputEmail1" class="form-label">Name</label>
                            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div class="my-2">
                            <label for="exampleInputEmail1" class="form-label">Phone Number</label>
                            <input type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onInput={onPhoneInput} maxlength="10"/>
                        </div>
                        <div class="my-2">
                            <label for="exampleInputEmail1" class="form-label">Email address</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div class="my-2">
                            <label for="exampleInputPassword1" class="form-label">Password</label>
                            <input type="password" class="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className='mt-4 text-center'>
                            <button type="submit" className="btn btn-light">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;