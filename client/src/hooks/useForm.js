import { reactive, watch } from "vue";

export function useForm({ initialValues, validationScheme }) {
  const form = reactive({
    values: initialValues,
    errors: {},
    touches: {},
    isSubmitting: false,
  });

  form.validate = () => {
    form.errors = {};
    try {
      validationScheme.validateSync(form.values, { abortEarly: false });
    } catch (error) {
      error.inner.forEach(
        (valError) => (form.errors[valError.path] = valError.message)
      );
    }
  };

  form.check = () => {
    form.touchedAll();
    form.validate();
    return Object.values(form.errors);
  };

  form.touchedAll = () => {
    Object.keys(form.values).forEach((key) => {
      form.touches[key] = true;
    });
  };

  watch(form.values, form.validate);

  return form;
}
