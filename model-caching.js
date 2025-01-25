const storeFileInSWCache = async (blob, name) => {
    try {
      performance.mark('start-sw-cache-cache');
      const modelCache = await caches.open('models');
      await modelCache.put(name, new Response(blob));
      performance.mark('end-sw-cache-cache');
  
      const mark = performance.measure(
        'sw-cache-cache',
        'start-sw-cache-cache',
        'end-sw-cache-cache'
      );
      console.log(`Model file ${name} cached in sw-cache.`, mark.name, mark.duration.toFixed(2));
    } catch (err) {
      console.error(err.name, err.message);
    }
  };
  
  const restoreFileFromSWCache = async (name) => {
    try {
      performance.mark('start-sw-cache-restore');
      const modelCache = await caches.open('models');
      const response = await modelCache.match(name);
      if (!response) {
        throw new Error(`File ${name} not found in sw-cache.`);
      }
      const file = await response.blob();
      performance.mark('end-sw-cache-restore');
      const mark = performance.measure(
        'sw-cache-restore',
        'start-sw-cache-restore',
        'end-sw-cache-restore'
      );
      console.log(mark.name, mark.duration.toFixed(2));
      console.log('Cached model file found in sw-cache.');
      return file;
    } catch (err) {    
      throw err;
    }
  };
  export { storeFileInSWCache, restoreFileFromSWCache };