import React from 'react'
import Container from '@material-ui/core/Container'
import VideoSearchBar from '../components/VideoSearchBar'
import VideoResults from '../components/VideoResults'
import VideoPlayer from '../components/VideoPlayer'

// https://www.googleapis.com/youtube/v3/search?

// part=snippet
// maxResults=5
// q=breath
// type=video

// channelId=UCQOhjwGL3mMIQgmlH8Iq7yw
// key=AIzaSyA_F1n40-xeqDae0LI3UfIZcqX5FdefYb4

const endpoint = "https://www.googleapis.com/youtube/v3/search?"
const key = process.env.REACT_APP_YOUTUBE_API_KEY

const query = {
  'part': 'part=snippet',
  'maxResults': 'maxResults=5',
  'type': 'type=video'
}

export default class VideoContainer extends React.Component {

  state = {
    keywords: null,
    channelId: null,
    ActiveVideoId: null,
    channelList: {
      'Great Meditation': 'UCN4vyryy6O4GlIXcXTIuZQQ',
      'The Honest Guys': 'UC4jWo5kiyOCt4PnvF4jbaLg',
      'Stephen Procter': 'UCQOhjwGL3mMIQgmlH8Iq7yw',
      'Michael Sealey': 'UC9GoqHypa-SDrGPMyeBkjKw'
    },
    videoResults: []
  }

  setActiveVideo = (id) => {
    this.setState({
      ActiveVideoId: id
    })
  }

  handleSearch = (keywords, channelId) => {
    this.setState({
      keywords,
      channelId
    })
    const url = endpoint+`key=${key}`+"&"+query.part+"&"+query.maxResults+"&"+query.type+`&channelId=${channelId}&q=${keywords}`

    fetch(url)
    .then(r => r.json())
    .then(response => {
      const videoResults = response.items.map(item => {
        return {
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high.url,
          date: item.snippet.publishedAt.split('T')[0]

        }
      })
      this.setState({
        videoResults
      })
    })
  }

  render() {
    return (
      <Container
        maxWidth="lg"
        style={{
          display: 'flex',
          flexDirection: 'column',

          //border: 'dashed #3f51b5 1px',
          borderRadius: '5px',
          marginTop: '3vh',
          padding: '3vh',
        }}
      >
        <VideoSearchBar handleSearch={this.handleSearch} channelList={this.state.channelList} />
          <Container
            maxWidth="xl"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',

              //border: 'dashed #3f51b5 1px',
              borderRadius: '5px',
              marginTop: '3vh',
              padding: '1vh'
            }}
          >
            <VideoPlayer ActiveVideoId={this.state.ActiveVideoId}/>
            <VideoResults videoResults={this.state.videoResults} setActiveVideo={this.setActiveVideo}/>
          </Container>

      </Container>
    )

  }

  componentDidMount() {
    if (this.state.videoResults.length === 0) {
      const sampleChannelId = 'UCN4vyryy6O4GlIXcXTIuZQQ'
      const sampleKeywords = 'anxiety'
      const url = endpoint
      +`key=${key}`
      +"&"+query.part
      +"&"
      +query.maxResults
      +"&"
      +query.type
      +`&channelId=${sampleChannelId}&q=${sampleKeywords}`
      fetch(url)
      .then(r => r.json())
      .then(response => {
        const videoResults = response.items.map(item => {
          return {
            id: item.id.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.high.url,
            date: item.snippet.publishedAt.split('T')[0]
          }
        })
        this.setState({
          videoResults,
        })
      })
    }
  }

}
