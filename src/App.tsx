import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import CompleteTodos from "./components/pages/CompleteTodos";
import SignInPage from "./components/auth/SignInPage";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import React from "react";
import { PrivateLayout } from "./components/auth/Privatelayout";
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateLayout>
              <SignedIn>
                <Home />
              </SignedIn>
            </PrivateLayout>
          }
        />
        <Route
          path="/complete"
          element={
            <PrivateLayout>
              <SignedIn>
                <CompleteTodos />
              </SignedIn>
            </PrivateLayout>
          }
        />

        <Route
          path="/login"
          element={
            <SignedOut>
              <SignInPage />
            </SignedOut>
          }
        />
      </Routes>
    </React.Fragment>
  );
}

export default App;
