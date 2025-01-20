'use client';

import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import "@/styles/formyup.css";

export default function FormYup({ paramsForm, formData, setFormData, buttonForm, linkButton }) {
  return (
    <Formik
      initialValues={paramsForm.initialValues}
      onSubmit={(values, { setSubmitting }) => {
        paramsForm.handleSubmit(values, setSubmitting);
      }}
      validationSchema={paramsForm.validationSchema}
    >
      {({ isSubmitting, handleChange }) => (
        <Form className="form-wrapper">
          {paramsForm.fields.map(({ name, type, label, options }) => (
            <div key={name} className="form-field">
              <label htmlFor={name} className="form-label">
                {label}
              </label>
              {type === "select" ? (
                <select
                  name={name}
                  className="form-input"
                  value={formData[name] || ""}
                  onChange={(e) => {
                    handleChange(e);
                    setFormData({ ...formData, [name]: e.target.value });
                  }}
                >
                  {options.map(({ value, label, selected }) => (
                    <option key={value} value={value} selected={selected}>
                      {label}
                    </option>
                  ))}
                </select>
              ) : (
                <Field
                  name={name}
                  type={type}
                  className="form-input"
                  value={formData[name] || ""}
                  onChange={(e) => {
                    handleChange(e);
                    setFormData({ ...formData, [name]: e.target.value });
                  }}
                />
              )}
              <ErrorMessage name={name} component="div" className="form-error" />
            </div>
          ))}

          {linkButton && (
            <button
              onClick={linkButton.onclick || (() => {})}
              className="form-link"
            >
              {linkButton.text || ""}
            </button>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="form-button"
          >
            {buttonForm?.text || ""}
          </button>
        </Form>
      )}
    </Formik>
  );
}



