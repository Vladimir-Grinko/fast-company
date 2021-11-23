import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { validator } from "../../../../utils/validator";
import TextField from "../../../common/form/textField";
import API from "../../../../api";
import SelectField from "../../../common/form/selectField";
import RadioField from "../../../common/form/radioField";
import MultiSelectField from "../../../common/form/multiSelectField";

const UserPageEdit = () => {
    const history = useHistory();
    const [selectedUser] = useState(JSON.parse(localStorage.getItem("selectedUser")));
    const defaultQualities = selectedUser.qualities.map(quality => {
        return { label: quality.name, value: quality._id, color: quality.color };
    });
    const [data, setData] = useState({
        name: selectedUser.name,
        email: selectedUser.email,
        profession: selectedUser.profession._id,
        sex: selectedUser.sex,
        qualities: defaultQualities
    });
    const [qualities, setQualities] = useState({});
    const [professions, setProfession] = useState();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        API.professions.fetchAll().then((data) => setProfession(data));
        API.qualities.fetchAll().then((data) => setQualities(data));
    }, []);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        person: {
            isRequired: {
                message: "Обязательно введите Ваше имя"
            }
        },
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        profession: {
            isRequired: {
                message: "Обязательно выберите Вашу профессию"
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
    const isValid = Object.keys(errors).length === 0; // проверка валидности для активации кнопки Submit

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        localStorage.setItem("selectedUser", JSON.stringify(data));
        API.users.update(selectedUser._id, data).then();
        history.push("/users/" + selectedUser._id);
        console.log(data);
    };
    if (!selectedUser) {
        return "Loading......";
    }
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <h3 className="mb-4">Изменение данных</h3>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Имя"
                            name="name"
                            value={data.name}
                            error={errors.name}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Электронная почта"
                            name="email"
                            value={data.email}
                            error={errors.email}
                            onChange={handleChange}
                        />
                        <SelectField
                            label="Выберите Вашу профессию"
                            defaultOption="Choose..."
                            options={professions}
                            onChange={handleChange}
                            value={data.profession}
                            error={errors.profession}
                        />
                        <RadioField
                            options={[
                                { name: "Male", value: "male" },
                                { name: "Female", value: "female" },
                                { name: "Other", value: "other" }
                            ]}
                            value={data.sex}
                            name="sex"
                            onChange={handleChange}
                            label="Выберите Ваш пол"
                        />
                        <MultiSelectField
                            defaultValue = {data.qualities}
                            options={qualities}
                            onChange={handleChange}
                            name="qualities"
                            label="Выберите Ваши качества"
                        />
                        <button
                            type="submit"
                            className="btn btn-primary w-100 mx-auto"
                            disabled={!isValid}
                        >
                            Обновить
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserPageEdit;
