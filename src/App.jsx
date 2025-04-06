import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { dark, neobrutalism } from '@clerk/themes';
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import Header from './components/Header';
import Home from './pages/Home';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

const GameDetails = lazy(() => import('./pages/GameDetails'));
const Library = lazy(() => import('./pages/Library'));

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <ClerkProvider 
      
      publishableKey={clerkPubKey}
      appearance={{
        baseTheme: [dark, neobrutalism],
      }}
    >
      <div className="app-container dark-theme">
        <Header />
        <main className="main-content">
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/game/:id" element={<GameDetails />} />
                <Route path="/library" element={
                  <SignedIn>
                    <Library />
                  </SignedIn>
                } />
                <Route path="/sign-in" element={
                  <SignedOut>
                    <RedirectToSignIn redirectUrl="/library" />
                  </SignedOut>
                } />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>
    </ClerkProvider>
  );
}

export default App;