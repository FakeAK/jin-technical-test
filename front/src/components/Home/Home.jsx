import React, { useEffect, useState } from 'react';
import Request from '../../common/Request';
import ArticleItem from './subComponents/ArticleItem';
import { ENDPOINTS } from '../../API/Routes';
import ContainerHOC from '../Container/Container';

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  async function _loadArticles() {
    try {
      const response = await Request.get().to(ENDPOINTS.ARTICLES).send();
      setArticles(response.payload);
    } catch (err) {
      setError(err.message);
    }
  }

  async function _deleteArticle(article) {
    try {
      await Request.delete().to(ENDPOINTS.ARTICLES).payload({
        title: article.title,
        newspaper: article.newspaper
      }).send();

      _deleteLocalArticle(article);
    } catch (err) {
      setError(err.message);
    }
  }

  function _deleteLocalArticle(article) {
    // Remove article from articles et set new state
    setArticles(articles.filter((value, index, arr) => {
      return !(value.title === article.title && value.from === article.newspaper);
    }));
  }

  useEffect(() => {
    _loadArticles();
  }, []);

  return (
    <ContainerHOC error={error}>
      <div>
        {
          articles.length > 0 &&
          <ul>
            {
              (
                articles.map((article) =>
                  <ArticleItem key={article.title} article={article} deleteArticle={_deleteArticle} />)
              )
            }
          </ul>
        }
      </div>
    </ContainerHOC>
  );
}