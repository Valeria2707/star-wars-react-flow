import { useQueries } from "@tanstack/react-query";
import { Person } from "../types/star-wars.types";

const useFilmData = (selectedPerson: Person | null) => {
  return useQueries({
    queries: selectedPerson
      ? selectedPerson.films.map((filmUrl) => ({
          queryKey: ["film", filmUrl],
          queryFn: () => fetch(filmUrl).then((res) => res.json()),
        }))
      : [],
  }).map((query) => ({
    data: query.data,
    isError: query.isError,
    error: query.error,
  }));
};

export { useFilmData };
