const API_URL = "https://jsonplaceholder.typicode.com/posts";

const loadingElement = document.querySelector("#loading");
const postsContainer = document.querySelector("#posts-container");

const urlSearchParams = new URLSearchParams(window.location.search);
const postId = urlSearchParams.get("id");

const postPage = document.querySelector("#post");
const postContainer = document.querySelector("#post-container");
const commentsContainer = document.querySelector("#commnets-container");

async function getAllPosts() {
  const response = await fetch(API_URL);

  console.log(response);

  const data = await response.json();

  console.log(data);

  loadingElement.classList.add("hide");

  data.map((post) => {
    const div = document.createElement("div");
    const title = document.createElement("h2");
    const body = document.createElement("p");
    const link = document.createElement("a");

    title.innerText = post.title;
    body.innerText = post.body;
    link.innerText = "Ler";
    link.setAttribute("href", `/post.html?id=${post.id}`);

    div.appendChild(title);
    div.appendChild(body);
    div.appendChild(link);

    postsContainer.appendChild(div);
  });
}

async function getPost(id) {
  const [responsePost, responseComments] = await Promise.all([
    fetch(`${API_URL}/${id}`),
    fetch(`${API_URL}/${id}/comments`),
  ]);

  const dataPost = await responsePost.json();
  const dataComments = await responseComments.json();

  loadingElement.classList.add("hide");
  postPage.classList.remove("hide");

  const title = document.createElement("h1");
  const body = document.createElement("p");

  title.innerText = dataPost.title;
  body.innerText = dataPost.body;

  postContainer.appendChild(title);
  postContainer.appendChild(body);
}

if (!postId) {
  getAllPosts();
} else {
  getPost(postId);
}
