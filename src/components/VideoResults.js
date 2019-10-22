import React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography';

import VideoResultCard from './VideoResultCard'

export default class VideoResults extends React.Component {

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

          border: 'dashed #3f51b5 1px',
          borderRadius: '5px',
          margin: '.5vh',
          padding: '.5vh'
        }}>

        <Typography component="div" variant="h4" style={{backgroundColor: '#3f51b5', color: 'white', height: '4rem', padding: '1.67rem 0 0 0', borderRadius: '3px'}}>
        {"Your Search Results"}
        </Typography>

        {this.renderVideoResults()}

    </Container>
    )

  }
}
