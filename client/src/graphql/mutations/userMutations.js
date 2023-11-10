import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($displayName: String!, $bio: String) {
    createUser(input: { displayName: $displayName, bio: $bio }) {
      id
      displayName
      bio
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($id: ID!, $displayName: String, $bio: String) {
    updateUser(id: $id, input: { displayName: $displayName, bio: $bio }) {
      id
      displayName
      bio
    }
  }
`;

export const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;
