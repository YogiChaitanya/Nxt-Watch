import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import ThemeContext from '../../context/ThemeContext'

import {
  LoginContainer,
  FormEl,
  Image,
  Label,
  InputField,
  CheckBox,
  Label2,
  CSPContainer,
  Button,
  Paragraph,
} from './styledComponents'

class Login extends Component {
  state = {
    usernameInput: '',
    passwordInput: '',
    errorMessage: '',
    showError: false,
    hideAndShowPassword: false,
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({
      showError: true,
      errorMessage: errorMsg,
    })
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {usernameInput, passwordInput} = this.state
    const userDetails = {username: usernameInput, password: passwordInput}
    const loginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      return this.onSubmitSuccess(data.jwt_token)
    }
    return this.onSubmitFailure(data.error_msg)
  }

  onChangeUsername = event => {
    this.setState({
      usernameInput: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      passwordInput: event.target.value,
    })
  }

  onShowHidePassword = () => {
    this.setState(prevState => ({
      hideAndShowPassword: !prevState.hideAndShowPassword,
    }))
  }

  render() {
    const {usernameInput, passwordInput} = this.state
    const {errorMessage, showError, hideAndShowPassword} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          const bgColor = isDarkTheme ? '#000000' : '#ffffff'
          const textColor = isDarkTheme ? '#ffffff' : '#000000'

          return (
            <LoginContainer bgColor={bgColor}>
              <FormEl onSubmit={this.onSubmitForm} bgColor={isDarkTheme}>
                <Image
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                  alt="website logo"
                />

                <Label htmlFor="usernameId" textColor={textColor}>
                  USERNAME
                </Label>
                <InputField
                  type="text"
                  id="usernameId"
                  placeHolder="USERNAME"
                  value={usernameInput}
                  onChange={this.onChangeUsername}
                />
                <Label htmlFor="passwordId" textColor={textColor}>
                  PASSWORD
                </Label>
                <InputField
                  type={hideAndShowPassword ? 'text' : 'password'}
                  id="passwordId"
                  placeHolder="PASSWORD"
                  value={passwordInput}
                  onChange={this.onChangePassword}
                />

                <CSPContainer bgColor={bgColor}>
                  <CheckBox
                    id="showPasswordId"
                    type="checkbox"
                    checked={hideAndShowPassword}
                    onChange={this.onShowHidePassword}
                  />
                  <Label2 htmlFor="showPasswordId" textColor={textColor}>
                    Show Password
                  </Label2>
                </CSPContainer>
                <Button type="submit">Login</Button>
                {showError && <Paragraph>*{errorMessage}</Paragraph>}
              </FormEl>
            </LoginContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Login
