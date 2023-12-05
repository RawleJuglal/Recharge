import { BASE_URL } from "./baseURL"

async function getRepos() {
  const res = await fetch(`${BASE_URL}/.netlify/functions/fetchGithubRepos`)
  const data = await res.json()
  return data.reply
}

async function getLanguages(repoName) {
  //we are going to fetch from the endpoint in the netlify functions
  //pass in the repo name instead of the whole repo. It's all we need
  const res = await fetch(
    `${BASE_URL}/.netlify/functions/fetchRepoLanguages?reponame=${repoName}`
  )
  const languages = await res.json()
  //reply is the resolved body response from netlify function
  return languages.reply
}

// async function getLanguages(ele){
//     const reservedWord =  await octokit.request('GET /repos/{username}/{repo}/languages', {
//         username:'RawleJuglal',
//         repo:ele.name,
//         headers: {
//             'X-GitHub-Api-Version': '2022-11-28'
//         }
//     })
//     return reservedWord.data
// }

async function getDependencies(ele) {
  try {
    const dependecies = await fetch(
      `https://raw.githubusercontent.com/RawleJuglal/${ele.name}/master/package.json`
    )
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          return null
        }
      })
      .then(data => {
        if (data) {
          const figmaDesigns = [
            "reactstatic",
            "digitalbusinesscard",
            "airbnbclone",
            "traveljournal",
            "memegenerator",
            "tenzies",
            "quizzical",
            "moviewatchlist",
            "scoreboard",
            "passwordgenerator",
            "unitconverter",
            "oldagram",
            "restaurant",
            "hotspots",
            "Learningjournal",
            "homereadyrenovations",
            "pollyglot"
          ]

          let currDep = []
          if (data.dependencies) {
            currDep = [...Object.keys(data.dependencies)]
          }
          if (data.devDependencies) {
            currDep = [...currDep, ...Object.keys(data.devDependencies)]
          }
          currDep = [...currDep, "html5", "css", "javascript", "git"]
          if (figmaDesigns.includes(data.name)) {
            currDep = [...currDep, "figma"]
          }
          return currDep
        } else {
          return ["html5", "css", "javascript", "git"]
        }
      })
    return dependecies
  } catch (error) {
    console.log("im in the error")
  }
}

function decodeName(codedName) {
  return codedName.replace(/([a-z0-9])([A-Z])/g, "$1 $2")
}

const usefulInfo = async () => {
  const repos = await getRepos()
  let usefulInformationArr = repos.map(async ele => {
    return {
      id: ele.id,
      name: decodeName(ele.name),
      createdAt: ele.created_at,
      githubLocation: ele.html_url,
      languages: await getLanguages(ele.name),
      liveAt: ele.homepage,
      imageUrl: `https://raw.githubusercontent.com/RawleJuglal/${ele.name}/master/src/assets/screengrab/screengrab.png`,
      dependencies: await getDependencies(ele)
    }
  })
  return await Promise.all(usefulInformationArr)
}

const repoInfo = await usefulInfo()

export { repoInfo as usefulInfo }

// import {  getLanguages } from './netlify/functions/fetchGithubAPI/fetchGithubAPI.cjs'
// import { Octokit } from "octokit";

// const octokit = new Octokit({
//     auth: process.env.Github_API
//   })

// const repos = await octokit.request('GET /users/{username}/repos', {
//     username: 'RawleJuglal',
//     per_page:100,
//     headers: {
//       'X-GitHub-Api-Version': '2022-11-28'
//     }
//   })
//   .then(res => {
//    return res.data.filter(ele => !ele.archived)
//   })

// const repos = await getRepos()

// async function getLanguages(ele){
//     const reservedWord =  await octokit.request('GET /repos/{username}/{repo}/languages', {
//         username:'RawleJuglal',
//         repo:ele.name,
//         headers: {
//             'X-GitHub-Api-Version': '2022-11-28'
//         }
//     })
//     return reservedWord.data
// }
