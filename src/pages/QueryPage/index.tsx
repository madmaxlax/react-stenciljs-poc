import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Character } from '../../models/types';

const CHARACTERS_QUERY = gql`
  query myQuery {
    characters {
      results {
        id
        name
        gender
      }
    }
  }
`;
const SETTINGS_QUERY = gql`
  query settingsq {
    UserSettings @client {
      mobile
      preferredName
    }
  }
`;

export const QueryPage = () => {
  const { loading, error, data } = useQuery(CHARACTERS_QUERY, {
    onCompleted: () => {
      console.log('onCompleted');
    },
  });
  console.log('got data', data);
  const { data: settingsData } = useQuery(SETTINGS_QUERY, {
    // fetchPolicy: 'cache-only', // @client in the query does the same thing
  });
  console.log(settingsData);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data?.characters?.results.map((character: Character, index: number) => (
    <div key={index}>
      <p>
        {character.name}: {character.gender}
      </p>
    </div>
  ));
};
