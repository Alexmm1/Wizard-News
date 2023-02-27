const express = require("express");
const morgan = require("morgan");
const postBank = require("./postBank");
const app = express();

app.use(morgan("dev"));

app.use(express.static("public"));

// console.log(postBank.list);

app.get("/", (req, res) => {
  const postBanksList = postBank.list();

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      ${postBanksList
        .map(
          (post) => `
        <div class='news-item'>
          <p>
            <span class="news-position">${post.id}. ▲</span>
            ${post.title}
            <small>(by ${post.name})</small>
          </p>
          <small class="news-info">
            ${post.upvotes} upvotes | ${post.date}
          </small>
          <small class="news-info">
          <a href="/posts/${post.id}">${post.title}</a>
          </small>
        </div>`
        )
        .join("")}
    </div>
  </body>
</html>`;
  res.send(html);
});

// app.get("/posts/:id", (req, res) => {
//   const id = req.params.id;
//   const post = postBank.find(id);

//   if (!post.id) {
//     res.status(404);

//     const html = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <title>Wizard News</title>
//       <link rel="stylesheet" href="/style.css" />
//     </head>
//     <body>
//       <header><img src="/logo.png"/>Wizard News</header>
//       <div class="not-found">
//         <p>404: Page Not Found</p>
//       </div>
//     </body>
//     </html>`;
//     res.send(html);
//   } else {
//     const html = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <title>Wizard News</title>
//       <link rel="stylesheet" href="/style.css" />
//     </head>
//     <body>
//       <div class="news-list">
//         <header><img src="/logo.png"/>Wizard News</header>
//         ${`
//           <div class='news-item'>
//             <p>
//               ${post.title}
//               <small>(by ${post.name})</small>
              
//             </p>
//             <p>
//             ${post.content}
//             </p>
//             <small class="news-info">
//               ${post.date}
//             </small>
//           </div>`}
//       </div>
//     </body>
//   </html>`;
//     res.send(html);
//   }
// });

app.get('/post/:id', (req, res) => {
  const id = req.params.id
  const post = find(id)
  if(!post.id) {
    throw new Error('Not Found')
  }
})

const {Port = 1337} = process.env
app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
