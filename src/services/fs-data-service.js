'use-strict';
import readFile from 'fs-readfile-promise';

const deps = {
  readFile
};

const getJSON = (path) => {

  if (!path) {
    return Promise.reject(new Error('Specify Path !'));
  }

  return deps.readFile(path, 'utf8')
    .then((readFile) => JSON.parse(readFile));
};

export default { getJSON, deps};
