import { defineStore } from "pinia";
import firebase from "firebase/compat/app";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
} from "firebase/auth";
import "firebase/compat/auth";
import router from "@/router";
export const useFirebaseAuth = defineStore("FirebaseAuth", {
  state: () => ({
    form: "signin" as string,
    isValid: true as boolean,
    signInValid: true as boolean,
    signUpValid: true as boolean,
    errorMsg: "" as string,
    isLoggedIn: false as boolean,
    loginReq: false as boolean,
    signUpReq: false as boolean,
    user: null as any,
    verificationCode: "" as any,
    confirmationResult: null as any,
    phNo: "" as string,
    phoneError: "" as string,
    phoneReq: false as boolean,
  }),
  actions: {
    async authenticate(phNo: string) {
      this.phoneReq = true;
      this.phNo = phNo;
      const phoneNumber = phNo;
      const appVerifier = new firebase.auth.RecaptchaVerifier(
        "recaptcha-container"
      );
      try {
        const confirmationResult = await firebase
          .auth()
          .signInWithPhoneNumber(phoneNumber, appVerifier);
        const verificationCode = window.prompt("Enter verification code");
        const userCredential = await confirmationResult.confirm(
          verificationCode as string
        );
        const user = userCredential.user;
        router.push("/about");
        this.phoneError = "";
        this.phoneReq = false;
      } catch (error: any) {
        this.phoneError = error.code;
        this.phoneReq = false;
      }
    },
    validPassword(password: string) {
      if (
        password.length < 7 ||
        !/[0-9]/.test(password) ||
        !/[a-zA-Z]/g.test(password)
      ) {
        this.signUpReq = false;
        this.isValid = false;
        return;
      }
    },
    signUp(
      signUpEmail: string,
      signUpPassword: string,
      firstName: string,
      lastName: string
    ) {
      this.signUpReq = true;
      this.isValid = true;
      this.validPassword(signUpPassword);
      if (!this.isValid) return;
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
        .then((data) => {
          this.isLoggedIn = true;
          router.push("/about");
          this.signUpReq = false;
          this.user = auth.currentUser;
          this.user.displayName = firstName + " " + lastName;
          this.user.email = signUpEmail;
          console.log(this.user);
        })
        .catch((error) => {
          this.signUpReq = false;
          this.signUpValid = false;
          this.errorMsg = "Email already in used";
        });
    },
    signin(signInEmail: string, signInPassword: string) {
      this.loginReq = true;
      const auth = getAuth();
      signInWithEmailAndPassword(auth, signInEmail, signInPassword)
        .then((data) => {
          this.isLoggedIn = true;
          this.signInValid = true;

          router.push("/about");
          this.loginReq = false;
          this.user = auth.currentUser;
        })
        .catch((error) => {
          this.loginReq = false;
          this.signInValid = false;
          switch (error.code) {
            case "auth/invalid-email":
              this.errorMsg = "Invalid email";
              break;
            case "auth/user-not-found":
              this.errorMsg = "No account with that email was found";
              break;
            case "auth/wrong-password":
              this.errorMsg = "Incorrect password";
              break;
            default:
              this.errorMsg = "Email or password was incorrect";
              break;
          }
        });
    },
    signOut() {
      this.user = null;
      this.isLoggedIn = false;
      this.signInValid = true;
      this.signUpValid = true;
      const auth = getAuth();
      firebase.auth().useDeviceLanguage();
      signOut(auth).then(() => {
        this.signUpValid = true;
        router.push("/");
      });
    },
    singInWithGoogle(email: string, password: string) {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      firebase.auth().useDeviceLanguage();
      signInWithPopup(auth, provider)
        .then((result) => {
          console.log(result.user);
          console.log(result.user.displayName);
          this.user = auth.currentUser;
          router.push("/about");
        })
        .catch((error) => {
          console.log(error.code);
        });
    },
  },
});
