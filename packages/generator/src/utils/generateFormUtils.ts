import { FormFieldConfig, FormComponent, FormConfig } from '../../formConfig'
import { DMMF } from '@prisma/generator-helper'
import path from 'path'

export const loadConfig = (
  modelName: string,
  schemaPath: string,
): FormConfig | null => {
  const configDir = path.dirname(schemaPath)
  const configPath = path.join(configDir, `${modelName}.js`)
  try {
    return require(configPath)
  } catch (error) {
    console.warn(`Config file not found for model ${modelName}, skipping...`)
    return null
  }
}

export const generateImportStatements = (
  components: (
    | FormComponent
    | { type: string; importPath: string; namedImport?: boolean }
  )[],
): string[] => {
  const imports: string[] = []
  const importSet = new Set<string>()

  components.forEach((component) => {
    if (component.importPath && !importSet.has(component.importPath)) {
      const importStatement = component.namedImport
        ? `import { ${component.type} } from '${component.importPath}';`
        : `import ${component.type} from '${component.importPath}';`

      imports.push(importStatement)
      importSet.add(component.importPath)
    }
  })

  return imports
}

const generateProps = (props: { [key: string]: any }): string => {
  return props
    ? Object.entries(props)
        .map(([key, value]) => `${key}={${JSON.stringify(value)}}`)
        .join(' ')
    : ''
}

export const renderComponent = (
  component: FormComponent,
  showErrors: boolean,
  enums: DMMF.DatamodelEnum[],
  fieldState?: any,
): string => {
  const props = generateProps(component.props || {})
  let optionsContent = ''

  if (component.options?.enum) {
    const enumDefinition = enums.find((e) => e.name === component.options?.enum)
    if (enumDefinition) {
      optionsContent = renderEnumOptions(component, enumDefinition)
    }
  }

  const errorMessage = showErrors
    ? `<span className="error-message">{fieldState.error?.message}</span>`
    : ''

  return `
    <div>
      <${component.type} {...field} ${props}>
        ${optionsContent}
      </${component.type}>
      ${
        showErrors
          ? `
        { fieldState.invalid && 
          ${errorMessage}
         }
        `
          : ''
      }
    </div>
  `
}

export const renderField = (
  fieldConfig: FormFieldConfig,
  showErrors: boolean,
  renderController: boolean,
  enums: DMMF.DatamodelEnum[],
): string => {
  if (!fieldConfig.component) {
    return '<div className="field-error">Field configuration is missing or invalid</div>'
  }

  const components = Array.isArray(fieldConfig.component)
    ? fieldConfig.component
    : [fieldConfig.component]

  const componentRenders = components
    .map((component) => {
      if (renderController) {
        return `<Controller
          name="${fieldConfig.name}"
          control={control}
          render={({ field, fieldState }) => (
            ${renderComponent(component, showErrors, enums, 'fieldState')} 
          )}
        />`
      } else {
        return renderComponent(component, showErrors, enums)
      }
    })
    .join('')

  const label = fieldConfig.label
    ? `<${fieldConfig.label?.type}>${fieldConfig.label?.text}</${fieldConfig.label?.type}>`
    : ''
  const wrapper = fieldConfig.wrapper
    ? {
        open: `<${fieldConfig.wrapper?.type}>`,
        close: `</${fieldConfig.wrapper?.type}>`,
      }
    : {
        open: ``,
        close: ``,
      }
  return `
    ${wrapper?.open}
      ${label}
      ${componentRenders}
    ${wrapper?.close}
  `
}

export const renderFields = (
  configFields: FormFieldConfig[],
  showErrors: boolean,
  renderController: boolean,
  enums: DMMF.DatamodelEnum[],
): string => {
  return configFields
    .map((fieldConfig) =>
      renderField(fieldConfig, showErrors, renderController, enums),
    )
    .join('')
}

function renderEnumOptions(
  component: FormComponent,
  enumDefinition: DMMF.DatamodelEnum,
): string {
  const optionsConfig = component.options?.component

  if (!optionsConfig) {
    console.error('No options configuration found')
    return ''
  }

  if (typeof optionsConfig.label !== 'string') {
    console.error('Invalid or missing labelField in options configuration')
    return ''
  }

  // Generating JSX with a map method embedded in the output string
  const jsxMap = `
    {Object.values(${enumDefinition.name}).map((enumValue) => (
      <${optionsConfig.type}
        key={enumValue}
        value={enumValue}>
        ${optionsConfig.control ? `<${optionsConfig.control.type} />` : ''}
        {enumValue}
      </${optionsConfig.type}>
    ))}
  `

  return jsxMap
}
