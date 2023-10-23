import { render, screen, act, renderHook } from "@testing-library/react";
import useDataFetching from "../useDataFetching";

describe("useDataFetching Custom Hook", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.reject(new Error("Fetch error")));
  });

  it("should set data and loading states correctly", async () => {
    const mockData = {
      avatar: "",
      name: "",
      description: "",
      website: "",
      id: 0,
    };
    (global as any).fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    );

    const url = "https://63bedcf7f5cfc0949b634fc8.mockapi.io/users";

    const TestComponent = () => {
      const { data, loading } = useDataFetching(url);

      return (
        <div>
          <div data-testid="loading">{loading ? "Loading" : "Not Loading"}</div>
          <div data-testid="data">{JSON.stringify(data)}</div>
        </div>
      );
    };

    await act(async () => {
      render(<TestComponent />);
    });
    expect(screen.findByTestId("loading"));

    await screen.findByTestId("data");
    expect(screen.getByTestId("data")).toHaveTextContent(
      JSON.stringify(mockData)
    );
  });

  it("should set error state when fetch fails", async () => {
    const url = "https://63bedcf7f5cfc0949b634fc8.mockapi.io/users";
    const TestComponent = () => {
      const { error } = useDataFetching(url);

      return (
        <div>
          <div data-testid="error-id">{error ? "error" : "Not error"}</div>
        </div>
      );
    };

    await act(async () => {
      render(<TestComponent />);
    });

    expect(screen.findByTestId("error-id"));
  });
});
