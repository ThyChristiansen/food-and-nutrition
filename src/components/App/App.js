import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

// import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import Recipes from '../Recipes/Recipes';
import RecipeDetailPage from '../Recipes/RecipeDetailPage';
import './App.css';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import FindRecipes from '../Recipes/FindRecipes';
import RandomRecipeList from '../Recipes/RandomRecipeList';
import Calendar from '../Calendar/Calendar';
import CalendarMealPlanDetail from '../Calendar/CalendarMealPlanDetail';


class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' })
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
            <Route
              exact
              path="/home"
              component={LandingPage}
            />
            <Route
              exact
              path="/sign-in"
              component={LoginPage}
            />
            <Route
              exact
              path="/sign-up"
              component={RegisterPage}
            />
            <ProtectedRoute
              exact
              path="/home"
              component={LandingPage}
            />
            <ProtectedRoute
              exact
              path="/info"
              component={InfoPage}
            />
            <ProtectedRoute
              exact
              path="/recipes"
              component={Recipes}
            />
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
             <ProtectedRoute
              path="/calendar"
              component={Calendar}
            />
            <ProtectedRoute
              path="/meal-detail/:id"
              component={CalendarMealPlanDetail}
            />

            <Route render={() => <h1>404</h1>} />

          </Switch>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default connect()(App);
