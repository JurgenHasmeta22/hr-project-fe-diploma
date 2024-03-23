import { Box, Button, ListItemIcon, MenuItem, useTheme } from "@mui/material";
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
    MRT_GlobalFilterTextField,
    MRT_ToggleFiltersButton,
} from "material-react-table";
import Header from "~/components/dashboard/Header";
import { useState, useEffect, useMemo } from "react";
import IUser from "~/interfaces/IUser";
import usersController from "~/services/users";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useStore } from "~/store/zustand/store";
import { Edit, Delete, AccountCircle, Add } from "@mui/icons-material";

const Users = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [rowSelection, setRowSelection] = useState<any>({});
    const { userDetailsLoggedIn } = useStore();
    const navigate = useNavigate();

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
        ],
        [],
    );

    function handleAddUser() {
        navigate("/addUser");
    }

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
        enableColumnFilterModes: true,
        initialState: {
            showColumnFilters: false,
            showGlobalFilter: false,
            columnPinning: {
                left: ["mrt-row-expand", "mrt-row-select"],
                right: ["mrt-row-actions"],
            },
        },
        onRowSelectionChange: setRowSelection,
        state: { rowSelection },
        paginationDisplayMode: "pages",
        positionToolbarAlertBanner: "bottom",
        muiSearchTextFieldProps: {
            size: "medium",
            variant: "outlined",
        },
        muiPaginationProps: {
            color: "secondary",
            rowsPerPageOptions: [5, 10, 15, 20, 25, 30],
            shape: "rounded",
            size: "medium",
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
                disabled={!isEmployee ? false : true}
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
                disabled={!isEmployee ? false : true}
            >
                <ListItemIcon>
                    <Edit />
                </ListItemIcon>
                Edito
            </MenuItem>,
            <MenuItem
                key={1}
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

                    closeMenu();
                }}
                sx={{ m: 0 }}
                disabled={!isEmployee ? false : true}
            >
                <ListItemIcon>
                    <Delete />
                </ListItemIcon>
                Elemino
            </MenuItem>,
        ],
        renderTopToolbar: ({ table }) => {
            return (
                <Box
                    sx={() => ({
                        display: "flex",
                        gap: "1rem",
                        p: "10px",
                        justifyContent: "space-between",
                    })}
                >
                    <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                        <MRT_GlobalFilterTextField table={table} />
                        <MRT_ToggleFiltersButton table={table} />
                    </Box>
                    <Box>
                        <Box sx={{ display: "flex", gap: "1rem" }}>
                            <Button color="success" disabled={isEmployee} onClick={handleAddUser} variant="contained">
                                <Add />
                                Shto
                            </Button>
                            <Button
                                color="error"
                                disabled={!table.getIsSomeRowsSelected() && isEmployee}
                                // onClick={handleDeleteUser}
                                variant="contained"
                            >
                                <Delete />
                                Elemino
                            </Button>
                        </Box>
                    </Box>
                </Box>
            );
        },
    });

    return (
        <Box m="20px">
            <Header title="Perdoruesit" subtitle="Lista e perdoruesve" />
            <MaterialReactTable table={table} />
        </Box>
    );
};

export default Users;
