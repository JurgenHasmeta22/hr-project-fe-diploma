import { useState, useEffect, useMemo } from "react";
import { Box, Button, ListItemIcon, MenuItem, useTheme } from "@mui/material";
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
    MRT_GlobalFilterTextField,
    MRT_ToggleFiltersButton,
    MRT_ShowHideColumnsButton,
    MRT_ToggleDensePaddingButton,
} from "material-react-table";
import { tokens } from "~/utils/theme";
import Header from "~/components/header";
import IPermission from "~/interfaces/IPermission";
import permissionsController from "~/services/permissions";
import { Delete, Add, Approval } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useStore } from "~/store/zustand/store";

const Permissions = () => {
    const [permissions, setPermissions] = useState<IPermission[]>([]);
    const [rowSelection, setRowSelection] = useState<any>({});

    const theme = useTheme();
    const { userDetailsLoggedIn } = useStore();
    const navigate = useNavigate();

    const colors = tokens(theme.palette.mode);

    const isEmployee = userDetailsLoggedIn?.userRolis?.some((el) => el.roli.roliEmri === "Employee");

    const columns: MRT_ColumnDef<IPermission>[] = useMemo(
        () => [
            { accessorKey: "lejeId", header: "Id", enableHiding: true, size: 30 },
            {
                accessorKey: "dataFillim",
                header: "Data e fillimit",
                size: 100,
            },
            {
                accessorKey: "dataMbarim",
                header: "Data e mbarimit",
                size: 100,
                cellClassName: "name-column--cell",
            },
            {
                accessorKey: "tipiLeje",
                header: "Tipi i lejes",
                size: 100,
            },
            {
                accessorKey: "userName",
                header: "Lejekerkuesi",
                size: 100,
            },
            {
                accessorKey: "aprovuar",
                header: "Statusi",
                size: 100,
                Cell: ({ cell }) => {
                    if (cell.getValue() === 2) {
                        return (
                            <div
                                style={{
                                    backgroundColor: "#cc8400",
                                    color: "#fff",
                                    padding: "5px 10px",
                                    borderRadius: "5px",
                                }}
                            >
                                Ne pritje
                            </div>
                        );
                    }
                    return null;
                },
            },
        ],
        [],
    );

    function handleAddUser() {
        navigate("/addUser");
    }

    async function handleApprovePermission(permissionId: any): Promise<void> {
        const response: IPermission[] = await permissionsController.approvePermission(permissionId);

        if (response) {
            getPermissions();
        }
    }

    async function handleDisapprovePermission(permissionId: any): Promise<void> {
        const response: IPermission[] = await permissionsController.disapprovePermission(permissionId);

        if (response) {
            getPermissions();
        }
    }

    async function getPermissions(): Promise<void> {
        const response: IPermission[] = await permissionsController.getAllPermissions();
        const filteredPermissions = response.filter((permission) => permission.aprovuar === 2);

        if (response) {
            setPermissions(filteredPermissions);
        }
    }

    useEffect(() => {
        getPermissions();
    }, []);

    const table = useMaterialReactTable({
        columns,
        data: permissions,
        enableColumnOrdering: true,
        enableRowSelection: true,
        enablePagination: true,
        enableRowActions: true,
        enablePinning: true,
        enableSortingRemoval: true,
        enableColumnFilterModes: true,
        initialState: {
            columnVisibility: { lejeId: false },
            showColumnFilters: false,
            showGlobalFilter: true,
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
                    handleApprovePermission(row.original.lejeId);
                    closeMenu();
                }}
                sx={{ m: 0 }}
                disabled={!isEmployee ? false : true}
            >
                <ListItemIcon>
                    <Approval />
                </ListItemIcon>
                Aprovo
            </MenuItem>,
            <MenuItem
                key={1}
                onClick={() => {
                    handleDisapprovePermission(row.original.lejeId);
                    closeMenu();
                }}
                sx={{ m: 0 }}
                disabled={!isEmployee ? false : true}
            >
                <ListItemIcon>
                    <Approval />
                </ListItemIcon>
                Disaprovo
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
            <Header title="Lejet" subtitle="Lista e lejeve" />
            <MaterialReactTable table={table} />
        </Box>
    );
};

export default Permissions;
