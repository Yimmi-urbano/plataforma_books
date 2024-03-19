export function detailBooks(userId) {
    var requestOptions = {
      method: 'GET',
    };
    
    return fetch("https://books.creceidea.com/wp-json/wc/v3/orders?customer=" + userId, requestOptions)
      .then(response => response.json())
      .then(result => {
        return result;
      })
      .catch(error => {
        throw error; 
      });
  }

