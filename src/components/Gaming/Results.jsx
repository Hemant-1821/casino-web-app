import React, { useEffect, useState } from "react";

function Results(props) {
  console.log(props.results);
  const [results, setResults] = useState({});

  useEffect(() => {
    setResults(props.results);
  }, [props]);

  return (
    <div>
      <div
        className="card container bg-dark trading-card text-white mb-5"
        style={{ width: "37rem" }}
      >
        <div className="card-body">
          <h3 className="card-title text-center">Results</h3>
          {Object.values(results).map((result) => {
            console.log(result);
            return (
              <div
                className="card container my-2"
                style={{ width: "30rem", color: "black" }}
              >
                <p>Ref No. - {result.refNo}</p>
                {result.CCON && (
                  <div className="d-flex">
                    <p>CCON Winner Name - {result.CCON.name}</p>
                    <p className="ms-5">
                      Total Amount Won: {result.CCON.totalAmt}
                    </p>
                  </div>
                )}
                {result.DICOR && (
                  <div className="d-flex">
                    <p>DICOR Winner Name - {result.DICOR.name}</p>
                    <p className="ms-5">
                      Total Amount Won: {result.DICOR.totalAmt}
                    </p>
                  </div>
                )}
                {result.POLA && (
                  <div className="d-flex">
                    <p>POLA Winner Name - {result.POLA.name}</p>
                    <p className="ms-5">
                      Total Amount Won: {result.POLA.totalAmt}
                    </p>
                  </div>
                )}
                {result.GRASY && (
                  <div className="d-flex">
                    <p>GRASY Winner Name - {result.GRASY.name}</p>
                    <p className="ms-5">
                      Total Amount Won: {result.GRASY.totalAmt}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Results;
