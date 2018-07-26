function graphColor(index) {
  var digit = index % 10;

  switch (digit) {
      case 0:
        color = '#2847d3';
        break;
      case 1:
        color = '#f29a1f';
        break;
      case 2:
        color = '#1ff270';
        break;
      case 3:
        color = '#f21f49';
        break;
      case 4:
        color = '#a229ce';
        break;
      case 5:
        color = '#f4ec53';
        break;
      case 6:
        color = '#999999';
        break;
      case 7:
        color = '#4cdbe8';
        break;
      case 8:
        color = '#db3082';
        break;
      case 9:
        color = '#0f7519';
        break;
  };
  return color;
};
