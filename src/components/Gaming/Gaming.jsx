import React, { useRef, useState } from "react";
import Rules from "./Rules/Rules";
import CountdownTimer from "./Countdown";
import { axiosInstance } from "../../axios";
import { toast } from "react-toastify";

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
    selectedSlot: ccon,
    selectedColor: undefined,
    amt: 0,
    number: undefined,
    userId: localStorage.getItem("userId") || props.userId,
    startTimer: false,
  });

  const [btnDisabled, setBtnDisabled] = useState({
    [ccon]: true,
    [dicor]: true,
    [pola]: true,
    [grasy]: true,
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

  const onConfirm = async () => {
    if (!state.selectedColor && !state.number) {
      toast.dark("Please select a number or color");
      return;
    }
    const totalAmt =
      (!!state.selectedColor ? state.amt : 0) +
      (!!state.number ? state.amt : 0);
    if (totalAmt === 0) {
      toast.dark("Amount should be greater than 0");
      return;
    }
    if (totalAmt > state.balance) {
      toast.dark("Insufficient Balance!!");
      return;
    }
    await axiosInstance
      .post("/gaming/bet", {
        refNo: state.refNo,
        roomName: state.selectedSlot,
        userId: localStorage.getItem("userId"),
        color: state.selectedColor,
        number: state.number,
        colorAmt: !!state.selectedColor ? state.amt : undefined,
        numberAmt: !!state.number ? state.amt : undefined,
      })
      .then(async (res) => {
        setBtnDisabled({
          ...btnDisabled,
          [state.selectedSlot]: true,
        });
        console.log(res);
        await axiosInstance
          .get("/user", {
            params: {
              userId: localStorage.getItem("userId"),
            },
          })
          .then((resp) => {
            setState({ ...state, balance: resp.data.user.wallet.totalAmt });
          });
      })
      .catch((e) => {
        console.log(e);
        toast.error("Something went wrong please try again!!");
      });
  };

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

  React.useEffect(async () => {
    console.log("in useEfffect", propsTime.type);
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
    if (sec < 50) {
      // betting
      await axiosInstance
        .post("/Game", {
          refNo,
        })
        .then((resp) => {
          const gameBol = resp.data.bol;
          const gameState = {
            [ccon]: false,
            [dicor]: false,
            [pola]: false,
            [grasy]: false,
          };
          if (gameBol) {
            const game = resp.data.game;
            if (state.selectedSlot === ccon && game.CCON)
              game.CCON.forEach((room) => {
                if (room.userId === localStorage.getItem("userId")) {
                  gameState[ccon] = true;
                }
              });
            if (state.selectedSlot === dicor && game.DICOR)
              game.DICOR.forEach((room) => {
                if (room.userId === localStorage.getItem("userId")) {
                  gameState[dicor] = true;
                }
              });
            if (state.selectedSlot === pola && game.POLA)
              game.POLA.forEach((room) => {
                if (room.userId === localStorage.getItem("userId")) {
                  gameState[pola] = true;
                }
              });
            if (state.selectedSlot === grasy && game.GRASY)
              game.GRASY.forEach((room) => {
                if (room.userId === localStorage.getItem("userId")) {
                  gameState[grasy] = true;
                }
              });
          }
          setBtnDisabled({ ...gameState });
        });
    }
  }, [state.selectedSlot]);

  const onTimesup = () => {
    if (propsTime.type === "betting") {
      setBtnDisabled({
        [ccon]: true,
        [dicor]: true,
        [pola]: true,
        [grasy]: true,
      });
    } else {
      setBtnDisabled({
        [ccon]: false,
        [dicor]: false,
        [pola]: false,
        [grasy]: false,
      });
    }
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
            disabled={btnDisabled[state.selectedSlot]}
            onClick={onConfirm}
          >
            Confirm
          </button>
          <button
            type="button"
            className="btn btn-light btn-width"
            onClick={() => {
              onAmtClick(0);
              onColorSelect(undefined);
              onNumberClick(undefined);
            }}
            disabled={btnDisabled[state.selectedSlot]}
          >
            Reset
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
