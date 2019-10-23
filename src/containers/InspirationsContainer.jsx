import React from 'react'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
// import testpicture from "../resources/testpicture.jpg"

const mainContainerStyle = {
  'padding': '0',

  'display': 'grid',
  'gridTemplateColumns': '100%',
  'gridTemplateRows': '65% 15% 20%',
  'width': '100%',
  'height': '93vh',
}

const pictureContainerStyle = {
  'padding': '0',

  'gridRowStart': '1',
  'gridRowEnd': '2',

  'display': 'flex',
  'flexDirection': 'row',
  'justifyContent': 'center',
  'alignItems': 'center',
}

const inspirationButtonContainer = {
  'background': '#5B4E77',
  'opacity': '.99',
  'gridRowStart': '2',
  'gridRowEnd': '3',

  'display': 'flex',
  'flexDirection': 'row',
  'justifyContent': 'space-evenly',
  'alignItems': 'center'
}

const navigationButtonContainer = {
  'background': '#087E8B',
  'opacity': '.99',
  'gridRowStart': '3',
  'gridRowEnd': '4',

  'display': 'flex',
  'flexDirection': 'row',
  'justifyContent': 'space-evenly',
  'alignItems': 'center'
}

const imgStyle = {
  'width': '100%',
  'height': '100%',
  'padding': '0'
}

const quoteStyle = {
  'color': 'white',
  'font': '50 10vmin/5vh Cookie, cursive',
  'position': 'absolute',
  'top': '30%',
  'left': '50%',
  'transform': 'translateX(-50%) translateY(-50%)',
  'mix-blend-mode': 'difference',
  'minWidth': '100%',
}

const endpoint = "https://api.unsplash.com/search/photos?"
const key = process.env.REACT_APP_UNSPLASH_API_KEY

export default class InpirationsContainer extends React.Component {

  state = {
    key: `client_id=${key}`,
    orientation: 'orientation=landscape',
    query: "query='sun%20nature'",
    pictureLinks: [],
    pictureIndex: 0,
    picturePage: 1,
    quoteList: [],
    quoteIndex: 0,
    quote: "Learn. Love. Code."
  }

  fetchPictures = () => {
    const {key, orientation, query, picturePage} = this.state
    const url = endpoint+"&"+key+"&"+orientation+"&"+query+`&page=${picturePage}`
    fetch(url)
    .then(r => r.json())
    .then(pictures => {
      const pictureLinks = pictures.results.map(picture => {
        return picture.urls.full
      })
      this.setState({
        pictureLinks
      })
    })
  }

  requestNewPicture = () => {
    const currentIndex = this.state.pictureIndex
    if (currentIndex < 9) {
      this.setState({
        pictureIndex: currentIndex+1
      })
    } else {
      this.setState({
        pictureIndex: 0,
        picturePage: this.state.picturePage+1
      })
      this.fetchPictures()
    }
  }

  renderImgQuote = () => {
    return (
      <>
        <img src={this.state.pictureLinks[this.state.pictureIndex]} alt='' style={imgStyle}></img>
        <h1 style={quoteStyle}>{this.state.quote}</h1>
      </>
    )
  }

  render() {
    // console.log("index: ", this.state.pictureIndex)
    // console.log("page: ", this.state.picturePage)
    return (
      <Container maxWidth={false} id="inspiration page container" style={mainContainerStyle}>

        <Container maxWidth="false" style={pictureContainerStyle}>
            {this.renderImgQuote()}
        </Container>

        <Container maxWidth="false" style={inspirationButtonContainer}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={this.requestNewPicture}>
            New Picture
          </Button>
          <Button
            variant="contained"
            size="large"
            color="primary">
            New Quote
          </Button>
        </Container>

        <Container maxWidth="false" style={navigationButtonContainer}>
          <Button
            onClick={() => {this.props.setActivePage("Journal")} }
            variant="contained"
            size="large"
            color="primary">
            Journal
          </Button>
          <Button
            onClick={() => {this.props.setActivePage("Meditate")} }
            variant="contained"
            size="large"
            color="primary">
            Meditatate
          </Button>
          <Button
            onClick={() => {this.props.setActivePage("Videos")} }
            variant="contained"
            size="large" color="primary">
            Watch
          </Button>
        </Container>

      </Container>
    )
  }

  componentDidMount() {
    this.fetchPictures()
  }

}

// style={{position: 'relative'}}

// style={{opacity: '0', position: 'absolute', top: '50%', left: '50%', transform: "translateX(-50%) translateY(-50%)" }}
