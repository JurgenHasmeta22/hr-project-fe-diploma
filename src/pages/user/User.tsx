import { Box, Breadcrumbs, Button, CircularProgress, Typography } from "@mui/material";
import Header from "~/components/header/Header";
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import usersController from "~/services/api/users";
import { FormikProps } from "formik";
import * as yup from "yup";
import IUser from "~/interfaces/IUser";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FormAdvanced from "~/components/form/Form";
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
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    const formikRef = useRef<FormikProps<any>>(null);
    const breadcrumbs = [
        <Link key="1" to={"/users"} style={{ textDecoration: "none" }}>
            {location.state?.from!}
        </Link>,
        <Typography key="2" color="text.primary">
            Detajet e perdoruesit
        </Typography>,
    ];

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
        <div className="m-5">
            <div className="mb-10 flex items-center gap-5">
                <button
                    onClick={() => {
                        navigate("/users");
                    }}
                    className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-secondary-dark transition-colors duration-300"
                >
                    <ArrowBackIcon className="text-white" />
                </button>
                <nav className="text-sm" aria-label="breadcrumb">
                    <ol className="flex items-center space-x-2">
                        {breadcrumbs.map((crumb, index) => (
                            <li key={index} className="flex items-center">
                                <span>{crumb}</span>
                                {index !== breadcrumbs.length - 1 && (
                                    <NavigateNextIcon className="text-gray-500" fontSize="small" />
                                )}
                            </li>
                        ))}
                    </ol>
                </nav>
            </div>
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
                        type: "text",
                    },
                    {
                        name: "userName",
                        label: "Username",
                        type: "text",
                    },
                    {
                        name: "userFirstname",
                        label: "Emri",
                        type: "text",
                    },
                    {
                        name: "userLastname",
                        label: "Mbiemri",
                        type: "text",
                    },
                    {
                        name: "userEmail",
                        label: "Email",
                        type: "text",
                    },
                    {
                        name: "balancaLeje",
                        label: "Balanca e lejeve",
                        disabled: true,
                        type: "text",
                    },
                    {
                        name: "userIsActive",
                        label: "Statusi",
                        type: "text",
                    },
                ]}
                onDataChange={(values) => {
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
                        // icon: <SaveAsIcon sx={{ ml: "10px" }} color="action" />,
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
                        type: "button",
                        // icon: <ClearOutlinedIcon color="action" sx={{ ml: "10px" }} />,
                    },
                    {
                        label: "Anullo",
                        type: "reset",
                        onClick: () => {
                            handleResetFromParent();
                        },
                        color: "secondary",
                        // icon: <ClearAllIcon color="action" sx={{ ml: "10px" }} />,
                    },
                ]}
            />
        </div>
    );
};

export default User;
