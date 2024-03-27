import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

export const sidebarItems = [
    {
        label: "Dashboard",
        to: "/dashboard",
        icon: <HomeOutlinedIcon />,
        index: 0,
    },
    {
        label: "Perdoruesit",
        to: "/users",
        icon: <PeopleOutlinedIcon />,
        index: 1,
    },
    {
        label: "Lejet",
        icon: <ReceiptOutlinedIcon />,
        index: 2,
        submenu: [
            {
                label: "Lista e lejeve",
                to: "/permissions",
                icon: <ReceiptOutlinedIcon />,
                index: 3,
            },
            {
                label: "Rezervimi i lejeve",
                to: "/permissionReservation",
                icon: <ReceiptOutlinedIcon />,
                index: 4,
            },
        ],
    },
    {
        label: "Projektet",
        to: "/projects",
        icon: <PersonOutlinedIcon />,
        index: 5,
    },
];