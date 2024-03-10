import { Box, Breadcrumbs, Button, CircularProgress, Typography, useMediaQuery } from "@mui/material";
import Header from "~/components/dashboard/Header";
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import usersController from "~/services/users";
import { FormikProps } from "formik";
import * as yup from "yup";
import IUser from "~/interfaces/IUser";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import FormAdvanced from "~/components/form";
import { toast } from "react-toastify";

const userSchema = yup.object().shape({
    userName: yup.string().required("required"),
    userFirstname: yup.string().required("required"),
    userLastname: yup.string().required("required"),
    userEmail: yup.string().required("required"),
    balancaLeje: yup.string().required("required"),
    userIsActive: yup.string().required("required"),
});

const User = () => {
    const [user, setUser] = useState<IUser | null>(null);
    const [userId, setUserId] = useState<number | undefined>(0);
    const [userName, setUserName] = useState<string>("");
    const [userFirstname, setUserFirstname] = useState<string>("");
    const [userLastname, setUserLastname] = useState<string>("");
    const [userEmail, setUserEmail] = useState<string>("");
    const [balancaLeje, setBalancaLeje] = useState<number>(0);
    const [userIsActive, setUserIsActive] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const breadcrumbs = [
        <Link key="1" to={"/users"} style={{ textDecoration: "none" }}>
            {location.state?.from!}
        </Link>,
        <Typography key="2" color="text.primary">
            Detajet e perdoruesit
        </Typography>,
    ];

    const [formData, setFormData] = useState({});
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
            balancaLeje: values.balancaLeje,
            userIsActive: values.userIsActive,
        };

        const response = await usersController.updateUser(user?.userId, payload);
        if (response) {
            toast.success("Modifikimi u krye me sukses !");
            getUser();
        } else {
            toast.error("Modifikimi nuk u krye me sukses !");
        }
    };

    async function getUser(): Promise<void> {
        const response: IUser = await usersController.getUser(location.state?.userId!);

        setUser(response);
        setUserId(response.userId!);
        setUserName(response.userName);
        setUserFirstname(response.userFirstname);
        setUserLastname(response.userLastname);
        setUserEmail(response.userEmail);
        setBalancaLeje(response.balancaLeje);
        setUserIsActive(response.userIsActive);
    }

    useEffect(() => {
        async function fetchData() {
            await getUser();
            setLoading(false);
        }

        fetchData();
    }, []);

    if (loading) return <CircularProgress />;

    return (
        <Box m="20px">
            <Box mb={"30px"} display={"flex"} flexDirection={"row"} alignItems={"center"} gap={"20px"}>
                <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => {
                        navigate("/users");
                    }}
                >
                    <ArrowBackIcon color="action" />
                </Button>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                    {breadcrumbs}
                </Breadcrumbs>
            </Box>
            <Header title="Detajet e perdoruesit" subtitle="Vizualizo dhe edito perdoruesin" />
            <FormAdvanced
                initialValues={{
                    userId,
                    userName,
                    userFirstname,
                    userLastname,
                    userEmail,
                    balancaLeje,
                    userIsActive,
                }}
                fields={[
                    {
                        name: "userId",
                        label: "Id e perdoruesit",
                        disabled: true,
                        variant: "filled",
                        type: "text",
                        sx: { gridColumn: "span 2" },
                    },
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
                        name: "balancaLeje",
                        label: "Balanca e lejeve",
                        variant: "filled",
                        disabled: true,
                        type: "text",
                        sx: { gridColumn: "span 2" },
                    },
                    {
                        name: "userIsActive",
                        label: "Statusi",
                        variant: "filled",
                        type: "text",
                        sx: { gridColumn: "span 2" },
                    },
                ]}
                onDataChange={(values: any) => {
                    handleDataChange(values);
                }}
                onSubmit={handleFormSubmit}
                validationSchema={userSchema}
                formRef={formikRef}
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
                        label: "Elemino",
                        onClick: async () => {
                            const response = await usersController.updateUser(userId, {
                                ...user,
                                userIsActive: false,
                            });
                            if (response) {
                                toast.success("Fshirja u krye me sukses !");
                                navigate("/users");
                            } else {
                                toast.error("Fshirja nuk u realizua !");
                            }
                        },
                        color: "secondary",
                        variant: "contained",
                        sx: {
                            border: "1px solid #000",
                            bgcolor: "#ff5252",
                            fontSize: "15px",
                            fontWeight: "700",
                        },
                        icon: <ClearOutlinedIcon color="action" sx={{ ml: "10px" }} />,
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
            />
        </Box>
    );
};

export default User;
