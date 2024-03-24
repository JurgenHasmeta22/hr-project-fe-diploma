import React, { useEffect, useState } from "react";
import {
    Button,
    Grid,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Drawer,
    Box,
    Typography,
    Step,
    StepLabel,
    Stepper,
    StepButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemButton,
    useTheme,
    Avatar,
} from "@mui/material";
import { Formik, Form, Field, FormikProps } from "formik";
import { useNavigate } from "react-router";
import { tokens } from "~/utils/theme";
import { useStore } from "~/store/zustand/store";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

type FieldConfig = {
    name: string;
    label: string;
    type?: string;
    options?: Array<{ label: string; value: any }>;
    variant?: any;
    disabled?: boolean;
    sx: {
        gridColumn: string;
    };
};

type DrawerProps = {
    onClose?: () => void;
    onSave?: (values: any) => void;
    onDataChange?: (values: any) => void;
    initialValues?: any;
    fields?: FieldConfig[];
    validationSchema?: any;
    title?: string;
    actions?: ActionConfig[];
    formRef?: React.Ref<FormikProps<any>>;
    subTitle?: string;
    steps?: StepConfig[];
    isSidebar?: boolean;
    sidebarItems?: any[];
};

type ActionConfig = {
    onClick: () => void;
    label: string;
    type?: string;
    color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | "default";
    variant?: "text" | "outlined" | "contained";
    icon?: React.ReactNode;
    sx?: any;
};

type StepConfig = {
    title: string;
    fields: FieldConfig[];
    validationSchema: any;
    actions?: ActionConfig[];
};

const RightPanel: React.FC<DrawerProps> = ({
    onClose,
    initialValues,
    fields,
    validationSchema,
    onSave,
    title,
    actions,
    formRef,
    onDataChange,
    subTitle,
    steps,
    isSidebar,
    sidebarItems,
}) => {
    const [activeStep, setActiveStep] = useState(0);
    const [openSidebar, setOpenSidebar] = useState(true);
    const [selected, setSelected] = useState(isSidebar ? "Dashboard" : null);
    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { userDetailsLoggedIn } = useStore();

    const handleItemClick = (title: string, to: string) => {
        setSelected(title);
        navigate(to);
        onClose && onClose();
    };

    const isLastStep = () => activeStep === (steps ? steps.length - 1 : 0);

    const handleNext = () => {
        setActiveStep((prevActiveStep: any) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep: any) => prevActiveStep - 1);
    };

    const handleStep = (step: any) => () => {
        setActiveStep(step);
    };

    return (
        <Drawer
            variant={isSidebar ? "permanent" : "temporary"}
            anchor={isSidebar ? "left" : "right"}
            open={isSidebar ? openSidebar : true}
            onClose={onClose}
        >
            <Box
                sx={{
                    width: isSidebar ? 250 : 500,
                    p: 3,
                    backgroundColor: isSidebar ? `${colors.primary[400]} !important` : "",
                    height: "100%",
                }}
            >
                <Box display="flex" alignItems="center" mb={3} ml={3}>
                    <Avatar>
                        <AccountCircleIcon />
                    </Avatar>
                    <Box ml={2}>
                        <Typography variant="subtitle1">
                            {userDetailsLoggedIn && `${userDetailsLoggedIn?.userFirstname} ${userDetailsLoggedIn?.userLastname}`}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {userDetailsLoggedIn && `@${userDetailsLoggedIn?.userName}`}
                        </Typography>
                    </Box>
                </Box>
                {/* <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    {title && <Typography variant="h6">{title}</Typography>}
                    <IconButton onClick={() => (!isSidebar ? onClose && onClose() : setOpenSidebar(false))}>
                        <CloseIcon color="action" />
                    </IconButton>
                </Box> */}
                {subTitle && (
                    <Typography variant="subtitle1" color="textSecondary" mb={3}>
                        {subTitle}
                    </Typography>
                )}
                {steps && (
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((stepConfig, index) => (
                            <Step key={stepConfig.title}>
                                <StepButton onClick={handleStep(index)}>
                                    <StepLabel>{stepConfig.title}</StepLabel>
                                </StepButton>
                            </Step>
                        ))}
                    </Stepper>
                )}
                {isSidebar ? (
                    <List>
                        {sidebarItems?.map((item) => (
                            <ListItem key={item.name} onClick={() => handleItemClick(item.label, item.to)}>
                                <ListItemButton>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.label} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Formik
                        initialValues={initialValues}
                        validationSchema={steps ? steps[activeStep].validationSchema : validationSchema}
                        onSubmit={(values: any) => {
                            if (isLastStep()) {
                                onSave && onSave(values);
                                onClose && onClose();
                            } else {
                                handleNext();
                            }
                        }}
                        innerRef={formRef}
                    >
                        {({ errors, touched, values }: any) => {
                            useEffect(() => {
                                onDataChange && onDataChange(values);
                            }, [values]);

                            return (
                                <Form>
                                    <Grid container spacing={3} mt={3}>
                                        {(steps! ? steps[activeStep].fields : fields!).map((field) => (
                                            <Grid item xs={6} key={field.name}>
                                                {field.type === "select" ? (
                                                    <FormControl fullWidth size="medium">
                                                        <InputLabel id={`${field.name}-label`}>{field.label}</InputLabel>
                                                        <Field name={field.name} labelId={`${field.name}-label`} as={Select}>
                                                            {field.options?.map((option) => (
                                                                <MenuItem key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </MenuItem>
                                                            ))}
                                                        </Field>
                                                    </FormControl>
                                                ) : (
                                                    <Field
                                                        as={TextField}
                                                        name={field.name}
                                                        label={field.label}
                                                        fullWidth
                                                        size="medium"
                                                        type={field.type || "text"}
                                                        helperText={touched[field.name] && errors[field.name]}
                                                        error={touched[field.name] && !!errors[field.name]}
                                                        InputLabelProps={field.type === "date" ? { shrink: true } : undefined}
                                                    />
                                                )}
                                            </Grid>
                                        ))}
                                    </Grid>
                                    <Box mt={3} display={"flex"} gap={"10px"} justifyContent={"end"}>
                                        {(steps ? steps[activeStep].actions! : actions!).map((action, index) => (
                                            <Button
                                                key={index}
                                                onClick={action.onClick}
                                                // @ts-ignore
                                                color={action.color || "default"}
                                                variant={action.variant || "text"}
                                                sx={action.sx}
                                                type={action.type}
                                                endIcon={action.icon}
                                            >
                                                {action.label}
                                            </Button>
                                        ))}
                                    </Box>
                                    {steps && (
                                        <Box mt={3} display="flex" justifyContent="space-between">
                                            <Button
                                                disabled={activeStep === 0}
                                                onClick={handleBack}
                                                variant="contained"
                                                color="secondary"
                                            >
                                                Mbrapa
                                            </Button>
                                            {!isLastStep() && (
                                                <Button variant="contained" color="primary" type="submit">
                                                    Tjetra
                                                </Button>
                                            )}
                                        </Box>
                                    )}
                                </Form>
                            );
                        }}
                    </Formik>
                )}
            </Box>
        </Drawer>
    );
};

export default RightPanel;
