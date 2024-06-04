import { generatorHandler, GeneratorOptions } from '@prisma/generator-helper'
import { logger } from '@prisma/sdk'
import { GENERATOR_NAME } from './constants'
import { writeFileSafely } from './utils/writeFileSafely'
import {
  generateImportPrismaStatement,
  getImportGeneratorOptions,
} from './helpers/generateImportPrismaStatement'
import { generateFormComponent } from './helpers/generateFormComponent'

const { version } = require('../package.json')

generatorHandler({
  onManifest() {
    logger.info(`${GENERATOR_NAME}:Registered`)
    return {
      version,
      defaultOutput: '../generated',
      prettyName: GENERATOR_NAME,
    }
  },
  onGenerate: async (options: GeneratorOptions) => {
    const prismaImportStatement = generateImportPrismaStatement(options)
    const schemaPath = options.schemaPath

    for await (const model of options.dmmf.datamodel.models) {
      if (model) {
        await writeFileSafely({
          content: generateFormComponent({
            model,
            prismaImportStatement,
            schemaPath,
            dmmf: options.dmmf,
            outputPath: getImportGeneratorOptions(options).outputPath,
          })! as string,
          extension: 'tsx',
          options,
          model,
          operation: 'FormComponent',
        })
      }
    }

    // await copyFiles(options)
  },
})
