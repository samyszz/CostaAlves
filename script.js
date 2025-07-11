document.addEventListener("DOMContentLoaded", () => {
    // --- LÓGICA DO MENU HAMBÚRGUER ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    navLinks.forEach(link => link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }));

    // --- LÓGICA PARA CARREGAR ARTIGOS COM A API NEWSDATA.IO ---
    const articlesContainer = document.getElementById("articles-container");
    
    // Sua API Key.
    const apiKey = "pub_84581fb9a4ef07e1d135e82e9d33172e83635"; 

    articlesContainer.innerHTML = '<p>Carregando artigos jurídicos...</p>';

    // SOLUÇÃO FINAL E ROBUSTA:
    // 1. Abandonamos o parâmetro 'domain' que causa o erro 422.
    // 2. Usamos o parâmetro 'q' para buscar por termos jurídicos relevantes.
    // 3. O operador "OR" busca por artigos que contenham QUALQUER uma das palavras.
    const query = "advocacia OR jurídico OR lei OR supremo tribunal federal OR STF OR STJ";
    const apiUrl = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${encodeURIComponent(query)}&language=pt&country=br`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.status !== "success" || data.totalResults === 0) {
                articlesContainer.innerHTML = "<p>Nenhum artigo jurídico foi encontrado recentemente.</p>";
                return;
            }

            const articles = data.results;
            let articlesHTML = "";
            
            // Exibimos os 8 melhores resultados da busca.
            articles.slice(0, 8).forEach(article => {
                const title = article.title;
                const link = article.link;
                const imageUrl = article.image_url || 'capa_artigo.png'; // Imagem padrão
                const description = article.description ? article.description.substring(0, 150) : "Leia mais sobre este tópico.";

                articlesHTML += `
                    <a href="${link}" target="_blank" rel="noopener noreferrer" class="article-card">
                        <img src="${imageUrl}" alt="" class="article-card-image">
                        <div class="article-card-content">
                            <h3>${title}</h3>
                            <p>${description}...</p>
                        </div>
                    </a>
                `;
            });

            articlesContainer.innerHTML = articlesHTML;
        })
        .catch(error => {
            console.error("Erro ao carregar artigos via Newsdata.io:", error);
            articlesContainer.innerHTML = '<p style="text-align:center; color: #c0392b;">Ocorreu um erro ao buscar os artigos. Por favor, verifique o console para mais detalhes.</p>';
        });
});