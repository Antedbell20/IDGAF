import React, { useState } from 'react';
import { ChromePicker } from 'react-color';

const ColorPicker = ({ onColorChange }) => {
  const [color, setColor] = useState('#3498db');

  const handleChange = (newColor) => {
    setColor(newColor.hex);
    onColorChange(newColor.hex); 
  };

  return (
    <div>
      <button>Pick Color</button>
      <div>
        <ChromePicker color={color} onChange={handleChange} />
      </div>
    </div>
  );
};

export default ColorPicker;
