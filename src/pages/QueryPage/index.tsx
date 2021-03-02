import { gql, useQuery, useReactiveVar } from '@apollo/client';
import { Button } from '@material-ui/core';
import React from 'react';
import { addColor, initialUserSettingsVar } from '../../models/cachemodel';
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
    onCompleted: (data) => {
      console.log('onCompleted query', data);
    },
  });
  const { data: settingsData, refetch } = useQuery(SETTINGS_QUERY, {
    // fetchPolicy: 'cache-only', // @client in the query does the same thing
    onCompleted: (data) => {
      console.log('onCompleted query', data);
    },
  });
  console.log(settingsData);
  const otherSettingsData = useReactiveVar(initialUserSettingsVar);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :({error})</p>;

  return (
    <>
      <Button
        onClick={() => {
          addColor(initialUserSettingsVar)(); //why doesn't this work?
          // initialUserSettingsVar({ ...initialUserSettingsVar(), favoriteColor: 'blue' });
        }}
      >
        Fav Color: {otherSettingsData.favoriteColor} Add Color
      </Button>
      {data?.characters?.results.map((character: Character, index: number) => (
        <div key={index}>
          <p>
            {character.name}: {character.gender}
          </p>
        </div>
      ))}
    </>
  );
};
