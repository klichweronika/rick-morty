import { Route, Switch } from "react-router-dom";
import CharacterContainer from "./character/CharacterContainer";
import CharactersPage from "./CharactersPage";

export const CharactersRoutes = () => {
  return (
    <Switch>
      <Route path="/character/:id">
        <CharacterContainer />
      </Route>
      <Route path="/">
        <CharactersPage />
      </Route>
    </Switch>
  );
};

export const Root = "/";
export const CharacterRoute = (id: number) => `/character/${id}`;
