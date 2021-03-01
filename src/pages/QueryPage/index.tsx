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

export const QueryPage = () => {
  const { loading, error, data } = useQuery(CHARACTERS_QUERY);
  console.log(data);
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
