import { useEffect, useState } from "react";
import { Button, Card } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export interface CarouselSlide {
  id: string;
  title: string;
  subtitle: string;
  buttonLabel: string;
  route: string;
  backgroundImage: string;
}

const DEFAULT_SLIDES: CarouselSlide[] = [
  {
    id: "community",
    title: "Connect with the Community",
    subtitle:
    "Discover conversations, updates, and spaces to share your passion for the team with other fans.",
    buttonLabel: "Go to Community",
    route: "/community",
    backgroundImage:
    "linear-gradient(90deg, #0B2A55 0%, #1D4E89 50%, #60A5FA 100%)",
  },
    {
    id: "cards",
    title: "Explore Your Cards",
    subtitle:
    "Access the team’s collection, review featured players, and enjoy a more immersive visual experience.",
    buttonLabel: "View Cards",
    route: "/team",
    backgroundImage:
        "linear-gradient(90deg, #60A5FA 0%, #1D4E89 50%, #0B2A55 100%)",
    },
    {
    id: "voice-agent",
    title: "Talk to the Voice Agent",
    subtitle:
    "Start a conversational experience to get help, team information, and real-time answers.",
    buttonLabel: "Open Agent",
    route: "/voice-agent",
    backgroundImage:
        "linear-gradient(90deg, #1D4E89 0%, #60A5FA 50%, #0B2A55 100%)",
  },
];

interface CarouselHomeProps {
  slides?: CarouselSlide[];
  autoPlayInterval?: number;
}

function CarouselHome({
  slides = DEFAULT_SLIDES,
  autoPlayInterval = 5000,
}: CarouselHomeProps) {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length);
    }, autoPlayInterval);

    return () => window.clearInterval(intervalId);
  }, [autoPlayInterval, slides.length]);

  if (slides.length === 0) {
    return null;
  }

  const activeSlide = slides[activeIndex];

  function goToSlide(index: number) {
    setActiveIndex(index);
  }

  function showPreviousSlide() {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? slides.length - 1 : currentIndex - 1,
    );
  }

  function showNextSlide() {
    setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length);
  }

  return (
    <section className="carousel-home-wrapper" aria-label="Carrusel principal del inicio">
      <Card
        className="carousel-home-card"
        style={{
          background: activeSlide.backgroundImage,
        }}
      >
        <Card.Content className="carousel-home-card-body">

          <div className="carousel-home-middle-row">
            <button
              type="button"
              aria-label="Slide anterior"
              onClick={showPreviousSlide}
              className="carousel-home-arrow-button"
            >
              {"<"}
            </button>

            <div className="carousel-home-content">
              <p className="carousel-home-kicker">Titan Experiences</p>
              <h2 className="carousel-home-title">{activeSlide.title}</h2>
              <p className="carousel-home-subtitle">{activeSlide.subtitle}</p>

              <Button
                size="lg"
                onPress={() => navigate(activeSlide.route)}
                className="carousel-home-cta-button"
              >
                {activeSlide.buttonLabel}
              </Button>
            </div>

            <button
              type="button"
              aria-label="Siguiente slide"
              onClick={showNextSlide}
              className="carousel-home-arrow-button"
            >
              {">"}
            </button>
          </div>
        </Card.Content>
      </Card>
    </section>
  );
}

export default CarouselHome;
