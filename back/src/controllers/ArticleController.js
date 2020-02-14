import { Router } from 'express';
import { validationResult } from 'express-validator';
import { ArticleService } from '../services/ArticleService';
import { Response } from '../common/Response';
import { deleteArticleValidator } from './validators/ArticleControllerValidator';

const router = Router();

/* GET ALL ARTICLES */
router.get('/', (req, res) => {
  ArticleService.getAllArticles(req)
    .then((articles) => new Response(res).status(200).withPayload(articles).send())
    .catch((err) => new Response(res).status(err.status).withMessage(err.message).send())
});

/* DELETE AN ARTICLE */
/**
 * @param {STRING} title - The article title
 * @param {STRING} newspaper - The newspaper name
 */
router.delete('/', deleteArticleValidator, (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return new Response(res).status(400).withMessage(errors.errors[0].msg).send();
  }

  ArticleService.deleteArticle(req.body)
    .then(() => new Response(res).sendOk())
    .catch((err) => new Response(res).status(err.status).withMessage(err.msg).send())
});

export default router;