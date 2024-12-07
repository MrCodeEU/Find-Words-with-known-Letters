module.exports = {
    apps: [
      {
        name: "findWordsWithKnownLetters",
        script: "build/index.js",
        watch: ["build"], // Watch only the build directory
        env: {
          NODE_ENV: "production",
        },
      },
    ],
  };
  