import React, { memo } from "react";
import Particles from "react-particles-js";

const MyParticComponent = () => {
  return (
    <Particles
      params={{
        particles: {
          number: {
            value: 400,
            density: {
              enable: true,
              value_area: 1000,
            },
          },
          color: {
            value: "#fff",
          },
          opacity: {
            value: 0.8,
            anim: {
              enable: true,
            },
          },
          size: {
            value: 2,
            random: true,
            anim: {
              enable: true,
              speed: 6,
            },
          },
          line_linked: {
            enable: false,
          },
          move: {
            speed: 0.2,
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "bubble",
            },
          },
          modes: {
            bubble: {
              size: 10,
              distance: 200,
              opacity: 0.4,
              duration: 5,
            },
          },
        },
      }}
    />
  );
};

export const MyPartic = memo(MyParticComponent);
