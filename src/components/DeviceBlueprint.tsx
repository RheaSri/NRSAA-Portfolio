import { useState } from "react";
import blueprint from "../assets/blueprint.png";
import product from "../assets/device.png";
import animation from "../assets/device.webm";
import animationStill from "../assets/device_final.png";

export const DeviceBlueprint = () => {
  const [flipped, setFlipped] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);

  return (
    <div className="flex flex-col items-center gap-8">

      {/* Flip Container */}
      <div className="perspective-1000 w-90 h-75 md:w-150 md:h-125 page-shadow">

        <div
          className={`
            relative w-full h-full
            transition-transform duration-1000
            transform-style-preserve-3d
            ${flipped ? "rotate-y-180" : ""}
          `}
        >

          {/* FRONT - Blueprint */}
          <div
            className="
              absolute inset-0
              backface-hidden
              rounded-xl
              overflow-hidden
            "
          >

            {/* Blueprint Background */}
            <img
              src={blueprint}
              alt="Blueprint"
              className="
                absolute inset-0 
                w-full h-full 
                object-cover
              "
            />


            {/* Animation Overlay */}
            {!animationDone && (
              <video
                src={animation}
                autoPlay
                muted
                playsInline
                onEnded={() => setAnimationDone(true)}
                className="
                  absolute inset-0
                  w-full h-full
                  object-contain
                "
              />
            )}


            {/* Final Animation Still */}
            {animationDone && (
              <img
                src={animationStill}
                alt="Platform final state"
                className="
                  absolute inset-0
                  w-full h-full
                  object-contain
                "
              />
            )}

          </div>


          {/* BACK - Finished Product */}
          <div
            className="
              absolute inset-0
              backface-hidden
              rotate-y-180
              rounded-xl
              overflow-hidden
            "
          >

            <img
              src={product}
              alt="Finished Product"
              className="
                w-full h-full
                object-contain
              "
            />

          </div>

        </div>

      </div>


      {/* Button */}
      <button
        onClick={() => setFlipped(!flipped)}
        className="
          px-6 py-3
          rounded-lg
          bg-primary
          text-primary-foreground
          font-semibold
          hover:scale-105
          transition
        "
      >
        {flipped ? "View Blueprint" : "View Product"}
      </button>


    </div>
  );
};