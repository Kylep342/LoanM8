/**
*
* Function to select graphing colors for a loan
* Arguments:
*   index [int]:    integer representing a Loan's position in a loanArray
* Returns:
*   color [string]: hex code representing the color to graph
*
*/
function graphColor(index) {
  const digit = index % 4;

  switch (digit) {
      case 0:
        color = '#4B966E';
        break;
      case 1:
        color = '#477187';
        break;
      case 2:
        color = '#D4A46A';
        break;
      case 3:
        color = '#D4826A';
        break;
  };
  return color;
};
