import { InMemoryCache, makeVar, ReactiveVar } from '@apollo/client';

export interface UserSettings {
  mobile: boolean;
  preferredName: string;
  favoriteColor?: string;
}
const initialUserSettings: UserSettings = {
  preferredName: 'Max',
  mobile: true,
};

export const cacheMoney: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        UserSettings: {
          read(existing, { variables }) {
            console.log(existing, variables);
            if (!existing) return initialUserSettings;
            else return existing;
          },
        },
      },
    },
    Character: {
      fields: {
        maxsmadeupfield: {
          read(val = 'maxdefault') {
            return val;
          },
        },
        gender: {
          read(val = 'maxdefault') {
            return val === 'unknown' ? '¯\\_(ツ)_/¯' : val;
          },
        },
      },
    },
  },
});
makeVar;
export const initialUserSettingsVar = cacheMoney.makeVar<UserSettings>(initialUserSettings);
export function addColor(userSettingsVar: ReactiveVar<UserSettings>) {
  return (newColor = 'green') => {
    //get latest value of the settings
    const currVal = userSettingsVar();
    //update the color
    currVal.favoriteColor = newColor;
    console.log('addedSettings');
    //set the new value
    userSettingsVar(currVal);
  };
}
