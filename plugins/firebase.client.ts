import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  // const firebaseConfig = {
  //   apiKey: config.public.firebaseApiKey,
  //   authDomain: config.public.firebaseAuthDomain,
  //   projectId: config.public.firebaseProjectId,
  //   storageBucket: config.public.firebaseStorageBucket,
  //   messagingSenderId: config.public.firebaseMessagingSenderId,
  //   appId: config.public.firebaseAppId
  // }

  const firebaseConfig = {
    apiKey: "AIzaSyBXTNPZ-ccN8aEuUIuV-wfZv8fbAfXMlAM",  
    authDomain: "auction-fe52b.firebaseapp.com",  
    projectId: "auction-fe52b",  
    storageBucket: "auction-fe52b.firebasestorage.app",  
    messagingSenderId: "402956063132",  
    appId: "1:402956063132:web:6d9d8d2f7849568d1e7859"  
  }

  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)

  return {
    provide: {
      firebase: {
        app,
        auth
      }
    }
  }
})