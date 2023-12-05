import { app } from "../../../octokitConfig.js"

/**
 *
 * @param {HandlerEvent} event
 * make a request to <BASE_URL>/.netlify/functions/fetchGithubApi
 * -- handler has to be the name of the exported function
 *    this is what netlify looks for when creating a lambda
 *    function
 *
 *
 *
 */
export const handler = async event => {
  //the rest of this code should be familiar to you
  try {
    const repos = await app
      .request("GET /users/{username}/repos", {
        username: "RawleJuglal",
        per_page: 100,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28"
        }
      })
      .then(response => {
        /**
         * be more specific about what ele is...
         * changed it to repo since that's what the
         * value is
         */
        return response.data.filter(repo => !repo.archived)
      })

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: repos })
    }
  } catch (e) {
    console.log(e)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.toString() })
    }
  }
}

// import { Octokit } from "octokit";

// const octokit = ;

// export const getRepos = async (event) => {
//   try {
//     const repos = await app.octokit.request('GET /users/{username}/repos', {
// username: 'RawleJuglal',
// per_page:100,
// headers: {
//   'X-GitHub-Api-Version': '2022-11-28'
// }
//     })
//     .then(res => {
//      return res.data.filter(ele => !ele.archived)
//     })
//     return {
//       statusCode: 200,
//       body: JSON.stringify({ reply: repos }),
//       // // more keys you can return:
//       // headers: { "headerName": "headerValue", ... },
//       // isBase64Encoded: true,
//     }
//   } catch (error) {
//     return { statusCode: 500, body: error.toString() }
//   }
// }

// export const getLanguages = async (event) => {
//   try {
//     const reservedWord =  await app.octokit.request('GET /repos/{username}/{repo}/languages', {
//         username:'RawleJuglal',
//         repo:event.name,
//         headers: {
//             'X-GitHub-Api-Version': '2022-11-28'
//         }
//     })
//     return {
//       statusCode: 200,
//       body: JSON.stringify({ reply: reservedWord.data }),
//       // // more keys you can return:
//       // headers: { "headerName": "headerValue", ... },
//       // isBase64Encoded: true,
//     }
//   } catch (error) {
//     return { statusCode: 500, body: error.toString() }
//   }
// }

// module.exports =  { getRepos, getLanguages, getDependencies  }
