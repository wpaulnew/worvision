const concept = {
  books: {
    active: false,
    names: [],
    roster: [],
    book: {
      id: null,
      name: null,
      chapters: {
        active: false,
        numbers: []
      },
      chapter: {
        id: null,
        verses: [],
        verse: {
          id: null,
          text: null
        }
      }
    }
  },
  tracks: {
    active: false,
    names: [],
    roster: [],
    track: {
      id: null,
      name: null,
      verse: null
    },
    favorites: {
      active: false,
      names: []
    }
  }
};