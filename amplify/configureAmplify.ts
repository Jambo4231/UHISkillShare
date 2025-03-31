import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    region: "YOUR_AWS_REGION", // e.g., "eu-west-2"
    userPoolId: "YOUR_USER_POOL_ID",
    userPoolWebClientId: "YOUR_APP_CLIENT_ID",
    mandatorySignIn: true,
  },
});