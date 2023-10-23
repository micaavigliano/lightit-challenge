import React from "react";
import { render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddUserForm from "../AddUserForm";
import { UserContext } from "../../context/UserDataContext";
import { mockUserContextValue } from "../../context/mockContext";

describe("renders Form component to add new users to the system", () => {
  it("it renders the component", () => {
    const { container } = render(
      <UserContext.Provider value={mockUserContextValue}>
        <AddUserForm />
      </UserContext.Provider>
    );

    const form = container.querySelector("form");

    const submitEvent = new Event("submit", {
      bubbles: true,
      cancelable: true,
    });
    fireEvent(form!, submitEvent);

    expect(submitEvent.defaultPrevented).toBe(true);
  });

  it("it updates the input value successfully on website input change", () => {
    const { getByTestId } = render(
      <UserContext.Provider value={mockUserContextValue}>
        <AddUserForm />
      </UserContext.Provider>
    );
    const websiteInput = getByTestId("website-id");

    fireEvent.change(websiteInput, {
      target: { value: "www.websitetest.com" },
    });
  });

  it("it updates the input value successfully on name input change", () => {
    const { getByTestId } = render(
      <UserContext.Provider value={mockUserContextValue}>
        <AddUserForm />
      </UserContext.Provider>
    );
    const websiteInput = getByTestId("name-id");

    fireEvent.change(websiteInput, {
      target: { value: "Mica" },
    });
  });

  it("it updates the input value successfully on description input change", () => {
    const { getByTestId } = render(
      <UserContext.Provider value={mockUserContextValue}>
        <AddUserForm />
      </UserContext.Provider>
    );
    const websiteInput = getByTestId("desc-id");

    fireEvent.change(websiteInput, {
      target: { value: "blabla" },
    });
  });

  it("should set isFormReady to true when all fields are valid", () => {
    const { getByTestId } = render(
      <UserContext.Provider value={mockUserContextValue}>
        <AddUserForm />
      </UserContext.Provider>
    );
    const nameInput = getByTestId("name-id");
    const descInput = getByTestId("desc-id");
    const websiteInput = getByTestId("website-id");
    const submitButton = getByTestId("submit-id");

    userEvent.type(nameInput, "John");
    userEvent.type(descInput, "Description");
    userEvent.type(websiteInput, "https://example.com");

    expect(submitButton).not.toBeDisabled();
  });
});
