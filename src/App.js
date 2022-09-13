import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faXmark, faDivide , faEquals } from '@fortawesome/free-solid-svg-icons'
import "./App.css";
import { useState } from "react";

function App() {
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");

  const ops = ["/", "*", "+", "-", "."];

  const updateCalc = (value) => {
    if (
      (ops.includes(value) && calc === "") ||
      (ops.includes(value) && ops.includes(calc.slice(-1)))
    ) {
      return;
    }
    setCalc(calc + value);

    if (!ops.includes(value)) {
      setResult(eval(calc + value).toString());
    }
  };

  const deleteCalc = () => {
    if (calc == "") {
      return;
    }

    const value = calc.slice(0, -1);
    setCalc(value);
  };

  const equal = async () => {
    await setResult("");
    setCalc(eval(calc).toString());
  };

  const createDigits = () => {
    const digits = [];

    for (let i = 1; i < 10; i++) {
      digits.push(
        <button
          key={i}
          onClick={() => {
            updateCalc(i.toString());
          }}
        >
          {i}
        </button>
      );
    }
    return digits;
  };

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          <span>{result ? result : ""}</span> {calc || "0"}
        </div>
        <div className="operators">
          <button
            onClick={() => {
              updateCalc("/");
            }}
          >
            <FontAwesomeIcon icon={faDivide} />
          </button>
          <button
            onClick={() => {
              updateCalc("*");
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <button
            onClick={() => {
              updateCalc("+");
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <button
            onClick={() => {
              updateCalc("-");
            }}
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>

          <button onClick={deleteCalc}>DEL</button>
        </div>
        <div className="digits">
          {createDigits()}
          <button
            onClick={() => {
              updateCalc("0");
            }}
          >
            0
          </button>
          <button
            onClick={() => {
              updateCalc(".");
            }}
          >
            .
          </button>
          <button onClick={equal}><FontAwesomeIcon icon={faEquals} /></button>
        </div>
      </div>
    </div>
  );
}

export default App;
