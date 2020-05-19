module.exports = {
  stories: ["../stories/**/*.stories.js"],
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-links",
    "@storybook/addon-knobs/register",
    {
      name: "@storybook/addon-storysource",
      options: {
        // rule: {
        //   // test: [/\.stories\.jsx?$/], This is default
        //   include: [path.resolve(__dirname, '../src')], // You can specify directories
        // },
        loaderOptions: {
          prettierConfig: { printWidth: 80, singleQuote: false },
        },
      },
    },
    "@storybook/addon-docs",
    "@storybook/addon-a11y/register",
    // "@storybook/addon-viewport/register",
  ],
}

