document.addEventListener("DOMContentLoaded", () => {
  const toyCollection = document.getElementById("toy-collection");

  // Fetch toys from server
  fetch("http://localhost:3000/toys")
    .then((response) => response.json())
    .then((toys) => {
      toys.forEach((toy) => renderToy(toy));
    });

  // Function to render a single toy card
  function renderToy(toy) {
    const card = document.createElement("div");
    card.classList.add("card");

    const h2 = document.createElement("h2");
    h2.textContent = toy.name;
    card.appendChild(h2);

    const img = document.createElement("img");
    img.src = toy.image;
    img.classList.add("toy-avatar");
    card.appendChild(img);

    const p = document.createElement("p");
    p.textContent = `${toy.likes} Likes`;
    card.appendChild(p);

    const likeBtn = document.createElement("button");
    likeBtn.classList.add("like-btn");
    likeBtn.textContent = "Like ❤️";
    likeBtn.setAttribute("id", toy.id);
    likeBtn.addEventListener("click", () => {
      increaseLikes(toy, p);
    });
    card.appendChild(likeBtn);

    toyCollection.appendChild(card);
  }

  // Function to handle increasing likes
  function increaseLikes(toy, likesElement) {
    const newLikes = toy.likes + 1;
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        likes: newLikes,
      }),
    })
      .then((response) => response.json())
      .then((updatedToy) => {
        toy.likes = updatedToy.likes;
        likesElement.textContent = `${updatedToy.likes} Likes`;
      })
      .catch((error) => console.error("Error updating likes:", error));
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Existing code

  const toyForm = document.querySelector(".add-toy-form");

  toyForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = toyForm.querySelector('input[name="name"]').value;
    const image = toyForm.querySelector('input[name="image"]').value;
    const likes = 0; // New toys start with 0 likes

    // Send POST request to create a new toy
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ name, image, likes }),
    })
      .then((response) => response.json())
      .then((newToy) => {
        renderToy(newToy); // Render the new toy card
        toyForm.reset(); // Clear the form inputs
      })
      .catch((error) => console.error("Error creating toy:", error));
  });

  // Existing code for rendering and like functionality
});
