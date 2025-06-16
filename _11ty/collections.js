const COLLECTIONS = {
  skills: { tag: "skills" },
  podcasts: { tag: "podcasts" },
  blog: { tag: "blog" }
};

Object.entries(COLLECTIONS).forEach(([name, config]) => {
  eleventyConfig.addCollection(name, (collectionApi) => 
    collectionApi.getAll()
      .filter(item => item.data.tags?.includes(config.tag))
  );
});