import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import AppAllInOne from "../AppAllInOne.tsx";

test("switch sites task", async () => {
  render(<AppAllInOne />);

  fireEvent.click(screen.getByText("task"));
  expect(screen.getByText("Add Task")).toBeInTheDocument();
  fireEvent.click(screen.getByText("post"));
  expect(screen.getByText("Add post")).toBeInTheDocument();
});
