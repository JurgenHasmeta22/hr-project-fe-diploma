import { Box } from "@mui/material";
import Header from "~/components/header/Header";
import { useNavigate } from "react-router";
import * as yup from "yup";
import { toast } from "react-toastify";
import authenticationController from "~/services/api/authentication";
import FormAdvanced from "~/components/form/Form";
import { FormikProps } from "formik";
import { useState, useRef } from "react";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import * as CONSTANTS from "~/constants/Constants";

const userSchema = yup.object().shape({
    userName: yup.string().required("required"),
    userFirstname: yup.string().required("required"),
    userLastname: yup.string().required("required"),
    userEmail: yup.string().required("required"),
    password: yup.string().required("required"),
    roles: yup.string().required("required"),
});

const CreateUser = () => {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const formikRef = useRef<FormikProps<any>>(null);

    const handleDataChange = (values: any) => {
        setFormData(values);
    };

    const handleResetFromParent = () => {
        formikRef.current?.resetForm();
    };

    const handleFormSubmit = async (values: any) => {
        const payload = {
            userName: values.userName,
            userFirstname: values.userFirstname,
            userLastname: values.userLastname,
            userEmail: values.userEmail,
            password: values.password,
            roles: [values.roles],
        };

        const response = await authenticationController.onRegister(payload);

        if (response) {
            toast.success(CONSTANTS.UPDATE__SUCCESS);
            navigate("/users");
        } else {
            toast.error(CONSTANTS.UPDATE__FAILURE);
        }
    };

    return (
        <Box m="20px">
            <Header title="Shto nje perdorues" subtitle="Krijo nje perdorues te ri" />
            <FormAdvanced
                initialValues={{
                    userName: "",
                    userFirstname: "",
                    userLastname: "",
                    userEmail: "",
                    password: "",
                }}
                fields={[
                    {
                        name: "userName",
                        label: "Username",
                        variant: "filled",
                        type: "text",
                        sx: { gridColumn: "span 2" },
                    },
                    {
                        name: "userFirstname",
                        label: "Emri",
                        variant: "filled",
                        type: "text",
                        sx: { gridColumn: "span 2" },
                    },
                    {
                        name: "userLastname",
                        label: "Mbiemri",
                        variant: "filled",
                        type: "text",
                        sx: { gridColumn: "span 2" },
                    },
                    {
                        name: "userEmail",
                        label: "Email",
                        variant: "filled",
                        type: "text",
                        sx: { gridColumn: "span 2" },
                    },
                    {
                        name: "password",
                        label: "Password",
                        variant: "filled",
                        type: "text",
                        sx: { gridColumn: "span 2" },
                    },
                    {
                        name: "roles",
                        label: "Roli",
                        type: "select",
                        options: [
                            { label: "Administrator", value: "Administrator" },
                            { label: "Board Member", value: "Board Member" },
                            { label: "HR Specialist", value: "HR Specialist" },
                            { label: "HR Manager", value: "HR Manager" },
                            { label: "Employee", value: "Employee" },
                        ],
                    },
                ]}
                actions={[
                    {
                        label: "Ruaj ndryshimet",
                        type: "submit",
                        color: "secondary",
                        variant: "contained",
                        sx: {
                            border: "1px solid #000",
                            bgcolor: "#30969f",
                            fontSize: "15px",
                            fontWeight: "700",
                        },
                        icon: <SaveAsIcon sx={{ ml: "10px" }} color="action" />,
                    },
                    {
                        label: "Anullo",
                        type: "reset",
                        onClick: () => {
                            handleResetFromParent();
                        },
                        color: "secondary",
                        variant: "contained",
                        sx: {
                            border: "1px solid #000",
                            bgcolor: "#ff5252",
                            fontSize: "15px",
                            fontWeight: "700",
                        },
                        icon: <ClearAllIcon color="action" sx={{ ml: "10px" }} />,
                    },
                ]}
                onDataChange={(values: any) => {
                    handleDataChange(values);
                }}
                onSubmit={handleFormSubmit}
                validationSchema={userSchema}
                formRef={formikRef}
            />
        </Box>
    );
};

export default CreateUser;
