const sass = require("sass");
const fs = require("fs");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets/js": "assets/js" });
  eleventyConfig.addPassthroughCopy({ "src/assets/images": "assets/images" });
  eleventyConfig.addWatchTarget("src/assets/scss");

  eleventyConfig.on("beforeBuild", () => {
    const result = sass.compile("src/assets/scss/main.scss", {
      style: "compressed",
      loadPaths: ["src/assets/scss"],
    });
    fs.mkdirSync("dist/assets/css", { recursive: true });
    fs.writeFileSync("dist/assets/css/main.css", result.css);
  });

  eleventyConfig.setServerOptions({ port: 8080 });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "dist",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
