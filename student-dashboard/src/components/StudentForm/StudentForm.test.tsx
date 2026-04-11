import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import StudentForm from "./StudentForm";

test("must call the add function when the form is submitted", () => {
  const mockAdd = vi.fn();
  render(<StudentForm onAdd={mockAdd} />);

  fireEvent.change(screen.getByLabelText(/Name/i), {
    target: { value: "Ruaa" },
  });
  fireEvent.change(screen.getByLabelText(/Email/i), {
    target: { value: "test@test.com" },
  });
  fireEvent.change(screen.getByLabelText(/GPA/i), { target: { value: "3.5" } });

  fireEvent.click(screen.getByRole("button", { name: /Add Student/i }));

  expect(mockAdd).toHaveBeenCalled();
});
