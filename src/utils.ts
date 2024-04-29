import { Board, Result } from './Types'

type Input = {
	name: unknown,
	vendor: unknown,
	core: unknown,
	has_wifi: unknown
}

const toBoard = ({ name, vendor, core, has_wifi }: Input ): Board =>{
	const board: Board = {
		name: parseString(name),
		vendor: parseString(vendor),
		core: parseString(core),
		has_wifi: parseBoolean(has_wifi)
	}
	return board
}

const parseString = (string: unknown): string =>{
	if(!string || !isString(string)){
			throw new Error(`Incorrect or missing value: ${JSON.stringify(string)}` + string)
	}
	return string
}
const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String
}

const parseBoolean = (boolean: unknown): boolean =>{
	if (boolean === undefined || boolean === null || !isBoolean(boolean)) {
		throw new Error(`Incorrect or missing boolean value: ${JSON.stringify(boolean)}` + boolean)
	}
	return boolean
}

const isBoolean = (boolean: unknown): boolean is boolean =>{
	return typeof boolean === 'boolean'
}

type Output = {
	boards: unknown
	_metadata: {
	  total_vendors: unknown
	  total_boards: unknown
	}
}

const toResult = ({ boards, _metadata }: Output ) : Result => {
	const result: Result = {
		boards: parseArray(boards),
		_metadata: {
			total_vendors: parseNumber(_metadata.total_vendors),
			total_boards: parseNumber(_metadata.total_boards)
		}
	}
	return result
}

const parseArray = (array: unknown): Board[] => {
	if (!array || !isArray(array)) {
		throw new Error('Incorrect or missing' + array);
	}
	return array as Board[];
}

const isArray = (array: unknown): array is unknown[] => {
	return Array.isArray(array);
}

const parseNumber = (number: unknown): number => {
	if(!number || !isNumber(number)){
		throw new Error('Incorrect or missing' + number)
	}
	return number
}

const isNumber = (number: unknown): number is number => {
	return typeof number === 'number'
}

const isSystemFile = (fileName: string): boolean => {
	const systemFiles = ['Thumbs.db', 'desktop.ini'];
	return systemFiles.includes(fileName);
}

export { toBoard, toResult, isSystemFile }
