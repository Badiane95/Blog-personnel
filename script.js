document.addEventListener("DOMContentLoaded", () => {
    // Smooth scrolling pour les liens de navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Bouton de retour en haut de page
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.id = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '&#8593;';
    scrollToTopBtn.style.display = 'none';
    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    });

    // Navigation entre les projets
    const prevButton = document.getElementById('prev-project');
    const nextButton = document.getElementById('next-project');
    const projectsContainer = document.querySelector('.projects-horizontal');
    const projects = document.querySelectorAll('.project-details');
    let currentIndex = 0;

    if (prevButton && nextButton && projectsContainer) {
        prevButton.addEventListener('click', () => navigateProjects(-1));
        nextButton.addEventListener('click', () => navigateProjects(1));

        function navigateProjects(direction) {
            currentIndex = (currentIndex + direction + projects.length) % projects.length;
            projectsContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
    }

    // Gestion de la navigation active
    const navbar = document.getElementById("navbar");
    const links = navbar.querySelectorAll("a");
    const sections = document.querySelectorAll("section");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 100;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute("id");
            }
        });

        links.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });

        // Effet de réduction de la barre au scroll
        navbar.classList.toggle("scroll", window.scrollY > 50);
    });

    // Gestion des commentaires
    const commentForm = document.getElementById("comment-form");
    const commentsList = document.getElementById("comments-list");

    if (commentForm && commentsList) {
        commentForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const name = document.getElementById("name").value || "Utilisateur";
            const comment = document.getElementById("comment").value;

            if (comment.trim() === "") {
                alert("Veuillez écrire un commentaire.");
                return;
            }

            const newComment = document.createElement("li");
            newComment.innerHTML = `<strong>${name} :</strong> ${comment}`;
            commentsList.appendChild(newComment);
            commentForm.reset();
        });
    }

    // Lightbox pour les images
    const images = document.querySelectorAll('.clickable-image');
    const modal = document.createElement('div');
    modal.classList.add('modal');
    document.body.appendChild(modal);

    images.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = "block";
            modal.innerHTML = `
                <span class="close">&times;</span>
                <img class="modal-content" src="${this.src}">
            `;
        });
    });

    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.classList.contains('close')) {
            modal.style.display = "none";
        }
    });
});
