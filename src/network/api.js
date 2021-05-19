const API_PATH = 'https://app.luca-app.de/api/';

const headers = {
  'Content-Type': 'application/json',
};

// LOCATION
export const getScanner = (scannerAccessId) => {
  return fetch(`${API_PATH}v3/scanners/access/${scannerAccessId}`, {
    method: 'GET',
    headers,
  });
};
