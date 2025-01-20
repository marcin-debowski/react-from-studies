import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
//import App from "../App";
import App from "../App";

const mockTasks = [
  { id: 1, name: "Task 1", completed: false },
  { id: 2, name: "Task 2", completed: true },
];

beforeEach(() => {
  global.fetch = jest.fn((url, options) => {
    if (
      url === "http://localhost:8080/tasks" &&
      (!options || options.method === "GET")
    ) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ tasks: mockTasks }),
      });
    } else if (
      url === "http://localhost:8080/tasks" &&
      options.method === "POST"
    ) {
      const newTask = JSON.parse(options.body);
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ task: { ...newTask, id: 3 } }),
      });
    } else if (
      url.startsWith("http://localhost:8080/tasks/") &&
      options.method === "DELETE"
    ) {
      return Promise.resolve({ ok: true });
    } else if (
      url.startsWith("http://localhost:8080/tasks/") &&
      options.method === "PATCH"
    ) {
      const updatedTask = JSON.parse(options.body);
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            task: { ...updatedTask, id: parseInt(url.split("/").pop(), 10) },
          }),
      });
    }
    return Promise.reject(new Error("Unknown request"));
  }) as jest.Mock;
});

test("loads and displays tasks", async () => {
  render(<App />);
  await waitFor(() => {
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });
});

test("adds a new task", async () => {
  render(<App />);

  fireEvent.change(screen.getByPlaceholderText("Add a new task"), {
    target: { value: "New Task" },
  });
  fireEvent.click(screen.getByText("Add Task"));

  await waitFor(() => {
    expect(screen.getByText("New Task")).toBeInTheDocument();
  });
});

test("deletes a task", async () => {
  render(<App />);

  await waitFor(() => {
    expect(screen.getByText("Task 1")).toBeInTheDocument();
  });

  const task1 = screen.getByText("Task 1");
  if (!task1) {
    throw new Error("Task 1 not found");
  }

  const deleteButton = task1.closest("li")?.querySelector(".delete-btn");
  if (!deleteButton) {
    throw new Error("Delete button for Task 1 not found");
  }

  fireEvent.click(deleteButton);

  await waitFor(() => {
    expect(screen.queryByText("Task 1")).not.toBeInTheDocument();
  });
});

test("toggles a task's completion status", async () => {
  render(<App />);

  await waitFor(() => {
    expect(screen.getByText("Task 1")).toBeInTheDocument();
  });

  const task1 = screen.getByText("Task 1");
  if (!task1) {
    throw new Error("Task 1 not found");
  }

  const toggleButton = task1
    .closest("div")
    ?.querySelector(".completion-button");
  if (!toggleButton) {
    throw new Error("Toggle button for Task 1 not found");
  }

  fireEvent.click(toggleButton);

  await waitFor(() => {
    expect(
      screen
        .getByText("Task 1")
        .closest("div")
        ?.querySelector(".completion-button")
    ).toHaveTextContent("Complete");
  });
});

test("filters taksks", async () => {
  render(<App />);

  await waitFor(() => {
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });

  fireEvent.click(screen.getByRole("button", { name: /Completed/i }));

  await waitFor(() => {
    expect(screen.queryByText("Task 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Task 2")).toBeInTheDocument();
  });

  fireEvent.click(screen.getAllByText("Incomplete")[0]);

  await waitFor(() => {
    expect(screen.queryByText("Task 1")).toBeInTheDocument();
    expect(screen.queryByText("Task 2")).not.toBeInTheDocument();
  });

  fireEvent.click(screen.getByRole("button", { name: /ALL/i }));

  await waitFor(() => {
    expect(screen.queryByText("Task 1")).toBeInTheDocument();
    expect(screen.queryByText("Task 2")).toBeInTheDocument();
  });
});

test("filters taksks and shows correct percentage", async () => {
  render(<App />);

  await waitFor(() => {
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });

  fireEvent.click(screen.getByRole("button", { name: /Completed/i }));

  await waitFor(() => {
    expect(screen.queryByText("Task 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Task 2")).toBeInTheDocument();
    expect(screen.queryByText("Of all: 50 %")).toBeInTheDocument();
  });

  fireEvent.click(screen.getAllByText("Incomplete")[0]);

  await waitFor(() => {
    expect(screen.queryByText("Task 1")).toBeInTheDocument();
    expect(screen.queryByText("Task 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Of all: 50 %")).toBeInTheDocument();
  });

  fireEvent.click(screen.getByRole("button", { name: /ALL/i }));

  await waitFor(() => {
    expect(screen.queryByText("Task 1")).toBeInTheDocument();
    expect(screen.queryByText("Task 2")).toBeInTheDocument();
    expect(screen.queryByText("Of all: 50 %")).toBeInTheDocument();
  });
});
