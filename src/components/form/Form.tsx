import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

type FieldOption = {
    label: string;
    value: string;
};

type FieldConfig = {
    name: string;
    label: string;
    type: "text" | "select" | "multiselect" | "date" | "password";
    options?: FieldOption[];
    disabled?: boolean;
};

type FormProps = {
    initialValues: any;
    validationSchema: yup.ObjectSchema<any>;
    fields: FieldConfig[];
    formRef?: React.RefObject<any>;
    actions?: ActionConfig[];
    onDataChange?: (values: any) => void;
    onSubmit: (values: any) => void;
};

type ActionConfig = {
    label: string;
    color?: string;
    onClick?: () => void;
};

const FormAdvanced: React.FC<FormProps> = ({
    initialValues,
    onSubmit,
    validationSchema,
    fields,
    formRef,
    actions,
    onDataChange,
}) => {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
        enableReinitialize: true,
        innerRef: formRef,
    });

    useEffect(() => {
        onDataChange && onDataChange(formik.values);
    }, [formik.values, onDataChange]);

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
                {fields.map((field: FieldConfig) => (
                    <div key={field.name}>
                        <label htmlFor={field.name} className="block text-sm font-medium text-gray-100">
                            {field.label}
                        </label>
                        {field.type === "select" || field.type === "multiselect" ? (
                            <select
                                id={field.name}
                                name={field.name}
                                value={formik.values[field.name]}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                multiple={field.type === "multiselect"}
                                className="mt-1 block w-full text-gray-700 pl-3 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm"
                            >
                                {field.options?.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type={field.type === "password" ? "password" : "text"}
                                id={field.name}
                                name={field.name}
                                value={formik.values[field.name]}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                disabled={field.disabled}
                                className="mt-1 block w-full h-10 pl-3 text-gray-700 bg-stone-100 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm"
                            />
                        )}
                        {formik.touched[field.name] && formik.errors[field.name] && (
                            <p className="mt-2 text-sm text-red-500" id={`${field.name}-error`}>
                                {/* @ts-ignore */}
                                {formik.errors[field.name]}
                            </p>
                        )}
                    </div>
                ))}
            </div>
            {actions && actions.length > 0 && (
                <div className="flex justify-center mt-6">
                    {actions.map((action: ActionConfig, index: number) => (
                        <button
                            key={index}
                            type="button"
                            onClick={action.onClick}
                            className={`mr-2 px-4 py-2 text-sm font-medium rounded-md bg-cyan-500 ${
                                action.color
                                    ? "text-white bg-" + action.color + "-600 hover:bg-" + action.color + "-700"
                                    : "text-gray-700 bg-gray-200 hover:bg-gray-300"
                            }`}
                        >
                            {action.label}
                        </button>
                    ))}
                </div>
            )}
        </form>
    );
};

export default FormAdvanced;
