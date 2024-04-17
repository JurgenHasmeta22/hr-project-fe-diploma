import { Box, Button, Breadcrumbs } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate } from "react-router-dom";

type ProfileBreadCrumbProps = {
    breadcrumbs: JSX.Element[];
};

const ProfileBreadCrumb = ({ breadcrumbs }: ProfileBreadCrumbProps) => {
    const navigate = useNavigate();

    return (
        <Box mb={"30px"} display={"flex"} flexDirection={"row"} alignItems={"center"} gap={"20px"}>
            <Button
                color="secondary"
                variant="contained"
                onClick={() => {
                    navigate("/projects");
                }}
            >
                <ArrowBackIcon color="action" />
            </Button>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                {breadcrumbs}
            </Breadcrumbs>
        </Box>
    );
};

export default ProfileBreadCrumb;
