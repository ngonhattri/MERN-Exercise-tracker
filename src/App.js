import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import ExerciseList from "./components/exercise-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";


function App() {
  return (
    <Router>
      <Navbar />
      <br/>
      <Route path="/" exact component={ExerciseList}></Route>
      <Route path="/edit/:id" exact component={EditExercise}></Route>
      <Route path="/create" exact component={CreateExercise}></Route>
      <Route path="/user" exact component={CreateUser}></Route>
    </Router>
  );
}

export default App;
