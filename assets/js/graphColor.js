function graphColor(index) {
  const digit = index % 4;

  switch (digit) {
      case 0:
        color = '#2847d3';
        break;
      case 1:
        color = '#2ff2aa';
        break;
      case 2:
        color = '#f21f49';
        break;
      case 3:
        color = '#a229ce';
        break;
  };
  return color;
};
