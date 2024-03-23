import { Box, Button, Typography, useTheme } from "@mui/material";
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

const Users = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [selectedRows, setSelectedRows] = useState<any[]>([]);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const { userDetailsLoggedIn } = useStore();
    const isEmployee = userDetailsLoggedIn?.userRolis?.some((el) => el.roli.roliEmri === "Employee");

    const columns = useMemo<MRT_ColumnDef<IUser>[]>(
        () => [
            { accessorKey: "userId", header: "Id", enableHiding: true },
            {
                header: "Username",
                accessorKey: "userName",
            },
            {
                accessorKey: "userFirstname",
                header: "Emri",
            },
            {
                header: "Mbiemri",
                accessorKey: "userLastname",
            },
            {
                header: "Email",
                accessorKey: "userEmail",
            },
            {
                accessorKey: "userIsActive",
                header: "Statusi",
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
                header: "balancaLeje",
                accessorKey: "Balanca e lejeve",
            },
            {
                header: "Veprimet",
                enableSorting: false,
                enableColumnFilter: false,
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

    const handleDeleteRow = async () => {
        if (selectedRows.length !== 0) {
            let response;

            for (const element of selectedRows) {
                response = await usersController.updateUser(element.userId, {
                    ...element,
                    userIsActive: false,
                });
            }

            if (response) {
                toast.success("Fshirja me sukses !");
            } else {
                toast.error("Fshirja nuk u realizua !");
            }

            getUsers();
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const table = useMaterialReactTable({
        // @ts-ignore
        columns,
        users,
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
                            handleDeleteRow();
                        }}
                    >
                        Elemino
                        <ClearOutlinedIcon color="action" sx={{ ml: "10px" }} />
                    </Button>
                </Box>
            )}
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                }}
            >
                <MaterialReactTable table={table} />
                {/* <DataGrid
                    checkboxSelection={!isEmployee ? true : false}
                    rows={users}
                    getRowId={(row) => String(row.userId)}
                    columns={columns}
                    onRowSelectionModelChange={(ids) => {
                        const clonedUsers = [...users];
                        const selectedRowsData = ids.map((id) => clonedUsers.find((row) => row.userId === id));
                        setSelectedRows(selectedRowsData);
                    }}
                /> */}
            </Box>
        </Box>
    );
};

export default Users;
