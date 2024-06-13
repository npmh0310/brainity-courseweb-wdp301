import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

const FireworkConfetti = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [leftConfetti, setLeftConfetti] = useState(true);
  const [rightConfetti, setRightConfetti] = useState(true);

  useEffect(() => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        setLeftConfetti(false);
        setRightConfetti(false);
        return clearInterval(interval);
      }
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full">
      {leftConfetti && (
        <Confetti
          numberOfPieces={50}
          width={windowSize.width}
          height={windowSize.height}
          gravity={0.3}
          initialVelocityX={-30}
          recycle={false}
          colors={["#FF0000", "#00FF00", "#0000FF"]}
        />
      )}
      {rightConfetti && (
        <Confetti
          numberOfPieces={50}
          width={windowSize.width}
          height={windowSize.height}
          gravity={0.3}
          initialVelocityX={10}
          recycle={false}
          colors={["#FF0000", "#00FF00", "#0000FF"]}
        />
      )}
    </div>
  );
};

export default FireworkConfetti;
