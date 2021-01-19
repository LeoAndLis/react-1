function formatTimeSpent(timeSpent) {
  const seconds = addZero(timeSpent % 60);
  const minutes = addZero(Math.floor((timeSpent % 3600) / 60));

  let formattedTimeSpent = `${minutes}:${seconds}`;

  if (timeSpent > 3599) {
    const hours = Math.floor(timeSpent / 3600);
    formattedTimeSpent = `${hours}:${formattedTimeSpent}`;
  }

  return formattedTimeSpent;
}

function addZero(number) {
  if (number < 10) {
    return `0${number}`;
  }

  return number;
}

export default formatTimeSpent;
