import {React} from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./components/accounts/Login";
import Register from "./components/accounts/Register";
import Header from "./components/layouts/Header";
import RecipeCreate from "./components/recipe/RecipeCreate";
import RecipeDetail from "./components/recipe/RecipeDetail";
import Recipes from "./components/recipe/Recipes";
import WithPrivateRoute from "./utils/WithPrivateRoute";

import Profile from "./components/accounts/Profile";

import IngredientListing from "./components/ingredient/IngredientListing";
import Favourites from "./components/recipe/Favourites";
import Suggested from "./components/recipe/SuggestedRecipes";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Recipes />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route
          exact
          path="/recipe/:id"
          element={
            <WithPrivateRoute>
              <RecipeDetail />
            </WithPrivateRoute>
          }
        />
        <Route
          exact
          path="/favourites"
          element={
            <WithPrivateRoute>
              <Favourites />
            </WithPrivateRoute>
          }
        />
        <Route
          exact
          path="/suggested"
          element={
            <WithPrivateRoute>
              <Suggested />
            </WithPrivateRoute>
          }
        />
        <Route
          exact
          path="/recipe/create"
          element={
            <WithPrivateRoute>
              <RecipeCreate />
            </WithPrivateRoute>
          }
        />
        <Route
          exact
          path="/my-profile"
          element={
            <WithPrivateRoute>
              <Profile />
            </WithPrivateRoute>
          }
        />
        <Route
          exact
          path="/ingredients"
          element={
            <WithPrivateRoute>
              <IngredientListing />
            </WithPrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
