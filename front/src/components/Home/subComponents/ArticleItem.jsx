import React from 'react';
import parse from 'html-react-parser';

export default function ArticleItem(props) {
  const { title, author, description, from } = props.article;

  function _deleteArticleButtonPressed() {
    props.deleteArticle({ title, newspaper: from });
  }

  return (
    <li>
      <div>
        <h2>{title}</h2>
        <button onClick={_deleteArticleButtonPressed}>Supprimer l'article</button>
      </div>

      {
        description &&
        parse(description)
      }
      <p>{author}</p>
    </li>
  );
}