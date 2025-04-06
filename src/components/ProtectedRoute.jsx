import React from 'react'
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'

const ProtectedRoute = ({ children }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn redirectUrl="/sign-in" />
      </SignedOut>
    </>
  )
}

export default React.memo(ProtectedRoute);
