import React from 'react';


export const selectorButton = ({ to, text }) => {
  return (
      <div className="radio-input">
      <label>
      <input value="value-1" name="value-radio" id="value-1" type="radio"/>
      <span>1</span>
      </label>
      <label>
        <input value="value-2" name="value-radio" id="value-2" type="radio"/>
      <span>2</span>
      </label>
      <label>
        <input value="value-3" name="value-radio" id="value-3" type="radio"/>
      <span>3</span>
      </label>
      <label>
        <input value="value-3" name="value-radio" id="value-3" type="radio"/>
      <span>4</span>
      </label>
      <label>
        <input value="value-3" name="value-radio" id="value-3" type="radio"/>
      <span>5</span>
      </label>
      <label>
        <input value="value-3" name="value-radio" id="value-3" type="radio"/>
      <span>6</span>
      </label>
      <label>
        <input value="value-3" name="value-radio" id="value-3" type="radio"/>
      <span>7</span>
      </label>
      <span className="selection"></span>
      </div>
  );
};

export default selectorButton;


