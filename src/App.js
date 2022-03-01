import "./App.css";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Bejelentkezes } from "./Bejelentkezes";
import { SzallasLista } from "./SzallasokLista";
import { SzallasSingle } from "./SzallasSingle";
import 'bootstrap/dist/css/bootstrap.min.css';


export function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/bejelentkezes" exact component={Bejelentkezes}></Route>
        
        <Route path="/osszes-szallas" exact component={SzallasLista}></Route>

        <Route path="/szallas-:szallasId">
          {(props) => <SzallasSingle id={props.match.params.szallasId}/>}
        
        </Route>
        <Redirect to={"/bejelentkezes"} />
      </Switch>
    </BrowserRouter>
  );

}


