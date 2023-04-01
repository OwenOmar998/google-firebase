<template>
  <div class="bg-success">
    <div class="row justify-content-center align-items-center inner-row">
      <div class="col-11 col-lg-5 col-md-7">
        <div class="about">
          <div class="bg-white p-md-5 p-3">
            <div v-if="auth.form !== 'phone'">
              <img :src="auth.user.photoURL" alt="" />
              <p class="font-weight-bold mt-2">
                Hello {{ auth.user.displayName }}, you logged in using
                {{ auth.user.email }}
              </p>
            </div>
            <div v-else>Hello, you logged in using {{ auth.phNo }}</div>

            <button class="btn btn-secondary" @click="auth.signOut">
              Sign out
            </button>
          </div>
        </div>
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

    return { auth };
  },
  name: "AboutView",
});
</script>
