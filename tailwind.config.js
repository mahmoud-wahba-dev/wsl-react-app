function buildPxScale(start, end, step = 1, unit = "rem", factor = 16) {
  const scale = {};

  for (let value = start; value <= end; value += step) {
    const key = `${value}px`;
    scale[key] = `${value / factor}${unit}`;
  }

  return scale;
}

const fontSizeScale = buildPxScale(10, 100);
const radiusScale = buildPxScale(4, 100);

/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      fontSize: fontSizeScale,
      borderRadius: radiusScale,
    },
  },
};
