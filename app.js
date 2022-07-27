const postsContainer = document.querySelector('#post-container');
const loadIcon = document.querySelector('.loader');
const filter = document.querySelector('#filter');

let limit = 3;
let page = 1;

// fetch data for posts from API
async function getPosts () {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);

  const data = await response.json();

  return data;
}

// builds posts, then appends them to the page
async function showPosts() {
  const posts = await getPosts();

  posts.forEach(post => {
    const indivPost = document.createElement('div');
    indivPost.classList.add('post');

    let html = `
    <div class="number">${post.id}</div>
    <div class="post-info">
      <h2 class="post-title">${post.title}</h2>
      <p class="post-body">${post.body}</p>
    </div>
    `;

    indivPost.insertAdjacentHTML('afterbegin', html);
    postsContainer.append(indivPost);
  });
}

showPosts();