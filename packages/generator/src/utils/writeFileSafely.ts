import fs from 'fs/promises'
import path from 'path'
import { formatFile } from './formatFile'
import { DMMF, GeneratorOptions } from '@prisma/generator-helper'

export const writeFileSafely = async ({
  model,
  operation,
  extension = 'ts',
  options,
  content,
}: {
  model?: DMMF.Model
  operation: string
  extension?: string
  options: GeneratorOptions
  content: string
}) => {
  const fileName =
    operation === 'index' ? 'index' : `${model?.name || ''}${operation}`
  const filePath = path.join(
    options.generator.output?.value!,
    model
      ? `${model?.name}/${fileName}.${extension}`
      : `/${fileName}.${extension}`,
  )
  await fs.mkdir(path.dirname(filePath), {
    recursive: true,
  })
  await fs.writeFile(filePath, await formatFile(content))
}
