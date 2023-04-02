<template>
  <div v-if="auth.form === 'phone'" class="bg-white p-md-5 p-3" id="signUpForm">
    <div class="form-title">
      <h2 class="fw-bold mb-3">Sign in using phone number</h2>
    </div>
    <div>
      <form @submit.prevent="auth.authenticate(phNo)">
        <label for="number" class="form-label">Phone Number:</label>
        <div class="input-group mb-4">
          <span class="input-group-text">
            <i class="bi bi-telephone-fill text-success"></i>
          </span>
          <input
            type="text"
            id="number"
            class="form-control"
            placeholder="+962*********"
            v-model="phNo"
          />
          <span class="input-group-text">
            <span data-bs-placement="bottom" title="Enter a valid Phone number">
              <i class="bi bi-question-circle text-muted"></i>
            </span>
          </span>
        </div>
        <div style="col-8" id="recaptcha-container"></div>

        <button
          type="submit"
          v-bind:disabled="auth.phoneReq"
          v-bind:class="{ disabled: auth.phoneReq }"
          class="btn btn-success"
        >
          <div
            v-if="auth.phoneReq"
            class="spinner-border spinner-border-sm text-secondary loader"
            role="status"
          ></div>
          <span v-if="!auth.phoneReq">Get OTP</span>
          <span v-if="auth.phoneReq"> Please Wait...</span>
        </button>
        <div class="text-danger mt-1" v-if="auth.phoneError">
          {{ auth.phoneError }}
        </div>
      </form>

      <div class="mt-3">
        <span>Already have account? </span>
        <button
          class="p-0 border-0 bg-transparent text-success"
          @click="auth.form = 'signin'"
        >
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useFirebaseAuth } from "../stores/FirebaseAuth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import router from "@/router";

export default defineComponent({
  setup() {
    const auth = useFirebaseAuth();
    const phNo = "",
      appVerifier = "",
      otp = "";

    return { auth, phNo, appVerifier, otp };
  },
});
</script>
