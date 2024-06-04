// types/formConfig.d.ts
export interface FormComponent {
  type: string
  text?: string
  importPath: string
  namedImport?: boolean
  props?: { [key: string]: any }
  control?: {
    type?: string
  }
  options?: { [key: string]: any; component: FormComponent }
  fetchOptions?: boolean
  label?: string
}

export interface FormFieldConfig {
  name: string
  wrapper?: FormComponent
  label: FormComponent
  component: FormComponent | FormComponent[]
  include: boolean
  layout?: Array<FormFieldConfig | string>
  nested?: string
}

export interface FormConfig {
  props?: { [key: string]: any }
  fields: FormFieldConfig[]
  showErrors?: boolean
  renderController?: boolean
  submitButton: FormComponent
  wrapper?: FormComponent
  onSubmitHandler?: string
  additionalImports?: FormComponent[]
}
