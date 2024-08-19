import { getDisplayedPages } from "../../utils/pagination";
import { Container, PageButton, NavButton } from "./PaginationStyles";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ currentPage, totalPages, onPageChange }: Props) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const pages = getDisplayedPages(totalPages, currentPage);

  return (
    <Container>
      <NavButton onClick={handlePrevious} disabled={currentPage === 1}>
        &lt;
      </NavButton>
      {pages.map((page, index) => (
        <PageButton
          key={index}
          onClick={() => typeof page === "number" && onPageChange(page)}
          $isCurrent={page === currentPage || false}
          disabled={typeof page !== "number"}
        >
          {page}
        </PageButton>
      ))}
      <NavButton onClick={handleNext} disabled={currentPage === totalPages}>
        &gt;
      </NavButton>
    </Container>
  );
};

export default Pagination;
