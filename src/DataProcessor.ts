import { Board, Result } from './Types'
import { toResult } from './utils'

const processBoardData = (boards: Board[]): Result => {
    // Sorting
    const sortedBoards = [...boards].sort((a, b) => 
		a.vendor.localeCompare(b.vendor) || a.name.localeCompare(b.name))

    // Calculating metadata
    const vendors = new Set(sortedBoards.map(board => board.vendor))
    const metadata = {
        total_vendors: vendors.size,
        total_boards: sortedBoards.length,
    }
	const result: Result = toResult({ boards: sortedBoards, _metadata: metadata })

	if (!result || !result.boards.length) {
		throw new Error("Processed data is empty or invalid.")
	}

    return result
}

export default processBoardData