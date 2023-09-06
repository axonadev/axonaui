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
        },
        {
          name: "Git",
          content: "docs/git.md",
        },
        {
          name: "Configuration",
          content: "docs/configuration.md",
        },
        {
          name: "API",
          sections: [
            {
              name: "Intro",
              content: "docs/api.md",
            },
            {
              name: "Soggetti",
              content: "docs/soggetti.md",
            },
            {
              name: "Pagamenti",
              content: "docs/pagamenti.md",
            },
            {
              name: "Ive",
              content: "docs/ive.md",
            },
          ],
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
