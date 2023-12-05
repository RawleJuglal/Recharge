import { nanoid } from "nanoid"
import { usefulInfo } from "./projects"

async function getLatestVersion(packageName) {
  /*Getting latest version of package*/
  const versionNum = await fetch(
    `https://registry.npmjs.org/${packageName}/latest`
  )
    .then(res => res.json())
    .then(data => data.version)
  return versionNum
}

async function fetchPopularity(skill) {
  /*Getting the popularity*/
  let response = await fetch(
    `https://registry.npmjs.org/-/v1/search?text=${skill}`
  )
  let data = await response.json()
  let solution = Math.ceil(data.objects[0].score.detail.popularity * 100)
  return solution.toString()
}

/**
 *
 * since calculateNumberOfPorjects is no longer async,
 * we can just call it in the skillsArrayOfObjects instead
 * of awaiting it.
 */

function calculateNumberOfProjects(skill) {
  /**
   * Useful info is now the awaited value from the file.
   *
   * this function was calling it 20 times because it was
   * being used in skillsCollection. That doesn't account
   * for the other 3-6 times it was being called as well.
   */
  const selectedProjects = usefulInfo.filter(ele => {
    // console.log(ele.dependencies)
    if (ele.dependencies.includes(skill)) {
      return ele
    }
  })
  return selectedProjects.length
}

/**
 *
 * This function is your most expensive function.
 * This and the top level awaits are why the page is
 * taking a while to load up. The extra calls from
 * calculateNumber of skills made the page take a whole
 * minute or two to load for me before anything rendered.
 *
 * The page takes about 10-15 seconds to load...
 * This function accounts for about 7 seconds
 */
// const skillsCollection = async () => {
let skillsArrayOfObjects = [
  {
    id: nanoid(),
    imgSrc: "nanoid.svg",
    name: "nanoid",
    navLinks: ["All", "Libraries"],
    timeSpent: new Date("16 November 2022 08:00 UTC"),
    popularity: async () => await fetchPopularity("nanoid"),
    versionCtrl: async () => async () => await getLatestVersion("nanoid"),
    numOfProjects: calculateNumberOfProjects("nanoid")
  },
  {
    id: nanoid(),
    imgSrc: "fontawesome.svg",
    name: "fontawesome",
    navLinks: ["All", "Libraries"],
    timeSpent: new Date("01 January 2017 08:00 UTC"),
    popularity: async () => await fetchPopularity("fontawesome"),
    versionCtrl: async () => await getLatestVersion("fontawesome"),
    numOfProjects: calculateNumberOfProjects("fontawesome")
  },
  {
    id: nanoid(),
    imgSrc: "nodejs.svg",
    name: "nodejs",
    navLinks: ["All"],
    timeSpent: new Date("12 September 2016 08:00 UTC"),
    popularity: "N/A",
    versionCtrl: "18.12.0",
    numOfProjects: await calculateNumberOfProjects("nodejs")
  },
  {
    id: nanoid(),
    imgSrc: "bootstrap.svg",
    name: "bootstrap",
    navLinks: ["All", "Frameworks"],
    timeSpent: new Date("12 September 2016 08:00 UTC"),
    popularity: async () => await fetchPopularity("bootstrap"),
    versionCtrl: async () => await getLatestVersion("bootstrap"),
    numOfProjects: calculateNumberOfProjects("bootstrap")
  },
  {
    id: nanoid(),
    imgSrc: "animateCSS.png",
    name: "animate css",
    navLinks: ["All", "Libraries"],
    timeSpent: new Date("17 March 2023 08:00 UTC"),
    popularity: async () => await fetchPopularity("animate.css"),
    versionCtrl: async () => await getLatestVersion("animate.css"),
    numOfProjects: calculateNumberOfProjects("animate.css")
  },
  {
    id: nanoid(),
    imgSrc: "firebase.svg",
    name: "firebase",
    navLinks: ["All"],
    timeSpent: new Date("24 March 2023 08:00 UTC"),
    popularity: async () => await fetchPopularity("firebase"),
    versionCtrl: async () => await getLatestVersion("firebase"),
    numOfProjects: calculateNumberOfProjects("firebase")
  },
  {
    id: nanoid(),
    imgSrc: "iconscout.svg",
    name: "iconscout",
    navLinks: ["All", "Libraries"],
    timeSpent: new Date("30 December 2022 08:00 UTC"),
    popularity: async () => await fetchPopularity("@iconscout/react-unicons"),
    versionCtrl: async () => await getLatestVersion("@iconscout/react-unicons"),
    numOfProjects: calculateNumberOfProjects("@iconscout/react-unicons")
  },
  {
    id: nanoid(),
    imgSrc: "cssalt.svg",
    name: "css",
    navLinks: ["All", "Web Technologies"],
    timeSpent: new Date("01 January 2013 08:00 UTC"),
    popularity: "100",
    versionCtrl: "CSS3",
    numOfProjects: calculateNumberOfProjects("css")
  },
  {
    id: nanoid(),
    imgSrc: "ConfettiJS.svg",
    name: "ConfettiJS",
    navLinks: ["All", "Libraries"],
    timeSpent: new Date("15 January 2023 08:00 UTC"),
    popularity: async () => await fetchPopularity("confetti-js"),
    versionCtrl: async () => await getLatestVersion("confetti-js"),
    numOfProjects: calculateNumberOfProjects("confetti-js")
  },
  {
    id: nanoid(),
    imgSrc: "vite.svg",
    name: "vite",
    navLinks: ["All"],
    timeSpent: new Date("16 November 2022 08:00 UTC"),
    popularity: async () => await fetchPopularity("vite"),
    versionCtrl: async () => await getLatestVersion("vite"),
    numOfProjects: calculateNumberOfProjects("vite")
  },
  {
    id: nanoid(),
    imgSrc: "html5.svg",
    name: "html5",
    navLinks: ["All", "Web Technologies"],
    timeSpent: new Date("01 January 2013 08:00 UTC"),
    popularity: "100",
    versionCtrl: "html5",
    numOfProjects: calculateNumberOfProjects("html5")
  },
  {
    id: nanoid(),
    imgSrc: "javascript.svg",
    name: "javascript",
    navLinks: ["All", "Web Technologies"],
    timeSpent: new Date("01 May 2013 08:00 UTC"),
    popularity: "65",
    versionCtrl: "ECMAScript 2022",
    numOfProjects: calculateNumberOfProjects("javascript")
  },
  {
    id: nanoid(),
    imgSrc: "reactjs.svg",
    name: "reactjs",
    navLinks: ["All", "Frameworks"],
    timeSpent: new Date("16 November 2022 08:00 UTC"),
    popularity: async () => await fetchPopularity("react"),
    versionCtrl: async () => await getLatestVersion("react"),
    numOfProjects: calculateNumberOfProjects("react")
  },
  {
    id: nanoid(),
    imgSrc: "git.svg",
    name: "git",
    navLinks: ["All", "Frameworks"],
    timeSpent: new Date("07 July 2015 08:00 UTC"),
    popularity: async () => await fetchPopularity("git"),
    versionCtrl: async () => await getLatestVersion("git"),
    numOfProjects: calculateNumberOfProjects("git")
  },
  {
    id: nanoid(),
    imgSrc: "figma.svg",
    name: "figma",
    navLinks: ["All"],
    timeSpent: new Date("16 November 2022 08:00 UTC"),
    popularity: "63",
    versionCtrl: "N/A",
    numOfProjects: async () => await calculateNumberOfProjects("figma")
  },
  {
    id: nanoid(),
    imgSrc: "jquery.svg",
    name: "jquery",
    navLinks: ["All", "Libraries"],
    timeSpent: new Date("12 September 2016 08:00 UTC"),
    popularity: async () => await fetchPopularity("jquery"),
    versionCtrl: async () => await getLatestVersion("jquery"),
    numOfProjects: calculateNumberOfProjects("jquery")
  },
  {
    id: nanoid(),
    imgSrc: "luxon.svg",
    name: "luxon",
    navLinks: ["All", "Libraries"],
    timeSpent: new Date("19 December 2022 08:00 UTC"),
    popularity: async () => await fetchPopularity("luxon"),
    versionCtrl: async () => await getLatestVersion("luxon"),
    numOfProjects: calculateNumberOfProjects("luxon")
  },
  {
    id: nanoid(),
    imgSrc: "openai.svg",
    name: "openai",
    navLinks: ["All", "Frameworks"],
    timeSpent: new Date("11 May 2023 08:00 UTC"),
    popularity: async () => await fetchPopularity("openai"),
    versionCtrl: async () => await getLatestVersion("openai"),
    numOfProjects: calculateNumberOfProjects("openai")
  },
  {
    id: nanoid(),
    imgSrc: "framer.svg",
    name: "framer",
    navLinks: ["All", "Libraries"],
    timeSpent: new Date(),
    popularity: async () => await fetchPopularity("framer"),
    versionCtrl: async () => await getLatestVersion("framer"),
    numOfProjects: calculateNumberOfProjects("framer")
  },
  {
    id: nanoid(),
    imgSrc: "typescript.svg",
    name: "typescript",
    navLinks: ["All", "Frameworks"],
    timeSpent: new Date("16 March 2023"),
    popularity: async () => await fetchPopularity("typescript"),
    versionCtrl: async () => await getLatestVersion("typescript"),
    numOfProjects: calculateNumberOfProjects("typescript")
  }
]
// return skillsArrayOfObjects

// }

async function skillsCollection() {
  let skillsPromises = skillsArrayOfObjects.map(async skill => {
    return {
      ...skill,
      popularity:
        typeof skill.popularity === "string"
          ? skill.popularity
          : await skill.popularity(),
      versionCtrl:
        typeof skill.versionCtrl === "string"
          ? skill.versionCtrl
          : await skill.versionCtrl()
    }
  })
  return await Promise.all(skillsPromises)
}

//skills is the awaited value of skillsCollection
//no need to chain a .then
const skills = await skillsCollection()

/**
 * export skills as skillsCollection
 * skills is now the value of the resolved
 * array and can be used in other files.
 */
export { skills as skillsCollection }
