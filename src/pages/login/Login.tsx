import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { FormikProps } from "formik";
import * as yup from "yup";
import authenticationController from "~/services/api/authentication";
import ILoginReq from "~/types/ILoginReq";
import { useNavigate } from "react-router";
import { useStore } from "~/store/store";
import { toast } from "react-toastify";
import { useState, useRef } from "react";
import FormAdvanced from "~/components/form/Form";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";
import { useLocalStorage } from "~/hooks/useLocalStorage";
import * as CONSTANTS from "~/constants/Constants";

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
                toast.success(CONSTANTS.LOGIN__SUCCESS);
                setItem(response);
                setUser(response);
                navigate("/dashboard");
            } else {
                toast.error(CONSTANTS.LOGIN__FAILURE);
            }
        } catch (error) {
            console.error("An error occurred during the API call:", error);
        }
    };

    return (
        <Container component="div" maxWidth="sm" sx={{ mt: 15 }}>
            <Box
                sx={{
                    borderRadius: 2,
                    padding: "30px 30px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    bgcolor: "#b2d0f7",
                }}
            >
                <Typography variant="h2" component="h2" sx={{ mb: 2 }} gutterBottom color={"primary"}>
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
                            sx: { gridColumn: "span 15", backgroundColor: "#e9eef5" },
                        },
                        {
                            name: "password",
                            label: "Passwordi",
                            variant: "filled",
                            type: "password",
                            sx: { gridColumn: "span 15", backgroundColor: "#e9eef5" },
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
                                bgcolor: "#30969f",
                                fontSize: "16px",
                                fontWeight: "600",
                            },
                            icon: <LockOutlinedIcon sx={{ ml: "10px" }} color="action" />,
                        },
                    ]}
                />
                <Link to="/changePassword" style={{ color: "#fff", marginTop: "20px", textDecoration: "none", fontSize: "14px" }}>
                    Keni harruar passwordin ?
                </Link>
            </Box>
        </Container>
    );
}
