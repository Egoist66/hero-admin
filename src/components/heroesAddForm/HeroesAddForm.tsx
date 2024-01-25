// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров
import { useFormik } from "formik";
import * as Yup from "yup";

import { FC } from "react";
import { useAppDispatch } from "../../store/store";
import { createHeroes } from "../../store/thunks/create-heroes";

const options = [
  { value: "fire", text: "Огонь" },
  { value: "water", text: "Вода" },
  { value: "wind", text: "Ветер" },
  { value: "earth", text: "Земля" },
] as const;

type initialValuesType = {
    name: string
    description: string
    element:  "fire" | "water" | "wind" | "earth" | ""
}

const HeroesAddForm: FC = () => {
    const dispatch = useAppDispatch()

 
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      element: "",
    } as initialValuesType,

    validationSchema: Yup.object({
      name: Yup.string().required('Поле имя обязательно'),
      description: Yup.string()
        .max(200, "Не более 200 символов или меньше")
        .required('Поле описания обязательно'),
      element: Yup.string().required('Поле элемент обязательно'),
    }),
    onSubmit({ description, element, name }, {resetForm}) {
        dispatch(createHeroes({
            description: description.trim(),
            element,
            name: name.trim(),
            charStatus: 'created'
        }))

        resetForm()
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="border p-4 shadow-lg rounded"
    >
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">
          Имя нового героя
        </label>
        <input
          {...formik.getFieldProps("name")}
          type="text"
          className="form-control"
          id="name"
          placeholder="Как меня зовут?"
        />
        {formik.touched.name && formik.errors.name ? (
          <p className="error-msg">{formik.errors.name}</p>
        ) : null}
      </div>

      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">
          Описание
        </label>
        <textarea
          {...formik.getFieldProps("description")}
          className="form-control"
          id="text"
          placeholder="Что я умею?"
          style={{ height: "130px" }}
        />

        {formik.touched.description && formik.errors.description ? (
          <p className="error-msg">{formik.errors.description}</p>
        ) : null}
      </div>

      <div className="mb-3">
        <label htmlFor="element" className="form-label">
          Выбрать элемент героя
        </label>
        <select
          {...formik.getFieldProps("element")}
          className="form-select"
          id="element"
        >
          <option>Я владею элементом...</option>

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>

        {formik.touched.element && formik.errors.element ? (
          <p className="error-msg">{formik.errors.element}</p>
        ) : null}
      </div>

      <button type="submit" className="btn btn-primary">
        Создать
      </button>
    </form>
  );
};

export default HeroesAddForm;
