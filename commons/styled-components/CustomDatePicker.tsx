import React, { useState } from 'react';

interface CustomDateTimePickerProps {
  value: Date | null;
  onChange: (newValue: Date | null) => void;
}

const CustomDateTimePicker: React.FC<CustomDateTimePickerProps> = ({ value, onChange }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    // <DatePicker
    //   style={{
    //     width: '100%',
    //     marginBottom: '24px',
    //     marginTop: '12px',
    //     border: '1px solid',
    //     borderColor: isHovered ? '#B0BEC5' : '#E1E6EF',
    //     borderRadius: '8px',
    //     padding: '10px',          // Add padding
    //     fontSize: '16px',         // Customize font size
    //     backgroundColor: '#fff',  // Set background color
    //     boxShadow: isHovered ? '0 2px 5px rgba(0, 0, 0, 0.15)' : 'none', // Add shadow on hover
    //   }}
    //   placeholder="Seleccionar fecha y hora"
    //   value={value}
    //   onChange={onChange}
    //   format="yyyy-MM-dd HH:mm"
    //   showMeridian
    //   onMouseEnter={() => setIsHovered(true)}
    //   onMouseLeave={() => setIsHovered(false)}
    // />
    <></>
  );
};

export default CustomDateTimePicker;
