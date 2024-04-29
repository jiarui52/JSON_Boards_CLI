import readJsonFiles from './FileReader';
import processBoardData from './DataProcessor';
import { outputToConsole, outputToJsonFile } from './OutputHandler';

const main = async (directory: string, outputPath?: string): Promise<void> => {
  
	const boardsArray = await readJsonFiles(directory)
	const processedData = processBoardData(boardsArray)
	if (outputPath) {
		await outputToJsonFile(outputPath, processedData)
	} else {
		outputToConsole(processedData)
	}
}

const [directory, outputPath] = process.argv.slice(2)
if (!directory) {
	console.error('Please provide a directory path.')
	process.exit(1)
}
main(directory, outputPath)