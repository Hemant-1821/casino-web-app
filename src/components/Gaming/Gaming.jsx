import React, { useRef, useState } from "react";
import Rules from "./Rules/Rules";
import CountdownTimer from "./Countdown";
import { axiosInstance } from "../../axios";

function Gaming(props) {
  const ccon = "CCON";
  const dicor = "DICOR";
  const pola = "POLA";
  const grasy = "GRASY";
  const green = "GREEN";
  const purple = "PURPLE";
  const red = "RED";

  const [state, setState] = React.useState({
    balance: undefined,
    refNo: undefined,
    selectedSlot: dicor,
    selectedColor: undefined,
    amt: 1000,
    number: 3,
    userId: localStorage.getItem("userId") || props.userId,
    startTimer: false,
  });
  // const [roomMembers, setRoomMembers] = React.useState(0);

  const onSlotSelect = (slot) => {
    setState({ ...state, selectedSlot: slot });
  };

  const onColorSelect = (color) => {
    setState({ ...state, selectedColor: color });
  };

  const onAmtClick = (amt) => {
    setState({ ...state, amt });
  };

  const onAmtChange = (e) => {
    setState({ ...state, amt: e.target.value });
  };

  const onNumberClick = (number) => {
    setState({ ...state, number });
  };

  const onConfirm = () => {};

  // const socket = React.useRef();
  // socket.current = io(
  //   process.env.REACT_APP_ENV === "LOCAL"
  //     ? process.env.REACT_APP_BACKEND_LOCAL
  //     : process.env.REACT_APP_BACKEND_PROD,
  //   {
  //     transports: ["websocket", "polling", "flashsocket"],
  //   }
  // );

  // React.useEffect(() => {
  // socket.current.emit("message", "Hello");
  // socket.current.emit("join-room", {
  //   room: state.selectedSlot,
  //   id: localStorage.getItem("userId"),
  // });
  // }, [state.selectedSlot]);

  // socket.current.on("roomMessage", (args) => {
  //   console.log("message", args);
  // });
  // socket.current.on("roomMembersCount", (count) => {
  //   console.log("Count", count);
  //   if (count === 3) {
  //     setState({ ...state, showTimer: !state.showTimer });
  //   }
  //   setRoomMembers(count);
  // });

  const [propsTime, setPropsTimer] = useState({
    time: undefined,
    type: undefined,
  });
  const [runUseEffect, setRunUseEffect] = useState(true);

  React.useEffect(async () => {
    let availBal = undefined;
    await axiosInstance
      .get("/user", {
        params: {
          userId: localStorage.getItem("userId"),
        },
      })
      .then((resp) => {
        availBal = resp.data.user.wallet.totalAmt;
      });
    const d = new Date();
    const hours = d.getHours();
    const min = d.getMinutes();
    const sec = d.getSeconds();
    const date = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    const refNo =
      year.toString() +
      month.toString().padStart(2, "0") +
      date.toString().padStart(2, "0") +
      (hours * 60 + min).toString().padStart(4, "0");
    setState({ ...state, refNo, balance: availBal });
    setPropsTimer(
      sec < 50
        ? { time: 50 - sec, type: "betting" }
        : { time: 60 - sec, type: "waiting" }
    );
  }, [runUseEffect]);

  const onTimesup = () => {
    setRunUseEffect(!runUseEffect);
  };

  return (
    <div>
      <div
        className="card container margin-top bg-dark trading-card text-white px-4 mb-5"
        style={{ width: "37rem" }}
      >
        <div className="card-body">
          <h3 className="card-title text-center">Gaming</h3>
        </div>
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-light"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Rules
          </button>
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <Rules />
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center my-3">
          <div className="">{`Balance: ${state.balance} INR`}</div>
          <button className="btn btn-light">Recharge</button>
        </div>
        <div className="topnav my-2">
          <div
            role="menuitem"
            tabIndex={0}
            onKeyDown={() => onSlotSelect(ccon)}
            onClick={() => onSlotSelect(ccon)}
            className={state.selectedSlot === ccon ? "active" : ""}
          >
            {ccon}
          </div>
          <div
            role="menuitem"
            tabIndex={0}
            onKeyDown={() => onSlotSelect(dicor)}
            onClick={() => onSlotSelect(dicor)}
            className={state.selectedSlot === dicor ? "active" : ""}
          >
            {dicor}
          </div>
          <div
            role="menuitem"
            tabIndex={0}
            onKeyDown={() => onSlotSelect(pola)}
            onClick={() => onSlotSelect(pola)}
            className={state.selectedSlot === pola ? "active" : ""}
          >
            {pola}
          </div>
          <div
            role="menuitem"
            tabIndex={0}
            onKeyDown={() => onSlotSelect(grasy)}
            onClick={() => onSlotSelect(grasy)}
            className={state.selectedSlot === grasy ? "active" : ""}
          >
            {grasy}
          </div>
        </div>
        <div className="d-flex flex-row-reverse justify-content-between align-items-center">
          <p>Ref No: {state.refNo}</p>
        </div>
        <div className="d-flex flex-row-reverse justify-content-between align-items-center mb-3">
          {propsTime.type === "betting" && (
            <div>
              Betting time left:{" "}
              <CountdownTimer onTimesup={onTimesup} duration={propsTime.time} />
            </div>
          )}
          {propsTime.type === "waiting" && (
            <div>
              Waiting time left:{" "}
              <CountdownTimer onTimesup={onTimesup} duration={propsTime.time} />
            </div>
          )}
        </div>
        {/* <Clock format={"HH:mm:ss"} ticking={true} timezone={"Asia/Kolkata"} /> */}
        <div className="d-flex justify-content-between mx-5 mb-4">
          <button
            type="button"
            onClick={() => onColorSelect(green)}
            className="btn btn-outline-light green"
          >
            Join Green
          </button>
          <button
            type="button"
            onClick={() => onColorSelect(purple)}
            className="btn btn-outline-light purple"
          >
            Join Purple
          </button>
          <button
            type="button"
            onClick={() => onColorSelect(red)}
            className="btn btn-outline-light red"
          >
            Join Red
          </button>
        </div>
        <div className="mx-auto h4">
          Selected Color:
          {state.selectedColor}
        </div>
        <div className="mx-auto">Your Trade on:</div>
        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-light btn-width"
            onClick={() => onAmtClick(10)}
          >
            10
          </button>
          <button
            type="button"
            className="btn btn-light btn-width"
            onClick={() => onAmtClick(100)}
          >
            100
          </button>
          <button
            type="button"
            className="btn btn-light btn-width"
            onClick={() => onAmtClick(500)}
          >
            500
          </button>
          <button
            type="button"
            className="btn btn-light btn-width"
            onClick={() => onAmtClick(1000)}
          >
            1000
          </button>
          <button
            type="button"
            className="btn btn-light btn-width"
            onClick={() => onAmtClick(5000)}
          >
            5000
          </button>
        </div>
        <div className="d-flex justify-content-between my-2">
          <button
            type="button"
            className="btn btn-light btn-width"
            onClick={() => onAmtClick(10000)}
          >
            10000
          </button>
          <button
            type="button"
            className="btn btn-light btn-width"
            onClick={() => onAmtClick(50000)}
          >
            50000
          </button>
          <button
            type="button"
            className="btn btn-light btn-width"
            onClick={() => onAmtClick(100000)}
          >
            100000
          </button>
          <button
            type="button"
            className="btn btn-light btn-width"
            onClick={() => onAmtClick(200000)}
          >
            200000
          </button>
        </div>
        <div className="mt-1 mb-3 mx-auto">
          <input
            type="number"
            value={state.amt}
            min={1}
            className="form-control amt-input"
            aria-label="amount"
            aria-describedby="basic-addon1"
            onChange={onAmtChange}
          />
        </div>
        <div className="d-flex mx-auto">
          <button
            type="button"
            className="btn btn-light btn-width me-2"
            disabled={propsTime.type === "waiting"}
            onClick={onConfirm}
          >
            Confirm
          </button>
          <button
            type="button"
            className="btn btn-light btn-width"
            onClick={() => onAmtClick(0)}
            disabled={propsTime.type === "waiting"}
          >
            Clear
          </button>
        </div>
        <div className="my-3 mx-auto">Individual Numbers:</div>
        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-light btn-width"
            onClick={() => onNumberClick(0)}
          >
            0
          </button>
          <button
            type="button"
            className="btn btn-light btn-width"
            onClick={() => onNumberClick(1)}
          >
            1
          </button>
          <button
            type="button"
            className="btn btn-light btn-width"
            onClick={() => onNumberClick(2)}
          >
            2
          </button>
          <button
            type="button"
            className="btn btn-light btn-width"
            onClick={() => onNumberClick(3)}
          >
            3
          </button>
          <button
            type="button"
            className="btn btn-light btn-width"
            onClick={() => onNumberClick(4)}
          >
            4
          </button>
        </div>
        <div className="d-flex justify-content-between mt-2">
          <button
            type="button"
            className="btn btn-light btn-width"
            onClick={() => onNumberClick(5)}
          >
            5
          </button>
          <button
            type="button"
            className="btn btn-light btn-width"
            onClick={() => onNumberClick(6)}
          >
            6
          </button>
          <button
            type="button"
            className="btn btn-light btn-width"
            onClick={() => onNumberClick(7)}
          >
            7
          </button>
          <button
            type="button"
            className="btn btn-light btn-width"
            onClick={() => onNumberClick(8)}
          >
            8
          </button>
          <button
            type="button"
            className="btn btn-light btn-width"
            onClick={() => onNumberClick(9)}
          >
            9
          </button>
        </div>
        <div className="h4 my-3 mx-auto mb-4">
          Selected Number:
          {state.number}
        </div>
      </div>
    </div>
  );
}

export default Gaming;
