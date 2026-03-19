function responsiveFontSize(minValue, maxValue, startWidth, endWidth) {
  // Function to strip "px" and convert to a number
  const parsePx = (value) => parseFloat(value.replace('px', ''));

  // Parse the inputs
  const min = parsePx(minValue);
  const max = parsePx(maxValue);
  const start = parsePx(startWidth);
  const end = parsePx(endWidth);

  // Calculate the slope
  const slope = (max - min) / (end - start);

  // Return the full clamp definition
  return `clamp(${minValue}, calc(${min}px + ${slope} * (100vw - ${start}px)), ${maxValue})`;
}

module.exports = { responsiveFontSize };
