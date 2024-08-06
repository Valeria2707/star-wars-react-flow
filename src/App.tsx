import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import StarWarsWidget from "./components/star-wars-widget/StarWarsWidget";
import { Container, Logo } from "./AppStyles";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <Logo
          src="/public/icons/star-wars-logo.svg"
          alt="Star Wars Logo"
          width="200"
          height="200"
        />
        <StarWarsWidget />
      </Container>
    </QueryClientProvider>
  );
}

export default App;
