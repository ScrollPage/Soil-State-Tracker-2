import React from "react";
import AddForm from "./index";
import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Loginform", () => {
  it("rendering and submiting form value", async () => {
    const onSubmit = jest.fn();
    const onClose = jest.fn();
    render(<AddForm setClose={onClose} handleSubmit={onSubmit} />);

    const name = "name";

    userEvent.type(
      screen.getByPlaceholderText("Введите название группы"),
      name
    );

    userEvent.click(screen.getByText(/подтвердить/i));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(name);
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  it("error output with empty value", async () => {
    const onSubmit = jest.fn();
    const onClose = jest.fn();
    render(<AddForm setClose={onClose} handleSubmit={onSubmit} />);

    const name = "";

    userEvent.type(
      screen.getByPlaceholderText("Введите название группы"),
      name
    );

    userEvent.click(screen.getByText(/подтвердить/i));

    await waitFor(() => {
      expect(onSubmit).not.toHaveBeenCalled();
      expect(onClose).not.toHaveBeenCalled();
    });

    expect(screen.getByText("Введите название группы")).toBeInTheDocument();
  });

  it("error output with uncorrect name (bigger than 30 symbols)", async () => {
    const onSubmit = jest.fn();
    const onClose = jest.fn();
    render(<AddForm setClose={onClose} handleSubmit={onSubmit} />);

    const name = "namenamenamenamenamenamenamenamenamenamenamenamename";

    userEvent.type(
      screen.getByPlaceholderText("Введите название группы"),
      name
    );

    userEvent.click(screen.getByText(/подтвердить/i));

    await waitFor(() => {
      expect(onSubmit).not.toHaveBeenCalled();
      expect(onClose).not.toHaveBeenCalled();
    });

    expect(
      screen.getByText("Слишком длинное название группы")
    ).toBeInTheDocument();
  });
});
