import { useState } from "react";
import { uniq } from "lodash";
import Tag from "./assets/kamfupi.png";

import "./App.css";

const App = () => {
  const [codes, setCodes] = useState([]);
  console.log(codes.length);
  console.log(codes);

  const addCodes = (e) => {
    let codeArr = e.target.value
      .replace(/\s+/g, " ")
      .split(",")
      .map((code) => code.toLowerCase());

    const finalCodes = uniq(codes.concat(codeArr).slice(0, 7));

    finalCodes.forEach((code) => {
      if (code.length > 1 && !codes.includes(code)) {
        if (codes.length < 7) {
          setCodes(finalCodes);
          e.target.value = null;
        }
      }
    });
  };

  const removeTags = (indexToRemove) => {
    setCodes(codes.filter((_, index) => index !== indexToRemove));
  };

  const removeAll = () => setCodes([]);

  return (
    <div className="wrapper">
      <div className="title">
        <img src={Tag} alt="tag" />
        <h2>URL short codes</h2>
      </div>
      <div className="content">
        <p>Press enter or add a comma after each code</p>
        <ul>
          {codes.map((code, index) => (
            <li key={index}>
              {code}
              <i
                className="uit uit-multiply"
                onClick={() => removeTags(index)}
              ></i>
            </li>
          ))}

          <input
            type="text"
            spellCheck="false"
            onKeyUp={(e) => (e.key === "Enter" ? addCodes(e) : null)}
          />
        </ul>
      </div>
      <div className="details">
        <p>
          <span>{7 - codes.length}</span> short codes remaining
        </p>
        <button onClick={removeAll}>Clear All</button>
      </div>
    </div>
  );
};

export default App;
