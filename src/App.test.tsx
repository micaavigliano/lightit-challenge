import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders main container", () => {
  const { getByTestId } = render(<App />);

  const hasMainElement = getByTestId("app-id");
  expect(hasMainElement).toBeInTheDocument();
});
