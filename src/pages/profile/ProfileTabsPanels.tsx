import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useStore } from "~/services/store/store";
import TabPanel from "~/components/tab/Tab";

export const ProfileTabsPanels = ({
    value,
    userProfile,
    handleCreateCertificate,
    handleEditCertificate,
    handleDeleteCertificate,
    handleCreateSkill,
    handleEditSkill,
    handleDeleteSkill,
    handleCreateWork,
    handleEditWork,
    handleDeleteWork,
    handleCreateEducation,
    handleEditEducation,
    handleDeleteEducation,
}: any) => {
    const { userDetailsLoggedIn } = useStore();

    return (
        <>
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
                <Grid container spacing={4} mt={"5px"}>
                    {userProfile?.userCertifikates!.map((el: any, index: number) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card elevation={4}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Emri: {el.cert!.certEmri!}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" gutterBottom>
                                        Pershkrim: {el.cert.certPershkrim}
                                    </Typography>
                                </CardContent>
                                {userProfile?.userName === userDetailsLoggedIn?.userName && (
                                    <CardActions
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            gap: "30px",
                                        }}
                                    >
                                        <Button
                                            variant="contained"
                                            startIcon={<EditIcon />}
                                            color="secondary"
                                            onClick={() => handleEditCertificate(el)}
                                        >
                                            Edito
                                        </Button>
                                        <Button
                                            size="small"
                                            startIcon={<EditIcon />}
                                            color="error"
                                            onClick={() => handleDeleteCertificate(el)}
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
                <Grid container spacing={4} mt={"5px"}>
                    {userProfile?.userEdukims!.map((el: any, index: number) => (
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
                                            display: "flex",
                                            flexDirection: "row",
                                            gap: "30px",
                                        }}
                                    >
                                        <Button
                                            variant="contained"
                                            startIcon={<EditIcon />}
                                            color="secondary"
                                            onClick={() => handleEditEducation(el)}
                                        >
                                            Edito
                                        </Button>
                                        <Button
                                            size="small"
                                            startIcon={<EditIcon />}
                                            color="error"
                                            onClick={() => handleDeleteEducation(el)}
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
                <Grid container spacing={4} mt={"5px"}>
                    {userProfile?.userProjekts!.map((el: any, index: number) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card elevation={4}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Emri: {el.projekt.emriProjekt}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" gutterBottom>
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
                <Grid container spacing={4} mt={"5px"}>
                    {userProfile?.userAftesis!.map((el: any, index: number) => (
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
                                            display: "flex",
                                            flexDirection: "row",
                                            gap: "30px",
                                        }}
                                    >
                                        <Button
                                            variant="contained"
                                            startIcon={<EditIcon />}
                                            color="secondary"
                                            onClick={() => handleEditSkill(el)}
                                        >
                                            Edito
                                        </Button>
                                        <Button
                                            size="small"
                                            startIcon={<EditIcon />}
                                            color="error"
                                            onClick={() => handleDeleteSkill(el)}
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
                <Grid container spacing={4} mt={"5px"}>
                    {userProfile?.userPervojePunes!.map((el: any, index: any) => (
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
                                            display: "flex",
                                            flexDirection: "row",
                                            gap: "30px",
                                        }}
                                    >
                                        <Button
                                            variant="contained"
                                            startIcon={<EditIcon />}
                                            color="secondary"
                                            onClick={() => handleEditWork(el)}
                                        >
                                            Edito
                                        </Button>
                                        <Button
                                            size="small"
                                            startIcon={<EditIcon />}
                                            color="error"
                                            onClick={() => handleDeleteWork(el)}
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
        </>
    );
};
