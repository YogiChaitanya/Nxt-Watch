import styled from 'styled-components'

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${props => props.bgColor};
`

export const FormEl = styled.form`
  padding: 40px;
  background-color: ${props =>
    props.bgColor === true ? '#0f0f0f' : '#f8fafc'};
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  box-shadow: 0px 4px 16px 0px #bfbfbf;
`

export const Image = styled.img`
  width: 250px;
  margin: 50px;
`

export const Label = styled.label`
  color: ${props => props.textColor};
  font-size: 16px;
  font-family: Roboto;
  font-weight: normal;
  margin-bottom: 10px;
`

export const InputField = styled.input`
  color: #94a3b8;
  font-family: Roboto;
  font-weight: normal;
  font-size: 16px;
  padding-left: 30px;
  height: 40px;
  background-color: transparent;
  border: 1px solid #94a3b8;
  border-radius: 6px;
  outline: none;
  margin-bottom: 30px;
`

export const CSPContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${props => props.bgColor};
  margin-bottom: 30px;
`

export const CheckBox = styled.input`
  height: 20px;
  width: 20px;
  margin-right: 20px;
`

export const Label2 = styled.label`
  color: ${props => props.textColor};
  font-family: Roboto;
  font-size: 14px;
`

export const Button = styled.button`
  color: #ffffff;
  background-color: #4f46e5;
  height: 40px;
  cursor: pointer;
  border: none;
  border-radius: 6px;
  outline: none;
`

export const Paragraph = styled.p`
  color: #ff0000;
  font-size: 16px;
  font-family: Roboto;
  font-weight: normal;
`
