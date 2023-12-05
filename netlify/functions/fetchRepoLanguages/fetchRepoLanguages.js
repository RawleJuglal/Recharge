import { app } from "../../../octokitConfig.js"

export const handler = async event => {
  try {
    const repoName = event.queryStringParameters?.reponame

    /**
     * ensure that a query was passed for the repo name
     */

    if (!repoName) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "A reponame query is required" })
      }
    }
    const reservedWord = await app.request(
      "GET /repos/{username}/{repo}/languages",
      {
        username: "RawleJuglal",
        repo: repoName,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28"
        }
      }
    )
    return {
      statusCode: 200,
      body: JSON.stringify({ reply: reservedWord.data })
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}
