function loadContent(page) {
  const contentContainer = document.getElementById("content");
  contentContainer.innerHTML = "";

  fetch(`${page}/${page}.html`)
    .then((response) => response.text())
    .then((html) => {
      contentContainer.innerHTML = html;
    })
    .catch((error) => {
      contentContainer.innerHTML = `<p>Error loading ${page}.html</p>`;
      console.error(error);
    });
}

document.getElementById("zadanie1-btn").addEventListener("click", () => {
  loadContent("zadanie1");
});

document.getElementById("zadanie2-btn").addEventListener("click", () => {
  loadContent("zadanie2");
});

document.getElementById("zadanie3-btn").addEventListener("click", () => {
  loadContent("zadanie3");
});

loadContent("zadanie1");
