import {
  commitMutation,
} from 'react-relay'
import graphql from 'babel-plugin-relay/macro';

import environment from '../../RelayEnvironment.js'

const mutation = graphql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      user {
        token
      }
    }
  }
`

export default (email, password, callback) => {
  const variables = {
    email,
    password,
  }

  commitMutation(
    environment,
    {
      mutation,
      variables,
      onCompleted: (response) => {
        callback(response.login.user.token);
      },
      onError: err => console.error(err),
    },
  )
}