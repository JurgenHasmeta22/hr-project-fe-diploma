import { FormikProps } from "formik";
import * as yup from "yup";
import authenticationController from "~/services/api/authentication";
import ILoginReq from "~/interfaces/ILoginReq";
import { useNavigate } from "react-router";
import { useStore } from "~/services/store/store";
import { toast } from "react-toastify";
import { useState, useRef } from "react";
import FormAdvanced from "~/components/form/Form";
import { Link } from "react-router-dom";
import { useLocalStorage } from "~/hooks/useLocalStorage";

const loginSchema = yup.object().shape({
    userName: yup.string().required("required"),
    password: yup.string().required("required"),
});

export default function Login() {
    const [formData, setFormData] = useState({});
    const { setUser } = useStore();
    const navigate = useNavigate();
    const formikRef = useRef<FormikProps<any>>(null);
    const { setItem } = useLocalStorage("user");

    const handleDataChange = (values: any) => {
        setFormData(values);
    };

    const handleFormSubmit = async (values: any) => {
        const payload: ILoginReq = {
            userName: values.userName,
            password: values.password,
        };

        try {
            const response: any = await authenticationController.onLogin(payload);

            if (response && response.status !== 401) {
                toast.success("Ju jeni loguar me sukses");
                setItem(response);
                setUser(response);
                navigate("/dashboard");
            } else {
                toast.error("Fjalekalimi ose username eshte gabim");
            }
        } catch (error) {
            console.error("An error occurred during the API call:", error);
        }
    };

    return (
        <div className="container mx-auto mt-20 h-full flex place-content-center">
            <div className="rounded-lg p-10 flex flex-col items-center bg-white shadow-md">
                <h3 className="text-3xl mb-4 text-secondary">Login</h3>
                <FormAdvanced
                    initialValues={{
                        userName: "",
                        password: "",
                    }}
                    fields={[
                        {
                            name: "userName",
                            label: "Username",
                            type: "text",
                        },
                        {
                            name: "password",
                            label: "Password",
                            type: "password",
                        },
                    ]}
                    onDataChange={(values) => {
                        handleDataChange(values);
                    }}
                    formRef={formikRef}
                    onSubmit={handleFormSubmit}
                    validationSchema={loginSchema}
                    actions={[
                        {
                            label: "Log in",
                            color: "secondary",
                            type: "submit",
                        },
                    ]}
                />
                <Link to="/changePassword" className="text-white mt-4 text-sm underline hover:no-underline">
                    Forgot password?
                </Link>
            </div>
        </div>
    );
}
