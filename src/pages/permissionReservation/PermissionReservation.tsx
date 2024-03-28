import { useEffect, useRef, useState } from "react";
import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import { FormikProps } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { tokens } from "~/utils/theme";
import Header from "~/components/header/Header";
import permissionsController from "~/services/api/permissions";
import { useModal } from "~/services/providers/ModalContext";
import IPermission from "~/interfaces/IPermission";
import { useStore } from "~/services/store/store";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

const permissionReservation = () => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const [calendarEvents, setCalendarEvents] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [permissions, setPermissions] = useState<IPermission[]>([]);
    const [currentPermissions, setCurrentPermissions] = useState([]);
    const theme = useTheme();
    const formikRef = useRef<FormikProps<any>>(null);
    const navigate = useNavigate();
    const { openModal } = useModal();
    const { user } = useStore();
    const colors = tokens(theme.palette.mode);

    const handleDataChange = (values: any) => {
        setFormData(values);
    };

    const handleResetFromParent = () => {
        formikRef.current?.resetForm();
    };

    const handleClose = () => {
        setOpen(false);
    };

    function formatDate(date: any) {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    const handleSave = async () => {
        const response = await permissionsController.askPermission(formData, user?.userId);

        if (response) {
            toast.success("Rezervimi i lejes u krijua me sukses !");
            navigate("/users");
        } else {
            toast.error("Rezervimi i lejes nuk u krijua !");
        }

        handleClose();
    };

    const handleUpdate = async (lejeId: any) => {
        const response = await permissionsController.updatePermission(lejeId, formData);

        if (response) {
            toast.success("Rezervimi i lejes u ndryshua me sukses !");
            navigate("/users");
        } else {
            toast.error("Rezervimi i lejes nuk u ndryshua !");
        }

        handleClose();
    };

    const handleDateClick = (selected: any) => {
        openModal({
            formRef: formikRef,
            onClose: () => setOpen(false),
            initialValues: {
                dataFillim: selected.startStr,
                dataMbarim: selected.endStr,
                tipiLeje: "",
            },
            fields: [
                { name: "dataFillim", label: "Data e fillimit", type: "date" },
                { name: "dataMbarim", label: "Data e mbarimit", type: "date" },
                {
                    name: "tipiLeje",
                    label: "Pershkrimi i lejes",
                    type: "text",
                },
            ],
            validationSchema: Yup.object({
                dataFillim: Yup.string().required("Required"),
                dataMbarim: Yup.string().required("Required"),
                tipiLeje: Yup.string().required("Required"),
            }),
            onSave: () => {
                handleSave();
            },
            title: "Rezervo leje",
            actions: [
                {
                    label: "Anullo",
                    onClick: () => handleResetFromParent(),
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
            onDataChange: (values: any) => handleDataChange(values),
            subTitle: "Plotesoni detajet e lejes",
        });

        const calendarApi = selected.view.calendar;
        calendarApi.unselect();
    };

    const handleEventClick = (selected: any) => {
        openModal({
            formRef: formikRef,
            onClose: () => setOpen(false),
            initialValues: {
                dataFillim: formatDate(selected.event.startStr),
                dataMbarim: formatDate(selected.event.endStr),
                tipiLeje: selected.event.title,
            },
            fields: [
                { name: "dataFillim", label: "Data e fillimit", type: "date" },
                { name: "dataMbarim", label: "Data e mbarimit", type: "date" },
                {
                    name: "tipiLeje",
                    label: "Pershkrimi i lejes",
                    type: "text",
                },
            ],
            validationSchema: Yup.object({
                dataFillim: Yup.string().required("Required"),
                dataMbarim: Yup.string().required("Required"),
                tipiLeje: Yup.string().required("Required"),
            }),
            onSave: (values: any) => {
                handleSave();
            },
            title: "Detajet e lejes",
            actions: [
                {
                    label: "Elemino",
                    onClick: async () => {
                        openModal({
                            onClose: () => setOpen(false),
                            title: "Elemino",
                            actions: [
                                {
                                    label: "Po",
                                    onClick: async () => {
                                        const response = await permissionsController.deletePermission(selected.event.id);
                                        if (response === "") {
                                            toast.success("Elemini u krye me sukses !");
                                            navigate("/projects");
                                        } else {
                                            toast.error("Eleminimi nuk u realizua !");
                                        }
                                    },
                                    color: "secondary",
                                    variant: "contained",
                                    sx: {
                                        border: "1px solid #000",
                                        bgcolor: "#30969f",
                                        fontSize: "15px",
                                        fontWeight: "700",
                                    },
                                },
                                {
                                    label: "Jo",
                                    onClick: () => setOpen(false),
                                    type: "reset",
                                    color: "secondary",
                                    variant: "contained",
                                    sx: {
                                        border: "1px solid #000",
                                        bgcolor: "#ff5252",
                                        fontSize: "15px",
                                        fontWeight: "700",
                                    },
                                },
                            ],
                            subTitle: "Deshironi ta fshini ?",
                        });
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
                    onClick: () => handleResetFromParent(),
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
                    onClick: () => {
                        handleUpdate(selected.event.id);
                    },
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
            onDataChange: (values: any) => handleDataChange(values),
            subTitle: "Ndryshoni detajet e lejes",
        });

        const calendarApi = selected.view.calendar;
        calendarApi.unselect();
    };

    async function getPermissions(): Promise<void> {
        const response: IPermission[] = await permissionsController.getAllPermissions();
        const filteredPermissions = response.filter((permission) => permission.aprovuar === 1);
        const convertedEvents = filteredPermissions.map((permission) => ({
            id: permission.lejeId?.toString(),
            title: permission.tipiLeje,
            start: permission.dataFillim,
            end: permission.dataMbarim,
            allDay: true,
        }));

        setCalendarEvents(convertedEvents);
        setPermissions(response);
    }

    useEffect(() => {
        async function fetchData() {
            await getPermissions();
            setLoading(false);
        }

        fetchData();
    }, []);

    if (loading) return <CircularProgress />;

    return (
        <Box m="20px">
            <Header title="Rezervimi i lejeve" subtitle="Marrja e lejeve per punonjesit" />
            <Box display="flex" justifyContent="space-between">
                <Box flex="1 1 15%" sx={{ backgroundColor: colors.primary[400] }} p="15px" borderRadius="4px">
                    <Typography variant="h5">Legjenda</Typography>
                </Box>
                <Box flex="1 1 100%" ml="15px">
                    <FullCalendar
                        height="75vh"
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: "dayGridMonth",
                        }}
                        initialView="dayGridMonth"
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        weekends={true}
                        select={handleDateClick}
                        eventClick={handleEventClick}
                        eventsSet={(events: any) => setCurrentPermissions(events)}
                        events={calendarEvents}
                        allDaySlot={true}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default permissionReservation;
