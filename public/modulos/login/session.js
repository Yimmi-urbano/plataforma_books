async function realizarSolicitudFetch(url, datos, metodo = 'POST') {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: metodo,
    headers: myHeaders,
    body: JSON.stringify(datos),
    redirect: 'follow'
  };

  try {
    const response = await fetch(url, requestOptions);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log('Error en la solicitud fetch:', error);
    throw error;
  }
}

export async function loginAuth(username, password) {

  var datos = {
    "username": username,
    "password": password
  };

  try {
    const resultado = await realizarSolicitudFetch("https://books.creceidea.com/wp-json/jwt-auth/v1/token", datos);
    return resultado;
  } catch (error) {
    console.log('Error en la solicitud:', error);
  }

}


function obtenerTokenDeURL() {
  var url = window.location.href;
  var parametros = url.split('?')[1];
  if (parametros) {
      var tokens = parametros.split('&');
      for (var i = 0; i < tokens.length; i++) {
          var token = tokens[i].split('=');
          if (token[0] === 'token') {
              return token[1];
          }
      }
  }
  return null;
}

async function almacenarTokenEnLocalStorage() {
  var token = obtenerTokenDeURL();
  if (token) {
      localStorage.setItem("token", token);
      return true
  }
}



export async function validarToken() {
  try {

  const saveToken= await almacenarTokenEnLocalStorage();

    var jwtToken = localStorage.getItem("token");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + jwtToken);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    const response = await fetch("https://api.startsyncx.com/api/secure", requestOptions);
    const result = await response.json();

    if (result.status === true) {

      const sku = result.authData.user.sku
      const merchant = result.authData.user.merchant;
      localStorage.setItem("sku", sku);
      localStorage.setItem("merchant", merchant);
      return true;

    } else if (result.status === false) {
      console.log("Token inválido");

    } else {
      console.log("Respuesta desconocida");
    }


  } catch (error) {
    console.error('Error en la solicitud fetch:', error);
    throw error;
  }
}

export async function registerUser(name, email, phone, password, doc_dni, role_id) {

  var datos = {
    "name": name,
    "phonecell": phone,
    "email": email,
    "dni": doc_dni,
    "password": password,
    "role_id": role_id
  };

  try {
    const resultado = await realizarSolicitudFetch("https://ag-auth-78e557894804.herokuapp.com/auth/register", datos);
    return resultado;
  } catch (error) {
    console.log('Error en la solicitud:', error);
  }

}

