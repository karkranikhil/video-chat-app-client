import Particles from "react-particles";
import { loadFireworksPreset } from "tsparticles-preset-fireworks";

function Fireworks() {
  // this customizes the component tsParticles installation
  const customInit = async (engine) => {
    // this adds the preset to tsParticles, you can safely use the
    await loadFireworksPreset(engine);
  };

  const options = {
    preset: "fireworks"
  };

  return <Particles options={options} init={customInit} />;
}

export default Fireworks;