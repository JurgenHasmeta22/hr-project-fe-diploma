import React, { useEffect, useState } from "react";
import { Formik, Form, Field, FormikProps } from "formik";

type FieldOption = {
    label: string;
    value: string;
};

type FieldConfig = {
    name: string;
    label: string;
    type?: "text" | "select" | "multiselect" | "date" | "password";
    options?: FieldOption[];
    variant?: any;
    disabled?: boolean;
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
};

type ActionConfig = {
    onClick: () => void;
    label: string;
    type?: any;
    color?: string;
    variant?: "text" | "outlined" | "contained";
    icon?: React.ReactNode;
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
    actions,
    formRef,
    onDataChange,
    subTitle,
    steps,
    title,
}) => {
    const [activeStep, setActiveStep] = useState(0);

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
        <div className="fixed right-0 top-0 bottom-0 w-96 bg-white p-6">
            <div className="flex justify-between items-center mb-4">
                {title && <h3 className="text-lg font-semibold">{title}</h3>}
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                    Close
                </button>
            </div>
            {subTitle && <p className="text-sm text-gray-600 mb-4">{subTitle}</p>}
            {steps && (
                <div className="mb-4">
                    {steps.map((stepConfig, index) => (
                        <div key={index}>
                            <button onClick={handleStep(index)} className="mr-2 px-2 py-1 rounded text-gray-600">
                                {stepConfig.title}
                            </button>
                        </div>
                    ))}
                </div>
            )}
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
                            <div className="grid grid-cols-2 gap-4">
                                {(steps ? steps[activeStep].fields : fields!).map((field) => (
                                    <div key={field.name}>
                                        {field.type === "select" ? (
                                            <div className="w-full">
                                                <label className="block text-sm font-medium text-gray-100" htmlFor={field.name}>
                                                    {field.label}
                                                </label>
                                                <Field name={field.name} as="select" className="mt-1 block w-full">
                                                    {field.options?.map((option) => (
                                                        <option key={option.value} value={option.value}>
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </Field>
                                            </div>
                                        ) : (
                                            <div className="w-full">
                                                <label className="block text-sm font-medium text-gray-700" htmlFor={field.name}>
                                                    {field.label}
                                                </label>
                                                <Field
                                                    as="input"
                                                    name={field.name}
                                                    type={field.type || "text"}
                                                    className="mt-1 block w-full"
                                                />
                                                {touched[field.name] && errors[field.name] && (
                                                    <p className="mt-2 text-sm text-red-500">{errors[field.name]}</p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-end mt-4 space-x-4">
                                {(steps ? steps[activeStep].actions! : actions!).map((action, index) => (
                                    <button
                                        key={index}
                                        onClick={action.onClick}
                                        className={`px-4 py-2 text-sm font-medium rounded-md ${
                                            action.color === "primary"
                                                ? "text-white bg-blue-600 hover:bg-blue-700"
                                                : "text-gray-700 bg-gray-200 hover:bg-gray-300"
                                        }`}
                                        type={action.type}
                                    >
                                        {action.label}
                                    </button>
                                ))}
                            </div>
                            {steps && (
                                <div className="flex justify-between mt-12">
                                    <button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className="px-4 py-2 text-sm font-medium rounded-md bg-gray-200 hover:bg-gray-300"
                                        type="button"
                                    >
                                        Back
                                    </button>
                                    {!isLastStep() && (
                                        <button
                                            type="submit"
                                            className="px-4 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700"
                                        >
                                            Next
                                        </button>
                                    )}
                                </div>
                            )}
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default RightPanel;
