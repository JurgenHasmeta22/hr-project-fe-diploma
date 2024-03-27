import { Button, Typography, Divider, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useStore } from "~/services/store/store";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

export const ProfileHeader = ({ userProfile, handleEditProfile }: any) => {
    const { userDetailsLoggedIn } = useStore();
    const navigate = useNavigate();

    return (
        <Box padding={3}>
            <Box display="flex" alignItems="center" gap={1} justifyContent={"center"}>
                <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => {
                        navigate("/dashboard");
                    }}
                >
                    <ArrowBackIcon color="action" />
                </Button>
                <Box flexGrow={1} display="flex" alignItems="center" justifyContent="center">
                    <Box>
                        <AccountCircleIcon style={{ fontSize: 60, marginRight: 15 }} />
                    </Box>
                    <Box>
                        <Box display={"flex"} flexDirection={"row"} gap={"25px"}>
                            <Typography variant="h5" gutterBottom>
                                {userProfile?.userName}
                            </Typography>
                            <Box display={"flex"} flexDirection={"row"} gap={"5px"}>
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
                            handleEditProfile(userDetailsLoggedIn!);
                        }}
                    >
                        Edito profilin
                    </Button>
                )}
            </Box>
            <Divider sx={{ my: 2 }} />
        </Box>
    );
};
