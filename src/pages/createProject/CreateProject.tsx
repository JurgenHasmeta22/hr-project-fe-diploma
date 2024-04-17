import { Box } from "@mui/material";
import Header from "~/components/header/Header";
import { useNavigate } from "react-router";
import projectService from "~/services/api/projectService";
import { FormikProps } from "formik";
import * as yup from "yup";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { toast } from "react-toastify";
import FormAdvanced from "~/components/form/Form";
import { useState, useRef } from "react";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import * as CONSTANTS from "~/constants/Constants";

const projectSchema = yup.object().shape({
    emriProjekt: yup.string().required("required"),
    pershkrimProjekt: yup.string().required("required"),
});

const CreateProject = () => {
    const [formData, setFormData] = useState({});

    const navigate = useNavigate();

    const formikRef = useRef<FormikProps<any>>(null);

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

        const response = await projectService.addProject(payload);

        if (response) {
            toast.success(CONSTANTS.UPDATE__SUCCESS);
            navigate("/projects");
        } else {
            toast.error(CONSTANTS.UPDATE__FAILURE);
        }
    };

    return (
        <Box m="20px">
            <Header
                title={CONSTANTS.PROJECT__ADD__TITLE}
                subtitle={CONSTANTS.PROJECT__ADD__SUBTITLE}
            />
            <FormAdvanced
                initialValues={{
                    userId: "",
                    emriProjekt: "",
                    pershkrimProjekt: "",
                }}
                fields={[
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
                ]}
            />
        </Box>
    );
};

export default CreateProject;
