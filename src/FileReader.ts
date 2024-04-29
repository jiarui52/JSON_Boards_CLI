import fs from 'fs'
import path from 'path'
import { Board } from './Types'
import { isSystemFile, toBoard } from './utils'

const readJsonFiles = async(directory: string): Promise<Board[]> => {
	const uniqueKeys = new Set<string>()
	let allBoards: Board[] = []
	let files: string[]

	// list all files in the dir
	try {
		files = await fs.promises.readdir(directory)
	} catch (error){
		throw new Error(`Error reading directory ${directory}: ${error}`)
	}
	
	/*
	filter files:
	1. skip hidden files and system files
	2. only accept JSON files i.e. ending with '.json' or '.JSON'
	3. allow '.j son' by removing whitespace
	*/
	const filteredFiles = files.filter(file => {
		const fileName = path.basename(file)
		const extension = path.extname(fileName).toLowerCase().replace(/\s+/g, '')
		return !fileName.startsWith('.') &&
				!isSystemFile(fileName) && 
				extension === '.json' 
	})
	if(filteredFiles.length === 0) {
		throw new Error(`No JSON file found in ${directory}`)
	}
	

	// read and parse each JSON file, and validate schema
	const promises = filteredFiles.map(async (file) => {
		const filePath = path.join(directory, file)
		let fileData: string
		try{
			fileData = await fs.promises.readFile(filePath, 'utf-8')
		} catch(error){
			console.error(`Failed to read file ${filePath}. It might not exist, or be inaccessible due to permissions`)
			return null
		}
		if(fileData.trim().length === 0){
			console.error(`Warning: File ${file} is empty.`)
			return null
		}
		let json
		try {
			json = JSON.parse(fileData)
		}catch (error: unknown){
			console.error(`Error parsing JSON from file ${file}: ${error}`)
			return null
		}
		
		//Removing duplicate board objects
		json?.boards?.forEach((boardData : Board) => {
			try {
				const board = toBoard(boardData)
				if (board) {
					const key = `${board.name}-${board.core}-${board.has_wifi}`
					if(!uniqueKeys.has(key)){
						uniqueKeys.add(key)
						allBoards.push(board)
					}
				}
			} catch (error) {
				console.error(`Validation failed for data in file ${file}: ${error}`)
			}
		})
	})

	try{
		await Promise.all(promises)
		if (allBoards.length === 0) {
			throw new Error(`No file in ${directory} contains valid data.`)
		}
		
	} catch (error){
		console.error(`Failed to process files: ${error}`)
	}	
	return allBoards
}

export default readJsonFiles
