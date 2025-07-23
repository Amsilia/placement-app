import Drive from "@ioc:Adonis/Core/Drive"
import cuid from "cuid"
import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'

class AmazonS3 {
  /**
   * Upload a file to Amazon S3 and return the URL of the uploaded file.
   * @param {any} file - The file to be uploaded.
   * @param {string} folder - The folder to upload the file to.
   * @returns {string} The URL of the uploaded file.
   */
  public async uploadFile(file: MultipartFileContract, folder: string): Promise<string> {
    const filename = `${cuid()}.${file.extname}`
    await file.moveToDisk(folder, {
      name: filename
    })

    return await Drive.getUrl(`${folder}/${filename}`)
  }

    /**
     * Delete a file from Amazon S3 based on a given URL.
     * @param {string} url - The URL of the file to delete.
     * @returns {Promise<void>}
     */
  public async deleteFile(url: string): Promise<void> {
    const path = url.split(`${process.env.BUCKET_ENDPOINT}/`)[1]

    return await Drive.delete(path)
  }
}

export default new AmazonS3()
