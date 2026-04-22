// @jest-environment jsdom
import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import StudentForm from "./StudentForm";
import { StudentContext } from "../../context/StudentContext";

test("must call the add function when the form is submitted", () => {
  const mockAdd = vi.fn().mockResolvedValue(undefined);
  render(
    <StudentContext.Provider value={{
      students: [],
      loading: false,
      error: null,
      addStudent: mockAdd,
      removeStudent: vi.fn().mockResolvedValue(undefined),
    }}>
      <StudentForm />
    </StudentContext.Provider>
  );

  fireEvent.change(screen.getByLabelText(/Full Name/i), {
    target: { value: "Ruaa" },
  });
  fireEvent.change(screen.getByLabelText(/Email/i), {
    target: { value: "test@test.com" },
  });
  fireEvent.change(screen.getByLabelText(/Course/i), {
    target: { value: "Computer Science" },
  });
  fireEvent.change(screen.getByLabelText(/GPA/i), { target: { value: "3.5" } });

  fireEvent.click(screen.getByRole("button", { name: /Add Student/i }));

  expect(mockAdd).toHaveBeenCalled();
});
