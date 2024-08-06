import { Person } from "../../types/star-wars.types";
import { formatDate } from "../../utils/time";
import { extractLastSegment } from "../../utils/url";
import {
  Container,
  Card,
  Avatar,
  Name,
  Info,
  Button,
} from "./PersonListStyles";

type Props = {
  people: Person[];
  onSelect: (person: Person | null) => void;
};

export default function PersonList({ people, onSelect }: Props) {
  return (
    <Container>
      {people.map((person) => (
        <Card key={person.url}>
          <Avatar
            width={80}
            height={80}
            alt={person.name}
            src={`https://starwars-visualguide.com/assets/img/characters/${extractLastSegment(
              person.url
            )}.jpg`}
          />
          <Name>{person.name}</Name>
          <Info>Created: {formatDate(person.created)}</Info>
          <Info>Gender: {person.gender}</Info>
          <Button onClick={() => onSelect(person)}>More info</Button>
        </Card>
      ))}
    </Container>
  );
}
