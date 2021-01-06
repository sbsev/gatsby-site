> ### ⚠️ This repo was superseded by our [new site written in Svelte](https://github.com/sbsev/svelte-site).

# [Studenten bilden Schüler e.V.](https://studenten-bilden-schueler.de)

[![Netlify Status](https://api.netlify.com/api/v1/badges/bc8ffc70-0bae-4463-bd69-7a98ec1c0746/deploy-status)](https://app.netlify.com/sites/studenten-bilden-schueler/deploys)
[![License](https://img.shields.io/github/license/sbsev/sbs-homepage?label=License)](/license)
![GitHub Repo Size](https://img.shields.io/github/repo-size/sbsev/sbs-homepage?label=Repo+Size)
![GitHub last commit](https://img.shields.io/github/last-commit/sbsev/sbs-homepage?label=Last+Commit)

This repo powers the [Gatsby](https://gatsbyjs.org) site hosted at [studenten-bilden-schueler.de](https://studenten-bilden-schueler.de). It is maintained by [Janosh Riebesell](https://janosh.io) ([Mail](mailto:janosh.riebesell@studenten-bilden-schueler.de), [GitHub](https://github.com/janosh)).

Studenten bilden Schüler e.V. is a student-run nonprofit initiative with chapters located in university towns all over Germany. Our mission is to provide free tutoring to refugees and children from underprivileged families.

## Installation

To get this site running locally, you need [`git`](https://git-scm.com), [`gatsby-cli`](https://gatsbyjs.org/packages/gatsby-cli) and [`yarn`](https://yarnpkg.com) (or [`npm`](https://npmjs.com)). With those installed, follow these steps:

1. Clone the repo to your machine and change into its directory.

   ```sh
   git clone https://github.com/sbsev/sbs-homepage
   && sbs-homepage
   && git config core.hooksPath src/utils/gitHooks
   && chmod -R u+x src/utils/gitHooks
   ```

2. Install dependencies.

   ```sh
   yarn
   ```

3. Copy `.env.example` file and rename it `.env`.

   ```sh
   cp .env.example .env
   ```

   Then open `.env` and insert your [Contentful space ID and access token](https://contentful.com/developers/docs/references/authentication). Those are found in the settings menu of your Contentful space under 'API keys'.

4. Start the dev server.

   ```sh
   gatsby develop
   ```

## Deployment

The easiest way to get this site published is as follows:

1. Create an account with [netlify](https://netlify.com).
2. Install the [`netlify-cli`](https://netlify.com/docs/cli).
3. Login to your account.

   ```sh
   netlify login
   ```

4. Connect your GitHub repo with your netlify account for [continuous deployment](https://netlify.com/docs/cli/#continuous-deployment).

   ```sh
   netlify init
   ```

5. Finally deploy the site with

   ```sh
   netlify deploy
   ```
