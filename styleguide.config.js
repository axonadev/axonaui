module.exports = {
  sections: [
    {
      name: "Introduction",
      content: "docs/introduction.md",
    },
    {
      name: "Documentation",
      sections: [
        {
          name: "Installation",
          content: "docs/installation.md",
          description: "The description for the installation section",
        },
        {
          name: "Configuration",
          content: "docs/configuration.md",
        },
        {
          name: "API",
          content: "docs/api.md",
        },
      ],
    },
    {
      name: "UI Components",
      content: "docs/ui.md",
      components: "src/lib/components/**/*.js",
      ignore: "src/lib/components/**/*.prv.js",
      exampleMode: "expand", // 'hide' | 'collapse' | 'expand'
      usageMode: "collapse", // 'hide' | 'collapse' | 'expand'
    },
  ],
};
