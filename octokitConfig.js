import { Octokit } from "octokit" ;
import { config } from "dotenv";
config()


// import { process } from '../../../env'

// const octokit = new Octokit({
//     auth: process.env.Github_Access_API
//   })
const app = new Octokit({
  auth: process.env.GITHUB_API_KEY
});

// client id Iv1.0af1ba8db70127d6

console.log(process.env.GITHUB_API_KEY)

export { app }