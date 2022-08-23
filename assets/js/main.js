/*=====Show Menu=====*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  // Validate That Variables Exist
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      // We Add The "show-menu" Class To The Division Tag With The "nav__menu" Class
      nav.classList.toggle('show-menu');
    });
  }
};
showMenu('nav-toggle', 'nav-menu');

/*=====Remove Menu Mobile=====*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
  const navMenu = document.getElementById('nav-menu');
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove('show-menu');
}
navLink.forEach((n) => n.addEventListener('click', linkAction));

/*=====Scroll Sections Active Link=====*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector('.nav__menu a[href*=' + sectionId + ']')
        .classList.add('active-link');
    } else {
      document
        .querySelector('.nav__menu a[href*=' + sectionId + ']')
        .classList.remove('active-link');
    }
  });
}
window.addEventListener('scroll', scrollActive);

/*=====Show Scroll To Top Button=====*/
function scrollTop() {
  const scrollTop = document.getElementById('scroll-top');
  // When The Scroll Is Higher Than 560 Viewport Height, Add The Show-scroll Class To The A Tag With The Scroll-top Class.
  if (this.scrollY >= 200) scrollTop.classList.add('show-scroll');
  else scrollTop.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollTop);

/*=====Dark/Light Theme=====*/
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'bx-sun';

// Previously Selected Topic (If User Selected)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// We Obtain The Current Theme That The Interface Has By Validating The "dark-theme" Class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun';

// We Validate If The User Previously Chose A Topic
if (selectedTheme) {
  // If The Validation Is Fulfilled, We Ask What The Issue Was To Know If We Activated Or Deactivated The Dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](
    darkTheme
  );
  themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](
    iconTheme
  );
}

// Activate / Deactivate The Theme Manually With The Button
themeButton.addEventListener('click', () => {
  // Add Or Remove The Dark / Icon Theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We Save The Theme And The Current Icon That The User Chose
  localStorage.setItem('selected-theme', getCurrentTheme());
  localStorage.setItem('selected-icon', getCurrentIcon());
});

/*=====Reduce The Size & Print On An A4 Sheet=====*/
function scaleCv() {
  document.body.classList.add('scale-cv');
}

/*=====Remove The Size When The CV Is Downloaded=====*/
function removeScale() {
  document.body.classList.remove('scale-cv');
}

/*=====Generate PDF=====*/
// PDF Generated Area
let areaCv = document.getElementById('area-cv');

let resumeButton = document.getElementById('resume-button');

// Html To PDF Options
let opt = {
  margin: 0,
  filename: 'myResume.pdf',
  image: { type: 'jpeg', quality: 1 },
  html2canvas: { scale: 6 },
  jsPDF: { format: 'a4', orientation: 'portrait' },
};

function generateResume() {
  html2pdf(areaCv, opt);
}

// Function To Call Area Resume & Html To PDF Options
function generateResume() {
  html2pdf(areaCv);
}

// When the button is clicked, it executes the three functions
resumeButton.addEventListener('click', () => {
  // 1. The class .scale-cv is added to the body, where it reduces the size of the elements
  scaleCv();

  // 2. The PDF is generated
  generateResume();

  // 3. The .scale-cv class is removed from the body after 5 seconds to return to normal size.
  setTimeout(removeScale, 5000);
});
