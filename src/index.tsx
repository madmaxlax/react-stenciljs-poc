import { ApolloClient, ApolloProvider } from '@apollo/client';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { applyPolyfills, defineCustomElements } from 'react-stencil-components/loader';
import './assets/css/index.css';
import ScrollToTop from './components/ScrollToTop';
import { cacheMoney } from './models/cachemodel';
import Routes from './Routes';
import * as serviceWorker from './serviceWorker';
import theme from './theme';
// declare global {
//   // eslint-disable-next-line @typescript-eslint/no-namespace
//   namespace JSX {
//     interface IntrinsicElements {
//       'app-home': { me?: string };
//     }
//   }
// }
const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: cacheMoney,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <Router basename={process.env.BASE_URL || '/'}>
        <ScrollToTop />
        <Routes />
      </Router>
    </ThemeProvider>
  </ApolloProvider>,
  document.querySelector('#root')
);

applyPolyfills().then(() => {
  defineCustomElements();
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
