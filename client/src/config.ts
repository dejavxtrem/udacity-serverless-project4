// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 's6is4jpppk'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-2.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  domain: 'dev-k9ejoe2z.us.auth0.com',            // Auth0 domain
  clientId: 'rJhaqdyYDcl5UOYja8lNLb6ttNBNhvs4',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
