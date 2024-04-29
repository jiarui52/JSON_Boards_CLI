export interface Board {
	name: string
	vendor: string
	core: string
	has_wifi: boolean
  }
  
export interface Result {
	boards: Board[]
	_metadata: {
	  total_vendors: number
	  total_boards: number
	}
}