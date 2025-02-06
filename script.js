var tabsContainer = document.getElementById("tabs");
var postsContainer = document.getElementById("posts");

fetch("https://jsonplaceholder.typicode.com/users")
  .then(function (response) {
    return response.json();
  })
  .then(function (users) {
    if (users.length === 0) {
      console.log("no users found");
      return;
    }

    users.forEach(function (user, index) {
      var tab = document.createElement("div");
      tab.classList.add("tab");
      tab.textContent = user.username;

      tab.addEventListener("click", function () {
        loadPosts(user.id);
        document.querySelectorAll(".tab").forEach(function (t) {
          t.classList.remove("active");
        });
        tab.classList.add("active");
      });

      tabsContainer.appendChild(tab);

      if (index === 0) {
        tab.classList.add("active");
        loadPosts(user.id);
      }
    });
  })
  .catch(function () {
    postsContainer.textContent = "Error fetching users.";
  });

async function loadPosts(id) {
  try {
    postsContainer.innerHTML = "";

    var response = await fetch(
      "https://jsonplaceholder.typicode.com/posts?userId=" + id
    );
    var posts = await response.json();

    if (posts.length === 0) {
      postsContainer.textContent = "No posts available for this user.";
      return;
    }

    posts.forEach(function (post) {
      var postElement = document.createElement("div");
      postElement.textContent = post.title;
      postsContainer.appendChild(postElement);
    });
  } catch (error) {
    postsContainer.textContent = "Error loading posts.";
    console.error(error);
  }
}
