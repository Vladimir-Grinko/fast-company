import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import API from "../../../api";
import { validator } from "../../../utils/validator";
import SelectField from "../form/selectField";
import TextAreaField from "../form/textAreaField";

const NewCommentForm = ({ onSubmit }) => {
    const [users, setUsers] = useState({});

    useEffect(() => {
        API.users.fetchAll().then(setUsers);
    }, []);

    const [dataComment, setDataComment] = useState({
        person: "",
        content: ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setDataComment((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        person: {
            isRequired: {
                message: "Выберите пользователя"
            }
        },

        content: {
            isRequired: {
                message: "Введите комментарий"
            }
        }
    };

    useEffect(() => validate(), [dataComment]);

    const validate = () => {
        const errors = validator(dataComment, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0; // проверка валидности для активации кнопки Submit

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit({ content: dataComment.content, userId: dataComment.person });
        setDataComment({ person: "", content: "" });
        setErrors({});
    };
    return (
        <div className="card mb-2">
            <div className="card-body ">
                <h2>Новый комментарий</h2>
                <SelectField
                    name="person"
                    label=""
                    defaultOption="Выберите пользователя"
                    options={users}
                    onChange={handleChange}
                    value={dataComment.person}
                    error={errors.person}
                />
                <TextAreaField
                    label="Комментарий"
                    name="content"
                    value={dataComment.content}
                    onChange={handleChange}
                    error={errors.content}
                    rows="3"
                />
            </div>
            <div className="d-flex justify-content-end p-3 pt-0">
                <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={handleSubmit}
                    disabled={!isValid}
                >
                    Опубликовать
                </button>
            </div>
        </div>
    );
};
NewCommentForm.propTypes = {
    users: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onSubmit: PropTypes.func
};

export default NewCommentForm;
