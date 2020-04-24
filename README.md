# Created for Crisis Organization Microsite

This is a React website hosted on Netlify for CFC. It's built using GatsbyJS & Styled Components.

The design is currently being managed in Figma and can be viewed [here](https://www.figma.com/file/CIA5Rz77CuI8JJkXnkkGfw/Created-for-Crisis?node-id=254%3A349).

### Resources

- [Website](https://createdforcrisis.org)
- [Netlify](https://www.netlify.com/)
- [Contentful](https://www.contentful.com/)
- [GatsbyJS](https://www.gatsbyjs.org/)
- [Firebase](https://firebase.google.com/)
- [Styled Components](https://styled-components.com/)

### Helpful Commands

- `yarn start` to run the development site locally.
- `yarn build` builds the compiled site.
- `yarn serve` serve the compiled site locally.

#### Firebase

- `yarn firebase-dev` will use the default configured firebase project, which should be the development environment.
- `yarn firebase-prod` will switch to using the production firebase environment as a target. Only use this when you need to deploy functions to productions. Immediately switch back to firebase dev environment afterwards.
- `yarn deploy-functions` will deploy firbase functions to the active firebase environment.

### Environment Variables

For development create a `.env.development` and fill in the relevant information:

```sh
# Contentful
CONTENTFUL_SPACE_ID_DEV=""
CONTENTFUL_ACCESS_TOKEN_DEV=""
CONTENTFUL_ENVIRONMENT_DEV=""

# Stripe
GATSBY_STRIPE_PUBLISHABLE_KEY_DEV=""

# Express API API
GATSBY_EXPRESS_API_PATH_DEV=""

# Firebase
GATSBY_FIREBASE_API_KEY_DEV=""
GATSBY_FIREBASE_AUTH_DOMAIN_DEV=""
GATSBY_FIREBASE_DATABASE_URL_DEV=""
GATSBY_FIREBASE_PROJECT_ID_DEV=""
GATSBY_FIREBASE_STORAGE_BUCKET_DEV=""
GATSBY_FIREBASE_MESSAGING_SENDER_ID_DEV=""
GATSBY_FIREBASE_APP_ID_DEV=""
GATSBY_FIREBASE_MEASUREMENT_ID_DEV=""

# For ENV Switching
# https://www.gatsbyjs.org/docs/environment-variables/#additional-environments-staging-test-etc
GATSBY_ACTIVE_ENV="development"
```
