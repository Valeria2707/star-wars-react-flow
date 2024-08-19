import { useState, useEffect, useRef } from "react";
import Graph from "../graph/Graph";
import Pagination from "../pagination/Pagination";
import useGraphElements from "../../hooks/useGraphElements";
import PersonList from "../people-list/PeopleList";
import { Person } from "../../types/star-wars.types";
import Loader from "../loader/Loader";
import { ErrorMessage } from "./StarWarsWidgetStyles";
import useStarWarsData from "../../hooks/useStarWarsData";

export default function StarWarsWidget() {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [page, setPage] = useState(1);
  const graphRef = useRef<HTMLDivElement>(null);

  const {
    dataPeople,
    isErrorPeople,
    isFetchingPeople,
    errorPeople,
    films,
    filmErrors,
    starshipErrors,
    commonStarships,
  } = useStarWarsData(page, selectedPerson);

  const totalPages = dataPeople ? Math.ceil(dataPeople.count / 10) : 1;

  const { nodes, edges } = useGraphElements(
    selectedPerson,
    films,
    commonStarships
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    if (selectedPerson && graphRef.current) {
      graphRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedPerson]);

  if (isFetchingPeople) return <Loader />;

  if (isErrorPeople && errorPeople)
    return <ErrorMessage>{errorPeople.message}</ErrorMessage>;

  if (filmErrors.length > 0)
    return <ErrorMessage>Failed to fetch some films</ErrorMessage>;

  if (starshipErrors.length > 0)
    return <ErrorMessage>Failed to fetch some starships</ErrorMessage>;

  return (
    <>
      <PersonList
        people={dataPeople?.results || []}
        onSelect={setSelectedPerson}
      />
      <Pagination
        onPageChange={handlePageChange}
        currentPage={page}
        totalPages={totalPages}
      />
      {selectedPerson && (
        <div ref={graphRef}>
          <Graph nodes={nodes} edges={edges} />
        </div>
      )}
    </>
  );
}
