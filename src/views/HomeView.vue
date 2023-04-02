<template>
  <div class="bg-success">
    <div class="row justify-content-center align-items-center py-5">
      <div class="col-11 col-lg-5 col-md-7">
        <!-- login form -->
        <SignIn />

        <!-- Sign up form -->
        <SignUp />

        <!-- Phone number form -->
        <PhoneNumber />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SignIn from "../components/SignIn.vue";
import SignUp from "../components/SignUp.vue";
import PhoneNumber from "../components/PhoneNumber.vue";

export default defineComponent({
  name: "HomeView",
  components: { SignIn, SignUp, PhoneNumber },
});
</script>
