import express from 'express';

const app = express();

app.use('/theme', express.static('src/static'));
app.use('/font-awesome', express.static('node_modules/font-awesome'));
app.use('/bootswatch', express.static('node_modules/bootswatch'));

export default app;
