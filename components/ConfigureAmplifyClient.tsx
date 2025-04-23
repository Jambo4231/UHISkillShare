"use client";

import { useEffect } from "react";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
export default function ConfigureAmplifyClient() {
  useEffect(() => {
    Amplify.configure({
      ...outputs,
      storage: window.localStorage,
    });
  }, []);

  return null;
}
