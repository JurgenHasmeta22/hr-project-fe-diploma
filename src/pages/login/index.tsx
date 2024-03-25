import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Formik, FormikProps } from "formik";
import * as yup from "yup";
import authenticationController from "~/services/authentication";
import ILoginReq from "~/interfaces/ILoginReq";
import { useNavigate } from "react-router";
import { useStore } from "~/store/zustand/store";
import { toast } from "react-toastify";
import { useState, useRef } from "react";
import FormAdvanced from "~/components/form";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import ClearAllIcon from "@mui/icons-material/ClearAll";

const loginSchema = yup.object().shape({
    userName: yup.string().required("required"),
    password: yup.string().required("required"),
});

export default function Login() {
    const [formData, setFormData] = useState({});

    const { setUser } = useStore();

    const navigate = useNavigate();

    const formikRef = useRef<FormikProps<any>>(null);

    const handleDataChange = (values: any) => {
        setFormData(values);
    };

    const handleResetFromParent = () => {
        formikRef.current?.resetForm();
    };

    const handleFormSubmit = async (values: any) => {
        const payload: ILoginReq = {
            userName: values.userName,
            password: values.password,
        };

        const response = await authenticationController.onLogin(payload);

        if (response && response?.status !== 401) {
            toast.success("Ju jeni loguar me sukses");
            setUser(response);
            navigate("/dashboard");
        } else {
            toast.error("Fjalekalimi ose username eshte gabim");
        }
    };

    return (
        <Container component="div" maxWidth="sm" sx={{ mt: 15 }}>
            <Box
                sx={{
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    bgcolor: "background.paper",
                    boxShadow: "0 4px 10px 0 rgba(0, 0, 0, 0.2), 0 4px 20px 0 rgba(0, 0, 0, 0.19)",
                }}
            >
                <Typography variant="h3" component="h3" sx={{ mt: 4 }} gutterBottom color={"secondary"}>
                    Login
                </Typography>
                <FormAdvanced
                    initialValues={{
                        userName: "",
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
                            name: "password",
                            label: "Passwordi",
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
                    validationSchema={loginSchema}
                    actions={[
                        {
                            label: "Logohu",
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
}
