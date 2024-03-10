import { render, screen, waitFor } from "@testing-library/react";
import Dashboard from "./index";
import usersController from "~/services/users";
import projectsController from "~/services/projects";
import permissionsController from "~/services/permissions";

test("renders dashboard title", () => {
    render(<Dashboard />);
    const titleElement = screen.getByText(/Dashboard/i);
    expect(titleElement).toBeInTheDocument();
});
test("renders stat boxes", () => {
    render(<Dashboard />);
    const projectsStatBox = screen.getByText(/Nr i projekteve/i);
    const usersStatBox = screen.getByText(/Nr i punonjeseve/i);
    const permissionsStatBox = screen.getByText(/Nr i lejeve/i);
    expect(projectsStatBox).toBeInTheDocument();
    expect(usersStatBox).toBeInTheDocument();
    expect(permissionsStatBox).toBeInTheDocument();
});

test("renders correct number of projects", () => {
    render(<Dashboard />);
    const projectsStatBox = screen.getByText(/Nr i projekteve/i);
    expect(projectsStatBox).toHaveTextContent("0");
});

test("renders correct number of users", () => {
    render(<Dashboard />);
    const usersStatBox = screen.getByText(/Nr i punonjeseve/i);
    expect(usersStatBox).toHaveTextContent("0");
});

test("renders correct number of permissions", () => {
    render(<Dashboard />);
    const permissionsStatBox = screen.getByText(/Nr i lejeve/i);
    expect(permissionsStatBox).toHaveTextContent("0");
});
test("renders correct project progress", () => {
    render(<Dashboard />);
    const projectsStatBox = screen.getByText(/Nr i projekteve/i);
    expect(projectsStatBox).toHaveTextContent("0%");
});
test("renders correct user progress", () => {
    render(<Dashboard />);
    const usersStatBox = screen.getByText(/Nr i punonjeseve/i);
    expect(usersStatBox).toHaveTextContent("0%");
});
test("renders correct permissions progress", () => {
    render(<Dashboard />);
    const permissionsStatBox = screen.getByText(/Nr i lejeve/i);
    expect(permissionsStatBox).toHaveTextContent("0%");
});
test("renders correct project increase", () => {
    render(<Dashboard />);
    const projectsStatBox = screen.getByText(/Nr i projekteve/i);
    expect(projectsStatBox).toHaveTextContent("+0%");
});
test("renders correct user increase", () => {
    render(<Dashboard />);
    const usersStatBox = screen.getByText(/Nr i punonjeseve/i);
    expect(usersStatBox).toHaveTextContent("+0%");
});
test("renders correct permissions increase", () => {
    render(<Dashboard />);
    const permissionsStatBox = screen.getByText(/Nr i lejeve/i);
    expect(permissionsStatBox).toHaveTextContent("+0%");
});
test("calls the usersController.getAllUsers method", async () => {
    const mockGetAllUsers = jest.fn().mockResolvedValue([]);
    usersController.getAllUsers = mockGetAllUsers;
    render(<Dashboard />);
    expect(mockGetAllUsers).toBeCalled();
});
test("calls the projectsController.getAllProjects method", async () => {
    const mockGetAllProjects = jest.fn().mockResolvedValue([]);
    projectsController.getAllProjects = mockGetAllProjects;
    render(<Dashboard />);
    expect(mockGetAllProjects).toBeCalled();
});
test("calls the permissionsController.getAllPermissions method", async () => {
    const mockGetAllPermissions = jest.fn().mockResolvedValue([]);
    permissionsController.getAllPermissions = mockGetAllPermissions;
    render(<Dashboard />);
    expect(mockGetAllPermissions).toBeCalled();
});
test("displays the list of projects", async () => {
    const mockProjects = [
        { id: 1, name: "Project 1" },
        { id: 2, name: "Project 2" },
    ];
    projectsController.getAllProjects = jest.fn().mockResolvedValue(mockProjects);
    render(<Dashboard />);
    await waitFor(() => {
        const projectList = screen.getByTestId("project-list");
        expect(projectList).toBeInTheDocument();
        expect(projectList.children).toHaveLength(2);
    });
});
test("displays the list of users", async () => {
    const mockUsers = [
        { id: 1, name: "User 1" },
        { id: 2, name: "User 2" },
    ];
    usersController.getAllUsers = jest.fn().mockResolvedValue(mockUsers);
    render(<Dashboard />);
    await waitFor(() => {
        const userList = screen.getByTestId("user-list");
        expect(userList).toBeInTheDocument();
        expect(userList.children).toHaveLength(2);
    });
});

test("displays the list of permissions", async () => {
    const mockPermissions = [
        { id: 1, name: "Permission 1" },
        { id: 2, name: "Permission 2" },
    ];
    permissionsController.getAllPermissions = jest.fn().mockResolvedValue(mockPermissions);
    render(<Dashboard />);
    await waitFor(() => {
        const permissionsList = screen.getByTestId("permissions-list");
        expect(permissionsList).toBeInTheDocument();
        expect(permissionsList.children).toHaveLength(2);
    });
});
test("displays the correct project details", async () => {
    const mockProjectDetails = {
        id: 1,
        name: "Project 1",
        description: "This is project 1",
        status: "Active",
    };
    projectsController.getProject = jest.fn().mockResolvedValue(mockProjectDetails);
    render(<Dashboard />);
    await waitFor(() => {
        const projectDetails = screen.getByTestId("project-details");
        expect(projectDetails).toBeInTheDocument();
        expect(projectDetails).toHaveTextContent("Project 1");
        expect(projectDetails).toHaveTextContent("This is project 1");
        expect(projectDetails).toHaveTextContent("Active");
    });
});
