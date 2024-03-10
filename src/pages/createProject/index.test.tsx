import { render, screen, fireEvent } from "@testing-library/react";
import CreateProject from "./index";
import projectsController from "~/services/projects";

test("renders CreateProject component", () => {
    render(<CreateProject />);
    const linkElement = screen.getByText(/Shto projekt/i);
    expect(linkElement).toBeInTheDocument();
});

test("form submission", () => {
    render(<CreateProject />);
    projectsController.addProject = jest.fn().mockResolvedValue({ success: true });
    fireEvent.change(screen.getByLabelText(/Emri/i), {
        target: { value: "Test Project" },
    });
    fireEvent.change(screen.getByLabelText(/Pershkrim/i), {
        target: { value: "Test Description" },
    });
    fireEvent.click(screen.getByText(/Ruaj ndryshimet/i));
    expect(projectsController.addProject).toHaveBeenCalledWith({
        emriProjekt: "Test Project",
        pershkrimProjekt: "Test Description",
    });
    expect(screen.getByText(/Ruajtja e ndryshimeve me sukses/i)).toBeInTheDocument();
});

test("form validation", () => {
    render(<CreateProject />);
    fireEvent.change(screen.getByLabelText(/Emri/i), { target: { value: "" } });
    fireEvent.change(screen.getByLabelText(/Pershkrim/i), {
        target: { value: "" },
    });
    fireEvent.click(screen.getByText(/Ruaj ndryshimet/i));
    expect(screen.getByText(/required/i)).toBeInTheDocument();
});

test("handleDataChange updates formData state", () => {
    render(<CreateProject />);
    fireEvent.change(screen.getByLabelText(/Emri/i), {
        target: { value: "Test Project" },
    });
    fireEvent.change(screen.getByLabelText(/Pershkrim/i), {
        target: { value: "Test Description" },
    });
    // @ts-ignore
    expect(formData).toEqual({
        emriProjekt: "Test Project",
        pershkrimProjekt: "Test Description",
    });
});

test("handleResetFromParent resets the form", () => {
    render(<CreateProject />);
    fireEvent.change(screen.getByLabelText(/Emri/i), {
        target: { value: "Test Project" },
    });
    fireEvent.change(screen.getByLabelText(/Pershkrim/i), {
        target: { value: "Test Description" },
    });
    fireEvent.click(screen.getByText(/Anullo/i));
    // @ts-ignore
    expect(formikRef.current?.values).toEqual({
        userId: "",
        emriProjekt: "",
        pershkrimProjekt: "",
    });
});
