import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "./utils/firebase";
import LandingPage from "./pages/LandingPage";
import LearnPage from "./pages/LearnPage";
import AboutPage from "./pages/AboutPage";
import LibraryPage from "./pages/LibraryPage";
import EditorPage from "./pages/EditorPage";
import AccountSettingsPage from "./pages/AccountSettingsPage";
import LoadingPage from "./pages/LoadingPage";

const App: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);

  return loading ? (
    <LoadingPage />
  ) : (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user ? <LibraryPage user={user} /> : <LandingPage />}
        />
        <Route path="/learn" element={<LearnPage />} />
        <Route path="/about" element={<AboutPage />} />
        {user && (
          <>
            <Route
              path="/settings"
              element={<AccountSettingsPage user={user} />}
            />
            <Route path="/edit/:id" element={<EditorPage />} />
          </>
        )}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
