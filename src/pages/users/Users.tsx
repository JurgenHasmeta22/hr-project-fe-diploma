import { Box, Button, ListItemIcon, MenuItem, Typography } from "@mui/material";
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
    MRT_GlobalFilterTextField,
    MRT_ToggleFiltersButton,
    MRT_ShowHideColumnsButton,
    MRT_ToggleDensePaddingButton,
    MRT_ColumnFiltersState,
    MRT_PaginationState,
    MRT_SortingState,
} from "material-react-table";
import Header from "~/components/header/Header";
import { useState, useEffect, useMemo } from "react";
import IUser from "~/types/IUser";
import usersController from "~/services/api/users";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useStore } from "~/store/store";
import { Edit, Delete, AccountCircle, Add } from "@mui/icons-material";
import * as CONSTANTS from "~/constants/Constants";

const Users = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [rowSelection, setRowSelection] = useState<any>({});
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefetching, setIsRefetching] = useState(false);
    // const [rowCount, setRowCount] = useState(0);
    const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [sorting, setSorting] = useState<MRT_SortingState>([]);
    const [pagination, setPagination] = useState<MRT_PaginationState>({
        pageIndex: 0,
        pageSize: 5,
    });

    const { userDetailsLoggedIn } = useStore();

    const navigate = useNavigate();

    const isEmployee = userDetailsLoggedIn?.userRolis?.some(
        (el) => el.roli.roliEmri === "Employee",
    );

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
                        return <Typography>Aktiv</Typography>;
                    } else if (cell.getValue() === false) {
                        return <Typography>Jo aktiv</Typography>;
                    }
                },
            },
            {
                accessorKey: "balancaLeje",
                header: "Balanca e lejeve",
            },
        ],
        [],
    );

    function handleAddUser() {
        navigate("/addUser");
    }

    async function getUsers(): Promise<void> {
        if (!users.length) {
            setIsLoading(true);
        } else {
            setIsRefetching(true);
        }

        const url = new URL("http://127.0.0.1:5173/users/");

        url.searchParams.set("page", `${pagination.pageIndex * pagination.pageSize}`);
        url.searchParams.set("pageSize", `${pagination.pageSize}`);
        url.searchParams.set("filters", JSON.stringify(columnFilters ?? []));
        url.searchParams.set("globalFilter", globalFilter ?? "");
        url.searchParams.set("sorting", JSON.stringify(sorting ?? []));

        try {
            const response: IUser[] = await usersController.getAllUsers();
            setUsers(response);
            // setRowCount(response.totalRowCount);
        } catch (error) {
            setIsError(true);
            console.error(error);

            return;
        }

        setIsError(false);
        setIsLoading(false);
        setIsRefetching(false);
    }

    useEffect(() => {
        getUsers();
    }, [columnFilters, globalFilter, pagination.pageIndex, pagination.pageSize, sorting]);

    // #region React Material Table logic
    const table = useMaterialReactTable({
        columns,
        data: users,
        // getRowId: (row) => row.userId,
        enableColumnOrdering: true,
        enableRowSelection: true,
        enablePagination: true,
        enableRowActions: true,
        enablePinning: true,
        enableSortingRemoval: true,
        enableColumnFilterModes: true,
        enableColumnActions: true,
        enableColumnFilters: true,
        enableClickToCopy: true,
        enableStickyHeader: true,
        enableStickyFooter: true,
        manualFiltering: true,
        manualPagination: true,
        manualSorting: true,
        muiToolbarAlertBannerProps: isError
            ? {
                  color: "error",
                  children: "Error loading data",
              }
            : undefined,
        initialState: {
            columnVisibility: { userId: false },
            showColumnFilters: true,
            showGlobalFilter: true,
            showLoadingOverlay: false,
            columnPinning: {
                left: ["mrt-row-expand", "mrt-row-select"],
                right: ["mrt-row-actions"],
            },
            columnFilters,
            globalFilter,
            isLoading,
            pagination,
            showAlertBanner: isError,
            showProgressBars: isRefetching,
            sorting,
        },
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        onRowSelectionChange: setRowSelection,
        state: { rowSelection },
        paginationDisplayMode: "pages",
        positionToolbarAlertBanner: "bottom",
        muiSearchTextFieldProps: {
            size: "medium",
            variant: "outlined",
        },
        // muiTableContainerProps: {
        //     // sx: { maxWidth: "800px", width: "800px" },
        // },
        // muiTablePaperProps: {
        //     sx: { maxWidth: "950px", width: "950px" },
        // },
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
                        toast.success(CONSTANTS.GLOBAL__DELETE__SUCCESS);
                        getUsers();
                    } else {
                        toast.error(CONSTANTS.GLOBAL__DELETE__FAILURE);
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
                    <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                        <MRT_GlobalFilterTextField table={table} />
                        <MRT_ToggleFiltersButton table={table} />
                        <MRT_ShowHideColumnsButton table={table} />
                        <MRT_ToggleDensePaddingButton table={table} />
                    </Box>
                    <Box>
                        <Box sx={{ display: "flex", gap: "1rem" }}>
                            <Button
                                color="success"
                                disabled={isEmployee}
                                onClick={handleAddUser}
                                variant="contained"
                            >
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
    // #endregion

    return (
        <Box m="20px">
            <Header title="Perdoruesit" subtitle="Lista e perdoruesve" />
            <MaterialReactTable table={table} />
        </Box>
    );
};

export default Users;
