import * as React from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  loadConfig,
  generateImportStatements,
  renderFields,
} from '../utils/generateFormUtils'
import { generatePropsString } from '../utils/generatePropsString'
import { DMMF } from '@prisma/generator-helper'
import { FormComponent, FormConfig } from '../../formConfig'

export const generateFormComponent = (options: {
  model: DMMF.Model
  prismaImportStatement: string
  schemaPath: string
  dmmf: DMMF.Document
  outputPath: string
}): string | null => {
  const { model, prismaImportStatement, schemaPath, dmmf, outputPath } = options
  const modelName = model.name
  const functionName = `${modelName}Form`
  const config = loadConfig(modelName, schemaPath) as FormConfig
  if (!config) return ''

  const enumImports = dmmf.datamodel.enums
    .map((enumDef) => `import { ${enumDef.name} } from '${outputPath}';`)
    .join('\n')

  const allComponents = config.fields
    .flatMap((field) => {
      const components: (
        | FormComponent
        | { type: string; importPath: string; namedImport?: boolean }
      )[] = []

      if (Array.isArray(field.component)) {
        components.push(...field.component)
      } else {
        components.push(field.component)
      }

      if (field.wrapper) {
        components.push(field.wrapper)
      }
      if (field.label) {
        components.push(field.label)
      }

      if (
        !Array.isArray(field.component) &&
        field.component.props?.options &&
        field.component.props.options.componentType
      ) {
        components.push({
          type: field.component.props.options.componentType,
          importPath: field.component.props.options.importPath,
          namedImport: field.component.props.options.namedImport ?? false,
        })
      }
      // Also handle options components like 'MenuItem' for 'Select'
      if (!Array.isArray(field.component) && field.component.options) {
        const optionComponent = field.component.options.component
        if (optionComponent) {
          components.push({
            type: optionComponent.type,
            importPath: optionComponent.importPath,
            namedImport: optionComponent.namedImport ?? false,
          })
        }
      }
      return components
    })
    .concat(config.submitButton)
    .concat(config.additionalImports || [])

  const imports = generateImportStatements(allComponents)

  const formComponent = `
import * as React from 'react'
${imports.join('\n')}
${enumImports}
import { useForm, Controller } from 'react-hook-form';

const ${functionName} = () => {
  const { control, handleSubmit, setValue } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} ${generatePropsString(config.props)}>
      ${renderFields(config.fields, config.showErrors || false, config.renderController !== false, dmmf.datamodel.enums as DMMF.DatamodelEnum[])}
      <${config.submitButton.type} type="submit" ${
        config.submitButton.props
          ? Object.entries(config.submitButton.props)
              .map(([key, value]) => `${key}={${JSON.stringify(value)}}`)
              .join(' ')
          : ''
      }>Submit</${config.submitButton.type}>
    </form>
  );
};

export default ${functionName};
`
  return formComponent
}
