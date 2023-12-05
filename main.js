import './style.css'
/*libraries*/
import { renderTime, renderWeather, handleGoogle } from './components/header'
import { DateTime } from 'luxon'
/*images*/
import AppBG from './src/images/app-bg.jpg'
/* internal files */
import { skillsCollection } from './skills'
import { usefulInfo } from './projects'

/*-- DOM ELEMENTS --*/
const appEl = document.getElementById('app')
const timeDataEl = document.getElementById('time-data')
const weatherIconEl = document.getElementById('weather-container')
const techNavEl = document.getElementById('tech-nav')
const authDataLinkEl = document.getElementById('auth-link')
const skillsContainerEl = document.getElementById('skills-container')
const filteredSkillsListEl = document.getElementById('filtered-skills-list')
const infoContainerEl = document.getElementById('info-container')
const projectInfoContainerEl = document.getElementById('project-container')

/*-- Global Variables --*/
// skills collection promise all function that fills w/ skill array of objects
const fullSkillsEl =  skillsCollection
const projectsArr = usefulInfo
let isHovering = false;
let timeout;

function renderBackground(){
  appEl.style.background = `url(${AppBG})`
  appEl.style.backgroundRepeat = 'no-repeat'
  appEl.style.backgroundSize = 'cover'
}

/* --TIME COMPONENT -- */
renderTime(timeDataEl)

/* --WEATHER COMPONENT-- */
renderWeather(weatherIconEl)

/* --SIGN IN-- */
authDataLinkEl.addEventListener('click', handleGoogle)


/* --TECH NAV COMPONENT--*/
const navList = ['All', 'Web Technologies', 'Frameworks', 'Libraries']

function renderTechNavLinks(){
  //create a ul element with classes --tech-nav-ul
  const techNavUL = document.createElement('ul');
  techNavUL.classList.add('--tech-nav-ul', 'flex', 'flex-wrap')

  //map navList to create Links for each index, 1st link with class selected
  const techNavList = navList.map((ele, i) => {
    return i==0 ? `<a class='--tech-nav-link selected'><li>${ele}</li></a>` : `<a class='--tech-nav-link'><li>${ele}</li></a>`
  }).join('');
  //append these links to the UL
  techNavUL.innerHTML = techNavList;
  //put the UL in the <nav id='tech-nav'>
  techNavEl.appendChild(techNavUL);
  addTechNavListener()
  determineSkillsContainer()
}

function addTechNavListener(){
  //gets all the --tech-nav-link (All, Web Technologies,Frameworks, Libraries) and adds a mouseenter changeTechNavSelected function
  document.querySelectorAll('.--tech-nav-link').forEach(item => {
    item.addEventListener('mouseenter', changeTechNavSelected)
  })
}

function removeTechNavListener(){
  document.querySelectorAll('.--tech-nav-link').forEach(item => {
    item.removeEventListener('mouseenter', changeTechNavSelected)
  })
}

function changeTechNavSelected(e){
  //when mouseenters any --tech-nav-link
  document.querySelectorAll('.--tech-nav-link').forEach(item =>{
    //we remove the class selected from all of them
    item.classList.remove('selected')
  })
  //then the target link has the selected added back
  e.target.classList.add('selected')
  //then we determine what skills should be shown (the boxes with logos)
  determineSkillsContainer()
}

async function determineSkillsContainer(){
  //finds the one NavLink selected
  const techNavToDisplay = document.querySelectorAll('.--tech-nav-link.selected')
  //gets the name of the skill and passes it to the sortSkills function 
  //which returns an Arr of Objects (only the skills that match the navLink)
  const selectedSkillsArr = await sortSkills(techNavToDisplay[0].textContent)
  //This array is passed to the renderskills to show the skills (grey box logos)
  renderSkillsContainer(selectedSkillsArr)
}

function sortSkills(text){
  //filters through the area getting only the objects that have name of techNav link included in their navLinks array
  /* EXAMPLE
                                                              VV
    {id:nanoid(),imgSrc:'bootstrap.svg', name:'bootstrap', navLinks:['All','Frameworks']}

  */
    return fullSkillsEl.filter(ele => {
      return ele.navLinks.includes(text)
    })
}

function renderSkillsContainer(techNavSelected){
  //techNavSelected is the array of Objects that matches the navLink selected
  let skillsInnerHTML = techNavSelected.map(item => {
    //a list item with the name,id,class and an image is returned and added to skillsInnerHTML
    return `<li data-name="${item.name}" id="${item.name}-li-item" class="--skill-list-item"><img src="./images/${item.imgSrc}" alt="${item.name} icon"></li>`
  }).join('')
  //The multiple li elements are then placed into the <ul id="filtered-skills-list">
  filteredSkillsListEl.innerHTML = skillsInnerHTML
  //then we call skillsListener to add event handler 'mouseenter' to each <li class="--skill-list-item">
  addMouseEnterSkillListener()
  addMouseLeaveSkillListener()
}

function addMouseEnterSkillListener(){
  //add mouseenter to all <li class='--skill-list-items> to call buildInfoContainer function
  document.querySelectorAll('.--skill-list-item').forEach(item => {
    item.addEventListener('mouseenter', buildInfoContainer)
  })
}

function addMouseLeaveSkillListener(){
  //adds a mouseleave that when triggered checks to see if interval has been completed
  document.querySelectorAll('.--skill-list-item').forEach(item => {
    item.addEventListener('mouseleave', checkForCompleted)
  })
}

function addCaretDownListener(){
  //adds click listener to caret to open projects div and populate with current skill
  //related projects
  document.querySelector('.--caret-down').addEventListener('click', openMatchingProjects)
}

//UNFINISHED FUNCTION TO OPEN THE PROJECTS DIV
function openMatchingProjects(){
  const currSkill = document.getElementById('info-skill-name').textContent;
  buildProjectsContainer(currSkill.toLowerCase())
}

//Function that builds out the skills container after skill selection
async function buildInfoContainer(event){
      //start the hovering timeout
      isHovering = true;
      //begin timeout
      timeout = setTimeout(async ()=>{
        //empty the info container
        infoContainerEl.classList.add('expanded');
        infoContainerEl.innerHTML = '';
        //save the selected skill hovered in skill buttons
        const selectedSkill = event.target.dataset.name;
        //filters the selected skills out of all the skill useful info array
        const fullSkillInfoObj = fullSkillsEl.filter(ele => {
          return selectedSkill === ele.name
        })
        //calls function to deteremine how much time has passed from learned to now
        const known = calculateTimeSpent(fullSkillInfoObj[0].timeSpent)

        //This section builds the elements needed using the info out of fullSkillInfoObj
        //ANIMATE OPENING OF INFO CONTAINER
        // infoContainerEl.animate()
        infoContainerEl.append(buildSingleElement({ele:'h1', id:'info-title', classes:['--info-title', 'XXXIIPT', 'thick-stroke'], text:'SKLZ'}))
        const infoTitleEl = document.getElementById('info-title');
        infoTitleEl.after(buildSingleElement({ele:'button', id:'back-btn', classes:['--back-btn', 'hidden', 'flex-align-center', 'XXXIIPT'], text:`Back`}))
        let backEl = document.getElementById('back-btn')
        backEl.prepend(buildSingleElement({ele:'img', id:'return-icon', source:'caret-left', classes:['--caret-left'], name:'caret left'}));
        backEl.addEventListener('click', backToSkills);
        infoContainerEl.append(buildSingleElement({ele:'div', id:'', classes:['--info-grid-b'], text:''}))
        let infoGridBEl = document.getElementsByClassName('--info-grid-b')[0]
        infoGridBEl.append(buildSingleElement({ele:'img', id:'info-icon', source:selectedSkill == 'animate css' ? 'animateCSS' : selectedSkill, name:selectedSkill}))
        infoGridBEl.append(buildSingleElement({ele:'h2', id:'info-skill-name', classes:['--info-skill-name', 'XXXIIPT', 'thick-stroke'], text:selectedSkill}))
        infoContainerEl.append(buildSingleElement({ele:'h2', classes:['time', 'grid-center-item'], text:'Time Spent'}))
        infoContainerEl.append(buildSingleElement({ele:'p', classes:['count', 'grid-center-item'], text:`${known.years ? known.years + 'Y' : ''} ${known.months >0 ? known.months + 'M' : '00'} ${known.days + 'D'}`}))
        infoContainerEl.append(buildSingleElement({ele:'h2', classes:['pop', 'grid-center-item'], text:'Popularity'}))
        infoContainerEl.append(buildSingleElement({ele:'p', id:'percentage', classes:['percentage', 'grid-center-item'], text:`${fullSkillInfoObj[0].popularity}`}))
        infoContainerEl.append(buildSingleElement({ele:'p', classes:['use', 'grid-center-item'], text:'devs use'}))
        infoContainerEl.append(buildSingleElement({ele:'h2', classes:['version', 'grid-center-item'], text:'Version'}))
        infoContainerEl.append(buildSingleElement({ele:'p', classes:['iteration', 'grid-center-item'], text:`${fullSkillInfoObj[0].versionCtrl}`}))
        infoContainerEl.append(buildSingleElement({ele:'p', classes:['status', 'grid-center-item'], text:'Stable'}))
        infoContainerEl.append(buildSingleElement({ele:'h2', classes:['projects', 'grid-center-item'], text:'# of Projects'}))
        infoContainerEl.append(buildSingleElement({ele:'p', classes:['number', 'grid-center-item'], text:`${fullSkillInfoObj[0].numOfProjects}`}))
        infoContainerEl.append(buildSingleElement({ele:'p', classes:['production', 'grid-center-item'], text:'In Production'}))
        infoContainerEl.append(buildSingleElement({ele:'button', id:'info-caret', classes:['--info-caret', 'grid-center-item']}))
        
        //assigns a var for the caret element on the DOM
        let caretEl = document.getElementById('info-caret')
        //adds an img to the element
        caretEl.append(buildSingleElement({ele:'img', id:'caret-icon', source:'caret-down', classes:['--caret-down'], name:'caret down'}));
        //calls a function to add click listener event to this caret
        addCaretDownListener()   
      }, 1000)
       
}

//clears out the timeout so that a new mouseenter can bring up skill
function checkForCompleted(){
  if(!timeout) return;
  clearTimeout(timeout);
  timeout = null;
  isHovering = false;
}

function buildSingleElement(fullElement){
  //destructures the object to seperate variables
  const {ele, id, classes, text, source, name,  } = {...fullElement}
  
  //uses each variable to create the element, id, any classes, text inside element
  //source if its an image, and name
  let newElement = document.createElement(ele);
  source == 'animateCSS' ? (newElement.src = `./images/${source}.png`) : (newElement.src = `./images/${source}.svg`);
  name && (newElement.alt = name)
  id && (newElement.id = id);
  classes && (newElement.classList.add(...classes))
  id=='percentage' && text ? (newElement.textContent = `${text.toUpperCase()}${text.toUpperCase() == 'N/A' ? '' : '%'}`) : text && (newElement.textContent = text.toUpperCase());
  ele=='img' && id == 'caret-icon' || ele == 'img' && id == 'return-icon' ? (newElement.src = `./images/${source}.png`) : '';
  return newElement
}

function calculateTimeSpent(timespent){
  //gets the current date ISO string
  const now = DateTime.fromISO(new Date().toISOString())
  //gets the provided date ISO string
  const learned = DateTime.fromISO(timespent.toISOString())

  //calculates the difference of now and learned and places in an object
  const known = now.diff(learned, ['months', 'days']).toObject() //=> { months: 1, days: 2 }
  //if the object months is more than 11
  if(known.months > 11){
    //add a years key with the amount of years that go into months
    known.years = Math.floor(known.months/12);
    //change the months to the remaining months left after years key
    known.months = known.months%12;
  }
  //round days to the nearest whole number
  known.days = Math.round(known.days)
  return known
}

/* SKLZ INFO COMPONENT */
renderBackground()
renderTechNavLinks()

/* PROJECTS CONTAINER */
function calculatePercentages(languages){
  const sumValues = Object.values(languages).reduce((a, b) => a + b, 0);
  const calcLanguage = {};
  

  Object.keys(languages).forEach(function(key, index) {
    calcLanguage[key] = parseFloat((languages[key]/sumValues)*100).toFixed(2);
  });
  calcLanguage.total = sumValues;
  return calcLanguage;
}

function buildProjectsContainer(skill){
  skill = skill == 'iconscout' ? '@iconscout/react-unicons' : 
          skill == 'animate css' ? 'animate.css' : 
          skill == 'confettijs' ? 'confetti-js' : 
          skill == 'reactjs' ? 'react' : skill;
  //disable tech nav buttons
  removeTechNavListener()
        

  //hide the skills container
  skillsContainerEl.classList.remove('expanded');
  skillsContainerEl.classList.add('collapsed');

  //move the info container up
  infoContainerEl.classList.remove('move-down');
  infoContainerEl.classList.add('move-up');


  //change the info container grey to match projects
  infoContainerEl.classList.add('slate-bg');

  //add a back button to navigate back to skills options
  const backBtnEl = document.getElementById('back-btn');
  backBtnEl.classList.remove('hidden');
  backBtnEl.classList.add('flex');

  //hide the caret-down 
  const caretDownEl = document.getElementById('info-caret');
  caretDownEl.classList.add('hidden');

  //render the projects div information
  projectInfoContainerEl.classList.add('expanded');
  projectInfoContainerEl.append(buildSingleElement({ele:'div', id:'project-div', classes:['--project-div', 'slate-bg']}))
  const projectDivEl = document.getElementById('project-div');
  projectDivEl.append(buildSingleElement({ele:'h1', classes:['--project-title', 'thin-stroke'], text:`CHECK OUT SOME PROJECTS I'VE DONE IN REACT`}))
  const neededProjectsArr = projectsArr.filter(item => {
    return item.dependencies.includes(skill)
  })
  const projectsHtmlEl = neededProjectsArr.map(item => {
    const langPercentageObj = calculatePercentages(item.languages)
    let keyOne = Object.keys(langPercentageObj)[0];
    let keyTwo = Object.keys(langPercentageObj)[1];
    let keyThree = Object.keys(langPercentageObj)[2]; 


    return ` <div id="project-name-card" class="--project-card flex flex-wrap">
                <div id="project-image-div" class="--project-image-div">
                  <a href='${item.liveAt}'>
                    <img id="project-image" class="--project-image" src="${item.imageUrl}" alt="thumbnail for ${item.name} project">
                  </a>
                </div>
                <div id="project-data" class="--project-data-div">
                  <div class="progress">
                    <div class="progress-bar ${keyOne == 'JavaScript' ? 'bg-warning' : keyOne == 'CSS' ? 'bg-royal' : keyOne == 'HTML' ? 'bg-danger' :  'bg-typescript'}" role="progressbar" style="width:${langPercentageObj[keyOne]}%" aria-valuenow="${langPercentageObj[keyOne]}" aria-valuemin="0" aria-valuemax="100"></div>
                    <div class="progress-bar ${keyTwo == 'JavaScript' ? 'bg-warning' : keyTwo == 'CSS' ? 'bg-royal' : keyTwo == 'HTML' ? 'bg-danger' :  'bg-typescript'}" role="progressbar" style="width:${langPercentageObj[keyTwo]}%" aria-valuenow="${langPercentageObj[keyTwo]}" aria-valuemin="0" aria-valuemax="100"></div>
                    <div class="progress-bar ${keyThree == 'JavaScript' ? 'bg-warning' : keyThree == 'CSS' ? 'bg-royal' : keyThree == 'HTML' ? 'bg-danger' :  'bg-typescript'}" role="progressbar" style="width:${langPercentageObj[keyThree]}%" aria-valuenow="${langPercentageObj[keyThree]}" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <ul id="progress-data" class="--progress-data flex flex-wrap">
                    <li class="--lang-1 ${keyOne == 'JavaScript' ? 'js' : keyOne == 'CSS' ? 'css' : keyOne == 'HTML' ? 'html' :  'ts'} black-text XXPT bold">${keyOne} <span class="--lang-percentage XVIPT">${langPercentageObj[keyOne]}%</span></li>
                    <li class="--lang-2 ${keyTwo == 'JavaScript' ? 'js' : keyTwo == 'CSS' ? 'css' : keyTwo == 'HTML' ? 'html' :  'ts'} black-text XXPT bold">${keyTwo} <span class="--lang-percentage XVIPT">${langPercentageObj[keyTwo]}%</span></li>
                    <li class="--lang-3 ${keyThree == 'JavaScript' ? 'js' : keyThree == 'CSS' ? 'css' : keyThree == 'HTML' ? 'html' :  'ts'} black-text XXPT bold">${keyThree} <span class="--lang-percentage XVIPT">${langPercentageObj[keyThree]}%</span></li>
                  </ul>
                  <h2 class="XXXIIPT thin-stroke">${item.name.toUpperCase()}</h2>
                  <div id="github-div" class="--github-div flex">
                    <p class="thin-stroke">${DateTime.fromISO(item.createdAt).toFormat('MMM dd, yyyy')}</p>
                    <a id='github-link' class='--github-link' href="${item.githubLocation}">
                      <img id='code-fork' class='--code-fork' src="/images/code-fork-solid.png" alt="repo link">
                    </a>
                  </div>
                </div>
              </div>
            </div>`
  }).join(' ')
  
  projectDivEl.innerHTML = projectsHtmlEl == '' ? `<div id="project-name-card" class="--project-card flex flex-wrap"><p>Currently Rawle is not displaying any projects with this skill</p></div>` : projectsHtmlEl;
}

function backToSkills(){
  //add back the tech-nav listeners
  addTechNavListener()

  //show the skills container
  projectInfoContainerEl.classList.remove('expanded');
  projectInfoContainerEl.classList.add('collapsed');
  infoContainerEl.classList.add('move-down');
  skillsContainerEl.classList.add('expanded');
  
  //show the caret down
  const caretDownEl = document.getElementById('info-caret');
  caretDownEl.classList.remove('hidden');

  //hide the back btn
  const backBtnEl = document.getElementById('back-btn')
  backBtnEl.classList.remove('flex');
  backBtnEl.classList.add('hidden');

  
  
  setTimeout(()=>{
    projectInfoContainerEl.innerHTML = '';
    projectInfoContainerEl.classList.remove('expanded', 'collapsed');
    infoContainerEl.classList.remove('move-up');
    skillsContainerEl.classList.remove('collapse');
    
  },1500)
  
}