export const sortByNumber = (postsArray, property, operation) => {
  if (operation === "DateAsc") {
    postsArray.sort((a, b) => {
      return new Date(a[property]) - new Date(b[property]);
    });
  }
  if (operation === "DateDesc") {
    postsArray.sort((a, b) => {
      return new Date(b[property]) - new Date(a[property]);
    });
  }
  if (operation === "NumAsc") {
    postsArray.sort((a, b) => {
      return a[property] - b[property];
    });
  }
  if (operation === "NumDesc") {
    postsArray.sort((a, b) => {
      return b[property] - a[property];
    });
  }
};

export const sortByString = (postsArray, property, operation) => {
  if (operation === "asc") {
    postsArray.sort((a, b) => {
      let fa = a[property].toLowerCase();
      let fb = b[property].toLowerCase();

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
  }
  if (operation === "desc") {
    postsArray.sort((a, b) => {
      let fa = a[property].toLowerCase();
      let fb = b[property].toLowerCase();

      if (fa > fb) {
        return -1;
      }
      if (fa < fb) {
        return 1;
      }
      return 0;
    });
  }
};
