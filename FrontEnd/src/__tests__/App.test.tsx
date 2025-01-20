import { render } from "@testing-library/react";
import App from "../App";

test("test-demo", () => {
  expect(true).toBe(true);
});

test("Render main page", () => {
  render(<App />);
  expect(true).toBe(true);
});
