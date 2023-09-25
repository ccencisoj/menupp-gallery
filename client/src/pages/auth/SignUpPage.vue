<script setup>
import axios from "axios";
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import {
  getDownloadURL,
  ref as storageRef,
  uploadString,
} from "firebase/storage";
import { auth, storage, providers, app } from "boot/firebase";
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
import {
  createUserWithEmailAndPassword,
  updateProfile,
  fetchSignInMethodsForEmail,
  getAuth,
} from "firebase/auth";
import FormTextField from "src/components/auth/FormTextField.vue";
import FormImageField from "src/components/auth/FormImageField.vue";
import { emailScheme, nameScheme, passwordScheme } from "src/schemes";
import { useForm } from "src/hooks/useForm";
import * as yup from "yup";

const { user } = useAuth(auth);
const router = useRouter();
const quasar = useQuasar();

const steps = {
  BASIC_DATA: "1",
  UPLOAD_IMAGE: "2",
};

const currentStep = ref(steps.BASIC_DATA);

const form = useForm({
  initialValues: {
    name: "",
    email: "",
    password: "",
  },
  validationScheme: yup.object({
    name: nameScheme,
    email: emailScheme.test(
      "Verificar si existe un usuario",
      "Ya existe una cuenta con este correo",
      () => {
        emailScheme
          .validate(form.values.email)
          .then(() => {
            fetchSignInMethodsForEmail(auth, form.values.email).then(
              (result) => {
                if (result.length > 0) {
                  form.errors.email = "Ya existe una cuenta con este correo";
                }
              }
            );
          })
          .catch((error) => {
            // ignore error
          });
        return true;
      }
    ),
    password: passwordScheme,
  }),
});

const profileImage = ref(null);

watch(profileImage, () => {
  if (profileImage != null) form.errors.profileImage = "";
});

async function uploadProfileImage(user, profileImageBlob) {
  const formData = new FormData();

  formData.set("image", profileImageBlob);

  await axios.post(
    "http://127.0.0.1:5001/project-1-74491/us-central1/app/profileImage",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${await user.getIdToken()}`,
      },
    }
  );

  const storedImage = storageRef(
    storage,
    `/users/${user.uid}/profile/image.png`
  );

  return getDownloadURL(storedImage);
}

async function signUp() {
  const errors = form.check();

  if (errors.length > 0) {
    return quasar.notify({
      type: "negative",
      position: "top",
      message: "Hay datos que no son validos",
    });
  }

  if (profileImage.value == null) {
    form.errors.profileImage = "Debe subir una imagen";
    return;
  }

  form.isSubmitting = true;

  createUserWithEmailAndPassword(auth, form.values.email, form.values.password)
    .then(async ({ user }) => {
      const profileImageURL = await uploadProfileImage(
        user,
        profileImage.value.blob
      );

      await updateProfile(user, {
        photoURL: profileImageURL,
        displayName: form.values.name,
      });

      router.push("/gallery");
    })
    .catch((error) => {
      console.log(error);
      quasar.notify({
        type: "negative",
        position: "top",
        message: "Ha ocurrido un error, intentelo mas tarde",
      });
    })
    .finally(() => {
      form.isSubmitting = false;
    });
}
</script>

<template>
  <q-page class="page">
    <FormContainer>
      <FormTitle>Crear cuenta</FormTitle>
      <FormCard>
        <q-form class="form" @submit="$event.preventDefault()">
          <section
            class="basic-data"
            :style="{
              display: currentStep === steps.BASIC_DATA ? 'block' : 'none',
            }"
          >
            <FieldGroup>
              <FormTextField
                name="name"
                label="Nombre"
                placeholder="Ej: andres"
                :error="form.touches.name ? form.errors.name : ''"
                @blur="form.touches.name = true"
                @input="form.values.name = $event.target.value"
              />
              <FormTextField
                label="Correo electronico"
                placeholder="Ej: mycorreo@gmail.com"
                :error="form.touches.email ? form.errors.email : ''"
                @blur="form.touches.email = true"
                @input="form.values.email = $event.target.value"
              />
              <FormTextField
                type="password"
                label="Contraseña"
                placeholder="****"
                :error="form.touches.password ? form.errors.password : ''"
                @blur="form.touches.password = true"
                @input="form.values.password = $event.target.value"
              />
            </FieldGroup>
            <Divider />
            <Button
              fullWidth
              @click="
                if (form.check().length === 0) currentStep = steps.UPLOAD_IMAGE;
              "
              >Continuar</Button
            >
          </section>
          <section
            :style="{
              display: currentStep === steps.UPLOAD_IMAGE ? 'block' : 'none',
            }"
          >
            <FormImageField
              :multiple="false"
              gridColumns="1"
              label="Foto de perfil"
              placeholder="Subir imagen"
              :error="form.errors.profileImage"
              clipPath="circle(50.0% at 50% 50%)"
              @changeImages="profileImage = $event.images[0]"
            />
            <Divider />
            <ButtonGroup>
              <Button
                :disabled="form.isSubmitting"
                :show-loading="form.isSubmitting"
                fullWidth
                @click="signUp"
                >Continuar</Button
              >
              <Button
                fullWidth
                secondary
                @click="currentStep = steps.BASIC_DATA"
                >Atras</Button
              >
            </ButtonGroup>
          </section>
        </q-form>
      </FormCard>
    </FormContainer>
  </q-page>
</template>

<style scoped lang="scss">
.page {
  display: flex;
  align-items: center;
  padding-bottom: 10vh;
  flex-direction: column;
  box-sizing: border-box;

  .form {
    width: 100%;
  }
}
</style>
