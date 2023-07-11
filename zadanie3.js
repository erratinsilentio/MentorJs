const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const gallery = document.getElementById("gallery");

const observedElement = document.createElement("li");
gallery.appendChild(observedElement);

let page = 1;
let loading = false;

form.addEventListener("submit", function (e) {
  e.preventDefault();

  page = 1;
  gallery.innerHTML = "";
  gallery.appendChild(observedElement);

  const query = input.value;
  loadImages(query);
});

const observer = new IntersectionObserver(handleIntersection);

observer.observe(observedElement);

async function handleIntersection(entries) {
  if (!observedElement.previousElementSibling) {
    return;
  }

  if (entries[0].isIntersecting && !loading) {
    page++;
    const query = input.value;
    await loadImages(query);
  }
}

async function loadImages(query) {
  loading = true;

  const apiKey = "38193819-c339577d072b6322761c9fe84";
  const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
    query
  )}&per_page=20&page=${page}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.hits.length > 0) {
      displayImages(data.hits);
    } else {
      gallery.innerHTML = "<li>No more images found</li>";
    }
  } catch (error) {
    console.error("Oops! There is an error: ", error);
    gallery.innerHTML = "<li>Oops! We have an error ;(</li>";
  }

  loading = false;
}

function displayImages(images) {
  images.forEach((image) => {
    const listItem = document.createElement("li");
    const img = document.createElement("img");

    img.src = image.webformatURL;
    img.alt = image.tags;
    img.dataset.source = image.largeImageURL;

    listItem.onclick = () => {
      basicLightbox
        .create(
          `
        <img width="1400" height="900" src="${image.largeImageURL}">
      `
        )
        .show();
    };

    listItem.appendChild(img);
    gallery.insertBefore(listItem, observedElement);
  });
}
