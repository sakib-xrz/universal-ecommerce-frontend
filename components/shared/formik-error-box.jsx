export default function FormikErrorBox({ formik, field }) {
  const showError = formik.errors[field] && formik.touched[field];
  const defaultClassNames = "mt-1 text-sm text-destructive font-medium";
  const errorMessage = formik.errors[field];
  return showError ? (
    <div className={defaultClassNames}>{errorMessage}</div>
  ) : null;
}
