import { useState, useEffect, useRef } from "react";
import Graph from "../graph/Graph";
import Pagination from "../pagination/Pagination";
import { usePeopleData } from "../../hooks/usePeopleData";
import { useFilmData } from "../../hooks/useFilmData";
import { useStarshipData } from "../../hooks/useStarshipData";
import useGraphElements from "../../hooks/useGraphElements";
import PersonList from "../people-list/PeopleList";
import { Person } from "../../types/star-wars.types";
import Loader from "../loader/Loader";
import { ErrorMessage } from "./StarWarsWidgetStyles";

export default function StarWarsWidget() {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [page, setPage] = useState(1);
  const graphRef = useRef<HTMLDivElement>(null);

  const peopleQuery = usePeopleData(page);
  const filmQueries = useFilmData(selectedPerson);
  const starshipQueries = useStarshipData(selectedPerson);

  const {
    data: dataPeople,
    isError: isErrorPeople,
    isFetching: isFetchingPeople,
    error: errorPeople,
  } = peopleQuery;

  const films = filmQueries.map((query) => query.data).filter(Boolean);
  const starships = starshipQueries.map((query) => query.data).filter(Boolean);

  const commonStarships = starships.filter((starship) =>
    films.flatMap((film) => film.starships).includes(starship.url)
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const totalPages = dataPeople ? Math.ceil(dataPeople.count / 10) : 1;

  const { nodes, edges } = useGraphElements(
    selectedPerson,
    films,
    commonStarships
  );

  useEffect(() => {
    if (selectedPerson && graphRef.current) {
      graphRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedPerson]);

  if (isFetchingPeople) return <Loader />;
  if (isErrorPeople) return <ErrorMessage>{errorPeople.message}</ErrorMessage>;

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
