import { Box, CircularProgress, Typography } from "@mui/material";
import Header from "~/components/header/Header";
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import IProject from "~/types/IProject";
import projectService from "~/services/api/projectService";
import { FormikProps } from "formik";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { toast } from "react-toastify";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import FormAdvanced from "~/components/form/Form";
import * as yup from "yup";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { useStore } from "~/store/store";
import * as CONSTANTS from "~/constants/Constants";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";

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

        const response = await projectService.updateProject(project?.projektId, payload);

        if (response === "") {
            toast.success(CONSTANTS.UPDATE__SUCCESS);
            getProject();
        } else {
            toast.error(CONSTANTS.UPDATE__FAILURE);
        }
    };

    async function getProject(): Promise<void> {
        const response: IProject = await projectService.getProject(location.state?.projectId!);

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
        <Box m="20px">
            <Breadcrumb breadcrumbs={breadcrumbs} navigateTo={"/projects"} />
            <Header
                title={CONSTANTS.PROJECT__VIEW__TITLE}
                subtitle={CONSTANTS.PROJECT__VIEW__SUBTITLE}
            />
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
                        variant: "filled",
                        type: "text",
                        sx: { gridColumn: "span 2" },
                    },
                    {
                        name: "emriProjekt",
                        label: "Emri",
                        variant: "filled",
                        type: "text",
                        sx: { gridColumn: "span 2" },
                    },
                    {
                        name: "pershkrimProjekt",
                        label: "Pershkrim",
                        variant: "filled",
                        type: "text",
                        sx: { gridColumn: "span 2" },
                    },
                ]}
                onDataChange={(values: any) => {
                    handleDataChange(values);
                }}
                onSubmit={handleFormSubmit}
                validationSchema={projectSchema}
                formRef={formikRef}
                actions={[
                    {
                        label: CONSTANTS.FORM__UPDATE__BUTTON,
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
                            const response = await projectService.deleteProject(projektId);
                            if (response === "") {
                                toast.success(CONSTANTS.GLOBAL__DELETE__SUCCESS);
                                navigate("/projects");
                            } else {
                                toast.error(CONSTANTS.GLOBAL__DELETE__FAILURE);
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
                        label: CONSTANTS.FORM__RESET__BUTTON,
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
                    {
                        label: "Bashkangjitu projektit",
                        onClick: async () => {
                            const response = await projectService.assignProjectToUser(
                                user?.userId,
                                projektId,
                                {
                                    dataFillim: currentTime,
                                    dataMbarim: null,
                                },
                            );
                            if (response === "") {
                                toast.success(CONSTANTS.PROJECT__ASSIGN__SUCCESS);
                                navigate("/users");
                            } else {
                                toast.error(CONSTANTS.PROJECT__ASSIGN__FAILURE);
                            }
                        },
                        color: "secondary",
                        variant: "contained",
                        sx: {
                            border: "1px solid #000",
                            bgcolor: "#3377FF",
                            fontSize: "15px",
                            fontWeight: "700",
                        },
                        icon: <MeetingRoomIcon color="action" sx={{ ml: "10px" }} />,
                    },
                ]}
            />
        </Box>
    );
};

export default Project;
