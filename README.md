# SetWG
The new Massive Multiplayer Set Game using Wundergraph

## Getting Started

### 1. Get Auth0 credentials:

1. Go to [Auth0](https://auth0.com/) and create a new application of type "Regular Web Application"
2. Skip the Quickstart
3. Set the Callback URL on Auth0 to http://localhost:9991/app/main/auth/cookie/callback/auth0
4. Copy the `Issuer`, `Client ID` and `Client Secret` to the clipboard
5. Rename the `.env.example` file to `.env`
6. Paste the credentials into the `.env` file


### 2. Install & Start

Install the dependencies and run the complete example with the following commands:

```shell
npm install
npm start
```

### 3. Use the application

On the NextJS frontend, click the "Login" button.
Once the login is complete, you can select your nickname.
Afterwards you can create a game and start playing.

## Learn More

Learn how to play [Set](https://en.wikipedia.org/wiki/Set_(card_game)).