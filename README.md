# PE-tech-test


## Prerequisites
npm & node must be installed

## Assumptions
### 1
Data for the back-end API has already been provided. I would normally expect this kind of data to have been in a database, allowing me to load the data more dynamically instead of loading it ***all*** from a csv and once and returning ***all*** of the data at once.
### 2
Images can be served statically via express.
### 3
Data from the API call made on the front-end is clean... will always return the correct data.
### 4
.env file has been commited to git for use in the project. This would ***NOT*** be the case in a live env as the .env file usually contains sensitive data.

## Issues
### 1
Issue when I attempted to create unit tests for the front-end using ***nock*** (google npm nock). This was to check that the state of the CelestialBodies component was changing after making the API call.
These tests ***Would*** be in their own COMPONENTNAME.test.js files if could have gotten them to work correctly. Currently the test I attempted to write for CelestialBodies actually sits in the App.test.js.
### 2
I am personally not very visually intuitive, the table is somewhat styled. However I find it visually unappealing, as I'm not a designer nor find myself naturally able to design front-ends I left it as is in table.
If this was a ***real*** project, I would expect a range of designs for different screen sizes... so that the css implementation can be dynamic and create a visually appealing application regardless of screen size etc.

## Set-up
In the root directory of this project run
```
npm install
```
In the client directory of this project also run
```
npm install
```
## Testing
### Back-end
In a command line navigate to the top directory of this project and run
```
npm test
```
this should run a jest test.
***THE TEST RUNNING ON THE BACK END WILL ALSO TRY TO RUN THE FRONT-END TESTS | IGNORE THE RESULTS OF THE FE test at this point***

### Front-end

The tests for the front end were never finished because of an issue I ran into, please see issue 1 in the issues section

## Usage

To run locally use:

```
npm start
```
This command uses other NPM scripts to run both the front end and back end in one console.
