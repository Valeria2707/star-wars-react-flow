import { renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { useStarshipData } from "../useStarshipData";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Person } from "../../types/star-wars.types";

const mockPerson: Person = {
  name: "Luke Skywalker",
  gender: "male",
  films: ["https://swapi.dev/api/films/1/"],
  starships: ["https://swapi.dev/api/starships/12/"],
  url: "https://swapi.dev/api/people/1/",
  created: "2014-12-09T13:50:51.644000Z",
};

vi.spyOn(globalThis, "fetch").mockImplementation((url) => {
  if (url === "https://swapi.dev/api/starships/12/") {
    return Promise.resolve({
      json: () => Promise.resolve({ name: "X-Wing", url }),
    } as Response);
  }
  return Promise.reject(new Error("Unknown URL"));
});

const queryClient = new QueryClient();

describe("useStarshipData", () => {
  it("fetches starship data for the selected person", async () => {
    const { result } = renderHook(() => useStarshipData(mockPerson), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    await waitFor(() => {
      expect(result.current[0].data).toEqual({
        name: "X-Wing",
        url: "https://swapi.dev/api/starships/12/",
      });
    });

    expect(result.current[0].isError).toBe(false);
  });

  it("returns an empty array if no person is selected", () => {
    const { result } = renderHook(() => useStarshipData(null), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    expect(result.current).toEqual([]);
  });
});
