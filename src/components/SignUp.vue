<template>
  <!-- Sign up form -->
  <div
    v-if="auth.form === 'signup'"
    class="bg-white p-md-5 p-3"
    id="signUpForm"
  >
    <div class="form-title">
      <h2 class="fw-bold mb-3">Create Your Account</h2>
    </div>
    <form>
      <label for="firstName" class="form-label">First Name:</label>
      <div class="input-group mb-4">
        <span class="input-group-text">
          <i class="bi bi-person-fill text-success"></i>
        </span>
        <input
          type="text"
          id="firstName"
          class="form-control"
          placeholder="First name"
          v-model="firstName"
        />
        <span class="input-group-text">
          <span data-bs-placement="bottom" title="You'll use this when log in.">
            <i class="bi bi-question-circle text-muted"></i>
          </span>
        </span>
      </div>

      <label for="lastName" class="form-label">Last Name:</label>
      <div class="input-group mb-4">
        <span class="input-group-text">
          <i class="bi bi-person-fill text-success"></i>
        </span>
        <input
          type="text"
          id="lastName"
          class="form-control"
          placeholder="Last name"
          v-model="lastName"
        />
        <span class="input-group-text">
          <span data-bs-placement="bottom" title="You'll use this when log in.">
            <i class="bi bi-question-circle text-muted"></i>
          </span>
        </span>
      </div>

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
          v-model="signUpEmail"
        />
        <span class="input-group-text">
          <span data-bs-placement="bottom" title="You'll use this when log in.">
            <i class="bi bi-question-circle text-muted"></i>
          </span>
        </span>
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
          v-model="signUpPassword"
        />

        <span class="input-group-text">
          <span
            data-bs-placement="bottom"
            title="Enter a combination of at least six numbers and letters"
          >
            <i class="bi bi-question-circle text-muted"></i>
          </span>
        </span>
        <div v-if="!auth.isValid">
          <span class="text-danger font-weight-light">
            password must contain a combination of at least six numbers and
            letters
          </span>
        </div>
      </div>

      <div class="mt-3">
        <p class="text-danger" v-if="!auth.signUpValid">
          {{ auth.errorMsg }}
        </p>
        <button
          v-bind:disabled="auth.signUpReq"
          v-bind:class="{ disabled: auth.signUpReq }"
          type="submit"
          class="btn btn-success"
          @click="auth.signUp(signUpEmail, signUpPassword, firstName, lastName)"
        >
          <div
            v-if="auth.signUpReq"
            class="spinner-border spinner-border-sm text-secondary loader"
            role="status"
          ></div>
          <span v-if="!auth.signUpReq">Sign Up</span>
          <span v-if="auth.signUpReq"> Please Wait...</span>
        </button>
      </div>
      <div class="mt-3">
        <span>Already have account? </span>
        <button
          class="p-0 border-0 bg-transparent text-success"
          @click="auth.form = 'signin'"
        >
          Login
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useFirebaseAuth } from "../stores/FirebaseAuth";

export default defineComponent({
  setup() {
    const auth = useFirebaseAuth();
    const signUpEmail = "",
      signUpPassword = "",
      firstName = "",
      lastName = "";

    return { auth, signUpEmail, signUpPassword, firstName, lastName };
  },
});
</script>
