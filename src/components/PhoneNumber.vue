<template>
  <div v-if="auth.form === 'phone'" class="bg-white p-md-5 p-3" id="signUpForm">
    <div class="form-title">
      <h2 class="fw-bold mb-3">Sign in using phone number</h2>
    </div>
    <div>
      <div id="recaptcha-container"></div>
      <br />
      <form>
        <label for="PhoneNumber" class="form-label">Phone Number:</label>
        <div class="input-group mb-4">
          <span class="input-group-text">
            <i class="bi bi-telephone-fill text-success"></i>
          </span>
          <input
            type="text"
            id="PhoneNumber"
            class="form-control"
            placeholder="+962 7XXX"
            v-model="phNo"
          />
          <span class="input-group-text">
            <span
              data-bs-placement="bottom"
              title="Enter Phone number with the code"
            >
              <i class="bi bi-question-circle text-muted"></i>
            </span>
          </span>
        </div>

        <button
          v-bind:disabled="auth.sendOtpReq"
          v-bind:class="{ disabled: auth.sendOtpReq }"
          type="submit"
          class="btn btn-success"
        >
          <div
            v-if="auth.sendOtpReq"
            class="spinner-border spinner-border-sm text-secondary loader"
            role="status"
          ></div>
          <span v-if="!auth.sendOtpReq">Get OTP</span>
          <span v-if="auth.sendOtpReq"> Please Wait...</span>
        </button>
      </form>
      <br />

      <label for="OTP" class="form-label">OTP:</label>
      <div class="mb-4 input-group">
        <span class="input-group-text">
          <i class="bi bi-key-fill text-success"></i>
        </span>
        <input
          pattern="[0-9]{6}"
          maxlength="6"
          type="OTP"
          id="OTP"
          class="form-control"
          placeholder="OTP"
          v-model="otp"
        />

        <span class="input-group-text">
          <span
            data-bs-placement="bottom"
            title="Enter the OTP sent to your number"
          >
            <i class="bi bi-question-circle text-muted"></i>
          </span>
        </span>
      </div>
      <div v-if="!auth.OtpValid">
        <span class="text-danger font-weight-light">
          Enter the OTP sent to your number
        </span>
      </div>

      <button
        v-bind:disabled="auth.verifyOtpReq"
        v-bind:class="{ disabled: auth.verifyOtpReq }"
        type="submit"
        class="btn btn-success"
      >
        <div
          v-if="auth.verifyOtpReq"
          class="spinner-border spinner-border-sm text-secondary loader"
          role="status"
        ></div>
        <span v-if="!auth.verifyOtpReq">Verify</span>
        <span v-if="auth.verifyOtpReq"> Please Wait...</span>
      </button>

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
