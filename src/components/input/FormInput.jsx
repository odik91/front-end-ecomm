import { Label, TextInput } from "flowbite-react";

/* eslint-disable react/prop-types */
const FormInput = ({
  type,
  placeholder,
  name,
  value,
  handleChange,
  labelText,
  isRequired,
  extraClass
}) => {
  return (
    <div>
      <div className="mb-2 block">
        <Label value={labelText} />
      </div>
      <TextInput type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        className={`input input-bordered ${extraClass}`}
        onChange={handleChange}
        required={isRequired && true}
        autoComplete="off" />
    </div>
  );
};
export default FormInput;
