import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";

export default function FormYup({ paramsForm,formData,setFormData,  buttonText }){
  
  return(
    <Formik 
      initialValues={paramsForm.initialValues}
      onSubmit={paramsForm.onSubmit}

      validationSchema={paramsForm.validationSchema}
    >
      {(isSubmitting, handleChange)=>(
        <Form className="form-wrapper">
          {paramsForm.fields.map(({ name, type, label }) => (
            <div key={name} className="form-field">
              <label htmlFor={name} className="form-label">{label} </label>
              <Field
                name={name}
                type={type}
                className="form-input"
                onChange={(e) => {
                  handleChange(e)
                  setFormData({ ...formData, [name]: e.target.value })
                }}
              ></Field>

              <ErrorMessage name={name} component="div"/>
            </div>
          ))}
          <Link href="/uer/onBorarding/login">Ya tengo una sesión</Link>
          <button type="submit" disabled={isSubmitting} className="form-button">{buttonText}</button>
            
        </Form>
      )
    }
    </Formik>
  )

}

