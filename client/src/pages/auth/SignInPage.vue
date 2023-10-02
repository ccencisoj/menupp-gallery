<script setup>
import { ref, watch, watchEffect, reactive } from "vue";
import { useRouter } from "vue-router";
import { auth, providers } from "boot/firebase";
import { useAuth } from "@vueuse/firebase";
import FormContainer from "components/auth/FormContainer.vue";
import FormCard from "components/auth/FormCard.vue";
import FormTitle from "components/auth/FormTitle.vue";
import AuthButton from "components/auth/AuthButton.vue";
import FormSideLink from "components/auth/FormSideLink.vue";
import TextField from "components/ui/TextField.vue";
import FieldGroup from "components/ui/FieldGroup.vue";
import ButtonGroup from "components/ui/ButtonGroup.vue";
import Divider from "components/ui/Divider.vue";
import Button from "components/ui/Button.vue";
import { useQuasar } from "quasar";
import { useForm } from "../../hooks/useForm";
import { emailScheme, passwordScheme } from "../../schemes";

import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import FormTextField from "src/components/auth/FormTextField.vue";
import * as yup from "yup";

const router = useRouter();
const quasar = useQuasar();

const form = useForm({
  initialValues: {
    email: "",
    password: "",
  },
  validationScheme: yup.object({
    email: emailScheme,
    password: passwordScheme,
  }),
});

async function signIn() {
  const errors = form.check(true);

  if (errors.length > 0) {
    return quasar.notify({
      type: "negative",
      position: "top",
      message: "Hay datos que no son validos",
    });
  }

  form.isSubmitting = true;

  signInWithEmailAndPassword(auth, form.values.email, form.values.password)
    .then(({ user }) => {
      router.push("/gallery");
    })
    .catch((error) => {
      quasar.notify({
        type: "negative",
        position: "top",
        message: "El correo o contraseña es incorrecto",
      });
    })
    .finally(() => {
      form.isSubmitting = false;
    });
}

function signInWithGoogle() {
  signInWithPopup(auth, providers.google).then(() => {
    router.push("/gallery");
  });
}

function signInWithFacebook() {
  signInWithPopup(auth, providers.facebook).then(() => {
    router.push("/gallery");
  });
}
</script>

<template>
  <q-page class="page">
    <FormContainer>
      <FormTitle>Iniciar sesión</FormTitle>
      <FormCard>
        <q-form @submit="$event.preventDefault()">
          <FieldGroup>
            <FormTextField
              label="Correo electronico"
              placeholder="Ej: mycorreo@gmail.com"
              :error="form.touches.email ? form.errors.email : ''"
              @blur="form.touches.email = true"
              @input="form.values.email = $event.target.value"
              data-test-id="input:email"
            />
            <FormTextField
              type="password"
              label="Contraseña"
              placeholder="****"
              :error="form.touches.password ? form.errors.password : ''"
              @blur="form.touches.password = true"
              @input="form.values.password = $event.target.value"
              data-test-id="input:password"
            />
          </FieldGroup>
          <FormSideLink
            label="Olvidé mi contraseña"
            to="/auth/recoveryPassword"
          />
          <Divider />
          <Button
            fullWidth
            :disabled="form.isSubmitting"
            :show-loading="form.isSubmitting"
            @click="signIn"
            data-test-id="button:submit"
            >Continuar</Button
          >
        </q-form>
      </FormCard>
      <Divider centeredText="o" />
      <ButtonGroup>
        <AuthButton
          logoSrc="/logos/google.svg"
          label="Ingresar con Google"
          @click="signInWithGoogle"
        />
        <AuthButton
          logoSrc="/logos/facebook.svg"
          label="Ingresar con Facebook"
          @click="signInWithFacebook"
        />
      </ButtonGroup>
    </FormContainer>
  </q-page>
</template>

<style scoped lang="scss">
.page {
  display: flex;
  align-items: center;
  padding-bottom: 10vh;
  box-sizing: border-box;
  flex-direction: column;
}
</style>
