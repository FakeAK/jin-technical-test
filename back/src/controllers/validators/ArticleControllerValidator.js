import { body } from 'express-validator';

const deleteArticleValidator = [
  body('title')
    .exists()
    .withMessage('You have to provide an article title.')
    .isString()
    .withMessage('Invalid article title'),
    body('newspaper')
    .exists()
    .withMessage('You have to provide a newspaper name.')
    .isString()
    .withMessage('Invalid newspaper name.')
];

module.exports = {
  deleteArticleValidator,
}