let last_page = 0;
let capyFrame = 1;
const screenWidth = window.screen.width;
let progress = screenWidth;
let menuOpened = false;

function openSection(id) {
    const prevPage = document.getElementById("page-"+last_page).classList;
    prevPage.add('hide-page');
    manageMenuButton();
    setTimeout(() => {
        const newPage = document.getElementById("page-"+id).classList;
        newPage.remove('hide-page');
        newPage.add('active-page');
        prevPage.remove('active-page');
        last_page = id;
    }, 800);

    // document.getElementById("page-"+last_page).classList.remove('active-page');
    // document.getElementById("page-1").classList.add("active-page");
    // window.history.pushState({}, null, '/home');
}

function setActive(id, set) {
    if(set) {
        document.querySelector("#section-"+id + " .arrow").classList.add('active-arrow');
    } else {
        document.querySelector("#section-"+id + " .arrow").classList.remove('active-arrow');
    }
}

function manageMenuButton() {
    if(menuOpened) {
        document.getElementById('menu').style.transform = 'translateX(-100%)';
        menuOpened = false;
        document.getElementById('menu-button').innerText = "=";
    } else {
        document.getElementById('menu').style.transform = 'translateX(0)';
        menuOpened = true;
        document.getElementById('menu-button').innerText = "X";
    }
}

const TOTAL_IMAGES = 4;
let loadedImages = 0;
let canvas = null;
let ctx = null;
// Animation variables
let currentFrame = 0;

// Array to store image frames
const frames = [];

function updateCanvas() {
    // Clear the canvas
    if(progress % 13 == 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the current frame
        ctx.drawImage(frames[capyFrame - 1], 0, 0, canvas.width, canvas.height);

        if(capyFrame === 4)
            capyFrame = 1;
        else
            capyFrame++;
    }

    canvas.style.transform = 'translateX('+progress+'px)';

    console.log(progress)

    if(progress <= -300)
        progress=screenWidth;
    else
        progress-=2;

    // Request the next frame
    requestAnimationFrame(updateCanvas);
}

function imageLoaded(imgobj) {
    loadedImages++;
    frames.push(imgobj);

    ctx.imageSmoothingEnabled = false;

    if(loadedImages === TOTAL_IMAGES) {
        console.log('All images loaded');

        console.log(frames)

        setTimeout(() => {
            updateCanvas();
        }, 1000);
    }
}

onload = () => {
    canvas =  document.getElementById('animationCanvas');
    ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    // Load image frames
    for (let i = 1; i <= TOTAL_IMAGES; i++) {
        const img = new Image();
        img.src = `img/capy${i}.png`; // Replace with your frame filenames
        
        const aspectRatio = img.width / img.height;

        const canvasWidth = 300; // Replace with your desired canvas width
        const canvasHeight = canvasWidth / aspectRatio;

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        img.onload = () => {
            imageLoaded(img)
        };
    }


}