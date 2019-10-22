import React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography';

import VideoResultCard from './VideoResultCard'

export default class VideoResults extends React.Component {

  renderComponentTitle = () => {
    if (this.props.hasSearched) return "Search Results"
    else return "Suggestions"
  }

  renderVideoResults = (props) => {
    return this.props.videoResults.map(video => {
      return (
        <VideoResultCard
          key={video.id}
          video={video}
          setActiveVideo={this.props.setActiveVideo}
        />
      )
    })
  }

  render() {
    return (
      <Container
        maxWidth="lg"
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          flexBasis: '40%',
          margin: '.5vh',
          padding: '.5vh'
        }}>

        <Typography component="div" variant="h4" style={{backgroundColor: '#3f51b5', color: 'white', height: '3rem', padding: '0.6rem 0 0 0', borderRadius: '5px'}}>
        {this.renderComponentTitle()}
        </Typography>

        {this.renderVideoResults()}

    </Container>
    )

  }
}
