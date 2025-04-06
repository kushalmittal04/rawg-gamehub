import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchGamesAsync, fetchFilterOptionsAsync } from "../redux/gameSlice";
import Sidebar from "../components/Sidebar";
import GameList from "../components/GameList";
import "../styles/home.css";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch first 40 games
    dispatch(fetchGamesAsync({ 
      page: 1,
      page_size: 40  // Explicitly set page size
    }));
    dispatch(fetchFilterOptionsAsync());
  }, [dispatch]);
  
  return (
    <Container fluid className="main-container">
      <Row>
        <Col md="auto" className="sidebar-container">
          <Sidebar />
        </Col>
        <Col className="main-content">
          <GameList />
        </Col>
      </Row>
    </Container>
  );
};

export default React.memo(Home);