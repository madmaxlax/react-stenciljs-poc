import { InMemoryCache } from '@apollo/client';

export interface UserSettings {
  mobile: boolean;
  preferredName: string;
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
          read() {
            return initialUserSettings;
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

export const initialUserSettingsVar = cacheMoney.makeVar<UserSettings>(initialUserSettings);
