import {
  Application,
  authProviders,
  EnvironmentVariable,
  configureWunderGraphApplication,
  cors,
  introspect,
  templates,
} from "@wundergraph/sdk";
import server from "./wundergraph.server";
import operations from "./wundergraph.operations";
import { NextJsTemplate } from "@wundergraph/nextjs/dist/template";

const db = introspect.postgresql({
  apiNamespace: "db",
  databaseURL: "postgresql://admin:admin@localhost:5432/setwg?schema=public",
});

/*
uncomment this section to create an API from a GraphQL upstream

const graphQLAPI = introspect.graphql({
    url: "http://localhost:4000",
    headers: builder => builder
        // add a static Header to all upstream Requests
        .addStaticHeader("AuthToken","staticToken")
        // forward the client Request header Authorization to the upstream request using the same Header name
        .addClientRequestHeader("Authorization","Authorization")
});*/

const logic = introspect.graphql({
  apiNamespace: "logic",
  url: "http://localhost:3005/graphql",
});

const myApplication = new Application({
  name: "app",
  apis: [logic, db],
});

// configureWunderGraph emits the configuration
configureWunderGraphApplication({
  application: myApplication,
  server,
  operations,
  // S3 Server
  // 1. Run `./minio/setup.sh` to create a S3 server.
  // 2. Comment out the section below and save!

  // Enable file upload functionality in your generated client
  // Minio credentials: minio / minio123
  // s3UploadProvider: [{
  //     name: "minio",
  //     endpoint: "127.0.0.1:9000",
  //     accessKeyID: "test",
  //     secretAccessKey: "12345678",
  //     bucketLocation: "eu-central-1",
  //     bucketName: "uploads",
  //     useSSL: false
  // }],
  codeGenerators: [
    {
      templates: [
        // use all the typescript react templates to generate a client
        ...templates.typescript.all,
        templates.typescript.operations,
        templates.typescript.linkBuilder,
      ],
      // create-react-app expects all code to be inside /src
      // path: "../frontend/src/generated",
    },
    {
      templates: [new NextJsTemplate()],
      path: "../components/generated",
    },
  ],
  cors: {
    ...cors.allowAll,
    allowedOrigins:
      process.env.NODE_ENV === "production"
        ? [
            // change this before deploying to production to the actual domain where you're deploying your app
            "http://localhost:3000",
          ]
        : ["http://localhost:3000"],
  },
  dotGraphQLConfig: {
    hasDotWunderGraphDirectory: false,
  },
  security: {
    enableGraphQLEndpoint: process.env.NODE_ENV !== "production",
  },
  authentication: {
    cookieBased: {
      providers: [
        authProviders.openIdConnect({
          id: "auth0",
          issuer: new EnvironmentVariable("AUTH0_ISSUER"),
          clientId: new EnvironmentVariable("AUTH0_CLIENT_ID"),
          clientSecret: new EnvironmentVariable("AUTH0_CLIENT_SECRET"),
        }),
      ],
      authorizedRedirectUris: ["http://localhost:3000"],
    },
  },
});
