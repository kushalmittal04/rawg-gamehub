import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Carousel, Container, Row, Col, Button, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "@clerk/clerk-react";
import { fetchGameDetailsAsync } from "../redux/gameSlice";
import BookmarkButton from "../components/BookmarkButton";
import "../styles/gamedetails.css";

const GameDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useUser();
  const { gameDetails, screenshots, loading, error } = useSelector((state) => state.games);

  useEffect(() => {
    dispatch(fetchGameDetailsAsync(id));
  }, [id, dispatch]);

  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center py-5 text-light">
        <div className="spinner-border text-primary" role="status" />
        <span className="mt-3">Loading game details...</span>
      </div>
    );
  }
  if (error) return <div className="error-message">Error: {error}</div>;
  if (!gameDetails) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Container className="game-details-container">
      {/* === Top Section: Title, Rating, Genres, Bookmark === */}
      <Row className="align-items-center game-header mb-4">
        <Col md={8}>
          <h1 className="game-title">{gameDetails.name}</h1>
          <div className="d-flex flex-wrap align-items-center gap-2 mt-2">
            {gameDetails.genres?.map((genre) => (
              <Badge key={genre.id} bg="secondary" className="genre-badge">
                {genre.name}
              </Badge>
            ))}
          </div>
        </Col>
        <Col md={4} className="d-flex justify-content-end align-items-center">
          <div className="rating-bookmark-wrapper">
            <span className="rating-badge">
              ⭐ {gameDetails.rating?.toFixed(1) || "N/A"}
            </span>
            <BookmarkButton gameId={gameDetails.id} userId={user?.id} variant="large" />
          </div>
        </Col>
      </Row>

      {/* === Screenshots Carousel === */}
      <Carousel fade interval={1500} className="mb-4">
        {screenshots.length > 0 ? (
          screenshots.slice(0, 5).map((screenshot) => (
            <Carousel.Item key={screenshot.id}>
              <img
                className="d-block w-100 carousel-image"
                src={screenshot.image}
                alt={`${gameDetails.name} screenshot`}
              />
            </Carousel.Item>
          ))
        ) : (
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-image"
              src={gameDetails.background_image}
              alt={`${gameDetails.name} background`}
            />
          </Carousel.Item>
        )}
      </Carousel>

      {/* === Game Meta Info === */}
      <Row className="game-meta mb-4">
        <Col md={6}>
          <div className="meta-section">
            <h3>Release Date</h3>
            <p>{formatDate(gameDetails.released)}</p>
          </div>
          <div className="meta-section">
            <h3>Platforms</h3>
            <div className="d-flex flex-wrap gap-2">
              {gameDetails.platforms?.map((p) => (
                <Badge key={p.platform.id} bg="info" className="platform-badge">
                  {p.platform.name}
                </Badge>
              ))}
            </div>
          </div>
        </Col>
        <Col md={6}>
          {gameDetails.developers?.length > 0 && (
            <div className="meta-section">
              <h3>Developers</h3>
              <div className="d-flex flex-wrap gap-2">
                {gameDetails.developers.map((dev) => (
                  <Badge key={dev.id} bg="dark" className="developer-badge">
                    {dev.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          {gameDetails.publishers?.length > 0 && (
            <div className="meta-section">
              <h3>Publishers</h3>
              <div className="d-flex flex-wrap gap-2">
                {gameDetails.publishers.map((pub) => (
                  <Badge key={pub.id} bg="dark" className="publisher-badge">
                    {pub.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </Col>
      </Row>

      {/* === Game Description === */}
      <div className="description-section mb-4">
        <h2>About</h2>
        <div dangerouslySetInnerHTML={{ __html: gameDetails.description }} />
      </div>

      {/* === Game Tags === */}
      {gameDetails.tags?.length > 0 && (
        <div className="tags-section mb-4">
          <h3>Tags</h3>
          <div className="d-flex flex-wrap gap-2">
            {gameDetails.tags.map((tag) => (
              <Badge key={tag.id} bg="light" text="dark" className="tag-badge">
                {tag.name}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="text-center mt-4">
        <Button variant="primary" onClick={() => navigate(-1)}>
          Back to Games
        </Button>
      </div>
    </Container>
  );
};

export default React.memo(GameDetails);
