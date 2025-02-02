const APIKEY: string = 'AIzaSyCa_zvCtohUTrZFl0rxkNl6fr3A4Fx7YEU'

/**
 * Получает все книги
 * @async
 * @function getBooks
 * @param {string} url Url для получения данных с апи 
 * @returns {Promise<IBook[]>} Массив всех книг
 * @throws {Error} Пробросит дальше для обработкиы
 */

const getBooks = async <T>(url: string): Promise<T> => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      const data = await response.json()
      return data.items ?? data
    }
    else {
      throw new Error()
    }
  } catch (error) {
    throw error;
  }
}

export { APIKEY, getBooks }