# JSON_Boards_CLI

## Overview
This command line tool is designed to combine multiple JSON files containing development board information into a single JSON output. It reads development board data from JSON files within a specified directory, validates data if follows a standard schema, merges the data by removing duplicates, sorts it by vendor and then by board name, and outputs the combined data either to a JSON file or to the console.

## Features
- Read and parse each JSON file, and validate input data if follows the standard schema
- Combines data from multiple JSON files and remove duplicates.
- Sorts boards alphabetically by vendor, then by name.
- Provides metadata about the number of unique vendors and total boards.
- Outputs combined and sorted data to a JSON file if output file path is given, or the console if no output file path provided.


## Usage
Running the Application

To run the application, use the following command:

npm start <directory-path> [output-path]

<directory-path>: Mandatory. The path to the directory containing the JSON files to process.
[output-path]: Optional. The path where the output JSON file should be saved. If not provided, the output will be printed to the console.

Examples:
1. Combining JSON files and printing the output to the console:

npm start example-boards/case1

3. Combining JSON files and writing the output to a specific file:
npm start example-boards/case1 output.json

## Assumptions
1. It is possible that different vendors could supply the same type of development board. Uniqueness Criteria: a board is unique by a combination of 'name', 'core' and 'has_wifi'

2. Sorting is case and special characters sensitive, e.g. 'vendorA' and 'VENDORA' are different vendors. 'vendor-A' and 'vendor_A' are different.

3. Critical errors will stop app execution immediately such as empty data input, while other errors such as invalid file or object won't block entire workflow, app will skip to next valid file or object data.


## Outstanding tasks
Below are some outstanding tasks that I didn't complete within 2 hours, but they still worth to do if no time constraint.

1. ### unit testing:

#### Below test cases should be considered for FileReader.tx:

a. should read and parse JSON files, removing duplicates

b. should not read non json file and show error

c. should show error message when read empty files (This is to distinguish between empty files and files with invalid schema)

d. should show error message when read and parse invalid schema

#### Below test cases should be considered for DataProcessor.tx:

a. Empty Input:
The component should return a result object with an empty boards array and metadata showing zero vendors and zero boards

b. Single Board Input:
The function should return a result object with one board in the array and metadata correctly reflecting one board and one vendor.

c. Multiple Boards, Single Vendor:
Input: An array of multiple boards from the same vendor.
Expected Output: The function should return the boards sorted by their names and metadata should show one vendor and a board count equal to the number of input boards. This tests sorting logic when vendor comparison is always equal.

d. Multiple Boards, Multiple Vendors:
Input: An array of boards from different vendors.
Expected Output: The function should sort the boards first by vendor and then by name if vendors are the same. Metadata should accurately reflect the number of unique vendors and total boards. This is a comprehensive test of both sorting layers and metadata calculation.

e. Case Sensitivity in Sorting
Input: Boards with vendor names or board names that vary only in case (e.g., 'vendorA' vs. 'VENDORA').
Expected Output: Since sorting should ideally be case-insensitive, this will verify that the function handles string comparisons properly.

f. Special Characters in Sorting
Input: Boards with vendor names or board names that include special characters or numbers.
Expected Output: The output should correctly sort special characters and numbers, ensuring the sort comparator functions correctly across different character sets.

g. Duplicate Boards
Input: An array where some boards are identical in terms of vendor and name.
Expected Output: Since the function should not be responsible for filtering duplicates (based on your current implementation), the output should retain duplicates and correctly count vendors and boards.

#### Below test cases should be considered for OutputHandler.ts
a. Successful Output:
Test that the function outputs the correct JSON to the console.
Expectation: The output matches the expected JSON structure.

b. Invalid Data: 
Test how the function behaves when given data that results in invalid JSON.
Expectation: The function should not crash, and it should provide error message

2. ### Performance Considerations: 
For directories with a large number of files or very large files, consider how performance might be impacted and if any optimizations are possible.

