// headers.jsx
import React from "react";
import {
  Navbar,
  Container,
  Form,
  InputGroup,
  Button
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery, resetFilters } from "../redux/gameSlice";
import { useNavigate } from "react-router-dom";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { FaSearch, FaBookmark } from "react-icons/fa";
import logo from "../assets/images/logo.webp";
import "../styles/headers.css";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchQuery = useSelector((state) => state.games.searchQuery);

  const handleHomeClick = () => {
    dispatch(resetFilters());
    dispatch(setSearchQuery(""));
    navigate("/");
    window.scrollTo(0, 0);
  };

  return (
    <Navbar expand="lg" className="header shadow-sm">
      <Container>
        <Navbar.Brand onClick={handleHomeClick} className="brand">
          <img src={logo} alt="GameHub Logo" className="logo" />
          <span className="brand-text">GameHub</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav" className="justify-content-between">
          <Form className="search-form mx-auto my-2 my-lg-0">
            <InputGroup>
              <InputGroup.Text className="search-icon">
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                type="search"
                placeholder="Search games..."
                className="search-bar"
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              />
            </InputGroup>
          </Form>

          <div className="d-flex align-items-center auth-buttons">
            <SignedIn>
              <Button
                variant="outline-warning"
                className="library-btn me-3"
                onClick={() => navigate("/library")}
              >
                <FaBookmark className="me-2" />
                Library
              </Button>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="primary" className="sign-in-btn">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default React.memo(Header);
