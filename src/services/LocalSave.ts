class LocalSave {
  private static CACHE_NAME = 'ru-app'
  private static CACHE_ENDPOINT = 'ru-app/cache'

  static async save(key: string, value: string) {
    if (caches) {
      const cache = await caches.open(`${LocalSave.CACHE_NAME}/${key}`)
      await cache.put(LocalSave.CACHE_ENDPOINT, new Response(value))
      alert('cache is available')
    } else {
      alert('cache is not available')
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
      alert('cache is available')
      return await response.text()
    } else {
      alert('cache is not available')
      return localStorage.getItem(key) || ''
    }
  }

  static async clear(key: string) {
    if (caches) {
      const cache = await caches.open(`${LocalSave.CACHE_NAME}/${key}`)
      await cache.delete(LocalSave.CACHE_ENDPOINT)
      alert('cache is available')
    } else {
      alert('cache is not available')
      localStorage.removeItem(key)
    }
  }
}

export default LocalSave
