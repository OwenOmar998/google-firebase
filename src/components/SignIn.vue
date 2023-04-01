<template>
  <!-- login form -->
  <div v-if="auth.form === 'signin'" class="bg-white p-md-5 p-3">
    <div class="form-title">
      <h2 class="fw-bold mb-3">Login</h2>
    </div>
    <form>
      <label for="email" class="form-label">Email address:</label>
      <div class="input-group mb-4">
        <span class="input-group-text">
          <i class="bi bi-envelope-fill text-success"></i>
        </span>
        <input
          type="email"
          id="email"
          class="form-control"
          placeholder="e.g. name@example.com"
          v-model="signInEmail"
        />
      </div>
      <label for="password" class="form-label">Password:</label>
      <div class="mb-4 input-group">
        <span class="input-group-text">
          <i class="bi bi-key-fill text-success"></i>
        </span>
        <input
          type="password"
          id="password"
          class="form-control"
          placeholder="Password"
          v-model="signInPassword"
        />
      </div>

      <div class="mt-3">
        <p class="text-danger" v-if="!auth.signInValid">
          {{ auth.errorMsg }}
        </p>
        <div>
          <button
            v-bind:disabled="auth.loginReq"
            v-bind:class="{ disabled: auth.loginReq }"
            type="submit"
            class="btn btn-success"
            @click="auth.signin(signInEmail, signInPassword)"
          >
            <div
              v-if="auth.loginReq"
              class="spinner-border spinner-border-sm text-secondary loader"
              role="status"
            ></div>
            <span v-if="!auth.loginReq">Login</span>
            <span v-if="auth.loginReq"> Please Wait...</span>
          </button>
        </div>
      </div>
      <div class="mt-3">
        <span>Don't have account? </span>
        <button
          class="p-0 border-0 bg-transparent text-success"
          @click="auth.form = 'signup'"
        >
          Sign Up
        </button>
      </div>
    </form>

    <div class="row align-items-center my-3">
      <div class="col border-top border-2"></div>
      <span class="col-2 text-center align-text-top">OR</span>
      <div class="col border-top border-2"></div>
    </div>

    <button
      class="btn col-12 btn-outline-success"
      @click="auth.singInWithGoogle"
    >
      <i class="bi bi-google"></i>
      Continue with Google
    </button>

    <button
      class="btn col-12 btn-outline-success mt-3"
      @click="auth.form = 'phone'"
    >
      <i class="bi bi-telephone"></i>
      Continue with Phone Number
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useFirebaseAuth } from "../stores/FirebaseAuth";

export default defineComponent({
  setup() {
    const auth = useFirebaseAuth();
    const signInEmail = "",
      signInPassword = "";

    return { auth, signInEmail, signInPassword };
  },
});
</script>
