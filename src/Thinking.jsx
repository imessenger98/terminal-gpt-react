import React, { useState, useEffect } from "react";

const LoadingDots = () => {
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDotCount((dotCount) => (dotCount + 1) % 4);
    }, 250);
    return () => clearInterval(intervalId);
  }, []);

  return <h6 className="message">{`Thinking ${".".repeat(dotCount)}`}</h6>;
};

export default LoadingDots;
