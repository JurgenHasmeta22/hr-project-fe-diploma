import Header from "~/components/header/Header";
import { useNavigate } from "react-router";
import projectsController from "~/services/api/projects";
import { FormikProps } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import FormAdvanced from "~/components/form/Form";
import { useState, useRef } from "react";

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

        const response = await projectsController.addProject(payload);

        if (response) {
            toast.success("Ruajtja e ndryshimeve me sukses !");
            navigate("/projects");
        } else {
            toast.error("Ruajtja nuk e realizua !");
        }
    };

    return (
        <div className="m-5">
            <Header title="Shto projekt" subtitle="Krijo nje projekt te ri" />
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
                        type: "text",
                    },
                    {
                        name: "pershkrimProjekt",
                        label: "Pershkrim",
                        type: "text",
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
                        label: "Ruaj ndryshimet",
                        type: "submit",
                        color: "secondary",
                        // icon: <SaveAsIcon sx={{ ml: "10px" }} color="action" />,
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

export default CreateProject;
