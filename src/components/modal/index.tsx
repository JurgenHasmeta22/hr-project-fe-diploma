import React, { useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Formik, Form, Field, FormikProps } from 'formik';

type FieldConfig = {
  name: string;
  label: string;
  type?: string;
  options?: Array<{ label: string; value: any }>;
};

type ModalProps = {
  open: boolean;
  onClose: () => void;
  initialValues?: any;
  fields?: FieldConfig[];
  validationSchema?: any;
  onSave?: (values: any) => void;
  title: string;
  actions?: ActionConfig[];
  formRef?: React.Ref<FormikProps<any>>;
  onDataChange?: (values: any) => void;
  subTitle?: string;
};

type ActionConfig = {
  label: string;
  onClick: () => void;
  type?: string;
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
    | 'default';
  variant?: 'text' | 'outlined' | 'contained';
  icon?: React.ReactNode;
  sx?: any;
};

const Modal: React.FC<ModalProps> = ({
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
    <Dialog open={true} onClose={onClose} fullWidth>
      <DialogTitle fontSize={'26px'}>
        {title}
        <IconButton
          style={{ position: 'absolute', right: 0, top: 0 }}
          onClick={onClose}
        >
          <CloseIcon color="action" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText fontSize={'18px'}>{subTitle}</DialogContentText>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onSave!(values);
            onClose();
          }}
          innerRef={formRef}
        >
          {({ errors, touched, values }) => {
            useEffect(() => {
              onDataChange!(values);
            }, [values]);
            return (
              <Form>
                <Grid container spacing={4} mt={'10px'}>
                  {fields &&
                    fields!.map((field) => (
                      <Grid item xs={6} key={field.name}>
                        {field.type === 'select' ? (
                          <FormControl fullWidth size="medium">
                            <InputLabel id={`${field.name}-label`}>
                              {field.label}
                            </InputLabel>
                            <Field
                              name={field.name}
                              value={values[field.name]}
                              labelId={`${field.name}-label`}
                              as={Select}
                            >
                              {field.options?.map((option) => (
                                <MenuItem
                                  key={option.value}
                                  value={option.value}
                                >
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
                            value={values[field.name]}
                            size="medium"
                            type={field.type || 'text'}
                            helperText={
                              touched[field.name] && errors[field.name]
                            }
                            error={touched[field.name] && !!errors[field.name]}
                            InputLabelProps={
                              field.type === 'date'
                                ? { shrink: true }
                                : undefined
                            }
                          />
                        )}
                      </Grid>
                    ))}
                </Grid>
                <DialogActions style={{ marginTop: '15px' }}>
                  {actions!.map((action, index) => (
                    <Button
                      key={index}
                      onClick={action.onClick}
                      // @ts-ignore
                      color={action.color || 'default'}
                      variant={action.variant || 'text'}
                      sx={action.sx}
                      type={action.type}
                      endIcon={action.icon}
                    >
                      {action.label}
                    </Button>
                  ))}
                </DialogActions>
              </Form>
            );
          }}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
