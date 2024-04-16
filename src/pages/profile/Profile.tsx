import { Tab, Tabs, useTheme } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FormikProps } from "formik";
import * as Yup from "yup";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { useRightPanel } from "~/services/providers/RightPanelContext";
import { useStore } from "~/services/store/store";
import usersController from "~/services/api/users";
import IUser from "~/interfaces/IUser";
import ICertification from "~/interfaces/ICertification";
import IEducation from "~/interfaces/IEducation";
import ISkill from "~/interfaces/ISkill";
import IWorkExperience from "~/interfaces/IWorkExperience";
import { toast } from "react-toastify";
import educationsController from "~/services/api/educations";
import workExperiencesController from "~/services/api/workExperiences";
import skillsController from "~/services/api/skills";
import certificatesController from "~/services/api/certificates";
import authenticationController from "~/services/api/authentication";
import { useModal } from "~/services/providers/ModalContext";
import { ProfileTabsPanels } from "./ProfileTabsPanels";
import { ProfileHeader } from "./ProfileHeader";
import { tokens } from "~/utils/theme";

// #region Schemas for validation
const userSchema = Yup.object().shape({
    userName: Yup.string().required("required"),
    userFirstname: Yup.string().required("required"),
    userLastname: Yup.string().required("required"),
    userEmail: Yup.string().required("required"),
});

const certificateSchema = Yup.object().shape({
    certEmri: Yup.string().required("required"),
    certPershkrim: Yup.string().required("required"),
});

const skillSchema = Yup.object().shape({
    llojiAftesise: Yup.string().required("required"),
});

const workSchema = Yup.object().shape({
    ppemri: Yup.string().required("required"),
});

const educationSchema = Yup.object().shape({
    eduName: Yup.string().required("required"),
});

const userEducationSchema = Yup.object().shape({
    mesatarja: Yup.string().required("required"),
    dataFillim: Yup.string().required("required"),
    dataMbarim: Yup.string().required("required"),
    llojiMaster: Yup.string().required("required"),
});

const userCertificateSchema = Yup.object().shape({
    dataFituar: Yup.string().required("required"),
    dataSkadence: Yup.string().required("required"),
});

const userSkillSchema = Yup.object().shape({
    dataPerfitimit: Yup.string().required("required"),
});

const userWorkEsperienceSchema = Yup.object().shape({
    dataFillim: Yup.string().required("required"),
    dataMbarim: Yup.string().required("required"),
    pppozicion: Yup.string().required("required"),
    konfidencialiteti: Yup.string().required("required"),
    pershkrimiPunes: Yup.string().required("required"),
});
// #endregion

export default function Profile() {
    const [value, setValue] = useState(0);
    const [userProfile, setUserProfile] = useState<IUser | null>(null);
    const [formData, setFormData] = useState({});
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { userDetailsLoggedIn, setUserDetailsLoggedIn } = useStore();
    const formikRef = useRef<FormikProps<any>>(null);
    const { openRightPanel } = useRightPanel();
    const { openModal } = useModal();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };

    const handleDataChange = (values: any) => {
        setFormData(values);
    };

    const handleResetFromParent = () => {
        formikRef.current?.resetForm();
    };

    const handleClose = () => {
        setOpen(false);
    };

    // #region HandleCreate
    const handleCreateCertificate = useCallback(() => {
        openRightPanel({
            formRef: formikRef,
            initialValues: {
                certEmri: "",
                certPershkrim: "",
                dataSkadence: "",
                dataFituar: "",
            },
            steps: [
                {
                    fields: [
                        {
                            name: "certEmri",
                            label: "Emri",
                            variant: "filled",
                            type: "text",
                            sx: { gridColumn: "span 2" },
                        },
                        {
                            name: "certPershkrim",
                            label: "Pershkrimi",
                            variant: "filled",
                            type: "text",
                            sx: { gridColumn: "span 2" },
                        },
                    ],
                    validationSchema: certificateSchema,
                    title: "Shto certifikate",
                    actions: [
                        {
                            label: "Anullo",
                            onClick: () => {
                                handleResetFromParent();
                            },
                            type: "reset",
                            color: "secondary",
                            variant: "contained",
                            sx: {
                                border: "1px solid #000",
                                bgcolor: "#ff5252",
                                fontSize: "15px",
                                fontWeight: "700",
                            },
                            icon: <ClearAllIcon />,
                        },
                    ],
                },
                {
                    fields: [
                        {
                            name: "dataSkadence",
                            label: "Data e skandences",
                            variant: "filled",
                            type: "date",
                            sx: { gridColumn: "span 2" },
                        },
                        {
                            name: "dataFituar",
                            label: "Data e fituar",
                            variant: "filled",
                            type: "date",
                            sx: { gridColumn: "span 2" },
                        },
                    ],
                    validationSchema: userCertificateSchema,
                    title: "Shto certifikaten tende",
                    actions: [
                        {
                            label: "Anullo",
                            onClick: () => {
                                handleResetFromParent();
                            },
                            type: "reset",
                            color: "secondary",
                            variant: "contained",
                            sx: {
                                border: "1px solid #000",
                                bgcolor: "#ff5252",
                                fontSize: "15px",
                                fontWeight: "700",
                            },
                            icon: <ClearAllIcon />,
                        },
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
                            icon: <SaveAsIcon />,
                        },
                    ],
                },
            ],
            onSave: async (values: any) => {
                const payload1: ICertification = {
                    certEmri: values.certEmri,
                    certPershkrim: values.certPershkrim,
                };
                const response1 = await certificatesController.createCertificate(payload1);
                const payload2 = {
                    dataSkadence: values.dataSkadence,
                    dataFituar: values.dataFituar,
                };
                const response2 = await certificatesController.addUserCertificate(
                    response1.certId,
                    userDetailsLoggedIn?.userId,
                    payload2,
                );

                if (response1 && response2 === "") {
                    toast.success("Ruajtja e ndryshimeve me sukses !");
                } else {
                    toast.error("Rujtja nuk e realizua !");
                }
            },
            onDataChange: (values: any) => {
                handleDataChange(values);
            },
        });
    }, []);

    const handleCreateSkill = useCallback(() => {
        openRightPanel({
            formRef: formikRef,
            initialValues: {
                llojiAftesise: "",
                dataPerfitimit: "",
            },
            onSave: async (values: any) => {
                const payload1: ISkill = {
                    llojiAftesise: values.llojiAftesise,
                };
                const response1 = await skillsController.createSkill(payload1);
                const payload2 = {
                    dataPerfitimit: values.dataPerfitimit,
                };
                const response2 = await skillsController.addUserSkill(response1.aftesiId, userDetailsLoggedIn?.userId, payload2);

                if (response1 && response2 === "") {
                    toast.success("Ruajtja e ndryshimeve me sukses !");
                } else {
                    toast.error("Rujtja nuk e realizua !");
                }
            },
            steps: [
                {
                    fields: [
                        {
                            name: "llojiAftesise",
                            label: "Lloji i aftesise",
                            variant: "filled",
                            type: "text",
                            sx: { gridColumn: "span 2" },
                        },
                    ],
                    validationSchema: skillSchema,
                    title: "Krijo aftesine",
                    actions: [
                        {
                            label: "Anullo",
                            onClick: () => {
                                handleResetFromParent();
                            },
                            type: "reset",
                            color: "secondary",
                            variant: "contained",
                            sx: {
                                border: "1px solid #000",
                                bgcolor: "#ff5252",
                                fontSize: "15px",
                                fontWeight: "700",
                            },
                            icon: <ClearAllIcon />,
                        },
                    ],
                },
                {
                    fields: [
                        {
                            name: "dataPerfitimit",
                            label: "Data e perfitimit",
                            variant: "filled",
                            type: "date",
                            sx: { gridColumn: "span 2" },
                        },
                    ],
                    validationSchema: userSkillSchema,
                    title: "Krijo aftesine tende",
                    actions: [
                        {
                            label: "Anullo",
                            onClick: () => {
                                handleResetFromParent();
                            },
                            type: "reset",
                            color: "secondary",
                            variant: "contained",
                            sx: {
                                border: "1px solid #000",
                                bgcolor: "#ff5252",
                                fontSize: "15px",
                                fontWeight: "700",
                            },
                            icon: <ClearAllIcon />,
                        },
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
                            icon: <SaveAsIcon />,
                        },
                    ],
                },
            ],
            onDataChange: (values: any) => {
                handleDataChange(values);
            },
        });
    }, []);

    const handleCreateWork = useCallback(() => {
        openRightPanel({
            formRef: formikRef,
            initialValues: {
                ppemri: "",
                dataFillim: "",
                dataMbarim: "",
                pppozicion: "",
                konfidencialiteti: "",
                pershkrimiPunes: "",
            },
            steps: [
                {
                    fields: [
                        {
                            name: "ppemri",
                            label: "Emri",
                            variant: "filled",
                            type: "text",
                            sx: { gridColumn: "span 2" },
                        },
                    ],
                    validationSchema: workSchema,
                    title: "Shto pervojen e punes",
                    actions: [
                        {
                            label: "Anullo",
                            onClick: () => {
                                handleResetFromParent();
                            },
                            type: "reset",
                            color: "secondary",
                            variant: "contained",
                            sx: {
                                border: "1px solid #000",
                                bgcolor: "#ff5252",
                                fontSize: "15px",
                                fontWeight: "700",
                            },
                            icon: <ClearAllIcon />,
                        },
                    ],
                },
                {
                    fields: [
                        {
                            name: "dataFillim",
                            label: "Emri",
                            variant: "filled",
                            type: "date",
                            sx: { gridColumn: "span 2" },
                        },
                        {
                            name: "dataMbarim",
                            label: "Emri",
                            variant: "filled",
                            type: "date",
                            sx: { gridColumn: "span 2" },
                        },
                        {
                            name: "pppozicion",
                            label: "Pozicioni i punes",
                            variant: "filled",
                            type: "text",
                            sx: { gridColumn: "span 2" },
                        },
                        {
                            name: "konfidencialiteti",
                            label: "Konfidencialiteti",
                            variant: "filled",
                            type: "text",
                            sx: { gridColumn: "span 2" },
                        },
                        {
                            name: "pershkrimiPunes",
                            label: "Pershkrimi i punes",
                            variant: "filled",
                            type: "text",
                            sx: { gridColumn: "span 2" },
                        },
                    ],
                    validationSchema: userWorkEsperienceSchema,
                    title: "Shto pervojen e punes tende",
                    actions: [
                        {
                            label: "Anullo",
                            onClick: () => {
                                handleResetFromParent();
                            },
                            type: "reset",
                            color: "secondary",
                            variant: "contained",
                            sx: {
                                border: "1px solid #000",
                                bgcolor: "#ff5252",
                                fontSize: "15px",
                                fontWeight: "700",
                            },
                            icon: <ClearAllIcon />,
                        },
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
                            icon: <SaveAsIcon />,
                        },
                    ],
                },
            ],
            onSave: async (values: any) => {
                const payload1: IWorkExperience = {
                    ppemri: values.ppemri,
                };
                const response1 = await workExperiencesController.createWorkExperience(payload1);
                const payload2 = {
                    dataFillim: values.dataFillim,
                    dataMbarim: values.dataMbarim,
                    pppozicion: values.pppozicion,
                    konfidencialiteti: values.konfidencialiteti,
                    pershkrimiPunes: values.pershkrimiPunes,
                };
                const response2 = await workExperiencesController.addUserWorkExperience(
                    response1.ppId,
                    userDetailsLoggedIn?.userId,
                    payload2,
                );

                if (response1 && response2 === "") {
                    toast.success("Ruajtja e ndryshimeve me sukses !");
                } else {
                    toast.error("Rujtja nuk e realizua !");
                }
            },
            onDataChange: (values: any) => {
                handleDataChange(values);
            },
        });
    }, []);

    const handleCreateEducation = useCallback(() => {
        openRightPanel({
            formRef: formikRef,
            initialValues: {
                eduName: "",
                mesatarja: "",
                dataFillim: "",
                dataMbarim: "",
                llojiMaster: "",
            },
            steps: [
                {
                    fields: [
                        {
                            name: "eduName",
                            label: "Emri",
                            variant: "filled",
                            type: "text",
                            sx: { gridColumn: "span 2" },
                        },
                    ],
                    validationSchema: educationSchema,
                    title: "Shto edukimin",
                    actions: [
                        {
                            label: "Anullo",
                            onClick: () => {
                                handleResetFromParent();
                            },
                            type: "reset",
                            color: "secondary",
                            variant: "contained",
                            sx: {
                                border: "1px solid #000",
                                bgcolor: "#ff5252",
                                fontSize: "15px",
                                fontWeight: "700",
                            },
                            icon: <ClearAllIcon />,
                        },
                    ],
                },
                {
                    fields: [
                        {
                            name: "mesatarja",
                            label: "Mesatarja",
                            variant: "filled",
                            type: "text",
                            sx: { gridColumn: "span 2" },
                        },
                        {
                            name: "dataFillim",
                            label: "Data e fillimit",
                            variant: "filled",
                            type: "date",
                            sx: { gridColumn: "span 2" },
                        },
                        {
                            name: "dataMbarim",
                            label: "Data e mbarimit",
                            variant: "filled",
                            type: "date",
                            sx: { gridColumn: "span 2" },
                        },
                        {
                            name: "llojiMaster",
                            label: "Lloji i masterit",
                            variant: "filled",
                            type: "text",
                            sx: { gridColumn: "span 2" },
                        },
                    ],
                    validationSchema: userEducationSchema,
                    title: "Shto edukimin tend",
                    actions: [
                        {
                            label: "Anullo",
                            onClick: () => {
                                handleResetFromParent();
                            },
                            type: "reset",
                            color: "secondary",
                            variant: "contained",
                            sx: {
                                border: "1px solid #000",
                                bgcolor: "#ff5252",
                                fontSize: "15px",
                                fontWeight: "700",
                            },
                            icon: <ClearAllIcon />,
                        },
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
                            icon: <SaveAsIcon />,
                        },
                    ],
                },
            ],
            onSave: async (values: any) => {
                const payload1: IEducation = {
                    eduName: values.eduName,
                };
                const response1 = await educationsController.createEducation(payload1);
                const payload2 = {
                    mesatarja: values.mesatarja,
                    dataFillim: values.dataFillim,
                    dataMbarim: values.dataMbarim,
                    llojiMaster: values.llojiMaster,
                };
                const response2 = await educationsController.addUserEducation(
                    response1.eduId,
                    userDetailsLoggedIn?.userId,
                    payload2,
                );
                if (response1 && response2) {
                    toast.success("Ruajtja e ndryshimeve me sukses !");
                } else {
                    toast.error("Rujtja nuk e realizua !");
                }
            },
            onDataChange: (values: any) => {
                handleDataChange(values);
            },
        });
    }, []);
    // #endregion

    // #region HandleEdit
    const handleEditProfile = useCallback(
        (user: IUser) => {
            openRightPanel({
                formRef: formikRef,
                initialValues: {
                    userId: user.userId,
                    balancaLeje: user.balancaLeje,
                    userIsActive: user.userIsActive,
                    userName: user.userName,
                    userFirstname: user.userFirstname,
                    userLastname: user.userLastname,
                    userEmail: user.userEmail,
                },
                fields: [
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
                ],
                validationSchema: userSchema,
                onSave: async (values: any) => {
                    const payload: IUser = {
                        userId: values.userId,
                        balancaLeje: values.balancaLeje,
                        userIsActive: values.userIsActive,
                        userName: values.userName,
                        userFirstname: values.userFirstname,
                        userLastname: values.userLastname,
                        userEmail: values.userEmail,
                    };
                    const response = await authenticationController.updateUser(values.userId, payload);
                    if (response) {
                        toast.success("Ruajtja e ndryshimeve me sukses !");
                        setUserDetailsLoggedIn(response);
                        setUserProfile(response);
                    } else {
                        toast.error("Rujtja nuk e realizua !");
                    }
                },
                title: "Edito perdoruesin",
                actions: [
                    {
                        label: "Anullo",
                        onClick: () => {
                            handleResetFromParent();
                        },
                        type: "reset",
                        color: "secondary",
                        variant: "contained",
                        sx: {
                            border: "1px solid #000",
                            bgcolor: "#ff5252",
                            fontSize: "15px",
                            fontWeight: "700",
                        },
                        icon: <ClearAllIcon />,
                    },
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
                        icon: <SaveAsIcon />,
                    },
                ],
                onDataChange: (values: any) => {
                    handleDataChange(values);
                },
                subTitle: "Plotesoni detajet e perdoruesit",
            });
        },
        [userDetailsLoggedIn],
    );

    const handleEditCertificate = useCallback(
        (certificate: any) => {
            openRightPanel({
                formRef: formikRef,
                initialValues: {
                    certId: certificate.cert.certId,
                    certEmri: certificate.cert.certEmri,
                    certPershkrim: certificate.cert.certPershkrim,
                    dataSkadence: certificate.dataSkadence,
                    dataFituar: certificate.dataFituar,
                },
                steps: [
                    {
                        fields: [
                            {
                                name: "certEmri",
                                label: "Emri",
                                variant: "filled",
                                type: "text",
                                sx: { gridColumn: "span 2" },
                            },
                            {
                                name: "certPershkrim",
                                label: "Pershkrimi",
                                variant: "filled",
                                type: "text",
                                sx: { gridColumn: "span 2" },
                            },
                        ],
                        validationSchema: certificateSchema,
                        title: "Edito certifikate",
                        actions: [
                            {
                                label: "Anullo",
                                onClick: () => {
                                    handleResetFromParent();
                                },
                                type: "reset",
                                color: "secondary",
                                variant: "contained",
                                sx: {
                                    border: "1px solid #000",
                                    bgcolor: "#ff5252",
                                    fontSize: "15px",
                                    fontWeight: "700",
                                },
                                icon: <ClearAllIcon />,
                            },
                        ],
                    },
                    {
                        fields: [
                            {
                                name: "dataSkadence",
                                label: "Data e skandences",
                                variant: "filled",
                                type: "date",
                                sx: { gridColumn: "span 2" },
                            },
                            {
                                name: "dataFituar",
                                label: "Data e fituar",
                                variant: "filled",
                                type: "date",
                                sx: { gridColumn: "span 2" },
                            },
                        ],
                        validationSchema: userCertificateSchema,
                        title: "Edito certifikaten tende",
                        actions: [
                            {
                                label: "Anullo",
                                onClick: () => {
                                    handleResetFromParent();
                                },
                                type: "reset",
                                color: "secondary",
                                variant: "contained",
                                sx: {
                                    border: "1px solid #000",
                                    bgcolor: "#ff5252",
                                    fontSize: "15px",
                                    fontWeight: "700",
                                },
                                icon: <ClearAllIcon />,
                            },
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
                                icon: <SaveAsIcon />,
                            },
                        ],
                    },
                ],
                onSave: async (values: any) => {
                    const payload1: ICertification = {
                        certEmri: values.certEmri,
                        certPershkrim: values.certPershkrim,
                    };
                    const response1 = await certificatesController.editCertificate(values.certId, payload1);
                    const payload2 = {
                        dataFituar: values.dataFituar,
                        dataSkadence: values.dataSkadence,
                    };
                    const response2 = await certificatesController.editUserCertificate(
                        values.certId,
                        userDetailsLoggedIn?.userId,
                        payload2,
                    );

                    if (response1 && response2) {
                        toast.success("Ruajtja e ndryshimeve me sukses !");
                        const user = await usersController.getUser(userDetailsLoggedIn?.userId);
                        setUserDetailsLoggedIn(user);
                        setUserProfile(user);
                    }
                },
                onDataChange: (values: any) => {
                    handleDataChange(values);
                },
            });
        },
        [userProfile],
    );

    const handleEditSkill = useCallback(
        (skill: any) => {
            openRightPanel({
                formRef: formikRef,
                initialValues: {
                    aftesiId: skill.aftesi.aftesiId,
                    llojiAftesise: skill.aftesi.llojiAftesise,
                    dataPerfitimit: skill.dataPerfimit,
                },
                steps: [
                    {
                        fields: [
                            {
                                name: "llojiAftesise",
                                label: "Lloji i aftesise",
                                variant: "filled",
                                type: "text",
                                sx: { gridColumn: "span 2" },
                            },
                        ],
                        validationSchema: skillSchema,
                        title: "Edito aftesine",
                        actions: [
                            {
                                label: "Anullo",
                                onClick: () => {
                                    handleResetFromParent();
                                },
                                type: "reset",
                                color: "secondary",
                                variant: "contained",
                                sx: {
                                    border: "1px solid #000",
                                    bgcolor: "#ff5252",
                                    fontSize: "15px",
                                    fontWeight: "700",
                                },
                                icon: <ClearAllIcon />,
                            },
                        ],
                    },
                    {
                        fields: [
                            {
                                name: "dataPerfitimit",
                                label: "Data e perfitimit",
                                variant: "filled",
                                type: "date",
                                sx: { gridColumn: "span 2" },
                            },
                        ],
                        validationSchema: userSkillSchema,
                        title: "Edito aftesine tende",
                        actions: [
                            {
                                label: "Anullo",
                                onClick: () => {
                                    handleResetFromParent();
                                },
                                type: "reset",
                                color: "secondary",
                                variant: "contained",
                                sx: {
                                    border: "1px solid #000",
                                    bgcolor: "#ff5252",
                                    fontSize: "15px",
                                    fontWeight: "700",
                                },
                                icon: <ClearAllIcon />,
                            },
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
                                icon: <SaveAsIcon />,
                            },
                        ],
                    },
                ],
                onSave: async (values: any) => {
                    const payload1: ISkill = {
                        llojiAftesise: values.llojiAftesise,
                    };
                    const response1 = await skillsController.editSkill(values.aftesiId, payload1);
                    const payload2 = {
                        dataPerfitimit: values.dataPerfitimit,
                    };
                    const response2 = await skillsController.editUserSkill(
                        values.aftesiId,
                        userDetailsLoggedIn?.userId,
                        payload2,
                    );
                    if (response1 && response2) {
                        toast.success("Ruajtja e ndryshimeve me sukses !");
                        const user = await usersController.getUser(userDetailsLoggedIn?.userId);
                        setUserDetailsLoggedIn(user);
                        setUserProfile(user);
                    } else {
                        toast.error("Rujtja nuk e realizua !");
                    }
                },
                onDataChange: (values: any) => {
                    handleDataChange(values);
                },
            });
        },
        [userProfile],
    );

    const handleEditWork = useCallback(
        (work: any) => {
            openRightPanel({
                formRef: formikRef,
                initialValues: {
                    ppId: work.pp.ppId,
                    ppemri: work.pp.ppemri,
                    dataFillim: work.dataFillim,
                    dataMbarim: work.dataMbarim,
                    pppozicion: work.pppozicion,
                    konfidencialiteti: work.konfidencialiteti,
                    pershkrimiPunes: work.pershkrimiPunes,
                },
                steps: [
                    {
                        fields: [
                            {
                                name: "ppemri",
                                label: "Emri",
                                variant: "filled",
                                type: "text",
                                sx: { gridColumn: "span 2" },
                            },
                        ],
                        validationSchema: workSchema,
                        title: "Edito pervojen e punes",
                        actions: [
                            {
                                label: "Anullo",
                                onClick: () => {
                                    handleResetFromParent();
                                },
                                type: "reset",
                                color: "secondary",
                                variant: "contained",
                                sx: {
                                    border: "1px solid #000",
                                    bgcolor: "#ff5252",
                                    fontSize: "15px",
                                    fontWeight: "700",
                                },
                                icon: <ClearAllIcon />,
                            },
                        ],
                    },
                    {
                        fields: [
                            {
                                name: "dataFillim",
                                label: "Emri",
                                variant: "filled",
                                type: "date",
                                sx: { gridColumn: "span 2" },
                            },
                            {
                                name: "dataMbarim",
                                label: "Emri",
                                variant: "filled",
                                type: "date",
                                sx: { gridColumn: "span 2" },
                            },
                            {
                                name: "pppozicion",
                                label: "Pozicioni i punes",
                                variant: "filled",
                                type: "text",
                                sx: { gridColumn: "span 2" },
                            },
                            {
                                name: "konfidencialiteti",
                                label: "Konfidencialiteti",
                                variant: "filled",
                                type: "text",
                                sx: { gridColumn: "span 2" },
                            },
                            {
                                name: "pershkrimiPunes",
                                label: "Pershkrimi i punes",
                                variant: "filled",
                                type: "text",
                                sx: { gridColumn: "span 2" },
                            },
                        ],
                        validationSchema: userWorkEsperienceSchema,
                        title: "Edito pervojen e punes tende",
                        actions: [
                            {
                                label: "Anullo",
                                onClick: () => {
                                    handleResetFromParent();
                                },
                                type: "reset",
                                color: "secondary",
                                variant: "contained",
                                sx: {
                                    border: "1px solid #000",
                                    bgcolor: "#ff5252",
                                    fontSize: "15px",
                                    fontWeight: "700",
                                },
                                icon: <ClearAllIcon />,
                            },
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
                                icon: <SaveAsIcon />,
                            },
                        ],
                    },
                ],
                onSave: async (values: any) => {
                    const payload1: IWorkExperience = {
                        ppemri: values.ppemri,
                    };
                    const response1 = await workExperiencesController.editWorkExperience(values.ppId, payload1);
                    const payload2 = {
                        ppemri: values.ppemri,
                        dataFillim: values.dataFillim,
                        dataMbarim: values.dataMbarim,
                        pppozicion: values.pppozicion,
                        konfidencialiteti: values.konfidencialiteti,
                        pershkrimiPunes: values.pershkrimiPunes,
                    };
                    const response2 = await workExperiencesController.editUserWorkExperience(
                        values.ppId,
                        userDetailsLoggedIn?.userId,
                        payload2,
                    );
                    if (response1 && response2) {
                        toast.success("Ruajtja e ndryshimeve me sukses !");
                        const user = await usersController.getUser(userDetailsLoggedIn?.userId);
                        setUserDetailsLoggedIn(user);
                        setUserProfile(user);
                    } else {
                        toast.error("Rujtja nuk e realizua !");
                    }
                },
                onDataChange: (values: any) => {
                    handleDataChange(values);
                },
            });
        },
        [userProfile],
    );

    const handleEditEducation = useCallback(
        (education: any) => {
            openRightPanel({
                formRef: formikRef,
                initialValues: {
                    eduId: education.edu.eduId,
                    eduName: education.edu.eduName,
                    mesatarja: education.mesatarja,
                    dataFillim: education.dataFillim,
                    dataMbarim: education.dataMbarim,
                    llojiMaster: education.llojiMaster,
                },
                steps: [
                    {
                        fields: [
                            {
                                name: "eduName",
                                label: "Emri",
                                variant: "filled",
                                type: "text",
                                sx: { gridColumn: "span 2" },
                            },
                        ],
                        validationSchema: educationSchema,
                        title: "Edito edukimin",
                        actions: [
                            {
                                label: "Anullo",
                                onClick: () => {
                                    handleResetFromParent();
                                },
                                type: "reset",
                                color: "secondary",
                                variant: "contained",
                                sx: {
                                    border: "1px solid #000",
                                    bgcolor: "#ff5252",
                                    fontSize: "15px",
                                    fontWeight: "700",
                                },
                                icon: <ClearAllIcon />,
                            },
                        ],
                    },
                    {
                        fields: [
                            {
                                name: "mesatarja",
                                label: "Mesatarja",
                                variant: "filled",
                                type: "text",
                                sx: { gridColumn: "span 2" },
                            },
                            {
                                name: "dataFillim",
                                label: "Data e fillimit",
                                variant: "filled",
                                type: "date",
                                sx: { gridColumn: "span 2" },
                            },
                            {
                                name: "dataMbarim",
                                label: "Data e mbarimit",
                                variant: "filled",
                                type: "date",
                                sx: { gridColumn: "span 2" },
                            },
                            {
                                name: "llojiMaster",
                                label: "Lloji i masterit",
                                variant: "filled",
                                type: "text",
                                sx: { gridColumn: "span 2" },
                            },
                        ],
                        validationSchema: userEducationSchema,
                        title: "Edito edukimin tend",
                        actions: [
                            {
                                label: "Anullo",
                                onClick: () => {
                                    handleResetFromParent();
                                },
                                type: "reset",
                                color: "secondary",
                                variant: "contained",
                                sx: {
                                    border: "1px solid #000",
                                    bgcolor: "#ff5252",
                                    fontSize: "15px",
                                    fontWeight: "700",
                                },
                                icon: <ClearAllIcon />,
                            },
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
                                icon: <SaveAsIcon />,
                            },
                        ],
                    },
                ],
                onSave: async (values: any) => {
                    const payload1: IEducation = {
                        eduName: values.eduName,
                    };
                    const response1 = await educationsController.editEducation(values.eduId, payload1);
                    const payload2 = {
                        eduName: values.eduName,
                        mesatarja: values.mesatarja,
                        dataFillim: values.dataFillim,
                        dataMbarim: values.dataMbarim,
                        llojiMaster: values.llojiMaster,
                    };
                    const response2 = await educationsController.editUserEducation(
                        values.eduId,
                        userDetailsLoggedIn?.userId,
                        payload2,
                    );

                    if (response1 && response2) {
                        toast.success("Ruajtja e ndryshimeve me sukses !");
                        const user = await usersController.getUser(userDetailsLoggedIn?.userId);
                        setUserDetailsLoggedIn(user);
                        setUserProfile(user);
                    } else {
                        toast.error("Rujtja nuk e realizua !");
                    }
                },
                onDataChange: (values: any) => {
                    handleDataChange(values);
                },
            });
        },
        [userProfile],
    );
    // #endregion

    // #region HandleDelete
    const handleDeleteEducation = useCallback(
        (education: any) => {
            openModal({
                formRef: formikRef,
                onClose: () => setOpen(false),
                title: "Eleminimi i Edukimit",
                actions: [
                    {
                        label: "Anullo",
                        onClick: () => handleClose(),
                        type: "reset",
                        color: "secondary",
                        variant: "contained",
                        sx: {
                            border: "1px solid #000",
                            bgcolor: "#ff5252",
                            fontSize: "15px",
                            fontWeight: "700",
                        },
                        icon: <ClearAllIcon />,
                    },
                    {
                        label: "Elemino",
                        // onClick: async () => {
                        //     const response2 =
                        //         await educationsController.deleteUserEducation(
                        //             userDetailsLoggedIn?.userId,
                        //             education.edu.eduId,
                        //         );
                        //     const response1 =
                        //         await educationsController.deleteEducation(
                        //             education.edu.eduId,
                        //         );

                        //     if (response1 && response2) {
                        //         handleClose();
                        //     }
                        // },
                        type: "submit",
                        color: "secondary",
                        variant: "contained",
                        sx: {
                            border: "1px solid #000",
                            bgcolor: "#30969f",
                            fontSize: "15px",
                            fontWeight: "700",
                        },
                        icon: <SaveAsIcon />,
                    },
                ],
                subTitle: "Deshironi ta eleminoni ?",
            });
        },
        [userProfile],
    );

    const handleDeleteCertificate = useCallback(
        (certificate: any) => {
            openModal({
                formRef: formikRef,
                onClose: () => setOpen(false),
                title: "Eleminimi i Certifikates",
                actions: [
                    {
                        label: "Anullo",
                        onClick: () => handleClose(),
                        type: "close",
                        color: "secondary",
                        variant: "contained",
                        sx: {
                            border: "1px solid #000",
                            bgcolor: "#ff5252",
                            fontSize: "15px",
                            fontWeight: "700",
                        },
                        icon: <ClearAllIcon />,
                    },
                    {
                        label: "Elemino",
                        type: "delete",
                        // onClick: async () => {
                        //     const response2 =
                        //         await certificatesController.deleteUserCertificate(
                        //             userDetailsLoggedIn?.userId,
                        //             certificate.cert.certId,
                        //         );
                        //     const response1 =
                        //         await certificatesController.deleteCertificate(
                        //             certificate.cert.certId,
                        //         );

                        //     if (response1 && response2) {
                        //         handleClose();
                        //     }
                        // },
                        color: "secondary",
                        variant: "contained",
                        sx: {
                            border: "1px solid #000",
                            bgcolor: "#30969f",
                            fontSize: "15px",
                            fontWeight: "700",
                        },
                        icon: <SaveAsIcon />,
                    },
                ],
                subTitle: "Deshironi ta eleminoni ?",
            });
        },
        [userProfile],
    );

    const handleDeleteWork = useCallback(
        (work: any) => {
            openModal({
                formRef: formikRef,
                onClose: () => setOpen(false),
                title: "Eleminimi i punes",
                actions: [
                    {
                        label: "Anullo",
                        onClick: () => handleClose(),
                        type: "close",
                        color: "secondary",
                        variant: "contained",
                        sx: {
                            border: "1px solid #000",
                            bgcolor: "#ff5252",
                            fontSize: "15px",
                            fontWeight: "700",
                        },
                        icon: <ClearAllIcon />,
                    },
                    {
                        label: "Elemino",
                        type: "delete",
                        // onClick: async () => {
                        //     const response =
                        //         await workExperiencesController.deleteUserWorkExperience(
                        //             userDetailsLoggedIn?.userId,
                        //             work.pp.ppId,
                        //         );

                        //     if (response) {
                        //         handleClose();
                        //     }
                        // },
                        color: "secondary",
                        variant: "contained",
                        sx: {
                            border: "1px solid #000",
                            bgcolor: "#30969f",
                            fontSize: "15px",
                            fontWeight: "700",
                        },
                        icon: <SaveAsIcon />,
                    },
                ],
                subTitle: "Deshironi ta eleminoni ?",
            });
        },
        [userProfile],
    );

    const handleDeleteSkill = useCallback(
        (skill: any) => {
            openModal({
                formRef: formikRef,
                onClose: () => setOpen(false),
                title: "Eleminimi i Aftesise",
                actions: [
                    {
                        label: "Anullo",
                        onClick: () => handleClose(),
                        type: "close",
                        color: "secondary",
                        variant: "contained",
                        sx: {
                            border: "1px solid #000",
                            bgcolor: "#ff5252",
                            fontSize: "15px",
                            fontWeight: "700",
                        },
                        icon: <ClearAllIcon />,
                    },
                    {
                        label: "Elemino",
                        type: "delete",
                        // onClick: async () => {
                        //     const response1 =
                        //         await skillsController.deleteUserSkill(
                        //             userDetailsLoggedIn?.userId,
                        //             skill.aftesi.aftesiId,
                        //         );
                        //     const response2 = await skillsController.deleteSkill(
                        //         skill.aftesi.aftesiId,
                        //     );

                        //     if (response1 && response2) {
                        //         handleClose();
                        //     }
                        // },
                        color: "secondary",
                        variant: "contained",
                        sx: {
                            border: "1px solid #000",
                            bgcolor: "#30969f",
                            fontSize: "15px",
                            fontWeight: "700",
                        },
                        icon: <SaveAsIcon />,
                    },
                ],
                subTitle: "Deshironi ta eleminoni ?",
            });
        },
        [userProfile],
    );
    // #endregion

    useEffect(() => {
        if (location.state?.userId) {
            async function fetchUserDetails() {
                try {
                    const user = await usersController.getUser(location.state?.userId);

                    if (user) {
                        setUserProfile(user);
                    }
                } catch (error) {
                    console.error("Failed to fetch user:", error);
                }
            }

            fetchUserDetails();
        } else {
            setUserProfile(userDetailsLoggedIn);
        }
    }, [location.state?.userId]);

    return (
        <>
            <ProfileHeader userProfile={userProfile} handleEditProfile={handleEditProfile} />
            <div>
                <Tabs value={value} onChange={handleChange} variant="fullWidth" textColor="primary" orientation="horizontal">
                    <Tab
                        label="Certifikatat"
                        style={{ backgroundColor: colors.redAccent[400], color: colors.primary[100], fontWeight: "700" }}
                        disableRipple={true}
                        disableFocusRipple={true}
                    />
                    <Tab
                        label="Edukimet"
                        style={{ backgroundColor: colors.redAccent[400], color: colors.primary[100], fontWeight: "700" }}
                        disableRipple={true}
                        disableFocusRipple={true}
                    />
                    <Tab
                        label="Projektet"
                        style={{ backgroundColor: colors.redAccent[400], color: colors.primary[100], fontWeight: "700" }}
                        disableRipple={true}
                        disableFocusRipple={true}
                    />
                    <Tab
                        label="Aftesite"
                        style={{ backgroundColor: colors.redAccent[400], color: colors.primary[100], fontWeight: "700" }}
                        disableRipple={true}
                        disableFocusRipple={true}
                    />
                    <Tab
                        label="Pervoja e punes"
                        style={{ backgroundColor: colors.redAccent[400], color: colors.primary[100], fontWeight: "700" }}
                        disableRipple={true}
                        disableFocusRipple={true}
                    />
                </Tabs>
                <ProfileTabsPanels
                    value={value}
                    userProfile={userProfile}
                    handleCreateCertificate={handleCreateCertificate}
                    handleEditCertificate={handleEditCertificate}
                    handleDeleteCertificate={handleDeleteCertificate}
                    handleCreateSkill={handleCreateSkill}
                    handleEditSkill={handleEditSkill}
                    handleDeleteSkill={handleDeleteSkill}
                    handleCreateWork={handleCreateWork}
                    handleEditWork={handleEditWork}
                    handleDeleteWork={handleDeleteWork}
                    handleCreateEducation={handleCreateEducation}
                    handleEditEducation={handleEditEducation}
                    handleDeleteEducation={handleDeleteEducation}
                />
            </div>
        </>
    );
}
