import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import StarWarsWidget from "./StarWarsWidget";
import { vi } from "vitest";
import * as useStarWarsDataModule from "../../hooks/useStarWarsData";

vi.mock("../../hooks/useStarWarsData");
vi.mock("../loader/Loader", () => ({
  __esModule: true,
  default: vi.fn(() => <div>Loading...</div>),
}));
vi.mock("../people-list/PeopleList", () => ({
  __esModule: true,
  default: vi.fn(({ onSelect }) => (
    <div>
      <button onClick={() => onSelect({ name: "Luke Skywalker" })}>
        Select Luke Skywalker
      </button>
    </div>
  )),
}));
vi.mock("../pagination/Pagination", () => ({
  __esModule: true,
  default: vi.fn(({ onPageChange }) => (
    <div>
      <button onClick={() => onPageChange(2)}>Go to page 2</button>
    </div>
  )),
}));
vi.mock("../graph/Graph", () => ({
  __esModule: true,
  default: vi.fn(() => <div>Graph Component</div>),
}));

beforeAll(() => {
  window.HTMLElement.prototype.scrollIntoView = vi.fn();
});

describe("StarWarsWidget", () => {
  beforeEach(() => {
    vi.spyOn(useStarWarsDataModule, "default").mockReturnValue({
      dataPeople: { count: 20, results: [{ name: "Luke Skywalker" }] },
      isErrorPeople: false,
      isFetchingPeople: false,
      errorPeople: null,
      films: [],
      starships: [],
      filmErrors: [],
      starshipErrors: [],
      commonStarships: [],
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders PersonList and Pagination components", () => {
    render(<StarWarsWidget />);

    expect(screen.getByText("Select Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("Go to page 2")).toBeInTheDocument();
  });

  it("displays loader while fetching data", () => {
    vi.spyOn(useStarWarsDataModule, "default").mockReturnValueOnce({
      dataPeople: null,
      isErrorPeople: false,
      isFetchingPeople: true,
      errorPeople: null,
      films: [],
      starships: [],
      filmErrors: [],
      starshipErrors: [],
      commonStarships: [],
    });

    render(<StarWarsWidget />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays error message when fetching people fails", () => {
    vi.spyOn(useStarWarsDataModule, "default").mockReturnValueOnce({
      dataPeople: null,
      isErrorPeople: true,
      isFetchingPeople: false,
      errorPeople: new Error("Error fetching people"),
      films: [],
      starships: [],
      filmErrors: [],
      starshipErrors: [],
      commonStarships: [],
    });

    render(<StarWarsWidget />);

    expect(screen.getByText("Error fetching people")).toBeInTheDocument();
  });

  it("displays error message when fetching films fails", () => {
    vi.spyOn(useStarWarsDataModule, "default").mockReturnValueOnce({
      dataPeople: { count: 20, results: [{ name: "Luke Skywalker" }] },
      isErrorPeople: false,
      isFetchingPeople: false,
      errorPeople: null,
      films: [],
      starships: [], // Додано відсутнє поле starships
      filmErrors: [
        { data: null, isError: true, error: new Error("Error fetching films") },
      ],
      starshipErrors: [],
      commonStarships: [],
    });

    render(<StarWarsWidget />);

    expect(screen.getByText("Failed to fetch some films")).toBeInTheDocument();
  });

  it("displays error message when fetching starships fails", () => {
    vi.spyOn(useStarWarsDataModule, "default").mockReturnValueOnce({
      dataPeople: { count: 20, results: [{ name: "Luke Skywalker" }] },
      isErrorPeople: false,
      isFetchingPeople: false,
      errorPeople: null,
      films: [],
      starships: [],
      filmErrors: [],
      starshipErrors: [
        {
          data: null,
          isError: true,
          error: new Error("Error fetching starships"),
        },
      ],
      commonStarships: [],
    });

    render(<StarWarsWidget />);

    expect(
      screen.getByText("Failed to fetch some starships")
    ).toBeInTheDocument();
  });

  it("handles person selection and displays the graph", async () => {
    render(<StarWarsWidget />);

    fireEvent.click(screen.getByText("Select Luke Skywalker"));

    await waitFor(() =>
      expect(screen.getByText("Graph Component")).toBeInTheDocument()
    );
  });

  it("handles page change", async () => {
    render(<StarWarsWidget />);

    fireEvent.click(screen.getByText("Go to page 2"));

    await waitFor(() => {
      expect(useStarWarsDataModule.default).toHaveBeenCalledWith(2, null);
    });
  });
});
