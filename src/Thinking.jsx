import React, { useState, useEffect } from "react";
import "./App.css";

export default function Thinking() {
  const emoticons = [":)", ":|"];
  const [currentEmoticonIndex, setCurrentEmoticonIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentEmoticonIndex((currentEmoticonIndex + 1) % emoticons.length);
    }, 500);

    return () => clearInterval(intervalId);
  }, [currentEmoticonIndex]);

  return <h6 className="message">Thinking{emoticons[currentEmoticonIndex]}</h6>;
}
