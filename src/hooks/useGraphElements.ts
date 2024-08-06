import { useMemo } from "react";
import { Film, Person, Starship } from "../types/star-wars.types";

const useGraphElements = (
  selectedPerson: Person | null,
  films: Film[],
  commonStarships: Starship[]
) => {
  const graphElements = useMemo(() => {
    if (!selectedPerson) return { nodes: [], edges: [] };

    const nodes = [
      {
        id: "user",
        data: { label: selectedPerson.name },
        position: { x: 250, y: 0 },
      },
      ...films.map((film, index) => ({
        id: `film-${index}`,
        data: { label: film.title },
        position: { x: 150 + index * 200, y: 100 },
      })),
      ...commonStarships.map((starship, index) => ({
        id: `starship-${index}`,
        data: { label: starship.name },
        position: { x: 150 + index * 200, y: 300 },
      })),
    ];

    const edges = [
      ...films.map((_, index) => ({
        id: `user-film-${index}`,
        source: "user",
        target: `film-${index}`,
      })),
      ...commonStarships.flatMap((starship, sIndex) =>
        films
          .filter((film) => film.starships.includes(starship.url))
          .map((_, fIndex) => ({
            id: `film-${fIndex}-starship-${sIndex}`,
            source: `film-${fIndex}`,
            target: `starship-${sIndex}`,
          }))
      ),
    ];

    return { nodes, edges };
  }, [selectedPerson, films, commonStarships]);

  return graphElements;
};

export default useGraphElements;
