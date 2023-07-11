const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const gallery = document.getElementById("gallery");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const query = input.value;
  console.log(query);
  searchImages(query);
});

async function searchImages(query) {
  const apiKey = "38193819-c339577d072b6322761c9fe84";
  const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
    query
  )}&per_page=20`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    console.log(data);
    if (data.hits.length > 0) {
      displayImages(data.hits);
    } else {
      gallery.innerHTML = "<li>No images found</li>";
    }
  } catch (error) {
    console.error("Oops! There is an error: ", error);
    gallery.innerHTML = "<li>Oops! We have an error;(</li>";
  }
}

function displayImages(images) {
  gallery.innerHTML = "";

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
    gallery.appendChild(listItem);
  });
}
