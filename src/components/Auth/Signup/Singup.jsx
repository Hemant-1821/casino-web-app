import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosInstance } from "../../../axios";

function Signup(props) {
  const { setState: propsSetState } = props;
  const [state, setState] = React.useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [redirect, setRedirect] = React.useState(false);
  const [error, setError] = React.useState(false);

  const onPhoneInput = (e) => {
    if (e.target.value.length > e.target.maxLength) {
      e.target.value = e.target.value.slice(0, e.target.maxLength);
    }
  };

  const onChange = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (state.email && state.password && state.name && state.phone) {
      await axiosInstance
        .post("/register", {
          name: state.name,
          phone: state.phone,
          email: state.email,
          password: state.password,
        })
        .then((res) => {
          const resObj = res.data;
          if (resObj.resCode === 200) {
            propsSetState(resObj.user._id);
            setRedirect(true);
          }
          if (resObj.resCode === 404) {
            toast.error("Something went wrong please try again!");
          }
        });
    } else {
      toast.error("Please provide all fields!");
    }
  };

  return (
    <div className="margin-top">
      {redirect ? <Navigate to="/" /> : null}
      <div
        className="py-3 mb-5 card container bg-dark trading-card text-white"
        style={{ width: "25rem" }}
      >
        <div className="card-body">
          <div className="h3 text-center">Signup</div>
          <form>
            <div className="my-2">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                aria-describedby="emailHelp"
                onChange={onChange}
              />
            </div>
            <div className="my-2">
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <input
                type="number"
                className="form-control"
                id="phone"
                aria-describedby="emailHelp"
                onInput={onPhoneInput}
                maxLength="10"
                onChange={onChange}
              />
            </div>
            <div className="my-2">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                onChange={onChange}
              />
            </div>
            <div className="my-2">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                onChange={onChange}
              />
            </div>
            <div className="mt-4 text-center">
              <button
                type="button"
                className="btn btn-light"
                onClick={onSubmit}
              >
                Submit
              </button>
            </div>
            <div className="mt-2 text-center">
              Existing user?
              <a href="/login" className="badge badge-light">
                Login here
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
