import React from "react";
import "./checkbox.scss";

const checkboxData = [
  {
    checked: true,
    value: "abcdefghijklmnopqrstuvwxyz",
    id: "lowerCase",
    labelText: "Lower Case (abc)",
  },
  {
    checked: true,
    value: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    id: "upperCase",
    labelText: "Upper Case (ABC)",
  },
  {
    checked: true,
    value: "0123456789",
    id: "number",
    labelText: "Numbers (0-9)",
  },
  {
    checked: true,
    value: "!@#$%^&*()-=?|><[]{}/_+",
    id: "symbol",
    labelText: "Symbols (!@$)",
  },
];

const Checkbox = ({ checked, id, labelText, onChange }) => {
  return (
    <fieldset className="filters__container">
      <input
        className="checkbox"
        type="checkbox"
        checked={checked}
        onChange={onChange}
        id={id}
      />
      <label htmlFor={id} className={`checkbox-label ${checked && "active"}`}>
        {labelText}
      </label>
    </fieldset>
  );
};
export { Checkbox, checkboxData };
