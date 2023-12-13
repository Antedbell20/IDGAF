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
        <ChromePicker color={color} onChange={handleChange}  className="color-picker"/>
      </div>
  );
};

export default ColorPicker;
