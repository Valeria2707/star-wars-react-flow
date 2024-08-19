import { Person } from "../types/star-wars.types";
import { useFilmData } from "./useFilmData";
import { usePeopleData } from "./usePeopleData";
import { useStarshipData } from "./useStarshipData";

const useStarWarsData = (page: number, selectedPerson: Person | null) => {
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
  const filmErrors = filmQueries.filter((query) => query.isError);
  const starships = starshipQueries.map((query) => query.data).filter(Boolean);
  const starshipErrors = starshipQueries.filter((query) => query.isError);

  const commonStarships = starships.filter((starship) =>
    films.flatMap((film) => film.starships).includes(starship.url)
  );

  return {
    dataPeople,
    isErrorPeople,
    isFetchingPeople,
    errorPeople,
    films,
    filmErrors,
    starships,
    starshipErrors,
    commonStarships,
  };
};

export default useStarWarsData;
