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
export const otherVar = makeVar({ favoriteColor: '', mobile: false, preferredName: 'angelo' } as UserSettings);
export const initialUserSettingsVar = cacheMoney.makeVar<UserSettings>(initialUserSettings);
export function addColor(userSettingsVar: ReactiveVar<UserSettings>) {
  return (newColor = 'green') => {
    console.log('adding color', newColor);
    //get latest value of the settings
    //update the color
    const currVal = { ...userSettingsVar(), favoriteColor: newColor };

    //set the new value
    userSettingsVar(currVal);
  };
}
