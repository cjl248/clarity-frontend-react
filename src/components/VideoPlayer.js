import React from 'react'
import YouTube from 'react-youtube';

import Container from '@material-ui/core/Container'

const opts = {
  height: '500',
    width: '850',
    playerVars: { // https://developers.google.com/youtube/player_parameters
      autoplay: 1
    }
}

 export default function VideoPlayer(props) {

  const handleReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  const renderVideoPlayer = () => {
    if (props.ActiveVideoId) {
      return (
        <YouTube
          videoId={props.ActiveVideoId}
          opts={opts}
          onReady={handleReady}
        />
      )
    } else {
      return (
        <h3>Search above and then click a video to start the player!</h3>
      )
    }
  }

   return (
    <Container
      maxWidth="lg"
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        //flexGrow: '3',
        flexBasis: '60%',

        // border: 'dashed #3f51b5 1px',
        borderRadius: '5px',
        margin: '1vh',
        padding: '.5vh',

        minHeight: '40vh',
      }}
    >

    {renderVideoPlayer()}

    </Container>
   )

 }
