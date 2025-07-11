// Carrossel Artigos
const carousel = document.getElementById('carousel');
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
const modal = document.getElementById('articleModal');
const modalTitle = document.getElementById('modalTitle');
const modalContent = document.getElementById('modalContent');
const closeModal = document.querySelector('.close');

// Função para mover o carrossel para a direita
nextButton.addEventListener('click', () => {
  carousel.scrollBy({ left: 300, behavior: 'smooth' });
});

// Função para mover o carrossel para a esquerda
prevButton.addEventListener('click', () => {
  carousel.scrollBy({ left: -300, behavior: 'smooth' });
});

// // Lógica para mostrar/ocultar o botão "voltar ao topo"
const topButton = document.getElementById('top-button');
window.onscroll = function () {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    topButton.style.display = "block";
  } else {
    topButton.style.display = "none";
  }
};

topButton.addEventListener('click', function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Abrir o modal ao clicar em um artigo
const articles = document.querySelectorAll('.carousel-item');
articles.forEach(article => {
  article.addEventListener('click', (e) => {
    e.preventDefault(); // Previne o comportamento padrão do link
    const title = article.getAttribute('data-title');
    const content = article.getAttribute('data-content');
    modalTitle.textContent = title;
    modalContent.textContent = content;
    modal.style.display = "block"; // Exibe o modal
  });
});

// Fechar o modal ao clicar no "X"
closeModal.addEventListener('click', () => {
  modal.style.display = "none"; // Oculta o modal
});

// Fechar o modal ao clicar fora do conteúdo
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = "none"; // Oculta o modal
  }
});