import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Formik } from "formik";
import * as yup from "yup";
import authenticationController from "~/services/authentication";
import ILoginReq from "~/interfaces/ILoginReq";
import { useNavigate } from "react-router";
import { useStore } from "~/store/zustand/store";
import { toast } from "react-toastify";

const initialValues = {
    userName: "",
    password: "",
};

const loginSchema = yup.object().shape({
    userName: yup.string().required("required"),
    password: yup.string().required("required"),
});

export default function Login() {
    const navigate = useNavigate();
    const { setUser } = useStore();

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
                <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={loginSchema}>
                    {({ values, errors, touched, handleBlur, handleChange, handleSubmit }: any) => (
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            noValidate
                            sx={{ mt: 1, display: "flex", flexDirection: "column", alignItems: "center" }}
                        >
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Username"
                                name="userName"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.userName}
                                error={!!touched.userName && !!errors.userName}
                                helperText={touched.userName && errors.userName}
                                sx={{
                                    "& .MuiInputLabel-outlined": {
                                        color: "#fff",
                                    },
                                    "& .MuiInputLabel-outlined.Mui-focused": {
                                        color: "#fff",
                                    },
                                }}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                name="password"
                                label="Password"
                                type="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                                error={!!touched.password && !!errors.password}
                                helperText={touched.password && errors.password}
                                sx={{
                                    "& .MuiInputLabel-outlined": {
                                        color: "#fff",
                                    },
                                    "& .MuiInputLabel-outlined.Mui-focused": {
                                        color: "#fff",
                                    },
                                }}
                            />
                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                color="secondary"
                                size="large"
                                sx={{
                                    mt: 2,
                                    mb: 8,
                                    "&:hover": {
                                        backgroundColor: "#3f51b5",
                                    },
                                    "&:active": {
                                        backgroundColor: "#303f9f",
                                    },
                                    "& .MuiButton-label": {
                                        justifyContent: "center",
                                    },
                                }}
                            >
                                Logohu
                            </Button>
                        </Box>
                    )}
                </Formik>
            </Box>
        </Container>
    );
}
