import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { validator } from "../../../../utils/validator";
import TextField from "../../../common/form/textField";
import SelectField from "../../../common/form/selectField";
import RadioField from "../../../common/form/radioField";
import MultiSelectField from "../../../common/form/multiSelectField";
import { useAuth } from "../../../../hooks/useAuth";
import { useProfessions } from "../../../../hooks/useProfession";
import { useSelector } from "react-redux";
import {
    getQualities,
    getQualitiesIoadingStatus
} from "../../../../store/qualities";

const UserPageEdit = () => {
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const [data, setData] = useState();
    const [isLoading, setLoading] = useState(true);
    const { currentUser, updateUser } = useAuth();

    const qualities = useSelector(getQualities());
    const isLoadingQual = useSelector(getQualitiesIoadingStatus());

    const { professions, isLoading: isLoadingProf } = useProfessions();
    const defaultQualities = getQualityForUser(currentUser.qualities).map(
        (quality) => {
            return {
                label: quality.name,
                value: quality._id
            };
        }
    );

    function getQualityForUser(qualitiesForUser) {
        const endQualities = [];
        for (const qualForUser of qualitiesForUser) {
            for (const qualOfAll of qualities) {
                if (qualOfAll._id === qualForUser) {
                    endQualities.push(qualOfAll);
                }
            }
        }

        return endQualities;
    }
    useEffect(() => {
        if (currentUser && !isLoadingProf && !isLoadingQual && !data) {
            setData({
                ...currentUser,
                qualities: defaultQualities
            });
        }
    }, [currentUser, isLoadingProf, isLoadingQual, data]);

    useEffect(() => {
        if (data && isLoading) {
            setLoading(false);
        }
    }, [data]);

    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id
    }));

    const professionsList = professions.map((prof) => ({
        label: prof.name,
        value: prof._id
    }));

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const handleBack = () => {
        history.push(`/users/${currentUser._id}`);
    };

    const validatorConfig = {
        name: {
            isRequired: {
                message: "Обязательно введите Ваше имя"
            },
            min: {
                message: "Иия должно состоять минимум из 3 символов",
                value: 3
            }
        },
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
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
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const newData = {
            ...data,
            qualities: data.qualities.map((q) => q.value)
        };
        try {
            await updateUser(newData);
            setData((prevState) => ({
                ...prevState,
                data
            }));
            history.push("/users/" + currentUser._id);
        } catch (error) {
            setErrors(error);
        }
    };

    if (!data && isLoading) {
        return "Loading......";
    }
    return (
        <div className="container mt-5">
            <button onClick={handleBack} className="btn btn-primary">
                <i className="bi bi-caret-left me-1"></i>
                Назад
            </button>
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
                            options={professionsList}
                            onChange={handleChange}
                            value={data.profession}
                            error={errors.profession}
                            name="profession"
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
                            defaultValue={data.qualities}
                            options={qualitiesList}
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
