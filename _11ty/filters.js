module.exports = {
  filterBy: function(array, key, value) {
    if (!array || !key) return [];
    try {
      return array.filter((item) => {
        const keyPath = key.split(".");
        let data = item;
        for (const path of keyPath) {
          if (!data || typeof data !== "object") return false;
          data = data[path];
        }
        return data === value;
      });
    } catch (error) {
      console.error(`Error in filterBy filter: ${error.message}`);
      return [];
    }
  },
  
  filterByCategory: (items, category) => {
    // ...existing code...
  },
  
  filterToolsByCategory: (tools, category) => {
    // ...existing code...
  }
};