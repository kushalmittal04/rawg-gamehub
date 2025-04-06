import React from "react";
import { UserButton, SignInButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import "../styles/auth.css";

const AuthButtons = () => {
  return (
    <div className="auth-buttons">
      <SignedIn>
        <UserButton 
          afterSignOutUrl="/" 
          appearance={{
            elements: {
              userButtonPopoverCard: "clerk-dropdown",
              userButtonPopoverActionButton: "clerk-dropdown-item",
              userButtonPopoverActionButtonHover: "clerk-dropdown-item-hover"
            }
          }} 
        />
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal" />
      </SignedOut>
    </div>
  );
};

export default React.memo(AuthButtons);
