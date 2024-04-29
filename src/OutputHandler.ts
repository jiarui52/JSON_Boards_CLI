import fs from 'fs-extra'
import { Result } from './Types'
import { toResult } from './utils'

const outputToJsonFile = async (outputPath: string, resultData: Result): Promise<void> => {
  try {
    await fs.ensureFile(outputPath)
    await fs.writeJson(outputPath, toResult(resultData), { spaces: 2 })
    
  } catch (error){
    console.error(`Failed to write to ${outputPath}.`)
    throw new Error(`Failed to write to ${outputPath}.`)
  }
    
}

const outputToConsole = (resultData: Result): void => {
  try{
    console.log(JSON.stringify(toResult(resultData), null, 2))
  } catch (error){
    console.error(`Failed to output data.`)
  }
}

export { outputToJsonFile, outputToConsole }