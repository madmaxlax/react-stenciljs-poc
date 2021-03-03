import { gql, useQuery } from '@apollo/client';
import { Button } from '@material-ui/core';
import React from 'react';
import { Link } from '../../components';
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
    onCompleted: () => {},
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: settingsData, refetch } = useQuery(SETTINGS_QUERY, {
    // fetchPolicy: 'cache-only', // @client in the query does the same thing
    onCompleted: () => {},
  });
  // const mySettingsData = useReactiveVar(initialUserSettingsVar);
  // const otherSettingsData = useReactiveVar(otherVar);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :({error})</p>;
  return (
    <>
      {/* <Typography>Fav Color: {mySettingsData.favoriteColor}</Typography>
      <Typography>Other fav Color: {otherSettingsData.favoriteColor}</Typography> */}
      <Button
        onClick={() => {
          addColor(initialUserSettingsVar)(); //why doesn't this work?
          // initialUserSettingsVar({ ...initialUserSettingsVar(), favoriteColor: 'blue' });
        }}
      >
        Add Color
      </Button>
      {data?.characters?.results.map((character: Character, index: number) => (
        <div key={index}>
          <p>
            {character.name}: {character.gender}
          </p>
        </div>
      ))}
      <Link to="/query">link back</Link>
    </>
  );
};
