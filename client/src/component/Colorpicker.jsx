import React, { useState } from 'react';
import { ChromePicker } from 'react-color';

const ColorPicker = ({ onChange }) => {
    const [color, setColor] = useState('#3498db');
    const [showPicker, setShowPicker] = useState(false);

    const handleChange = (newColor) => {
        setColor(newColor.hex);
        onChange(newColor.hex);
    };

    const togglePicker = () => {
        setShowPicker(!showPicker);
    };

    return (
        <div>
            <button onClick={togglePicker}>Toggle Color Picker</button>
            {showPicker && (
                <div>
                    <ChromePicker color={color} onChange={handleChange} />
                </div>
            )}
        </div>
    );
};

export default ColorPicker;