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




























// 'use client';

// import { Formik, Form, Field, ErrorMessage } from "formik";
// import Link from "next/link";
// import "@/styles/formyup.css"



// export default function FormYup({ paramsForm, formData, setFormData, buttonForm, linkButton }) {
//   return (
//     <Formik
//       initialValues={paramsForm.initialValues}
//       onSubmit={(values, {setSubmitting})=>{
//         paramsForm.handleSubmit(values, setSubmitting)
//       }
// }
//       validationSchema={paramsForm.validationSchema}
//     >
//       {({ isSubmitting, handleChange }) => (
//         <Form className="form-wrapper">
//           {paramsForm.fields.map(({ name, type, label }) => (
//             <div key={name} className="form-field">
//               <label htmlFor={name} className="form-label">
//                 {label}
//               </label>
//               <Field
//                 name={name}
//                 type={type}
//                 className="form-input"
//                 value={formData[name] || ""}
//                 onChange={(e) => {
//                   handleChange(e);
//                   setFormData({ ...formData, [name]: e.target.value });
//                 }}
                
//               />
            
//               <ErrorMessage name={name} component="div" className="form-error" />
//             </div>
//           ))}

//             <button
//               onClick={linkButton?.onclick || (() => {})}
//               className="form-link"
//             >
//               {linkButton?.text || ""}
//             </button>

//           <button
//             type="submit"
//             disabled={isSubmitting}
//             // onClick={buttonForm?.onclick || (() => {})}
//             className="form-button"
//           >
//             {buttonForm?.text || ""}
//           </button>
//         </Form>
//       )}
//     </Formik>
//   );
// }


















// // import { Formik, Form, Field, ErrorMessage } from "formik";
// // import Link from "next/link";

// // export default function FormYup({ paramsForm,formData,setFormData,  buttonText }){
  
// //   return(
// //     <Formik 
// //       initialValues={paramsForm.initialValues}
// //       onSubmit={paramsForm.onSubmit}

// //       validationSchema={paramsForm.validationSchema}
// //     >
// //       {(isSubmitting, handleChange)=>(
// //         <Form className="form-wrapper">
// //           {paramsForm.fields.map(({ name, type, label }) => (
// //             <div key={name} className="form-field">
// //               <label htmlFor={name} className="form-label">{label} </label>
// //               <Field
// //                 name={name}
// //                 type={type}
// //                 className="form-input"
// //                 onChange={(e) => {
// //                   handleChange(e)
// //                   setFormData({ ...formData, [name]: e.target.value })
// //                 }}
// //               ></Field>

// //               <ErrorMessage name={name} component="div"/>
// //             </div>
// //           ))}
// //           <Link href="/uer/onBorarding/login">Ya tengo una sesión</Link>
// //           <button type="submit" disabled={isSubmitting} className="form-button">{buttonText}</button>
            
// //         </Form>
// //       )
// //     }
// //     </Formik>
// //   )

// // }

