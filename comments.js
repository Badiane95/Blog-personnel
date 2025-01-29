// comments.js

document.addEventListener("DOMContentLoaded", () => {
    const commentsList = document.getElementById("comments-list");
    const postCommentBtn = document.getElementById("post-comment-btn");
    const newCommentInput = document.getElementById("new-comment-input");

    // Array to store comments
    let comments = [];

    // Function to render comments
    const renderComments = () => {
        commentsList.innerHTML = ""; // Clear existing comments

        comments.forEach((comment) => {
            const commentElement = createCommentElement(comment);
            commentsList.appendChild(commentElement);
        });
    };

    // Create a comment element (with replies)
    const createCommentElement = (comment) => {
        const li = document.createElement("li");
        li.classList.add("comment");
        li.innerHTML = `
            <div class="comment-header">
                <span><strong>${comment.author}</strong></span>
                <span>${new Date(comment.timestamp).toLocaleString()}</span>
            </div>
            <div class="comment-body">${comment.text}</div>
            <div class="comment-actions">
                <button class="like-btn">👍 ${comment.likes}</button>
                <button class="reply-btn">Répondre</button>
            </div>
        `;

        // Event for liking a comment
        li.querySelector(".like-btn").addEventListener("click", () => {
            comment.likes++;
            renderComments();
        });

        // Event for replying to a comment
        li.querySelector(".reply-btn").addEventListener("click", () => {
            const replyInput = document.createElement("textarea");
            replyInput.placeholder = "Votre réponse...";
            const replyBtn = document.createElement("button");
            replyBtn.textContent = "Poster la réponse";

            const replyContainer = document.createElement("div");
            replyContainer.classList.add("reply");
            replyContainer.appendChild(replyInput);
            replyContainer.appendChild(replyBtn);
            li.appendChild(replyContainer);

            replyBtn.addEventListener("click", () => {
                const replyText = replyInput.value.trim();
                if (replyText) {
                    const reply = {
                        id: Date.now(),
                        text: replyText,
                        author: "Utilisateur",
                        timestamp: Date.now(),
                        likes: 0,
                    };
                    comment.replies.push(reply);
                    renderComments();
                }
            });
        });

        // Add replies
        if (comment.replies.length > 0) {
            const repliesContainer = document.createElement("ul");
            repliesContainer.classList.add("replies");

            comment.replies.forEach((reply) => {
                const replyElement = createCommentElement(reply);
                repliesContainer.appendChild(replyElement);
            });

            li.appendChild(repliesContainer);
        }

        return li;
    };

    // Event for posting a new comment
    postCommentBtn.addEventListener("click", () => {
        const text = newCommentInput.value.trim();
        if (text) {
            const newComment = {
                id: Date.now(),
                text: text,
                author: "Utilisateur",
                timestamp: Date.now(),
                likes: 0,
                replies: [],
            };

            comments.push(newComment);
            newCommentInput.value = "";
            renderComments();
        } else {
            alert("Le commentaire ne peut pas être vide.");
        }
    });

    // Simulate real-time notifications (interval)
    setInterval(() => {
        if (comments.length > 0) {
            const newNotification = `Nouveau commentaire de "${comments[comments.length - 1].author}" : "${comments[comments.length - 1].text}"`;
            console.log(newNotification);
            alert(newNotification); // You can replace this with a toast notification
        }
    }, 15000);
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
