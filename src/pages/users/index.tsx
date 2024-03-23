import { Box, Button, IconButton, ListItemIcon, MenuItem, Tooltip, Typography, useTheme } from "@mui/material";
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { tokens } from "~/utils/theme";
import Header from "~/components/dashboard/Header";
import { useState, useEffect, useMemo } from "react";
import IUser from "~/interfaces/IUser";
import usersController from "~/services/users";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useStore } from "~/store/zustand/store";
import { Edit, Delete, AccountCircle, Send } from "@mui/icons-material";

const Users = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [rowSelection, setRowSelection] = useState<any>({});
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const { userDetailsLoggedIn } = useStore();

    const isEmployee = userDetailsLoggedIn?.userRolis?.some((el) => el.roli.roliEmri === "Employee");

    const columns = useMemo<MRT_ColumnDef<IUser>[]>(
        () => [
            { accessorKey: "userId", header: "Id", enableHiding: true, size: 50 },
            {
                header: "Username",
                accessorKey: "userName",
                size: 80,
            },
            {
                accessorKey: "userFirstname",
                header: "Emri",
                size: 80,
            },
            {
                header: "Mbiemri",
                accessorKey: "userLastname",
                size: 80,
            },
            {
                header: "Email",
                accessorKey: "userEmail",
                size: 100,
            },
            {
                accessorKey: "userIsActive",
                header: "Statusi",
                size: 50,
                Cell: ({ cell }) => {
                    if (cell.getValue() === true) {
                        return (
                            <div
                                style={{
                                    backgroundColor: "#28a745",
                                    color: "#fff",
                                    padding: "5px 10px",
                                    borderRadius: "5px",
                                }}
                            >
                                Aktiv
                            </div>
                        );
                    } else if (cell.getValue() === false) {
                        return (
                            <div
                                style={{
                                    backgroundColor: "#ffcc00",
                                    color: "#fff",
                                    padding: "5px 10px",
                                    borderRadius: "5px",
                                }}
                            >
                                Jo aktiv
                            </div>
                        );
                    }
                },
            },
            {
                accessorKey: "balancaLeje",
                header: "Balanca e lejeve",
                size: 50,
            },
            {
                header: "Veprimet",
                enableSorting: false,
                enableColumnFilter: false,
                size: 50,
                Cell: ({ row }) => (
                    <>
                        {!isEmployee && (
                            <Button
                                onClick={() => {
                                    navigate(`/editUser`, {
                                        state: {
                                            userId: row.original.userId,
                                            from: "Perdoruesit",
                                        },
                                    });
                                }}
                            >
                                <EditOutlinedIcon
                                    sx={{
                                        color: "green",
                                    }}
                                />
                            </Button>
                        )}
                        <Button
                            onClick={() => {
                                navigate(`/profile`, {
                                    state: {
                                        userId: row.original.userId,
                                        from: "Perdoruesit",
                                    },
                                });
                            }}
                        >
                            <VisibilityIcon
                                sx={{
                                    color: "blue",
                                }}
                            />
                        </Button>
                        {!isEmployee && (
                            <Button
                                onClick={async () => {
                                    const response = await usersController.updateUser(row.original, {
                                        ...row.original,
                                        userIsActive: false,
                                    });
                                    if (response) {
                                        toast.success("Fshirja u krye me sukses !");
                                        getUsers();
                                    } else {
                                        toast.error("Fshirja nuk u realizua !");
                                    }
                                }}
                            >
                                <ClearOutlinedIcon
                                    sx={{
                                        color: "red",
                                    }}
                                />
                            </Button>
                        )}
                    </>
                ),
            },
        ],
        [],
    );

    async function getUsers(): Promise<void> {
        const response: IUser[] = await usersController.getAllUsers();
        setUsers(response);
    }

    useEffect(() => {
        getUsers();
    }, []);

    const table = useMaterialReactTable({
        columns,
        data: users,
        enableColumnOrdering: true,
        enableRowSelection: true,
        enablePagination: true,
        enableRowActions: true,
        enablePinning: true,
        enableSortingRemoval: true,
        onRowSelectionChange: setRowSelection,
        state: { rowSelection },
        paginationDisplayMode: "pages",
        positionToolbarAlertBanner: "bottom",
        muiSearchTextFieldProps: {
            size: "small",
            variant: "outlined",
        },
        muiPaginationProps: {
            color: "secondary",
            rowsPerPageOptions: [10, 20, 30],
            shape: "rounded",
            variant: "outlined",
        },
        renderRowActionMenuItems: ({ closeMenu, row }) => [
            <MenuItem
                key={0}
                onClick={() => {
                    navigate(`/profile`, {
                        state: {
                            userId: row.original.userId,
                            from: "Perdoruesit",
                        },
                    });

                    closeMenu();
                }}
                sx={{ m: 0 }}
            >
                <ListItemIcon>
                    <AccountCircle />
                </ListItemIcon>
                Shiko
            </MenuItem>,
            <MenuItem
                key={1}
                onClick={() => {
                    navigate(`/editUser`, {
                        state: {
                            userId: row.original.userId,
                            from: "Perdoruesit",
                        },
                    });

                    closeMenu();
                }}
                sx={{ m: 0 }}
            >
                <ListItemIcon>
                    <Edit />
                </ListItemIcon>
                Edito
            </MenuItem>,
        ],
    });

    return (
        <Box m="20px">
            <Header title="Perdoruesit" subtitle="Lista e perdoruesve" />
            {!isEmployee && (
                <Box display="flex" gap={"30px"}>
                    <Button
                        color="secondary"
                        variant="contained"
                        sx={{
                            border: "1px solid #000",
                            bgcolor: "#30969f",
                            fontSize: "15px",
                            fontWeight: "700",
                        }}
                        onClick={() => {
                            navigate("/addUser");
                        }}
                    >
                        Shto
                        <AddOutlinedIcon />
                    </Button>
                    <Button
                        color="secondary"
                        variant="contained"
                        sx={{
                            border: "1px solid #000",
                            bgcolor: "#ff5252",
                            fontSize: "15px",
                            fontWeight: "700",
                        }}
                        onClick={() => {
                            // handleDeleteRow();
                        }}
                    >
                        Elemino
                        <ClearOutlinedIcon color="action" sx={{ ml: "10px" }} />
                    </Button>
                </Box>
            )}

            <MaterialReactTable table={table} />
        </Box>
    );
};

export default Users;
