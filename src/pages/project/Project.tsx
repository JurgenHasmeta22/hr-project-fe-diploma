import { Box, Breadcrumbs, Button, CircularProgress, Typography } from "@mui/material";
import Header from "~/components/header/Header";
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import IProject from "~/interfaces/IProject";
import projectsController from "~/services/api/projects";
import { FormikProps } from "formik";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { toast } from "react-toastify";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import FormAdvanced from "~/components/form/Form";
import * as yup from "yup";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { useStore } from "~/services/store/store";

const projectSchema = yup.object().shape({
    emriProjekt: yup.string().required("required"),
    pershkrimProjekt: yup.string().required("required"),
});

const Project = () => {
    const [project, setProject] = useState<IProject | null>(null);
    const [currentTime, setCurrentTime] = useState("");
    const [projektId, setProjektId] = useState<string | undefined>("");
    const [emriProjekt, setEmriProjekt] = useState<string>("");
    const [pershkrimProjekt, setPershkrimProjekt] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({});
    const { user } = useStore();
    const navigate = useNavigate();
    const location = useLocation();
    const formikRef = useRef<FormikProps<any>>(null);
    const breadcrumbs = [
        <Link key="1" to={"/projects"} style={{ textDecoration: "none" }}>
            {location.state?.from!}
        </Link>,
        <Typography key="2" color="text.primary">
            Detajet e projektit
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
            emriProjekt: values.emriProjekt,
            pershkrimProjekt: values.pershkrimProjekt,
        };

        const response = await projectsController.updateProject(project?.projektId, payload);

        if (response === "") {
            toast.success("Ruajtja e ndryshimeve me sukses !");
            getProject();
        } else {
            toast.error("Rujtja nuk e realizua !");
        }
    };

    async function getProject(): Promise<void> {
        const response: IProject = await projectsController.getProject(location.state?.projectId!);

        setProject(response);
        setProjektId(response.projektId);
        setEmriProjekt(response.emriProjekt);
        setPershkrimProjekt(response.pershkrimProjekt);
    }

    useEffect(() => {
        async function fetchData() {
            await getProject();
            setLoading(false);
        }

        fetchData();
        const now = new Date().toISOString();
        setCurrentTime(now);
    }, []);

    if (loading) return <CircularProgress />;

    return (
        <div className="m-5">
            <div className="mb-10 flex items-center gap-5">
                <button
                    onClick={() => {
                        navigate("/projects");
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
            <Header title="Detajet e projektit" subtitle="Vizualizo dhe edito projektin" />
            <FormAdvanced
                initialValues={{
                    projektId,
                    emriProjekt,
                    pershkrimProjekt,
                }}
                fields={[
                    {
                        name: "projektId",
                        label: "Id",
                        disabled: true,
                        type: "text",
                    },
                    {
                        name: "emriProjekt",
                        label: "Emri",
                        type: "text",
                    },
                    {
                        name: "pershkrimProjekt",
                        label: "Pershkrim",
                        type: "text",
                    },
                ]}
                onDataChange={(values) => {
                    handleDataChange(values);
                }}
                onSubmit={handleFormSubmit}
                validationSchema={projectSchema}
                formRef={formikRef}
                actions={[
                    {
                        label: "Ruaj ndryshimet",
                        type: "submit",
                        color: "secondary",
                        // icon: <SaveAsIcon className="ml-2" color="action" />,
                    },
                    {
                        label: "Elemino",
                        onClick: async () => {
                            const response = await projectsController.deleteProject(projektId);
                            if (response === "") {
                                toast.success("Elemini u krye me sukses !");
                                navigate("/projects");
                            } else {
                                toast.error("Eleminimi nuk u realizua !");
                            }
                        },
                        color: "secondary",
                        type: "buttton",
                        // icon: <ClearOutlinedIcon className="ml-2" color="action" />,
                    },
                    {
                        label: "Anullo",
                        type: "reset",
                        onClick: () => {
                            handleResetFromParent();
                        },
                        color: "secondary",
                        // icon: <ClearAllIcon className="ml-2" color="action" />,
                    },
                    {
                        label: "Bashkangjitu projektit",
                        onClick: async () => {
                            const response = await projectsController.assignProjectToUser(user?.userId, projektId, {
                                dataFillim: currentTime,
                                dataMbarim: null,
                            });
                            if (response === "") {
                                toast.success("Futja ne projekt u krye me sukses !");
                                navigate("/users");
                            } else {
                                toast.error("Futja ne projekt nuk u realizua !");
                            }
                        },
                        color: "secondary",
                        type: "buttton",
                        // icon: <MeetingRoomIcon className="ml-2" color="action" />,
                    },
                ]}
            />
        </div>
    );
};

export default Project;
