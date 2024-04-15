import React, { useEffect } from "react";
import { Formik, FormikProps } from "formik";

type FieldConfig = {
    name: string;
    label: string;
    type?: string;
    options?: Array<{ label: string; value: any }>;
};

type ModalProps = {
    open: boolean;
    initialValues?: any;
    fields?: FieldConfig[];
    validationSchema?: any;
    title: string;
    actions?: ActionConfig[];
    formRef?: React.Ref<FormikProps<any>>;
    subTitle?: string;
    onClose?: () => void;
    onDataChange?: (values: any) => void;
    onSave?: (values: any) => void;
};

type ActionConfig = {
    label: string;
    type?: any;
    color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | "default";
    variant?: "text" | "outlined" | "contained";
    icon?: React.ReactNode;
    sx?: any;
    onClick: () => void;
};

const Modal: React.FC<ModalProps> = ({
    open,
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
}) => {
    return (
        <div className={`fixed z-10 inset-0 overflow-y-auto ${open ? "block" : "hidden"}`}>
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-white w-full md:max-w-md mx-auto rounded shadow-lg">
                    <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200">
                        <h2 className="text-lg font-semibold">{title}</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="p-4">
                        {subTitle && <p className="text-sm text-gray-600">{subTitle}</p>}
                        {validationSchema && initialValues && onDataChange ? (
                            <Formik
                                initialValues={initialValues ? initialValues : {}}
                                validationSchema={validationSchema ? validationSchema : {}}
                                onSubmit={(values) => {
                                    if (onSave) {
                                        onSave(values);
                                    }
                                    if (onClose) {
                                        onClose();
                                    }
                                }}
                                innerRef={formRef ? formRef : null}
                            >
                                {({ errors, touched, values, handleSubmit, handleChange }) => {
                                    if (onDataChange) {
                                        useEffect(() => {
                                            onDataChange(values);
                                        }, [values]);
                                    }

                                    return (
                                        <form onSubmit={handleSubmit}>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                                {fields &&
                                                    fields!.map((field) => (
                                                        <div key={field.name}>
                                                            {field.type === "select" ? (
                                                                <div>
                                                                    <label
                                                                        htmlFor={`${field.name}`}
                                                                        className="block text-sm font-medium text-gray-700"
                                                                    >
                                                                        {field.label}
                                                                    </label>
                                                                    <select
                                                                        id={`${field.name}`}
                                                                        name={field.name}
                                                                        value={values[field.name]}
                                                                        onChange={handleChange}
                                                                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                                    >
                                                                        {field.options?.map((option) => (
                                                                            <option key={option.value} value={option.value}>
                                                                                {option.label}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                            ) : (
                                                                <div>
                                                                    <label
                                                                        htmlFor={`${field.name}`}
                                                                        className="block text-sm font-medium text-gray-700"
                                                                    >
                                                                        {field.label}
                                                                    </label>
                                                                    <input
                                                                        type={field.type || "text"}
                                                                        id={`${field.name}`}
                                                                        name={field.name}
                                                                        value={values[field.name]}
                                                                        onChange={handleChange}
                                                                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                                    />
                                                                    {touched[field.name] && errors[field.name] && (
                                                                        <p className="mt-2 text-sm text-red-500" id="email-error">
                                                                            {/* @ts-ignore */}
                                                                            {errors[field.name]}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                            </div>
                                            <div className="flex justify-end mt-4">
                                                {actions!.map((action, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={action.onClick}
                                                        className={`ml-2 px-4 py-2 text-sm font-medium rounded-md ${
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
                                        </form>
                                    );
                                }}
                            </Formik>
                        ) : (
                            <div className="flex justify-end mt-4">
                                {actions!.map((action, index) => (
                                    <button
                                        key={index}
                                        onClick={action.onClick}
                                        className={`ml-2 px-4 py-2 text-sm font-medium rounded-md ${
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
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
