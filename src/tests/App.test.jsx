import { render, waitFor } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import App from "../App";

expect.extend(toHaveNoViolations);

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      text: () => Promise.resolve("hello\nworld\nthe\nfox"),
    }),
  );
});

test("App has no accessibility violations", async () => {
  const { container } = render(<App />);
  await waitFor(() => expect(global.fetch).toHaveBeenCalled());
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
