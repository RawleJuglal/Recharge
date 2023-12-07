import { Octokit } from "octokit" ;
import { config } from "dotenv";
//FETCH  NECESSARY FOR DEV
// import fetch from 'node-fetch'
config()


// import { process } from '../../../env'

// const octokit = new Octokit({
//     auth: process.env.Github_Access_API
//   })
const app = new Octokit({
  auth: process.env.GITHUB_API_KEY,
  // request:{fetch}
});

// client id Iv1.0af1ba8db70127d6

console.log(process.env.GITHUB_API_KEY)

export { app }