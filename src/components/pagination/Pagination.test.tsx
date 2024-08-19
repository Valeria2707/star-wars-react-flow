import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination";
import { getDisplayedPages } from "../../utils/pagination";
import { describe, it, expect, vi } from "vitest";

describe("Pagination component", () => {
  const mockOnPageChange = vi.fn();

  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  it("should render the correct number of pages", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    for (let i = 1; i <= 5; i++) {
      expect(screen.getByText(String(i))).toBeInTheDocument();
    }
  });

  it("should call onPageChange with the correct page number when a page button is clicked", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    fireEvent.click(screen.getByText("3"));

    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it("should disable the previous button on the first page", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText("<")).toBeDisabled();
  });

  it("should disable the next button on the last page", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText(">")).toBeDisabled();
  });

  it("should call onPageChange with the previous page when the previous button is clicked", () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    fireEvent.click(screen.getByText("<"));

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it("should call onPageChange with the next page when the next button is clicked", () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    fireEvent.click(screen.getByText(">"));

    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });

  it("should not call onPageChange if the previous button is clicked on the first page", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    fireEvent.click(screen.getByText("<"));

    expect(mockOnPageChange).not.toHaveBeenCalled();
  });

  it("should not call onPageChange if the next button is clicked on the last page", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    fireEvent.click(screen.getByText(">"));

    expect(mockOnPageChange).not.toHaveBeenCalled();
  });
});

describe("getDisplayedPages function", () => {
  it("should return all pages when totalPages is 5 or less", () => {
    expect(getDisplayedPages(3, 1)).toEqual([1, 2, 3]);
    expect(getDisplayedPages(5, 3)).toEqual([1, 2, 3, 4, 5]);
  });

  it("should return the correct pages when on the first three pages", () => {
    expect(getDisplayedPages(10, 1)).toEqual([1, 2, 3, 4, "...", 10]);
    expect(getDisplayedPages(10, 3)).toEqual([1, 2, 3, 4, "...", 10]);
  });

  it("should return the correct pages when on the last three pages", () => {
    expect(getDisplayedPages(10, 8)).toEqual([1, "...", 7, 8, 9, 10]);
    expect(getDisplayedPages(10, 10)).toEqual([1, "...", 7, 8, 9, 10]);
  });

  it("should return the correct pages when in the middle of the page range", () => {
    expect(getDisplayedPages(10, 5)).toEqual([1, "...", 4, 5, 6, "...", 10]);
    expect(getDisplayedPages(20, 10)).toEqual([1, "...", 9, 10, 11, "...", 20]);
  });
});
