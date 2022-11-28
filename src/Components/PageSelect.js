
import { Component } from "react";

class PageSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPage: this.props.currentPage,
        }

        this.changePage = this.changePage.bind(this);
        this.backPage = this.backPage.bind(this);
        this.forwardPage = this.forwardPage.bind(this);
    }

    changePage(event) {
        this.props.changePage(Number(event.target.outerText))
        this.setState({
            selectedPage: Number(event.target.outerText)
        })
    }

    backPage() {
        this.props.changePage(this.state.selectedPage - 1)
        this.setState({
            selectedPage: this.state.selectedPage - 1
        })
    }

    forwardPage() {
        this.props.changePage(this.state.selectedPage + 1)
        this.setState({
            selectedPage: this.state.selectedPage + 1
        })
    }

    render() {
        return (
            <div className="page-selector">
                {this.state.selectedPage != 1 ? <p onClick={this.backPage} className="page-label">&lt;</p> : <></>}
                {this.state.selectedPage <= 2
                    ? <></>
                    : <p onClick={this.changePage} className="page-label">1</p>}
                {this.state.selectedPage <= 3
                    ? <></>
                    : <p className="regular">...</p>}
                {this.state.selectedPage > 1
                    ? <p onClick={this.changePage} className="page-label">{this.state.selectedPage - 1}</p>
                    : <></>}
                <p className="regular" onClick={this.changePage}>{this.state.selectedPage}</p>
                {this.props.numberOfPages > this.state.selectedPage
                    ? <p onClick={this.changePage} className="page-label">{this.state.selectedPage + 1}</p>
                    : <></>}
                {this.state.selectedPage >= this.props.numberOfPages - 2
                    ? <></>
                    : <p className="regular">...</p>}
                {this.state.selectedPage >= this.props.numberOfPages - 1
                    ? <></>
                    : <p onClick={this.changePage} className="page-label">{this.props.numberOfPages}</p>}
                {this.state.selectedPage != this.props.numberOfPages ? <p onClick={this.forwardPage} className="page-label">&gt;</p> : <></>}
            </div>
        );
    }

}

export default PageSelect;
