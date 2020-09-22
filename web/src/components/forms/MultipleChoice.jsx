import React, { useState } from 'react';
import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core';

export default function MultipleChoice({ field, handleMultipleChoice }) {
  const [value, setValue] = useState(field.options[0].value);

  const handleChange = (e) => {
    setValue(e.target.value);
    handleMultipleChoice(field.uuid, e.target.value);
  };

  return (
    <RadioGroup aria-label={field.label} name={field.label} value={value} onChange={handleChange}>
      {field.options.map((field, index) => {
        return <FormControlLabel value={field.value} control={<Radio />} label={field.value} key={index} />;
      })}
    </RadioGroup>
  );
}
