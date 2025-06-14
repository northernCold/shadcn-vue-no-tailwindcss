import { FieldContextKey, useFieldError, useIsFieldDirty, useIsFieldTouched, useIsFieldValid } from 'vee-validate'
import { inject, watch } from 'vue'
import { FORM_ITEM_INJECTION_KEY } from './injection-keys'

export function useFormField() {
  const fieldContext = inject(FieldContextKey)
  const fieldItemContext = inject(FORM_ITEM_INJECTION_KEY)
  if (!fieldContext)
    throw new Error('useFormField should be used within <FormField>')

  const { name } = fieldContext
  const id = fieldItemContext

  const fieldState = {
    valid: useIsFieldValid(name),
    isDirty: useIsFieldDirty(name),
    isTouched: useIsFieldTouched(name),
    error: useFieldError(name),
  }

  watch(fieldState.error, (state) => {
    console.log(state)
  })

  return {
    id,
    name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}