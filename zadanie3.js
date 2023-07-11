const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const gallery = document.getElementById("gallery");

let page = 1;
let loading = false;

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const query = input.value;
  loadImages(query);
});

const observer = new IntersectionObserver(handleIntersection);

const observedElement = document.createElement("li");
gallery.appendChild(observedElement);

observer.observe(observedElement);

async function handleIntersection(entries) {
  if (!observedElement.previousElementSibling) {
    return;
  }

  if (entries[0].isIntersecting && !loading) {
    page++;
    const query = input.value;
    console.log("Loading more images...");
    await loadImages(query);
    console.log("Images loaded!");
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
    const link = document.createElement("a");
    const img = document.createElement("img");

    link.href = image.largeImageURL;

    img.src = image.webformatURL;
    img.alt = image.tags;
    img.dataset.source = image.largeImageURL;

    link.appendChild(img);
    listItem.appendChild(link);
    gallery.insertBefore(listItem, observedElement);
  });
}
