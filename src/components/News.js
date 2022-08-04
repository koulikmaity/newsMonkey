import React, { Component } from 'react'
import InfinitScroll from 'react-infinite-scroll-component'
import PropTypes from 'prop-types'
import NewsItems from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: "general",
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        console.log("hello i am a constructor of News component");
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalArticles: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`
    }

    async updateNews() {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.state.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        console.log(parsedData);

        this.setState({
            articles: parsedData.articles,
            totalArticles: parsedData.totalResults,
            loading: false

        })
        this.props.setProgress(100);
    }

    async componentDidMount() {
        
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9bfd6c8a1e6c4f8b86a02c345f104a77&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalArticles: parsedData.totalResults,
            loading: false
        })
    
        this.updateNews()
    }

    handlePrevClick = async () => {
        console.log("Prev is clicked");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9bfd6c8a1e6c4f8b86a02c345f104a77&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);

        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false

        }) 
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }

    handleNextClick = async () => {
        console.log("Next is clicked");
        if (this.state.page + 1 > Math.ceil(this.state.totalArticles / 15)) {

        }
        else {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9bfd6c8a1e6c4f8b86a02c345f104a77&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({ loading: true })
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData);

            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false

            })
        }
        this.setState({ page: this.state.page + 1 });
        this.updateNews();

    }

    fetchMoreData = async () => {
        
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9bfd6c8a1e6c4f8b86a02c345f104a77&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({ page: this.state.page + 1 });
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);

        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalArticles: parsedData.totalResults,

        })
    };


    render() {
        return (

            <div className="container my-4">

                <h2 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }} >NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} headlines </h2>

                {this.state.loading && <Spinner/> } 
                <InfinitScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalArticles}
                    loader={<Spinner />}
                >
                
                        <div className="row" >
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItems title={element.title ? element.title.slice(0, 44) : " "} description={element.description ? element.description.slice(0, 88) : " "} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    
                </InfinitScroll>
                {/*
                    <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick} > &larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalArticles / 15)} type="button" className="btn btn-dark" onClick={this.handleNextClick} >Next  &rarr;</button>
                </div>
                */}

            </div>


        )
    }
}

export default News