/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 * @returns {Promise}       A Promise that resolves with { data: ... } or rejects with Error.
 */
function fetchModel(url) {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          try {
            const resp = JSON.parse(xhr.responseText);
            resolve({ data: resp });
          } catch (e) {
            reject(new Error("Failed to parse JSON response: " + e.message));
          }
        } else {
          reject(
            new Error(
              "HTTP request failed with status: " +
                xhr.status +
                " " +
                xhr.statusText
            )
          );
        }
      }
    };

    xhr.onerror = function () {
      reject(new Error("Network error occurred while fetching " + url));
    };

    xhr.send();
  });
}

export default fetchModel;
