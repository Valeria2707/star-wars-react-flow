import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App";

describe("App tests", () => {
  it("renders the Star Wars logo", () => {
    render(<App />);
    const logo = screen.getByAltText("Star Wars Logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/icons/star-wars-logo.svg");
    expect(logo).toHaveAttribute("width", "200");
    expect(logo).toHaveAttribute("height", "200");
  });

  it("renders the StarWarsWidget component", () => {
    render(<App />);
    const widget = screen.getByTestId("star-wars-widget");
    expect(widget).toBeInTheDocument();
  });
});
