const baseImageURL = "https://image.tmdb.org/t/p/original";

function currentYear() {
  const date = new Date();
  return date.getFullYear();
}

/**
 * @param {string} string
 * @param {integer} length
 */
function truncate(string, length = 180) {
  return string?.length > length ? string?.substring(0, length) + "..." : string;
}

function formatDuration(duration) {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  const durationString = hours ? `${hours}h ${minutes}min` : `${minutes}min`;
  return durationString;
}

function getListOfSelectableYears() {
  const listOfYears = [];

  for (let i = currentYear(); i >= 1950; i--) {
    listOfYears.push(i);
  }
  return listOfYears;
}

function randomImageGenerator(results) {
  let images = [];
  let randomImages = [];

  if (results?.images?.backdrops) images = images.concat(results?.images?.backdrops);

  if (results?.images?.posters) images = images.concat(results?.images?.posters);

  if (results?.images?.profiles) images = images.concat(results?.images?.profiles);

  if (images.length >= 20) {
    for (let i = 0; i < 20; i++) {
      let randomImage = images[Math.floor(Math.random() * images.length)];
      randomImages.push(randomImage);
    }
  } else {
    for (let i = 0; i < images.length; i++) {
      let randomImage = images[Math.floor(Math.random() * images.length)];
      randomImages.push(randomImage);
    }
  }

  return randomImages;
}

function scrollHorizontally(isPreviousButtonClicked, moviesContainer, isSmallButton = false) {
  const scrollAmount = moviesContainer.scrollLeft;
  const scrollAmountMax = moviesContainer.scrollWidth - moviesContainer.clientWidth - 30;
  const scrollBy = isSmallButton ? 100 : 300;

  if (isPreviousButtonClicked) {
    if (scrollAmount > 0) {
      moviesContainer.scrollTo({
        left: scrollAmount - scrollBy,
        behavior: "smooth",
      });
    } else {
      moviesContainer.scrollTo({
        left: scrollAmountMax,
        behavior: "smooth",
      });
    }
  } else {
    if (scrollAmount < scrollAmountMax) {
      moviesContainer.scrollTo({
        left: scrollAmount + scrollBy,
        behavior: "smooth",
      });
    } else {
      moviesContainer.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    }
  }
}

export {
  baseImageURL,
  currentYear,
  truncate,
  formatDuration,
  getListOfSelectableYears,
  randomImageGenerator,
  scrollHorizontally,
};
