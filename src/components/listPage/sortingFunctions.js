export const sortByNumber = (postsArray, operation) => {
  if (operation === "StartDate") {
    postsArray.sort((a, b) => {
      return new Date(a.StartDate) - new Date(b.StartDate);
    });
  } else {
    postsArray.sort((a, b) => {
      return a.Age - b.Age;
    });
  }
};

export const sortByString = (postsArray, property) => {
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
};
