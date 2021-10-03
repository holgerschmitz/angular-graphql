import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import { setContext } from '@apollo/client/link/context';
import { OktaAuth } from '@okta/okta-auth-js';

const uri = 'http://localhost:4201/graphql'; 
export function createApollo(httpLink: HttpLink, oktaAuth: OktaAuth): ApolloClientOptions<any> {
  const http = httpLink.create({ uri });
  const auth = setContext(async (_, { headers }) => {
    const token = oktaAuth.getAccessToken();

    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  });

  return {
    link: auth.concat(http),
    cache: new InMemoryCache()
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, OktaAuth]
    },
  ],
})
export class GraphQLModule {}
