import React from "react";
import { Button, TextField, Box, Typography, Container } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import authenticationController from "~/services/authentication";
import { toast } from "react-toastify";
import { useStore } from "~/store/zustand/store";

const validationSchema = yup.object({
    oldPassword: yup.string().required("Passwordi aktual eshte i kerkuar"),
    newPassword: yup.string().required("Passwordi i ri eshte i kerkuar").min(8, "Passwordi duhet te jete minimum 8 karaktere"),
    confirmNewPassword: yup
        .string()
        .oneOf([yup.ref("newPassword")], "Passwordet nuk perputhen")
        .required("Duhet konfirmimi i passwordit"),
});

const ChangePassword: React.FC = () => {
    const navigate = useNavigate();
    const { user, setUser } = useStore();

    const initialValues = {
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
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
                <Formik initialValues={initialValues} onSubmit={handleFormSubmit} validationSchema={validationSchema}>
                    {({ errors, touched, isValid }) => (
                        <Form>
                            <Box mb={2}>
                                <Field
                                    name="oldPassword"
                                    as={TextField}
                                    fullWidth
                                    label="Passwordi aktual"
                                    type="password"
                                    error={touched.oldPassword && !!errors.oldPassword}
                                    helperText={touched.oldPassword && errors.oldPassword}
                                    sx={{
                                        "& .MuiInputLabel-outlined": {
                                            color: "#fff",
                                        },
                                        "& .MuiInputLabel-outlined.Mui-focused": { color: "#fff" },
                                    }}
                                />
                            </Box>
                            <Box mb={2}>
                                <Field
                                    name="newPassword"
                                    as={TextField}
                                    fullWidth
                                    label="Passwordi i ri"
                                    type="password"
                                    error={touched.newPassword && !!errors.newPassword}
                                    helperText={touched.newPassword && errors.newPassword}
                                    sx={{
                                        "& .MuiInputLabel-outlined": {
                                            color: "#fff",
                                        },
                                        "& .MuiInputLabel-outlined.Mui-focused": { color: "#fff" },
                                    }}
                                />
                            </Box>
                            <Box mb={2}>
                                <Field
                                    name="confirmNewPassword"
                                    as={TextField}
                                    fullWidth
                                    label="Konfirmo passwordin"
                                    type="password"
                                    error={touched.confirmNewPassword && !!errors.confirmNewPassword}
                                    helperText={touched.confirmNewPassword && errors.confirmNewPassword}
                                    sx={{
                                        "& .MuiInputLabel-outlined": {
                                            color: "#fff",
                                        },
                                        "& .MuiInputLabel-outlined.Mui-focused": { color: "#fff" },
                                    }}
                                />
                            </Box>
                            <Button variant="contained" color="primary" type="submit" disabled={!isValid} fullWidth>
                                Ndrysho passwordin
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Container>
    );
};

export default ChangePassword;
