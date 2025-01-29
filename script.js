// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll to top button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("scroll-to-top").style.display = "block";
    } else {
        document.getElementById("scroll-to-top").style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


/// Sélectionner les éléments nécessaires
const prevButton = document.getElementById('prev-project');
const nextButton = document.getElementById('next-project');
const projectsContainer = document.querySelector('.projects-horizontal');

// Suivi de la position du projet visible
let currentIndex = 0;
const projects = document.querySelectorAll('.project-details');
const totalProjects = projects.length;


document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("navbar");
    const links = navbar.querySelectorAll("a");
    const sections = document.querySelectorAll("section");

    // Ajoute une classe "active" à la navigation basée sur le défilement
    window.addEventListener("scroll", () => {
        let current = "";

        // Trouve la section visible
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 50; // Ajuster au besoin
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute("id");
            }
        });

        // Applique la classe active à la navigation
        links.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });

        // Effet de réduction de la barre au scroll
        if (window.scrollY > 50) {
            navbar.classList.add("scroll");
        } else {
            navbar.classList.remove("scroll");
        }
    });
});
 
document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scroll");
        } else {
            header.classList.remove("scroll");
        }
    });
});
document.getElementById("comment-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value || "Utilisateur";
    const comment = document.getElementById("comment").value;

    if (comment.trim() === "") {
        alert("Veuillez écrire un commentaire.");
        return;
    }

    // Ajoute le commentaire au conteneur
    const commentsList = document.getElementById("comments-list");
    const newComment = document.createElement("li");
    newComment.innerHTML = `<strong>${name} :</strong> ${comment}`;
    commentsList.appendChild(newComment);

    // Réinitialise le formulaire
    document.getElementById("comment-form").reset();
});
document.addEventListener('DOMContentLoaded', function() {
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
