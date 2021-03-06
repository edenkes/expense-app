// const path = require('path');
// const express = require('express');
//
// const app = express();
// const publicPath = path.join(__dirname, '..', 'public');
//
// app().use(express.static(publicPath));
//
// app().listen(3000, () => {
//     console.log("server is app :)")
// });
const express = require('express')
const path = require('path');

const app = express()
const port =process.env.PORT || 3000


const publicPath = path.join(__dirname, '..', 'public');

app.use(express.static(publicPath))

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'))
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})