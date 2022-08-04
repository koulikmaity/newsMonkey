import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (

      <div className="my-3">

        <div className="card" style={{ width: "20rem" }}>
          <div style={{display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0'}}>
            <span class="badge rounded-pill bg-danger"> {source} </span>
          </div>

          <img src={imageUrl ? imageUrl : "https://www.cnet.com/a/img/resize/e4de87a14a5ecf108a98c5c482fbcfc2c36906c6/2022/02/04/c5b1979c-a2d6-412c-9866-e1545badf003/gettyimages-1305088166.jpg?auto=webp&fit=crop&height=630&width=1200"} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p class="card-text"><small class="text-muted">By {author ? author : "Unknown "} on {new Date(date).toGMTString()} </small></p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read more</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem