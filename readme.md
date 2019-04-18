# [Studenten bilden Schüler e.V.](https://studenten-bilden-schueler.de)

This repo powers the [Gatsby](https://gatsbyjs.org) site hosted at [studenten-bilden-schueler.de](https://studenten-bilden-schueler.de). It is maintained by [Janosh Riebesell](https://janosh.io) ([Mail](mailto:janosh.riebesell@studenten-bilden-schueler.de), [GitHub](https://github.com/janosh)).

Studenten bilden Schüler e.V. is a student-run nonprofit initiative with chapters located in university towns all over Germany. Our mission is to provide free tutoring to refugees and children from underprivileged families.

## Installation

To get this site running locally, you need [`git`](https://git-scm.com), [`gatsby-cli`](https://gatsbyjs.org/packages/gatsby-cli) and [`yarn`](https://yarnpkg.com) (or [`npm`](https://npmjs.com)). With those installed, follow these steps:

1. Clone the repo to your machine and change into its directory.

    ```sh
    git clone https://github.com/StudentenBildenSchueler/sbs-homepage && sbs-homepage
    ```

2. Install dependencies.

    ```sh
    yarn
    ```

3. Start the dev server.

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