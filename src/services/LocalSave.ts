class LocalSave {
  private static CACHE_NAME = 'ru-app'
  private static CACHE_ENDPOINT = 'ru-app/cache'

  static async save(key: string, value: string) {
    if (caches) {
      const cache = await caches.open(`${LocalSave.CACHE_NAME}/${key}`)
      await cache.put(LocalSave.CACHE_ENDPOINT, new Response(value))
    } else {
      localStorage.setItem(key, value)
    }
  }

  static async load(key: string) {
    if (caches) {
      const cache = await caches.open(`${LocalSave.CACHE_NAME}/${key}`)
      const response = await cache.match(LocalSave.CACHE_ENDPOINT)
      if (!response) {
        return ''
      }
      return await response.text()
    } else {
      return localStorage.getItem(key) || ''
    }
  }

  static async clear(key: string) {
    if (caches) {
      const cache = await caches.open(`${LocalSave.CACHE_NAME}/${key}`)
      await cache.delete(LocalSave.CACHE_ENDPOINT)
    } else {
      localStorage.removeItem(key)
    }
  }
}

export default LocalSave
