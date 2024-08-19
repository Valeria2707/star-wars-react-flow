import { renderHook } from "@testing-library/react";
import useGraphElements from "../useGraphElements";
import { Film, Person, Starship } from "../../types/star-wars.types";

const mockPerson: Person = {
  name: "Luke Skywalker",
  gender: "male",
  films: ["https://swapi.dev/api/films/1/"],
  starships: ["https://swapi.dev/api/starships/12/"],
  url: "https://swapi.dev/api/people/1/",
  created: "2014-12-09T13:50:51.644000Z",
};

const mockFilms: Film[] = [
  {
    title: "A New Hope",
    url: "https://swapi.dev/api/films/1/",
    starships: ["https://swapi.dev/api/starships/12/"],
  },
  {
    title: "The Empire Strikes Back",
    url: "https://swapi.dev/api/films/2/",
    starships: [],
  },
];

const mockStarships: Starship[] = [
  { name: "X-Wing", url: "https://swapi.dev/api/starships/12/" },
];

describe("useGraphElements", () => {
  it("returns empty nodes and edges when no person is selected", () => {
    const { result } = renderHook(() => useGraphElements(null, [], []));

    expect(result.current.nodes).toEqual([]);
    expect(result.current.edges).toEqual([]);
  });

  it("creates edges between films and common starships", () => {
    const { result } = renderHook(() =>
      useGraphElements(mockPerson, mockFilms, mockStarships)
    );

    expect(result.current.edges).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: "film-0-starship-0",
          source: "film-0",
          target: "starship-0",
        }),
      ])
    );
  });
});
