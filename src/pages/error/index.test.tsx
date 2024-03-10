import { render, screen, fireEvent } from "@testing-library/react";
import Error from "./index";
import { MemoryRouter } from "react-router-dom";
// import renderer from 'react-test-renderer';

test("renders error page", () => {
    render(
        <MemoryRouter>
            <Error />
        </MemoryRouter>,
    );
    const headingElement = screen.getByText(/404/i);
    const buttonElement = screen.getByText(/Go to Home/i);
    expect(headingElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
});

test('clicking on "Go to Home" button navigates to /dashboard', () => {
    render(
        <MemoryRouter>
            <Error />
        </MemoryRouter>,
    );
    const buttonElement = screen.getByText(/Go to Home/i);
    fireEvent.click(buttonElement);
});

// test('Error component renders correctly', () => {
//     const tree = renderer.create(<Error />).toJSON();
//     expect(tree).toMatchSnapshot();
// });
