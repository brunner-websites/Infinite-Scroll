const imageContainer = document.getElementById('image-container');
const loaderElement = document.getElementById('loader');

let photosArray = []

let isReadyToLoadNewPictures = false;
let totalPicturesOnPage = 0;
let picturesLoaded = 0;

// Unsplash API
let pictureRequestCount = 3;
const clientAccessKey = 'ewK48Stf4gGV6wFIiHmhGKzKQYIBx5MLJiEaMMf-Ooo';
const unsplashUrl = `https://api.unsplash.com/photos/random/?client_id=${clientAccessKey}&count=${pictureRequestCount}&query=landscape`;



// Get photos from Unsplash
async function getPhotos() {

  try {
    const response = await fetch(unsplashUrl);
    photosArray = await response.json();

    totalPicturesOnPage += pictureRequestCount;

    displayPhotos();

  } catch (error) {
    console.log("something went wrong", error)
  }
}


// Display Photos
function displayPhotos() {

  photosArray.forEach(photo => {

    const photoImgUrl = photo.urls.regular;
    const altDesc = photo.alt_description;
    const htmlLink = photo.links.html;

    let aElement = document.createElement('a');
    aElement.href = htmlLink;
    aElement.target = '_blank';

    let imgElement = document.createElement('img');
    imgElement.src = photoImgUrl;
    imgElement.alt = altDesc;
    imgElement.title = altDesc;
    imgElement.addEventListener('load', loadingImage)

    aElement.appendChild(imgElement);

    imageContainer.appendChild(aElement);
  })
}


function loadingImage() {
  picturesLoaded++;

  if (picturesLoaded === totalPicturesOnPage) {
    loaderElement.hidden = true;
    isReadyToLoadNewPictures = true;
  }
}

// check to see if bottom of page is reached
window.addEventListener('scroll', () => {

  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && isReadyToLoadNewPictures) {
    isReadyToLoadNewPictures = false;

    getPhotos();
  }
});


// On Load
getPhotos();