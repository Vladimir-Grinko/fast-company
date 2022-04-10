import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ options, onChange, name, label, defaultValue }) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                label: options[optionName].name,
                value: options[optionName]._id,
                color: options[optionName].color
            }))
            : options;

    const handleChange = (value) => {
        onChange({ name: name, value });
    };
    return (
        <div className="mb-4">
            <label className="form-label">
                {label}
            </label>
            <Select
                defaultValue={defaultValue}
                className="basic-multi-select"
                classNamePrefix="select"
                closeMenuOnSelect={false}
                isMulti
                name={name}
                options={optionsArray}
                onChange={handleChange}
            />
        </div>
    );
};
MultiSelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    defaultValue: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default MultiSelectField;
