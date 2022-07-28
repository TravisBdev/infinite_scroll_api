const postsContainer = document.querySelector('#post-container');
const loadIcon = document.querySelector('.loader');
const filter = document.querySelector('#filter');

let limit= 5;
let page = 1;

// fetch data for posts from API
async function getData () {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);

  const data = await response.json();

  return data;
}

// builds posts, then appends them to the page
async function showPosts() {
  const posts = await getData();

  posts.forEach(post => {
    const indivPost = document.createElement('div');
    indivPost.classList.add('post');

    const html = `
    <div class="post-info">
      <h2 class="post-title">${post.title}</h2>
      <p class="post-body">${post.body}</p>
    </div>
    `;

    indivPost.insertAdjacentHTML('afterbegin', html);
    postsContainer.append(indivPost);
  });
}

// fetch more post data and show loading icon
function nowLoading () {
  loadIcon.classList.add('show')

  setTimeout(() => {
    loadIcon.classList.remove('show');

    setTimeout(() => {
      page++;
      showPosts();
    }, 400);

  }, 800);
}

// filters the posts by search criteria
function filterContent(e){
  const searchTerm = e.target.value.toUpperCase();
  const posts = document.querySelectorAll('.post');

  posts.forEach(post => {
    const title = post.querySelector('.post-title').innerText.toUpperCase();
    const body = post.querySelector('.post-body').innerText.toUpperCase();

    if(title.indexOf(searchTerm) > -1 || body.indexOf(searchTerm) > -1) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  })
}



// show posts on page load
showPosts();

// listens for a scroll, then calls the loading function to add more posts
window.addEventListener('scroll', () => {
  const {scrollTop, scrollHeight, clientHeight} = document.documentElement;

  if(scrollTop + clientHeight >= scrollHeight - 5) {
    nowLoading();
  }
})

filter.addEventListener('input', filterContent);