import fs from 'fs';
import { ErrorHandler } from '../errors/ErrorHandler';
import { ApiInternalError } from '../errors/InternalError';

class ArticleService {
  static async openDir(dirName) {
    try {
      return fs.readdirSync(dirName);
    } catch (err) {
      throw new ApiInternalError('This folder doesn\'t exist.', 500);
    }
  }

  static async getFileContent(fileName) {
    const fileContent = fs.readFileSync(fileName, 'utf8');

    return JSON.parse(fileContent);
  }

  static async getAllArticles() {
    const dirName = './data/';
    let articles = [];
    let files;

    try {
      files = await this.openDir(dirName);
    } catch (err) {
      ErrorHandler(err);
    }

    files.forEach(async (file) => {
      try {
        const fileJsonContent = await this.getFileContent(dirName + file);

        fileJsonContent.forEach((articleContent) => {
          articles.push({
            author: articleContent.author,
            title: articleContent.title,
            description: articleContent.description,
            from: articleContent.meta.title
          });
        });
      } catch (err) {
        throw new ApiInternalError('File \'' + file + '\' doesn\'t exist in \'' + dir + '\' folder.');
      }
    });

    return articles;
  }

  static async deleteArticle({ title, newspaper }) {
    const dirName = './data/';
    let files;

    try {
      files = await this.openDir(dirName);
    } catch (err) {
      ErrorHandler(err);
    }

    files.forEach(async (file) => {
      try {
        let fileJsonContent = await this.getFileContent(dirName + file)
        fileJsonContent = fileJsonContent.filter((article) => {
          return !(article.title === title && article.meta.title === newspaper);
        });

        fs.writeFileSync(dirName + file, JSON.stringify(fileJsonContent));
      } catch (err) {
        ErrorHandler(err);
      }
    });
  }
}

module.exports = {
  ArticleService
};