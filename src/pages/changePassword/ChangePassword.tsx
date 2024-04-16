import React, { useRef, useState } from "react";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import authenticationController from "~/services/api/authentication";
import { toast } from "react-toastify";
import { useStore } from "~/services/store/store";
import FormAdvanced from "~/components/form/Form";
import { FormikProps } from "formik";

const validationSchema = yup.object({
    oldPassword: yup.string().required("Passwordi aktual eshte i kerkuar"),
    newPassword: yup.string().required("Passwordi i ri eshte i kerkuar").min(8, "Passwordi duhet te jete minimum 8 karaktere"),
    confirmNewPassword: yup
        .string()
        .oneOf([yup.ref("newPassword")], "Passwordet nuk perputhen")
        .required("Duhet konfirmimi i passwordit"),
});

const ChangePassword: React.FC = () => {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const { user, setUser } = useStore();
    const formikRef = useRef<FormikProps<any>>(null);

    const handleDataChange = (values: any) => {
        setFormData(values);
    };

    const handleResetFromParent = () => {
        formikRef.current?.resetForm();
    };

    const handleFormSubmit = async (values: any) => {
        const payload = {
            userId: user?.userId,
            oldPassword: values.oldPassword,
            newPassword: values.newPassword,
            confirmNewPassword: values.confirmNewPassword,
        };

        const response = await authenticationController.onLogin(payload);

        if (response) {
            toast.success("Ju keni ndryshuar passwordin me sukses");
            setUser(response);
            navigate("/dashboard");
        } else {
            toast.error("Passwordi nuk eshte ndryshuar me sukses");
        }
    };

    return (
        <div className="container mx-auto mt-20 h-full flex place-content-center">
            <div className="bg-white rounded-lg shadow-md p-10">
                <h3 className="text-3xl mb-4 text-secondary text-center">Ndrysho passwordin</h3>
                <FormAdvanced
                    initialValues={{
                        oldPassword: "",
                        newPassword: "",
                        confirmNewPassword: "",
                    }}
                    fields={[
                        {
                            name: "oldPassword",
                            label: "Passwordi aktual",
                            type: "password",
                        },
                        {
                            name: "newPassword",
                            label: "Passwordi i ri",
                            type: "password",
                        },
                        {
                            name: "confirmNewPassword",
                            label: "Konfirmo passwordin",
                            type: "password",
                        },
                    ]}
                    onDataChange={(values: any) => {
                        handleDataChange(values);
                    }}
                    formRef={formikRef}
                    onSubmit={handleFormSubmit}
                    validationSchema={validationSchema}
                    actions={[
                        {
                            label: "Ndrysho",
                            type: "submit",
                            color: "secondary",
                            // icon: <LockOutlinedIcon sx={{ ml: "10px" }} color="action" />,
                        },
                        {
                            label: "Anullo",
                            type: "reset",
                            onClick: () => {
                                handleResetFromParent();
                            },
                            // icon: <ClearAllIcon color="action" sx={{ ml: "10px" }} />,
                        },
                    ]}
                />
                <Link to="/login" className="block text-white mt-6 text-sm underline hover:no-underline text-center">
                    Shkoni tek login
                </Link>
            </div>
        </div>
    );
};

export default ChangePassword;
