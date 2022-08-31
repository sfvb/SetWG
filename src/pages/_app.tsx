import Head from "next/head";
import React from "react";
import { FeatureToggle } from "../client/components/FeatureToggleProvider";
import { withWunderGraph } from "../client/components/generated/nextjs";
import "../client/css/set.css";
import { Layout } from "../client/layouts/layout";


function MyApp({ Component, pageProps }) {

  return (
    <>
      <FeatureToggle>
        <Head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <main className="flex dark:bg-slate-800 min-h-screen justify-center">
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </main>
      </FeatureToggle>
    </>
  );
}

export default withWunderGraph(MyApp);

