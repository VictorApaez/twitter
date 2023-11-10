import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      displayName
      bio
      posts {
        id
        content
      }
      comments {
        id
        content
        replies {
          id
          content
        }
      }
    }
  }
`;

export const GET_USER_PROFILE = gql`
  query GetUserProfile($id: ID!) {
    userProfile(id: $id) {
      id
      displayName
      bio
      posts {
        id
        content
      }
      comments {
        id
        content
        replies {
          id
          content
        }
      }
    }
  }
`;

export const GET_MY_PROFILE = gql`
  query GetMyProfile {
    myProfile {
      id
      displayName
      bio
      posts {
        id
        content
      }
      comments {
        id
        content
        replies {
          id
          content
        }
      }
    }
  }
`;
