import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./main.scss";
import { Checkbox, checkboxData } from "./components/checkbox/Checkbox";
import { IoCopyOutline, IoCheckmarkDoneOutline } from "react-icons/io5";

function App() {
  const [password, setPassword] = useState("");
  const [rangeInput, setRangeInput] = useState(10);
  const [options, setOptions] = useState(checkboxData);
  const [isCopied, setIsCopied] = useState(false);

  const optionsIncluded = options.some((option) => option.checked);

  const generatePassword = (passwordLength, options) => {
    const charset = options
      .map((option) => (option.checked ? option.value : ""))
      .join("");

    let password = "";

    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    setIsCopied(false);
    return !charset ? "Please enable at least one option." : password;
  };

  const checkPasswordStrength = (password) => {
    let strength = 1;
    if (password.length >= 8 && password.length <= 10) {
      strength = 2;
    } else if (password.length >= 11 && password.length <= 14) {
      strength = 3;
    } else if (password.length >= 15) {
      strength = 4;
    }
    return strength;
  };

  const handleCheckboxChange = (id) => {
    setOptions((prevOptions) =>
      prevOptions.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };
  useEffect(() => {
    setPassword(generatePassword(rangeInput, options));
  }, [rangeInput, options]);
  return (
    <div className="App">
      <div className="container">
        <h1 className="title">Random Password Generator</h1>
        <h2 className="subtitle">
          Create strong and secure passwords to keep your account safe online
        </h2>
        <form className="generator">
          <fieldset className="generator__output-box">
            <input
              type="text"
              placeholder="Generate your password"
              className="generator__output"
              readOnly
              value={password}
            />
            {optionsIncluded && (
              <>
                <CopyToClipboard
                  text={password}
                  onCopy={() => setIsCopied(true)}
                >
                  {isCopied ? (
                    <>
                      <IoCheckmarkDoneOutline className="generator__output-copy-success" />
                      <span>Copied to clipboard!</span>
                    </>
                  ) : (
                    <IoCopyOutline className="generator__output-copy" />
                  )}
                </CopyToClipboard>
                <div
                  className="generator__output-strength"
                  data-strength={checkPasswordStrength(password)}
                ></div>
              </>
            )}
          </fieldset>
          <fieldset className="generator__range-box">
            <label htmlFor="range" className="generator__range-label">
              {`Password length:  ${rangeInput}`}
            </label>
            <input
              type="range"
              min="4"
              max="20"
              id="range"
              className="generator__range"
              value={rangeInput}
              onChange={(e) => {
                setRangeInput(e.target.value);
                setPassword(generatePassword(rangeInput, options));
              }}
            />
          </fieldset>
          <ul className="filters">
            {options.map((option) => (
              <li key={option.id}>
                <Checkbox
                  value={option.value}
                  id={option.id}
                  labelText={option.labelText}
                  checked={option.checked}
                  onChange={() => handleCheckboxChange(option.id)}
                />
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="generator__button"
            onClick={() => setPassword(generatePassword(rangeInput, options))}
          >
            Generate
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
