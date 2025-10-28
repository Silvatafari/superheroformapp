// SuperheroForm.jsx
import React, { useState, useEffect, useRef } from "react";
import superheroBg from "./assets/superhero-bg.webp";
import "./SuperheroForm.css";

export default function SuperheroForm() {
  const powerSources = [
    "Bitten by a strange creature",
    "Radioactive exposure",
    "Science experiment",
    "Alien heritage",
    "Ancient artifact discovery",
    "Other",
  ];

  const powersList = [
    "Super Strength",
    "Super Speed",
    "Flight",
    "Invisibility",
    "Telekinesis",
    "Other",
  ];

  const [heroName, setHeroName] = useState("");
  const [realName, setRealName] = useState("");
  const [powerSource, setPowerSource] = useState("");
  const [powers, setPowers] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const formRef = useRef(null);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    // Apply shimmer overlay
    const shimmer = document.createElement("div");
    shimmer.className = "shimmer";
    form.appendChild(shimmer);

    // Entry animation
    form.classList.add("fade-in");

    // Stagger checkbox animation
    const boxes = form.querySelectorAll('input[type="checkbox"]');
    boxes.forEach((box, i) => {
      box.style.animation = `slideUp 0.5s ease ${i * 0.1 + 0.6}s forwards`;
    });

    // Clean shimmer after animation
    setTimeout(() => shimmer.remove(), 1800);
  }, []);

  const handlePowersChange = (e) => {
    const { value, checked } = e.target;
    setPowers(checked ? [...powers, value] : powers.filter((p) => p !== value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Optional mock loading delay
    setTimeout(() => {
      setSubmitted(false);
      setHeroName("");
      setRealName("");
      setPowerSource("");
      setPowers([]);
    }, 4000);
  };

  return (
    <div
      className="hero-container"
      style={{ backgroundImage: `url(${superheroBg})` }}
    >
      <div className="form-wrap" ref={formRef}>
        {submitted && (
          <div className="thank-you-message">
            ✅ Hero {heroName || "Recruit"} Registered Successfully!
          </div>
        )}

        <h1 className="hero-title">Superhero Application Form</h1>
        <p className="subtitle">Join the League — Heroes Needed!</p>

        <form onSubmit={handleSubmit}>
          <div className="section">
            <label>
              Hero Name
              <input
                type="text"
                value={heroName}
                onChange={(e) => setHeroName(e.target.value)}
                required
              />
            </label>

            {submitted && (
              <div className="thank-you-overlay">
                <div className="energy-loader"></div>
                <p className="thank-you-text">Thank you, recruit! ⚡</p>
              </div>
)}

         
            <label>
              Real Name
              <input
                type="password"
                value={realName}
                onChange={(e) => setRealName(e.target.value)}
                required
              />
            </label>
          </div>

          <label className="section column">
            How did you get your powers?
            <select
              value={powerSource}
              onChange={(e) => setPowerSource(e.target.value)}
              required
            >
              <option value="">Select one</option>
              {powerSources.map((src) => (
                <option key={src} value={src}>
                  {src}
                </option>
              ))}
            </select>
          </label>

          <div className="section column">
            <label>List your powers:</label>
            <div className="powers-grid">
              {powersList.map((power) => (
                <label key={power} className="power-option">
                  <input
                    type="checkbox"
                    value={power}
                    checked={powers.includes(power)}
                    onChange={handlePowersChange}
                  />
                  <span>{power}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            className="submit-btn"
            type="submit"
            disabled={
              !heroName || !realName || !powerSource || powers.length === 0
            }
          >
            Join the League
          </button>
        </form>
      </div>
    </div>
  );
}
