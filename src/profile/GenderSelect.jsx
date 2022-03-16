import React, { useState } from "react";
import Select from "react-select";

const options = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

export default function GenderSelect() {
  const [selectedOption, setSelectedOption] = useState(null);
  return (
    <Select
    className="gender"
      placeholder={"Gender"}
      defaultValue={selectedOption}
      onChange={setSelectedOption}
      options={options}
    />
  );
}
