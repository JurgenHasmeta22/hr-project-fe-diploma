import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { FormikProps } from "formik";
import * as yup from "yup";
import authenticationController from "~/services/api/authentication";
import ILoginReq from "~/interfaces/ILoginReq";
import { useNavigate } from "react-router";
import { useStore } from "~/services/store/store";
import { toast } from "react-toastify";
import { useState, useRef } from "react";
import FormAdvanced from "~/components/form/Form";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";
import { useLocalStorage } from "~/hooks/useLocalStorage";
import { UserData } from "~/app/App";
import IUser from "~/interfaces/IUser";

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

    const handleResetFromParent = () => {
        formikRef.current?.resetForm();
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
        <Container component="div" maxWidth="sm" sx={{ mt: 15 }}>
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
                <Typography variant="h3" component="h3" sx={{ mb: 2 }} gutterBottom color={"secondary"}>
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
                            sx: { gridColumn: "span 8" },
                        },
                        {
                            name: "password",
                            label: "Passwordi",
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
                                bgcolor: "#ff5252",
                                fontSize: "16px",
                                fontWeight: "500",
                            },
                            icon: <ClearAllIcon color="action" sx={{ ml: "10px" }} />,
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
