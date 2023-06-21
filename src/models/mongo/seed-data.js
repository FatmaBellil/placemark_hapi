export const seedData = {
    users: {
      _model: "User",
      homer: {
        firstName: "Homer",
        lastName: "Simpson",
        email: "homer@simpson.com",
        password: "secret",
        role: "admin",
      },
      marge: {
        firstName: "Marge",
        lastName: "Simpson",
        email: "marge@simpson.com",
        password: "secret",
        role: "basic",
      },
      bart: {
        firstName: "Bart",
        lastName: "Simpson",
        email: "bart@simpson.com",
        password: "secret",
        role: "basic",
      },
    },

    categories: {
      _model: "Category",
      city: {
        name: "City",
        userid: "->users.marge",
      },
      landscape: {
        name: "Landscape",
        userid: "->users.marge",
      },
      island: {
        name: "Island",
        userid: "->users.bart",
      },
    },

    placemarks: {
      _model: "Placemark",
      regensburg: {
        name: "Regensburg",
        description: "a german city",
        latitude: 49.013432,
        longitude: 12.101624,
        categoryid: "->categories.city"
      },
      munich: {
        name: "Munich",
        description: "a german city",
        latitude: 48.137154,
        longitude: 11.576124,
        categoryid: "->categories.city"
      },

      djerba: {
        name: "Djerba",
        description: "a tunisian island",
        latitude: 33.807598,
        longitude: 10.845147,
        categoryid: "->categories.island"
      },
      alps: {
        name: "Alps",
        description: "Alps-mountains",
        latitude: 46.433334,
        longitude: 11.850000,
        categoryid: "->categories.landscape"
      },
      
    }
  };
  