import React, { useRef, useState } from "react";
import { Box, Typography, Container } from "@mui/material";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import authenticationController from "~/services/api/authentication";
import { toast } from "react-toastify";
import { useStore } from "~/store/zustand/store";
import FormAdvanced from "~/components/form/Form";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import ClearAllIcon from "@mui/icons-material/ClearAll";
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
        <Container component="main" maxWidth="xs" style={{ display: "flex", alignItems: "center", height: "100vh" }}>
            <Box
                width={400}
                mx="auto"
                p={4}
                borderRadius={3}
                bgcolor="background.paper"
                sx={{ display: "flex", flexDirection: "column", gap: "30px" }}
                boxShadow="0 4px 10px 0 rgba(0, 0, 0, 0.2), 0 4px 20px 0 rgba(0, 0, 0, 0.19)"
            >
                <Typography variant="h5" gutterBottom align="center">
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
                            sx: { gridColumn: "span 2" },
                        },
                        {
                            name: "newPassword",
                            label: "Passwordi i ri",
                            variant: "filled",
                            type: "password",
                            sx: { gridColumn: "span 2" },
                        },
                        {
                            name: "confirmNewPassword",
                            label: "Konfirmo passwordin",
                            variant: "filled",
                            type: "password",
                            sx: { gridColumn: "span 2" },
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
                            label: "Ndrysho passwordin",
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
                            color: "secondary",
                            variant: "contained",
                            onClick: () => {
                                handleResetFromParent();
                            },
                            sx: {
                                border: "1px solid #000",
                                bgcolor: "#ff5252",
                                fontSize: "15px",
                                fontWeight: "700",
                            },
                            icon: <ClearAllIcon color="action" sx={{ ml: "10px" }} />,
                        },
                    ]}
                />
            </Box>
        </Container>
    );
};

export default ChangePassword;
