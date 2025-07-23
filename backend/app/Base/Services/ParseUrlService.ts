export default class ParseUrlService {
  /**
   * Parse the pagination urls from the request.
   *
   * @param {Object} request - The request object containing the complete url.
   * @param {number} currentPage - The current page number.
   * @param {number} lastPage - The last page number.
   * @returns {Object} - The parsed pagination urls with the next and previous urls.
   */
  parseUrl(request: any, currentPage: any, lastPage: any) {
    const url: any = {
      nextUrl: null,
      prevUrl: null
    }

    if (request) {
      let urlToParsed: any = request.completeUrl(true)
      url.nextUrl = this.parseNextUrl(urlToParsed, currentPage, lastPage)
      url.prevUrl = this.parsePreviousUrl(urlToParsed, currentPage, lastPage)
    }

    return url
  }

  /**
   * Parse the next pagination url from the request.
   *
   * @param {string} url - The complete url to be parsed.
   * @param {number} currentPage - The current page number.
   * @param {number} lastPage - The last page number.
   * @returns {string|null} - The parsed next pagination url or null if not applicable.
   */
  parseNextUrl(url: string, currentPage: number, lastPage: number) {
    let nextUrl: any = null

    if (currentPage < lastPage && currentPage >= 1) {
      if (url.includes('page=')) {
        const splitedUrl = url.split('page=')
        if (splitedUrl[1].includes('&')) {
          const lengthToRemove = splitedUrl[1].split('&')[0].length
          nextUrl = splitedUrl[0] + 'page=' + (currentPage + 1) + splitedUrl[1].substring(lengthToRemove)
        } else {
          nextUrl = splitedUrl[0] + 'page=' + (currentPage + 1)
        }
      }
    } else if (currentPage < 1) {
      if (url.includes('page=')) {
        const splitedUrl = url.split('page=')
        if (splitedUrl[1].includes('&')) {
          const lengthToRemove = splitedUrl[1].split('&')[0].length
          nextUrl = splitedUrl[0] + 'page=' + 1 + splitedUrl[1].substring(lengthToRemove)
        } else {
          nextUrl = splitedUrl[0] + 'page=' + 1
        }
      }
    }

    return nextUrl
  }

  /**
   * Parse the previous pagination url from the request.
   *
   * @param {string} url - The complete url to be parsed.
   * @param {number} currentPage - The current page number.
   * @param {number} lastPage - The last page number.
   * @returns {string|null} - The parsed previous pagination url or null if not applicable.
   */
  parsePreviousUrl(url: string, currentPage: number, lastPage: number) {
    let previousUrl: any = null

    if (currentPage <= lastPage && currentPage > 1) {
      if (url.includes('page=')) {
        const splitedUrl = url.split('page=')
        if (splitedUrl[1].includes('&')) {
          const lengthToRemove = splitedUrl[1].split('&')[0].length
          previousUrl = splitedUrl[0] + 'page=' + (currentPage - 1) + splitedUrl[1].substring(lengthToRemove)
        } else {
          previousUrl = splitedUrl[0] + 'page=' + (currentPage - 1)
        }
      }
    } else if (currentPage > lastPage && lastPage != 0) {
      if (url.includes('page=')) {
        const splitedUrl = url.split('page=')
        if (splitedUrl[1].includes('&')) {
          const lengthToRemove = splitedUrl[1].split('&')[0].length
          previousUrl = splitedUrl[0] + 'page=' + lastPage + splitedUrl[1].substring(lengthToRemove)
        } else {
          previousUrl = splitedUrl[0] + 'page=' + lastPage
        }
      }
    }

    return previousUrl
  }
}
