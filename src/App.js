import { useState } from "react";
import logo from "./logo.svg";
import knight from "./knight.svg";

import "./App.css";

const board = Array(8).fill([0, 1, 2, 3, 4, 5, 6, 7]);

function App() {
  const [selectedCell, setSelectedCell] = useState([7, 1]);
  const [strictMode, setStrictMode] = useState(false);
  function getColor(row, cell) {
    if (row % 2 == 0) {
      if (cell % 2 == 0) {
        return "black";
      }
      return "white";
    } else {
      if (cell % 2 !== 0) {
        return "black";
      }
      return "white";
    }
  }

  let knightCanMoveTo = [];
  knightCanMoveTo.push([selectedCell[0] - 2, selectedCell[1] - 1]);
  knightCanMoveTo.push([selectedCell[0] - 1, selectedCell[1] - 2]);
  knightCanMoveTo.push([selectedCell[0] + 1, selectedCell[1] - 2]);
  knightCanMoveTo.push([selectedCell[0] + 2, selectedCell[1] - 1]);
  knightCanMoveTo.push([selectedCell[0] + 2, selectedCell[1] + 1]);
  knightCanMoveTo.push([selectedCell[0] + 1, selectedCell[1] + 2]);
  knightCanMoveTo.push([selectedCell[0] - 1, selectedCell[1] + 2]);
  knightCanMoveTo.push([selectedCell[0] - 2, selectedCell[1] + 1]);

  function isItemInArray(array, item) {
    for (var i = 0; i < array.length; i++) {
      if (array[i][0] == item[0] && array[i][1] == item[1]) {
        return true; // Found it
      }
    }
    return false; // Not found
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ padding: "2em" }}>
        <label>
          <span>Strict Mode</span>
          <input
            type="checkbox"
            checked={strictMode}
            onChange={() => {
              setStrictMode((p) => !p);
            }}
          />
        </label>
        <span
          style={{
            marginLeft: "1em",
            border: "2px solid black",
            padding: "6px",
            borderRadius: "50em",
            cursor: "pointer",
          }}
          onClick={() => {
            alert(
              "In Strict Mode, You can move the Knight only to allowed cells."
            );
          }}
        >
          ?
        </span>
      </div>
      <div>
        {board.map((i, outerIndex) => (
          <div
            key={outerIndex}
            style={{ display: "flex", flexDirection: "row", margin: 0 }}
          >
            {i.map((k, innerIndex) => {
              let thisCell = [outerIndex, innerIndex];
              let isSelected =
                selectedCell[0] === thisCell[0] &&
                selectedCell[1] === thisCell[1];
              return (
                <div
                  key={innerIndex}
                  style={{
                    border: "1px solid black",
                    padding: 0,
                    margin: 1,
                    height: "4em",
                    width: "4em",
                    background: getColor(outerIndex, k),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: isItemInArray(knightCanMoveTo, thisCell)
                      ? "2.5px dashed red"
                      : "2px solid black",
                  }}
                  onClick={(e) => {
                    if (strictMode) {
                      if (isItemInArray(knightCanMoveTo, thisCell)) {
                        setSelectedCell(thisCell);
                      }
                    } else {
                      setSelectedCell(thisCell);
                    }
                  }}
                >
                  {isSelected && <img src={knight} style={{ width: "4rem" }} />}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
