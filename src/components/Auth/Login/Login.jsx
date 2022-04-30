import React from "react";
import { Navigate } from "react-router-dom";
import { axiosInstance } from "../../../axios";
import { toast } from "react-toastify";

function Login(props) {
  const { setState: propsSetState } = props;
  const [redirect, setRedirect] = React.useState(false);
  const [state, setState] = React.useState({
    email: "",
    password: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (state.email && state.password) {
      axiosInstance
        .post("/login", {
          email: state.email,
          password: state.password,
        })
        .then((res) => {
          const resObj = res.data;
          if (resObj.resCode === 200) {
            propsSetState(resObj.user._id);
            setRedirect(true);
          }
          if (resObj.resCode === 400) {
            toast.error(resObj.errDesc);
          }
        });
    } else {
      toast.error("Please provide email and password");
    }
  };

  const handleOnChange = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };

  return (
    <div className="margin-top">
      {redirect ? <Navigate to="/" /> : null}
      <div
        className="py-3 card container bg-dark trading-card text-white"
        style={{ width: "25rem" }}
      >
        <div className="card-body">
          <div className="h3 text-center">Login</div>
          <form>
            <div className="my-4">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                value={state.email}
                onChange={handleOnChange}
              />
            </div>
            <div className="my-4">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={state.password}
                onChange={handleOnChange}
              />
            </div>
            <div className="mt-4 text-center">
              <button
                type="button"
                className="btn btn-light"
                onClick={onSubmit}
              >
                Login
              </button>
            </div>
            <div className="mt-2 text-center">
              New user?
              <a href="/signup" className="badge badge-light">
                Register here
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
