async function loadArticles() {
  try {
    const response = await fetch('articles.json');
    if (!response.ok) {
      throw new Error('Erreur lors du chargement des articles');
    }
    const articles = await response.json();

    // Trier les articles par poids (poids le plus élevé en premier)
    articles.sort((a, b) => b.weight - a.weight);

    displayArticleList(articles);
  } catch (error) {
    console.error("Erreur :", error);
    document.getElementById("article-list").innerHTML = "<p>Impossible de charger les articles.</p>";
  }
}

function displayArticleList(articles) {
  const articleList = document.getElementById("article-list");
  articleList.innerHTML = ""; // Assure que la liste est vide au démarrage

  // Masque le bouton "Retour à la liste" car nous sommes sur la vue de la liste
  document.getElementById("backButton").style.display = "none";

  // Affiche chaque article sous forme de lien avec couleur de fond
  articles.forEach((article) => {
    const div = document.createElement("div");
    div.classList.add("article");
    div.style.backgroundColor = "#444"; // Couleur de fond pour chaque article dans la liste
    div.innerText = article.title;
    div.addEventListener("click", () => displayArticleDetail(article));
    articleList.appendChild(div);
  });

  document.getElementById("article-list").classList.remove("hidden");
  document.getElementById("article-detail").classList.add("hidden");
}

function displayArticleDetail(article) {
  const articleDetail = document.getElementById("article-detail");
  const articleContent = document.getElementById("article-content");

  // Affiche le bouton "Retour à la liste" car nous sommes sur la vue de détail
  document.getElementById("backButton").style.display = "block";

  // Applique la couleur de fond pour toute la section de détail
  articleDetail.style.backgroundColor = article.color;

  // Convertit le Markdown en HTML avec Marked.js
  articleContent.innerHTML = `
    <h2>${article.title}</h2>
    <p>${marked.parse(article.content)}</p>
  `;

  document.getElementById("article-list").classList.add("hidden");
  articleDetail.classList.remove("hidden");
}

document.getElementById("backButton").addEventListener("click", () => {
  document.getElementById("article-list").classList.remove("hidden");
  document.getElementById("article-detail").classList.add("hidden");

  // Masquer le bouton "Retour à la liste" car nous revenons à la vue de la liste
  document.getElementById("backButton").style.display = "none";

  // Réinitialise le fond et le contenu pour la vue de détail
  document.getElementById("article-detail").style.backgroundColor = "";
  document.getElementById("article-content").innerHTML = "";
});

// Charger et afficher les articles au démarrage
loadArticles();
