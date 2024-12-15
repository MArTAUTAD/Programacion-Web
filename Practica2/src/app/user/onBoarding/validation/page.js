"use client";

import FormYup from "@/components/FormYup";
import { getFetch } from "@/utils/handlerequests"
import { useState } from "react";
import * as Yup from "yup";

export default function validation(){

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [codeInputs, setCodeInputs] = useState(["", "", "", ""]);

    const paramForm={
        initialValues : {  code: "" },

        fields :[
        { name: "code", type: "text", label: "" },
        ],

        validationSchema :Yup.object({
            code: Yup.string().length(4, "El código debe tener exactamente 4 dígitos").matches(/^\d+$/, "El código debe contener solo números").required()
        }),

        handleInputChange :(index, value) => {
            const newCodeInputs = [...codeInputs];
            newCodeInputs[index] = value.slice(0, 1); 
            setCodeInputs(newCodeInputs);
        },

        handleSubmit :(values) => {
            const token = localStorage.getItem("jwt");
            if (!token) {
                setErrorMessage("No se encontró un token. Por favor, inicie sesión.");
                return;
            }
            try {
                const data= getFetch("api/user/validation", codeInputs, "PUT", {"Authorization": `Bearer ${token}`});
                setSuccessMessage("Correo verificado exitosamente.");
                setErrorMessage("");
              } catch (error) {
                setSuccessMessage("");
                setErrorMessage(error.message || "Error al verificar el correo.");
              }
        },
    }

    
    

    return(
        <FormYup
            paramsForm={paramForm}
            formData={codeInputs}
            setFormData={setCodeInputs}
            buttonText="Verificar"
        
        ></FormYup>
    )

}
