import React from 'react';

const Login = () => {
    return(
        <div className='margin-top'>
            <div className="py-3 card container bg-dark trading-card text-white" style={{width: "25rem"}}>
                <div className="card-body">
                    <div className='h3 text-center'>Login</div>
                    <form>
                        <div class="my-4">
                            <label for="exampleInputEmail1" class="form-label">Email address</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div class="my-4">
                            <label for="exampleInputPassword1" class="form-label">Password</label>
                            <input type="password" class="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className='mt-4 text-center'>
                            <button type="submit" className="btn btn-light">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;