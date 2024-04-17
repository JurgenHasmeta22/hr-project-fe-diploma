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
import Header from "~/components/header/Header";
import IProject from "~/types/IProject";
import { useEffect, useState, useMemo } from "react";
import projectsController from "~/services/api/projects";
import { useNavigate } from "react-router-dom";
import { useStore } from "~/store/store";
import usersController from "~/services/api/users";
import { Edit, Delete, Add } from "@mui/icons-material";

const Projects = () => {
    const [projects, setProjects] = useState<IProject[]>([]);
    const [rowSelection, setRowSelection] = useState<any>({});
    const [currentTime, setCurrentTime] = useState("");
    const { user } = useStore();
    const { userDetailsLoggedIn } = useStore();
    const { setUserDetailsLoggedIn } = useStore();
    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isEmployee = userDetailsLoggedIn?.userRolis?.some(
        (el) => el.roli.roliEmri === "Employee",
    );

    const checkIsUserInProject = (projektId: any): boolean => {
        if (!userDetailsLoggedIn?.userProjekts) {
            return false;
        }

        for (let el of userDetailsLoggedIn.userProjekts) {
            if (el.projekt.projektId === projektId) {
                return true;
            } else {
                return false;
            }
        }

        return false;
    };

    const columns = useMemo<MRT_ColumnDef<IProject>[]>(
        () => [
            {
                accessorKey: "projektId",
                header: "Id",
                enableHiding: true,
                size: 30,
            },
            {
                accessorKey: "emriProjekt",
                header: "Emri i projektit",
                size: 100,
            },
            {
                accessorKey: "pershkrimProjekt",
                header: "Pershkrimi i projektit",
                size: 100,
            },
        ],
        [],
    );

    async function getProjects(): Promise<void> {
        const response: IProject[] = await projectsController.getAllProjects();
        setProjects(response);
    }

    // const handleDeleteRow = async () => {
    //     if (rowSelection.length !== 0) {
    //         let response;

    //         for (const element of selectedRows) {
    //             response = await projectsController.deleteProject(element.projektId);
    //         }

    //         if (response === "") {
    //             toast.success("Eleminimi me sukses !");
    //         }

    //         getProjects();
    //     }
    // };

    useEffect(() => {
        const now = new Date().toISOString();
        setCurrentTime(now);
        getProjects();
    }, []);

    // #region React Material Table logic
    const table = useMaterialReactTable({
        columns,
        data: projects,
        enableColumnOrdering: true,
        enableRowSelection: true,
        enablePagination: true,
        enableRowActions: true,
        enablePinning: true,
        enableSortingRemoval: true,
        enableColumnFilterModes: true,
        initialState: {
            columnVisibility: { projektId: false },
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
        renderRowActionMenuItems: ({ closeMenu, row }) => {
            const actionMenuItems = [
                <MenuItem
                    key={1}
                    onClick={() => {
                        navigate(`/editProject`, {
                            state: {
                                userId: row.original.projektId,
                                from: "Projektet",
                            },
                        });
                        closeMenu();
                    }}
                    sx={{ m: 0 }}
                    disabled={isEmployee}
                >
                    <ListItemIcon>
                        <Edit />
                    </ListItemIcon>
                    Edito
                </MenuItem>,
                <MenuItem
                    key={2}
                    onClick={async () => {
                        const response = await usersController.updateUser(row.original, {
                            ...row.original,
                            userIsActive: false,
                        });
                        closeMenu();
                    }}
                    sx={{ m: 0 }}
                    disabled={isEmployee}
                >
                    <ListItemIcon>
                        <Delete />
                    </ListItemIcon>
                    Elemino
                </MenuItem>,
            ];
            // {
            //     projects.map((project) =>
            //         !checkIsUserInProject(project.projektId)
            //             ? actionMenuItems.push(
            //                   <MenuItem
            //                       key={2}
            //                       sx={{ m: 0 }}
            //                       disabled={!isEmployee}
            //                       onClick={async () => {
            //                           const response = await projectsController.assignProjectToUser(
            //                               user?.userId,
            //                               project.projektId,
            //                               {
            //                                   dataFillim: currentTime,
            //                                   dataMbarim: null,
            //                               },
            //                           );

            //                           if (response === "") {
            //                               toast.success("Futja ne projekt u krye me sukses !");
            //                               const response = await usersController.getUser(user.userId);

            //                               if (response) {
            //                                   setUserDetailsLoggedIn(response);
            //                               }

            //                               setUserDetailsLoggedIn(response);
            //                           } else {
            //                               toast.error("Futja ne projekt nuk u realizua !");
            //                           }
            //                       }}
            //                   >
            //                       <MeetingRoomIcon sx={{ color: "blue" }} />
            //                       Futu
            //                   </MenuItem>,
            //               )
            //             : actionMenuItems.push(
            //                   <MenuItem
            //                       key={3}
            //                       sx={{ m: 0 }}
            //                       disabled={!isEmployee}
            //                       onClick={async () => {
            //                           const response = await projectsController.deleteProjectToUser(
            //                               user?.userId,
            //                               project.projektId,
            //                           );

            //                           if (response === "") {
            //                               toast.success("Ikja nga projekti u krye me sukses !");
            //                               const response = await usersController.getUser(user.userId);

            //                               if (response) {
            //                                   setUserDetailsLoggedIn(response);
            //                               }
            //                           } else {
            //                               toast.error("Ikja nga projekti nuk u realizua !");
            //                           }
            //                       }}
            //                   >
            //                       <LogoutIcon sx={{ color: "red" }} />
            //                       Dil
            //                   </MenuItem>,
            //               ),
            //     );
            // }

            return actionMenuItems;
        },
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
                        <MRT_ShowHideColumnsButton table={table} />
                        <MRT_ToggleDensePaddingButton table={table} />
                    </Box>
                    <Box>
                        <Box sx={{ display: "flex", gap: "1rem" }}>
                            <Button
                                color="success"
                                disabled={isEmployee}
                                onClick={() => {}}
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
            <Header title="Projektet" subtitle="Lista e projekteve" />
            <MaterialReactTable table={table} />
        </Box>
    );
};

export default Projects;
