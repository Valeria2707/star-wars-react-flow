import { render, screen, fireEvent } from "@testing-library/react";
import { Person } from "../../types/star-wars.types";
import { describe, it, expect, vi } from "vitest";
import PersonList from "./PeopleList";

describe("PersonList", () => {
  const mockPeople: Person[] = [
    {
      name: "Luke Skywalker",
      gender: "male",
      films: [],
      starships: [],
      url: "https://swapi.dev/api/people/1/",
      created: "2014-12-09T13:50:51.644000Z",
    },
    {
      name: "Leia Organa",
      gender: "female",
      films: [],
      starships: [],
      url: "https://swapi.dev/api/people/5/",
      created: "2014-12-10T15:20:09.791000Z",
    },
  ];

  it("should render the list of people", () => {
    render(<PersonList people={mockPeople} onSelect={() => {}} />);

    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("Leia Organa")).toBeInTheDocument();

    expect(screen.getByText("Gender: male")).toBeInTheDocument();
    expect(screen.getByText("Gender: female")).toBeInTheDocument();

    expect(
      screen.getByText((content) => content.includes("09 December 2014"))
    ).toBeInTheDocument();
    expect(
      screen.getByText((content) => content.includes("10 December 2014"))
    ).toBeInTheDocument();
  });

  it("should call onSelect with the correct person when the button is clicked", () => {
    const mockOnSelect = vi.fn();
    render(<PersonList people={mockPeople} onSelect={mockOnSelect} />);

    fireEvent.click(screen.getAllByText("More info")[0]);

    expect(mockOnSelect).toHaveBeenCalledWith(mockPeople[0]);
  });

  it("should render the correct avatar image based on the person URL", () => {
    render(<PersonList people={mockPeople} onSelect={() => {}} />);

    const avatarImages = screen.getAllByRole("img");
    expect(avatarImages[0]).toHaveAttribute(
      "src",
      "https://starwars-visualguide.com/assets/img/characters/1.jpg"
    );
    expect(avatarImages[1]).toHaveAttribute(
      "src",
      "https://starwars-visualguide.com/assets/img/characters/5.jpg"
    );
  });
});
