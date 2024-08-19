import { useQueries } from "@tanstack/react-query";
import { Person } from "../types/star-wars.types";

const useStarshipData = (selectedPerson: Person | null) => {
  return useQueries({
    queries: selectedPerson
      ? selectedPerson.starships.map((starshipUrl) => ({
          queryKey: ["starship", starshipUrl],
          queryFn: () => fetch(starshipUrl).then((res) => res.json()),
        }))
      : [],
  }).map((query) => ({
    data: query.data,
    isError: query.isError,
    error: query.error,
  }));
};

export { useStarshipData };
