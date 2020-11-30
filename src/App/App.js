import React, { Component } from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import { connect } from "react-redux";

import Nav from "../components/Nav/Nav";
import Footer from "../components/Footer/Footer";

import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import LandingPage from "../pages/LandingPage";
import Recipes from "../pages/RecipesMainPage";
import RecipeDetailPage from "../pages/RecipeDetailPage";
import "./App.css";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import FindRecipes from "../pages/FindRecipes";
import RandomRecipeList from "../components/Recipes/RandomRecipeList";
import FavoriteList from "../pages/FavoriteList";
import Calendar from "../pages/Calendar/CalendarPage";
import PaymentKeepTrack from "../pages/PaymentKeepTrack";

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: "FETCH_USER" });
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route exact path="/home" component={LandingPage} />
            <Route exact path="/sign-in" component={LoginPage} />
            <Route exact path="/sign-up" component={RegisterPage} />

            <ProtectedRoute exact path="/home" component={LandingPage} />

            <ProtectedRoute exact path="/recipes" component={Recipes} />
            <ProtectedRoute
              exact
              path="/find-recipes"
              component={FindRecipes}
            />

            <ProtectedRoute
              path="/recipe/:id/:recipe_name"
              component={RecipeDetailPage}
            />

            <ProtectedRoute
              path="/recipes/type-meal/:type_meal"
              component={RandomRecipeList}
            />

            <ProtectedRoute path="/calendar" component={Calendar} />
            <ProtectedRoute path="/favorite-recipes" component={FavoriteList} />
            <ProtectedRoute
              path="/payment-keep-track"
              component={PaymentKeepTrack}
            />

            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default connect()(App);
