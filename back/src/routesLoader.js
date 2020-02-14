import articleController from './controllers/ArticleController';

function loadRoutes(app) {
  app.use('/articles', articleController);
}

module.exports = {
  loadRoutes
};
