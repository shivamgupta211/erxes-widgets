import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const propTypes = {
  article: PropTypes.object, // eslint-disable-line
  category: PropTypes.object, // eslint-disable-line
  onSwitchToArticleDisplay: PropTypes.func,
};

export default class Article extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(event) {
    event.preventDefault();
    const { article, category, onSwitchToArticleDisplay } = this.props;
    onSwitchToArticleDisplay({
      _id: article._id,
      title: article.title,
      summary: article.summary,
      content: article.content,
      author: article.author,
      createdDate: article.createdDate,
      modifiedDate: article.modifiedDate,
      category,
    });
  }

  render() {
    const { article } = this.props;
    const { author } = article;

    return (
      <a href="" className="erxes-kb-item" onClick={this.handleOnClick}>
        <h3>{article.title}</h3>
        <p>{article.summary}</p>
        <div className="item-meta flex-item">
          <div className="avatars">
            <img
              alt={author.details.fullName}
              src={author.details.avatar || '/static/images/userDefaultIcon.png'}
            />
          </div>
          <div>
            <div>
              Written by <span>{author.details.fullName}</span>
            </div>
            <div>
              {article.modifiedDate ? 'Modified ' : 'Created '}
              {moment(article.modifiedDate ? article.modifiedDate : article.createdDate).fromNow()}
            </div>
          </div>
        </div>
      </a>
    );
  }
}

Article.propTypes = propTypes;
