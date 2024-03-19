async function listCategory(ownerID) {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      return  fetch("https://ngybnb3sad.execute-api.us-east-1.amazonaws.com/dev/category?owner="+ownerID, requestOptions)
      .then(response => response.json())
      .then(result => {
        return result;
      })
      .catch(error => {
        console.log('error', error);
        throw error;
      });
}

export { listCategory }