'use strict';

const fs = require('fs');
const CSVParser = require('csv-parse');
const CSVStringify = require('csv-stringify');


const inputFile = 'input.csv';
const outputFile = 'output.csv';

main();

async function main() {
  const content = await parseCSVFile(inputFile);

  const outputContent = content.map((row) => row.reverse());
  await writeCSVFile(outputContent, outputFile)
}


async function parseCSVFile(inputFile) {
  const fileContent = fs.readFileSync(inputFile).toString();
  const csvArray = await new Promise((resolve, reject) => CSVParser(fileContent, (error, data) => error ? reject(error) : resolve(data)));
  return csvArray;
}

async function writeCSVFile(data, outputFile) {
  const outputData = await new Promise((resolve, reject) => CSVStringify(data, (error, data) => error ? reject(error) : resolve(data)));
  fs.writeFileSync(outputFile, outputData);
}

