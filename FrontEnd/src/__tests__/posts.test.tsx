import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App2 from "../App2";

const mockPosts = [
  { id: 1, author: "First author", body: "false something" },
  { id: 2, author: "Second Author", body: "true something" },
];

beforeEach(() => {
  global.fetch = jest.fn((url, options) => {
    if (
      url === "http://localhost:8080/posts" &&
      (!options || options.method === "GET")
    ) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ posts: mockPosts }),
      });
    } else if (
      url === "http://localhost:8080/posts" &&
      options.method === "POST"
    ) {
      const newPost = JSON.parse(options.body);
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ post: { ...newPost, id: 3 } }),
      });
    } else if (
      url.startsWith("http://localhost:8080/posts/") &&
      options.method === "DELETE"
    ) {
      return Promise.resolve({ ok: true });
    }

    return Promise.reject(new Error("Unknown request"));
  }) as jest.Mock;
});

test("loads and displays posts", async () => {
  render(<App2 />);
  await waitFor(() => {
    expect(screen.getByText("First author")).toBeInTheDocument();
    expect(screen.getByText("Second Author")).toBeInTheDocument();
  });
});

test("adds a new post", async () => {
  render(<App2 />);

  fireEvent.change(screen.getByPlaceholderText("Add a new post"), {
    target: { value: "New Post" },
  });
  fireEvent.click(screen.getByText("Add post"));

  await waitFor(() => {
    expect(screen.getByText("New Post")).toBeInTheDocument();
  });
});

test("deletes a post", async () => {
  render(<App2 />);

  await waitFor(() => {
    expect(screen.getByText("First author")).toBeInTheDocument();
  });

  const post1 = screen.getByText("First author");
  if (!post1) {
    throw new Error("First author not found");
  }

  const deleteButton = post1.closest("div")?.querySelector(".delete-btn");
  if (!deleteButton) {
    throw new Error("Delete button for First author not found");
  }

  fireEvent.click(deleteButton);

  await waitFor(() => {
    expect(screen.queryByText("First author")).not.toBeInTheDocument();
  });
});
