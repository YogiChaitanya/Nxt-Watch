import {Component} from 'react'
import Cookies from 'js-cookie'
import {SiYoutubegaming} from 'react-icons/si'

import Header from '../Header'
import LoaderView from '../LoaderView'
import FailureView from '../FailureView'
import Video from '../Video'
import LeftColumn from '../LeftColumn'

import ThemeContext from '../../context/ThemeContext'

import {
  GamingContainer,
  IconAndHeadingCard,
  Heading,
  UlElement,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Gaming extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    searchedVideos: [],
  }

  componentDidMount() {
    this.getVideosData()
  }

  getVideosData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const gameVideoData = await response.json()

    const updatedData = gameVideoData.videos.map(eachItem => ({
      id: eachItem.id,
      title: eachItem.title,
      thumbnailURL: eachItem.thumbnail_url,
      viewCount: eachItem.view_count,
    }))

    if (response.ok === true) {
      this.setState({
        apiStatus: apiStatusConstants.success,
        searchedVideos: updatedData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoader = () => <LoaderView />

  renderFailureView = () => <FailureView />

  renderSuccessView = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const {searchedVideos} = this.state
        const bgColor = isDarkTheme ? '#231f20' : '#0f0f0f'

        return (
          <UlElement bgColor={bgColor}>
            {searchedVideos.map(each => (
              <Video key={each.id} VideoDetails={each} />
            ))}
          </UlElement>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderGameData = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const bgColor = isDarkTheme ? '#000000' : '#ffffff'
          const textColor = isDarkTheme ? '#ffffff' : '#000000'

          return (
            <>
              <Header />
              <GamingContainer data-testid="gaming" bgColor={bgColor}>
                <LeftColumn />
                <IconAndHeadingCard bgColor={bgColor}>
                  <SiYoutubegaming />
                  <Heading textColor={textColor}>Gaming</Heading>
                </IconAndHeadingCard>
                {this.renderGameData()}
              </GamingContainer>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Gaming
