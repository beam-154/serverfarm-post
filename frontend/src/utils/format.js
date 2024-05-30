const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return `${date.toLocaleTimeString()} ${date.toDateString()}`;
};

export { formatDateTime };
