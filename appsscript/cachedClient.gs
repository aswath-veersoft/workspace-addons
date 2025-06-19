function getSavedClient() {
  const cached = CacheService.getUserCache().get("savedClient");

  if (cached) {
    try {
      const client = JSON.parse(cached);
      Logger.log("Retrieved client from cache: " + JSON.stringify(client));
      return client;
    } catch (err) {
      Logger.log("Failed to parse cached client: " + err.toString());
    }
  }

  return null;
}

