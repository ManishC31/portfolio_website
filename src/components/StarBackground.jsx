import { useEffect, useState } from "react";

export const StarBackground = () => {
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);
  const [nebulas, setNebulas] = useState([]);

  useEffect(() => {
    generateStars();
    // generateMeteors(); // disabled to remove traveling blue line effect
    generateNebulas();

    const handleResize = () => {
      generateStars();
      generateNebulas();
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const generateStars = () => {
    const numberOfStars = Math.floor(
      (window.innerWidth * window.innerHeight) / 8000
    );

    const newStars = [];

    for (let i = 0; i < numberOfStars; i++) {
      newStars.push({
        id: i,
        size: Math.random() * 4 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.8 + 0.2,
        animationDuration: Math.random() * 6 + 3,
        twinkle: Math.random() > 0.7,
      });
    }

    setStars(newStars);
  };

  // const generateMeteors = () => {
  //   const numberOfMeteors = 6;
  //   const newMeteors = [];
  //
  //   for (let i = 0; i < numberOfMeteors; i++) {
  //     newMeteors.push({
  //       id: i,
  //       size: Math.random() * 3 + 1,
  //       x: Math.random() * 100,
  //       y: Math.random() * 30,
  //       delay: Math.random() * 20,
  //       animationDuration: Math.random() * 4 + 4,
  //       color: Math.random() > 0.5 ? "primary" : "cyan",
  //     });
  //   }
  //
  //   setMeteors(newMeteors);
  // };

  const generateNebulas = () => {
    const numberOfNebulas = 3;
    const newNebulas = [];

    for (let i = 0; i < numberOfNebulas; i++) {
      newNebulas.push({
        id: i,
        size: Math.random() * 300 + 200,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.1 + 0.05,
        color: ["primary", "purple", "cyan"][Math.floor(Math.random() * 3)],
        animationDuration: Math.random() * 10 + 10,
      });
    }

    setNebulas(newNebulas);
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Nebulas */}
      {nebulas.map((nebula) => (
        <div
          key={`nebula-${nebula.id}`}
          className={`absolute rounded-full animate-pulse-subtle`}
          style={{
            width: nebula.size + "px",
            height: nebula.size + "px",
            left: nebula.x + "%",
            top: nebula.y + "%",
            opacity: nebula.opacity,
            animationDuration: nebula.animationDuration + "s",
            background: `radial-gradient(circle, hsl(var(--${nebula.color}) / 0.3) 0%, transparent 70%)`,
            filter: "blur(40px)",
          }}
        />
      ))}

      {/* Stars */}
      {stars.map((star) => (
        <div
          key={`star-${star.id}`}
          className={`star ${
            star.twinkle ? "animate-pulse" : "animate-pulse-subtle"
          }`}
          style={{
            width: star.size + "px",
            height: star.size + "px",
            left: star.x + "%",
            top: star.y + "%",
            opacity: star.opacity,
            animationDuration: star.animationDuration + "s",
            boxShadow: star.twinkle
              ? `0 0 ${star.size * 3}px ${star.size}px rgba(139, 92, 246, 0.6)`
              : `0 0 ${star.size * 2}px ${star.size}px rgba(139, 92, 246, 0.4)`,
          }}
        />
      ))}

      {/* Meteors removed */}

      {/* Ambient light effects - theme-aware */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-transparent via-transparent to-background/10 dark:to-background/20"></div>
    </div>
  );
};
