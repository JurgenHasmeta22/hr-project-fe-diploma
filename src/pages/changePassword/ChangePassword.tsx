import React, { useRef, useState } from "react";
import { Box, Typography, Container } from "@mui/material";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import authenticationController from "~/services/api/authentication";
import { toast } from "react-toastify";
import { useStore } from "~/services/store/store";
import FormAdvanced from "~/components/form/Form";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { FormikProps } from "formik";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

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
        <Container component="div" maxWidth="sm" sx={{ mt: 10 }}>
            <Box
                sx={{
                    borderRadius: 5,
                    padding: "50px 50px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    bgcolor: "background.paper",
                    boxShadow: "0 4px 10px 0 rgba(0, 0, 0, 0.2), 0 4px 20px 0 rgba(0, 0, 0, 0.19)",
                }}
            >
                <Typography variant="h3" gutterBottom align="center" color={"secondary"} mb={2}>
                    Ndrysho passwordin
                </Typography>
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
                            variant: "filled",
                            type: "password",
                            sx: { gridColumn: "span 8" },
                        },
                        {
                            name: "newPassword",
                            label: "Passwordi i ri",
                            variant: "filled",
                            type: "password",
                            sx: { gridColumn: "span 8" },
                        },
                        {
                            name: "confirmNewPassword",
                            label: "Konfirmo passwordin",
                            variant: "filled",
                            type: "password",
                            sx: { gridColumn: "span 8" },
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
                            variant: "contained",
                            sx: {
                                bgcolor: "#30969f",
                                fontSize: "16px",
                                fontWeight: "500",
                            },
                            icon: <LockOutlinedIcon sx={{ ml: "10px" }} color="action" />,
                        },
                        {
                            label: "Anullo",
                            type: "reset",
                            color: "secondary",
                            variant: "contained",
                            onClick: () => {
                                handleResetFromParent();
                            },
                            sx: {
                                border: "1px solid #000",
                                bgcolor: "#ff5252",
                                fontSize: "16px",
                                fontWeight: "500",
                            },
                            icon: <ClearAllIcon color="action" sx={{ ml: "10px" }} />,
                        },
                    ]}
                />
                <Link to="/login" style={{ color: "#fff", marginTop: "20px", textDecoration: "none", fontSize: "14px" }}>
                    Shkoni tek login
                </Link>
            </Box>
        </Container>
    );
};

export default ChangePassword;
