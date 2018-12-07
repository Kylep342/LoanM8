function sanitizeDate(dateString) {
  /**
  *
  *
  *
  */
  const dateRE = /(\d{4})-(\d{2})-(\d{2})/gm;
  const match = dateRE.exec(dateString);
  return `${match[2]}/${match[3]}/${match[1]}`
}
