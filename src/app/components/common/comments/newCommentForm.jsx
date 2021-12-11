import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { validator } from "../../../utils/validator";
import SelectField from "../form/selectField";

const NewCommentForm = ({ users }) => {
    const [data, setData] = useState({
        user: "",
        comment: ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        user: {
            isRequired: {
                message: "Выберите пользователя"
            }
        },

        comment: {
            isRequired: {
                message: "Введите комментарий"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    // const isValid = Object.keys(errors).length === 0; // проверка валидности для активации кнопки Submit

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const isValid = validate();
    //     if (!isValid) return;
    //     console.log(data);
    // };
    return (
        <div className="card mb-2">
            <div className="card-body ">
                <h2>Новый комментарий</h2>
                <SelectField
                    name="users"
                    label="Выберите пользователя"
                    defaultOption=""
                    options={users}
                    onChange={handleChange}
                    value={data.user}
                    error={errors.user}
                />
            </div>
        </div>
    );
};
NewCommentForm.propTypes = {
    users: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default NewCommentForm;
