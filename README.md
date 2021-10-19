# Consume a GraphQL API from Angular Example

This repository shows you how to consume a GraphQL API from Angular. Please read [How to Consume a GraphQL API from Angular][blog] to see how it was created.

**Prerequisites:**

- [Node 14](https://nodejs.org/)
- [Okta CLI](https://github.com/okta/okta-cli)

> [Okta](https://developer.okta.com/) has Authentication and User Management APIs that reduce development time with instant-on, scalable user infrastructure. Okta's intuitive API and expert support make it easy for developers to authenticate, manage and secure users and roles in any application.

* [Getting Started](#getting-started)
* [Links](#links)
* [Help](#help)
* [License](#license)

## Getting Started

To run this example, run the following commands:

```bash
git clone https://github.com/holgerschmitz/angular-graphql.git
cd angular-graphql
```

### Create an OIDC Application in Okta

Create a free developer account with the following command using the [Okta CLI](https://github.com/okta/okta-cli):

```shell
okta register
```

If you already have a developer account, use `okta login` to integrate it with the Okta CLI. 

Provide the required information. Once you register, create a client application in Okta with the following command:

```shell
okta apps create
```

You will be prompted to select the following options:
- Type of Application: **2: SPA**
- Redirect URI: `http://localhost:4200/login/callback`
- Logout Redirect URI: `http://localhost:4200`

The application configuration will be printed to your screen:

```shell
Okta application configuration:
Issuer:    https://dev-133320.okta.com/oauth2/default
Client ID: 0oa5qedkihI7QcSoi357
```

Replace the values in `server/auth.js` with these values.

```js
const oktaJwtVerifier = new OktaJwtVerifier({
  clientId: '{yourClientID}',
  issuer: 'https://{yourOktaDomain}/oauth2/default',
});
```

Update `graphql-client/src/app/app.module.ts` with your Okta settings too.

```ts
const config = {
  clientId: '{yourClientID}',
  issuer: 'https://{yourOktaDomain}/oauth2/default',
  redirectUri: window.location.origin + '/login/callback'
}
const oktaAuth = new OktaAuth(config);
```

If you haven't done so already, install the dependencies.

```shell
cd server
npm install

cd graphql-client
npm install
```

Start the chat server in one terminal window with `node app.js`, and the chat client in another window.

```shell
ng serve
```

Open `http://localhost:4200` in your favorite browser and you should be able to log in.

## Links

This example uses the following open source libraries from Okta:

* [Okta Angular SDK](https://github.com/okta/okta-angular)
* [Okta CLI](https://github.com/okta/okta-cli)

## Help

Please post any questions as comments on the [blog post][blog], or visit our [Okta Developer Forums](https://devforum.okta.com/).

## License

Apache 2.0, see [LICENSE](LICENSE).

[blog]: https://developer.okta.com/blog/2021/xyz