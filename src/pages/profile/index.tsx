import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import TabPanel from '~/components/tabPanel';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { FormikProps } from 'formik';
import * as Yup from 'yup';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { useDrawer } from '~/components/drawer/drawerContext';
import { useStore } from '~/store/zustand/store';
import usersController from '~/services/users';
import IUser from '~/interfaces/IUser';
import ICertification from '~/interfaces/ICertification';
import IEducation from '~/interfaces/IEducation';
import ISkill from '~/interfaces/ISkill';
import IWorkExperience from '~/interfaces/IWorkExperience';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { toast } from 'react-toastify';
import educationsController from '~/services/educations';
import workExperiencesController from '~/services/workExperiences';
import skillsController from '~/services/skills';
import certificatesController from '~/services/certificates';

const userSchema = Yup.object().shape({
  userName: Yup.string().required('required'),
  userFirstname: Yup.string().required('required'),
  userLastname: Yup.string().required('required'),
  userEmail: Yup.string().required('required'),
});
const certificateSchema = Yup.object().shape({
  certEmri: Yup.string().required('required'),
  certPershkrim: Yup.string().required('required'),
});
const skillSchema = Yup.object().shape({
  llojiAftesise: Yup.string().required('required'),
});
const workSchema = Yup.object().shape({
  ppemri: Yup.string().required('required'),
});
const educationSchema = Yup.object().shape({
  eduName: Yup.string().required('required'),
});

export default function Profile() {
  const [value, setValue] = useState(0);
  const [userProfile, setUserProfile] = useState<IUser | null>(null);
  const [formData, setFormData] = useState({});
  const { userDetailsLoggedIn } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const formikRef = useRef<FormikProps<any>>(null);
  const { openDrawer } = useDrawer();

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };
  const handleDataChange = (values: any) => {
    setFormData(values);
  };
  const handleResetFromParent = () => {
    formikRef.current?.resetForm();
  };

  const handleCreateCertificate = () => {
    openDrawer({
      formRef: formikRef,
      initialValues: {
        certEmri: '',
        certPershkrim: '',
      },
      fields: [
        {
          name: 'certEmri',
          label: 'Emri',
          variant: 'filled',
          type: 'text',
          sx: { gridColumn: 'span 2' },
        },
        {
          name: 'certPershkrim',
          label: 'Pershkrimi',
          variant: 'filled',
          type: 'text',
          sx: { gridColumn: 'span 2' },
        },
      ],
      validationSchema: certificateSchema,
      onSave: async (values: any) => {
        const payload: IEducation = {
          eduName: values.eduName,
        };
        const response = await educationsController.createEducation(payload);
        if (response) {
          toast.success('Ruajtja e ndryshimeve me sukses !');
        } else {
          toast.error('Rujtja nuk e realizua !');
        }
      },
      title: 'Shto certifikate',
      actions: [
        {
          label: 'Anullo',
          onClick: () => {
            handleResetFromParent();
          },
          type: 'reset',
          color: 'secondary',
          variant: 'contained',
          sx: {
            border: '1px solid #000',
            bgcolor: '#ff5252',
            fontSize: '15px',
            fontWeight: '700',
          },
          icon: <ClearAllIcon />,
        },
        {
          label: 'Ruaj ndryshimet',
          type: 'submit',
          color: 'secondary',
          variant: 'contained',
          sx: {
            border: '1px solid #000',
            bgcolor: '#30969f',
            fontSize: '15px',
            fontWeight: '700',
          },
          icon: <SaveAsIcon />,
        },
      ],
      onDataChange: (values: any) => {
        handleDataChange(values);
      },
    });
  };
  const handleCreateSkill = () => {
    openDrawer({
      formRef: formikRef,
      initialValues: {
        llojiAftesise: '',
      },
      fields: [
        {
          name: 'llojiAftesise',
          label: 'Lloji i aftesise',
          variant: 'filled',
          type: 'text',
          sx: { gridColumn: 'span 2' },
        },
      ],
      validationSchema: skillSchema,
      onSave: async (values: any) => {
        const payload: ISkill = {
          llojiAftesise: values.llojiAftesise,
        };
        const response = await skillsController.createSkill(payload);
        if (response) {
          toast.success('Ruajtja e ndryshimeve me sukses !');
        } else {
          toast.error('Rujtja nuk e realizua !');
        }
      },
      title: 'Shto Aftesi',
      actions: [
        {
          label: 'Anullo',
          onClick: () => {
            handleResetFromParent();
          },
          type: 'reset',
          color: 'secondary',
          variant: 'contained',
          sx: {
            border: '1px solid #000',
            bgcolor: '#ff5252',
            fontSize: '15px',
            fontWeight: '700',
          },
          icon: <ClearAllIcon />,
        },
        {
          label: 'Ruaj ndryshimet',
          type: 'submit',
          color: 'secondary',
          variant: 'contained',
          sx: {
            border: '1px solid #000',
            bgcolor: '#30969f',
            fontSize: '15px',
            fontWeight: '700',
          },
          icon: <SaveAsIcon />,
        },
      ],
      onDataChange: (values: any) => {
        handleDataChange(values);
      },
    });
  };
  const handleCreateWork = () => {
    openDrawer({
      formRef: formikRef,
      initialValues: {
        ppemri: '',
      },
      fields: [
        {
          name: 'ppemri',
          label: 'Emri',
          variant: 'filled',
          type: 'text',
          sx: { gridColumn: 'span 2' },
        },
      ],
      validationSchema: workSchema,
      onSave: async (values: any) => {
        const payload: IWorkExperience = {
          ppemri: values.ppemri,
        };
        const response = await workExperiencesController.createWorkExpierence(
          payload
        );
        if (response) {
          toast.success('Ruajtja e ndryshimeve me sukses !');
        } else {
          toast.error('Rujtja nuk e realizua !');
        }
      },
      title: 'Shto pune',
      actions: [
        {
          label: 'Anullo',
          onClick: () => {
            handleResetFromParent();
          },
          type: 'reset',
          color: 'secondary',
          variant: 'contained',
          sx: {
            border: '1px solid #000',
            bgcolor: '#ff5252',
            fontSize: '15px',
            fontWeight: '700',
          },
          icon: <ClearAllIcon />,
        },
        {
          label: 'Ruaj ndryshimet',
          type: 'submit',
          color: 'secondary',
          variant: 'contained',
          sx: {
            border: '1px solid #000',
            bgcolor: '#30969f',
            fontSize: '15px',
            fontWeight: '700',
          },
          icon: <SaveAsIcon />,
        },
      ],
      onDataChange: (values: any) => {
        handleDataChange(values);
      },
    });
  };
  const handleCreateEducation = () => {
    openDrawer({
      formRef: formikRef,
      initialValues: {
        eduName: '',
      },
      fields: [
        {
          name: 'eduName',
          label: 'Emri',
          variant: 'filled',
          type: 'text',
          sx: { gridColumn: 'span 2' },
        },
      ],
      validationSchema: educationSchema,
      onSave: async (values: any) => {
        const payload: ICertification = {
          certEmri: values.certEmri,
          certPershkrim: values.certPershkrim,
        };
        const response = await certificatesController.createCertificate(
          payload
        );
        if (response) {
          toast.success('Ruajtja e ndryshimeve me sukses !');
        } else {
          toast.error('Rujtja nuk e realizua !');
        }
      },
      title: 'Shto edukimin',
      actions: [
        {
          label: 'Anullo',
          onClick: () => {
            handleResetFromParent();
          },
          type: 'reset',
          color: 'secondary',
          variant: 'contained',
          sx: {
            border: '1px solid #000',
            bgcolor: '#ff5252',
            fontSize: '15px',
            fontWeight: '700',
          },
          icon: <ClearAllIcon />,
        },
        {
          label: 'Ruaj ndryshimet',
          type: 'submit',
          color: 'secondary',
          variant: 'contained',
          sx: {
            border: '1px solid #000',
            bgcolor: '#30969f',
            fontSize: '15px',
            fontWeight: '700',
          },
          icon: <SaveAsIcon />,
        },
      ],
      onDataChange: (values: any) => {
        handleDataChange(values);
      },
    });
  };

  const handleEditProfile = () => {
    openDrawer({
      formRef: formikRef,
      initialValues: {
        userId: '',
        userName: '',
        userFirstname: '',
        userLastname: '',
        userEmail: '',
        balancaLeje: '',
        userIsActive: '',
        password: '',
      },
      fields: [
        {
          name: 'userName',
          label: 'Username',
          variant: 'filled',
          type: 'text',
          sx: { gridColumn: 'span 2' },
        },
        {
          name: 'userFirstname',
          label: 'Emri',
          variant: 'filled',
          type: 'text',
          sx: { gridColumn: 'span 2' },
        },
        {
          name: 'userLastname',
          label: 'Mbiemri',
          variant: 'filled',
          type: 'text',
          sx: { gridColumn: 'span 2' },
        },
        {
          name: 'userEmail',
          label: 'Email',
          variant: 'filled',
          type: 'text',
          sx: { gridColumn: 'span 2' },
        },
      ],
      validationSchema: userSchema,
      onSave: (values: any) => {
        console.log(values);
      },
      title: 'Edito perdoruesin',
      actions: [
        {
          label: 'Anullo',
          onClick: () => {
            handleResetFromParent();
          },
          type: 'reset',
          color: 'secondary',
          variant: 'contained',
          sx: {
            border: '1px solid #000',
            bgcolor: '#ff5252',
            fontSize: '15px',
            fontWeight: '700',
          },
          icon: <ClearAllIcon />,
        },
        {
          label: 'Ruaj ndryshimet',
          type: 'submit',
          color: 'secondary',
          variant: 'contained',
          sx: {
            border: '1px solid #000',
            bgcolor: '#30969f',
            fontSize: '15px',
            fontWeight: '700',
          },
          icon: <SaveAsIcon />,
        },
      ],
      onDataChange: (values: any) => {
        handleDataChange(values);
      },
      subTitle: 'Plotesoni detajet e perdoruesit',
    });
  };
  const handleEditCertificate = (certificate: ICertification) => {
    openDrawer({
      formRef: formikRef,
      initialValues: {
        certEmri: certificate.certEmri,
        certPershkrim: certificate.certPershkrim,
      },
      fields: [
        {
          name: 'certEmri',
          label: 'Emri',
          variant: 'filled',
          type: 'text',
          sx: { gridColumn: 'span 2' },
        },
        {
          name: 'certPershkrim',
          label: 'Pershkrimi',
          variant: 'filled',
          type: 'text',
          sx: { gridColumn: 'span 2' },
        },
      ],
      title: 'Edito certifikate',
      onSave: async (values: any) => {
        const payload: ICertification = {
          certEmri: values.certEmri,
          certPershkrim: values.certPershkrim,
        };
        const response = await certificatesController.editCertificate(
          values.certId,
          payload
        );
        if (response) {
          toast.success('Ruajtja e ndryshimeve me sukses !');
        } else {
          toast.error('Rujtja nuk e realizua !');
        }
      },
      actions: [
        {
          label: 'Anullo',
          onClick: () => {
            handleResetFromParent();
          },
          type: 'reset',
          color: 'secondary',
          variant: 'contained',
          sx: {
            border: '1px solid #000',
            bgcolor: '#ff5252',
            fontSize: '15px',
            fontWeight: '700',
          },
          icon: <ClearAllIcon />,
        },
        {
          label: 'Ruaj ndryshimet',
          type: 'submit',
          color: 'secondary',
          variant: 'contained',
          sx: {
            border: '1px solid #000',
            bgcolor: '#30969f',
            fontSize: '15px',
            fontWeight: '700',
          },
          icon: <SaveAsIcon />,
        },
      ],
      onDataChange: (values: any) => {
        handleDataChange(values);
      },
    });
  };
  const handleEditSkill = (skill: ISkill) => {
    openDrawer({
      formRef: formikRef,
      initialValues: {
        llojiAftesise: skill.llojiAftesise,
      },
      fields: [
        {
          name: 'llojiAftesise',
          label: 'Lloji i aftesise',
          variant: 'filled',
          type: 'text',
          sx: { gridColumn: 'span 2' },
        },
      ],
      title: 'Edito Aftesi',
      onSave: async (values: any) => {
        const payload: ISkill = {
          llojiAftesise: values.llojiAftesise,
        };
        const response = await skillsController.editSkill(
          values.aftesiId,
          payload
        );
        if (response) {
          toast.success('Ruajtja e ndryshimeve me sukses !');
        } else {
          toast.error('Rujtja nuk e realizua !');
        }
      },
      actions: [
        {
          label: 'Anullo',
          onClick: () => {
            handleResetFromParent();
          },
          type: 'reset',
          color: 'secondary',
          variant: 'contained',
          sx: {
            border: '1px solid #000',
            bgcolor: '#ff5252',
            fontSize: '15px',
            fontWeight: '700',
          },
          icon: <ClearAllIcon />,
        },
        {
          label: 'Ruaj ndryshimet',
          type: 'submit',
          color: 'secondary',
          variant: 'contained',
          sx: {
            border: '1px solid #000',
            bgcolor: '#30969f',
            fontSize: '15px',
            fontWeight: '700',
          },
          icon: <SaveAsIcon />,
        },
      ],
      onDataChange: (values: any) => {
        handleDataChange(values);
      },
    });
  };
  const handleEditWork = (work: IWorkExperience) => {
    openDrawer({
      formRef: formikRef,
      initialValues: {
        ppemri: work.ppemri,
      },
      fields: [
        {
          name: 'ppemri',
          label: 'Emri',
          variant: 'filled',
          type: 'text',
          sx: { gridColumn: 'span 2' },
        },
      ],
      title: 'Edito pune',
      onSave: async (values: any) => {
        const payload: IWorkExperience = {
          ppemri: values.ppemri,
        };
        const response = await workExperiencesController.editWorkExpierence(
          values.ppId,
          payload
        );
        if (response) {
          toast.success('Ruajtja e ndryshimeve me sukses !');
        } else {
          toast.error('Rujtja nuk e realizua !');
        }
      },
      actions: [
        {
          label: 'Anullo',
          onClick: () => {
            handleResetFromParent();
          },
          type: 'reset',
          color: 'secondary',
          variant: 'contained',
          sx: {
            border: '1px solid #000',
            bgcolor: '#ff5252',
            fontSize: '15px',
            fontWeight: '700',
          },
          icon: <ClearAllIcon />,
        },
        {
          label: 'Ruaj ndryshimet',
          type: 'submit',
          color: 'secondary',
          variant: 'contained',
          sx: {
            border: '1px solid #000',
            bgcolor: '#30969f',
            fontSize: '15px',
            fontWeight: '700',
          },
          icon: <SaveAsIcon />,
        },
      ],
      onDataChange: (values: any) => {
        handleDataChange(values);
      },
    });
  };
  const handleEditEducation = (education: IEducation) => {
    openDrawer({
      formRef: formikRef,
      initialValues: {
        eduName: education.eduName,
      },
      fields: [
        {
          name: 'eduName',
          label: 'Emri',
          variant: 'filled',
          type: 'text',
          sx: { gridColumn: 'span 2' },
        },
      ],
      title: 'Edito edukimin',
      onSave: async (values: any) => {
        const payload: IEducation = {
          eduName: values.eduName,
        };
        const response = await educationsController.editEducation(
          values.eduId,
          payload
        );
        if (response) {
          toast.success('Ruajtja e ndryshimeve me sukses !');
        } else {
          toast.error('Rujtja nuk e realizua !');
        }
      },
      actions: [
        {
          label: 'Anullo',
          onClick: () => {
            handleResetFromParent();
          },
          type: 'reset',
          color: 'secondary',
          variant: 'contained',
          sx: {
            border: '1px solid #000',
            bgcolor: '#ff5252',
            fontSize: '15px',
            fontWeight: '700',
          },
          icon: <ClearAllIcon />,
        },
        {
          label: 'Ruaj ndryshimet',
          type: 'submit',
          color: 'secondary',
          variant: 'contained',
          sx: {
            border: '1px solid #000',
            bgcolor: '#30969f',
            fontSize: '15px',
            fontWeight: '700',
          },
          icon: <SaveAsIcon />,
        },
      ],
      onDataChange: (values: any) => {
        handleDataChange(values);
      },
    });
  };

  useEffect(() => {
    if (location.state?.userId) {
      async function fetchUserDetails() {
        try {
          const user = await usersController.getUser(location.state?.userId);
          setUserProfile(user);
        } catch (error) {
          console.error('Failed to fetch user:', error);
        }
      }
      fetchUserDetails();
    } else {
      setUserProfile(userDetailsLoggedIn);
    }
  }, [location.state?.userId]);

  return (
    <>
      <Box padding={3}>
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          justifyContent={'center'}
        >
          <Button
            color="secondary"
            variant="contained"
            onClick={() => {
              navigate('/dashboard');
            }}
          >
            <ArrowBackIcon color="action" />
          </Button>
          <Box
            flexGrow={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box>
              <AccountCircleIcon style={{ fontSize: 60, marginRight: 15 }} />
            </Box>
            <Box>
              <Box display={'flex'} flexDirection={'row'} gap={'25px'}>
                <Typography variant="h5" gutterBottom>
                  {userProfile?.userName}
                </Typography>
                <Box display={'flex'} flexDirection={'row'} gap={'5px'}>
                  <Typography variant="h5" gutterBottom>
                    {userProfile?.userFirstname}
                  </Typography>
                  <Typography variant="h5" gutterBottom>
                    {userProfile?.userLastname}
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" gap={3}>
                <Typography variant="body1" color="textSecondary">
                  Certifikatat: {userProfile?.userCertifikates!.length}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Punet e meparshme: {userProfile?.userPervojePunes!.length}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Edukimi: {userProfile?.userEdukims!.length}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Projektet: {userProfile?.userProjekts!.length}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Aftesite: {userProfile?.userAftesis!.length}
                </Typography>
              </Box>
            </Box>
          </Box>
          {userProfile?.userName === userDetailsLoggedIn?.userName && (
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              color="secondary"
              onClick={() => {
                handleEditProfile();
              }}
            >
              Edito profilin
            </Button>
          )}
        </Box>
        <Divider sx={{ my: 2 }} />
      </Box>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          textColor="primary"
          // sx={{ borderRight: 3, borderColor: 'divider' }}
          orientation="horizontal"
        >
          <Tab label="Certifikatat" style={{ backgroundColor: '#ff8888' }} />
          <Tab label="Edukimet" style={{ backgroundColor: '#ff8888' }} />
          <Tab label="Projektet" style={{ backgroundColor: '#ff8888' }} />
          <Tab label="Aftesite" style={{ backgroundColor: '#ff8888' }} />
          <Tab label="Pervoja e punes" style={{ backgroundColor: '#ff8888' }} />
        </Tabs>
        <TabPanel value={value} index={0}>
          {userProfile?.userName === userDetailsLoggedIn?.userName && (
            <Box>
              <Button
                variant="contained"
                startIcon={<AddOutlinedIcon />}
                color="error"
                onClick={() => {
                  handleCreateCertificate();
                }}
              >
                Shto
              </Button>
            </Box>
          )}
          <Grid container spacing={4} mt={'5px'}>
            {userProfile?.userCertifikates!.map((el, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card elevation={4}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Emri: {el.cert!.certEmri!}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      gutterBottom
                    >
                      Pershkrim: {el.cert.certPershkrim}
                    </Typography>
                  </CardContent>
                  {userProfile?.userName === userDetailsLoggedIn?.userName && (
                    <CardActions
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '30px',
                      }}
                    >
                      <Button
                        variant="contained"
                        startIcon={<EditIcon />}
                        color="secondary"
                        onClick={() => handleEditCertificate(el.cert)}
                      >
                        Edito
                      </Button>
                      <Button
                        size="small"
                        startIcon={<EditIcon />}
                        color="error"
                      >
                        Elemino
                      </Button>
                    </CardActions>
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          {userProfile?.userName === userDetailsLoggedIn?.userName && (
            <Box>
              <Button
                variant="contained"
                startIcon={<AddOutlinedIcon />}
                color="error"
                onClick={() => {
                  handleCreateEducation();
                }}
              >
                Shto
              </Button>
            </Box>
          )}
          <Grid container spacing={4} mt={'5px'}>
            {userProfile?.userEdukims!.map((el, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card elevation={4}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Emri: {el.edu.eduName}
                    </Typography>
                  </CardContent>
                  {userProfile?.userName === userDetailsLoggedIn?.userName && (
                    <CardActions
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '30px',
                      }}
                    >
                      <Button
                        variant="contained"
                        startIcon={<EditIcon />}
                        color="secondary"
                        onClick={() => handleEditEducation(el.edu)}
                      >
                        Edito
                      </Button>
                      <Button
                        size="small"
                        startIcon={<EditIcon />}
                        color="error"
                      >
                        Elemino
                      </Button>
                    </CardActions>
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Grid container spacing={4} mt={'5px'}>
            {userProfile?.userProjekts!.map((el, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card elevation={4}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Emri: {el.projekt.emriProjekt}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      gutterBottom
                    >
                      Pershkrimi: {el.projekt.pershkrimProjekt}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={3}>
          {userProfile?.userName === userDetailsLoggedIn?.userName && (
            <Box>
              <Button
                variant="contained"
                startIcon={<AddOutlinedIcon />}
                color="error"
                onClick={() => {
                  handleCreateSkill();
                }}
              >
                Shto
              </Button>
            </Box>
          )}
          <Grid container spacing={4} mt={'5px'}>
            {userProfile?.userAftesis!.map((el, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card elevation={4}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Emri: {el.aftesi.llojiAftesise}
                    </Typography>
                  </CardContent>
                  {userProfile?.userName === userDetailsLoggedIn?.userName && (
                    <CardActions
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '30px',
                      }}
                    >
                      <Button
                        variant="contained"
                        startIcon={<EditIcon />}
                        color="secondary"
                        onClick={() => handleEditSkill(el.aftesi)}
                      >
                        Edito
                      </Button>
                      <Button
                        size="small"
                        startIcon={<EditIcon />}
                        color="error"
                      >
                        Elemino
                      </Button>
                    </CardActions>
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={4}>
          {userProfile?.userName === userDetailsLoggedIn?.userName && (
            <Box>
              <Button
                variant="contained"
                startIcon={<AddOutlinedIcon />}
                color="error"
                onClick={() => {
                  handleCreateWork();
                }}
              >
                Shto
              </Button>
            </Box>
          )}
          <Grid container spacing={4} mt={'5px'}>
            {userProfile?.userPervojePunes!.map((el, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card elevation={4}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Emri: {el.pp.ppemri}
                    </Typography>
                  </CardContent>
                  {userProfile?.userName === userDetailsLoggedIn?.userName && (
                    <CardActions
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '30px',
                      }}
                    >
                      <Button
                        variant="contained"
                        startIcon={<EditIcon />}
                        color="secondary"
                        onClick={() => handleEditWork(el.pp)}
                      >
                        Edito
                      </Button>
                      <Button
                        size="small"
                        startIcon={<EditIcon />}
                        color="error"
                      >
                        Elemino
                      </Button>
                    </CardActions>
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      </Box>
    </>
  );
}
