module.exports = {
    apps: [
      {
        name: "findWordsWithKnownLetters",
        script: "/srv/findWordsWithKnownLetters/build/index.js",
        watch: false,
        env: {
          NODE_ENV: "production",
        },
      },
    ],
  };
  