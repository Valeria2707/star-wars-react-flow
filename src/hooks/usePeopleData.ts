import { useQuery } from "@tanstack/react-query";

const usePeopleData = (page: number) => {
  return useQuery({
    queryKey: ["people", page],
    queryFn: () =>
      fetch(`https://swapi.dev/api/people/?page=${page}`).then((response) =>
        response.json()
      ),
  });
};

export { usePeopleData };
