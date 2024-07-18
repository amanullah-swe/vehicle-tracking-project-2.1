// import { useState } from "react";
// import { AppContext } from '../context/user/AppContext';
export async function PostCallWithErrorResponse(url, requestBody) {
  var resp;
  // const [progress, setProgress] = useState(0);
  // const { customerData } = useContext(AppContext);

  return await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Authorization: "Token " + localStorage.getItem("auth_token"),
    },
    // body: JSON.stringify({...customerData,...requestBody})
    body: JSON.stringify(requestBody),
  })
    .then((response) => {
      resp = response;
      return response.json();
    })
    .then((json) => {
      return {
        response: resp,
        json: json,
        error: !resp.ok,
      };
    });
}
///form data

export async function multipartPostCallWithErrorResponse(url, requestBody) {
  var resp;
  return await fetch(url, {
    method: "POST",
    headers: {
      
      Accept: "application/json",
      //"Content-Type": "multipart/form-data",
      Authorization: localStorage.getItem("api_key"),
      user_customer_id: localStorage.getItem("customer_id"),
      user_id: localStorage.getItem("id")
    },
    body: requestBody,
  })
    .then((response) => {
      resp = response;
      return response.json();
    })
    .then((json) => {
      return {
        response: resp,
        json: json,
        error: !resp.ok,
      };
    });
}
export async function multipartPostCallWithErrorResponseCategory(url, requestBody,status,category_icon_id,name) {
  var resp;
  return await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      //"Content-Type": "multipart/form-data",
      category_icon_id:category_icon_id,
      switch:status,
      isExist:name =="custom" ? true:false,
      Authorization: localStorage.getItem("api_key"),
      user_customer_id: localStorage.getItem("customer_id"),
      user_id: localStorage.getItem("id")
    },
    body: requestBody,
  })
    .then((response) => {
      resp = response;
      return response.json();
    })
    .then((json) => {
      return {
        response: resp,
        json: json,
        error: !resp.ok,
      };
    });
}

export async function getWithAuthCallWithErrorResponse(url) {
  var resp;
  return await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Token " + localStorage.getItem("auth_token"),
    },
  })
    .then((response) => {
      resp = response;
      return response.json();
    })
    .then((json) => {
      return {
        response: resp,
        json: json,
        error: !resp.ok,
      };
    });
}

export async function postWithAuthCallWithErrorResponse(url, requestBody) {
  var resp;
  return await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // "Content-Type": "multipart/form-data",
      Authorization: "Token " + localStorage.getItem("auth_token"),
      // Origin: window.location.origin,
    },
    body: requestBody,
    
  })
    .then((response) => {
      resp = response;
      return response.json();
    })
    .then((json) => {
      return {
        response: resp,
        json: json,
        error: !resp.ok,
      };
    });
}
export async function getWithAuthCallWithtext(url) {
  var resp;
  return await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Authorization: 'Token ' + localStorage.getItem("USER_AUTH_TOKEN"),    },
    },
  })
    .then((response) => {
      resp = response;
      return response.text();
    })
    .then((text) => {
      return { response: resp, text: text, error: !resp.ok };
    });
}

export async function putMultipartWithAuthCallWithErrorResponse(
  url,
  requestBody
) {
  var resp;
  return await fetch(url, {
    method: "PUT",
    headers: {
      // Accept: "application/json",
      // "Content-Type": "multipart/form-data",
      Authorization: "Token " + localStorage.getItem("auth_token"),
    },
    body: requestBody,
  })
    .then((response) => {
      resp = response;
      return response.json();
    })
    .then((json) => {
      return {
        response: resp,
        json: json,
        error: !resp.ok,
      };
    });
}

export async function postMultipartWithAuthCallWithErrorResponse(
  url,
  requestBody
) {
  var resp;
  return await fetch(url, {
    method: "POST",

    headers: {
      Accept: "application/json",
      Authorization: localStorage.getItem("api_key"),
      user_customer_id:localStorage.getItem("customer_id"),
      user_id:localStorage.getItem("id")
    },
    body: requestBody,
  })
    .then((response) => {
      resp = response;
      return response.json();
    })
    .then((json) => {
      return {
        response: resp,
        json: json,
        error: !resp.ok,
      };
    });
}
export async function postMultipartWithAuthCallWithErrorResponseNode(
  url,
  requestBody
) {
  var resp;
  return await fetch(url, {
    method: "POST",

    headers: {
      Accept: "application/json",
      Authorization: localStorage.getItem("auth_token"),
    },
    body: requestBody,
  })
    .then((response) => {
      resp = response;
      return response.json();
    })
    .then((json) => {
      return {
        response: resp,
        json: json,
        error: !resp.ok,
      };
    });
}
export async function simpleGetCallWithErrorResponse(url) {
  var resp;
  return await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("api_key"),
      user_customer_id:localStorage.getItem("customer_id"),
      user_id:localStorage.getItem("id")
    },
  })
    .then((response) => {
      resp = response;
      return response.json();
    })
    .then((json) => {
      return {
        response: resp,
        json: json,
        error: !resp.ok,
      };
    });
}
export async function simpleGetCallWithErrorResponseNODE(url) {
  var resp;
  return await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("auth_token"),
    },
  })
    .then((response) => {
      resp = response;
      return response.json();
    })
    .then((json) => {
      return {
        response: resp,
        json: json,
        error: !resp.ok,
      };
    });
}
export async function simpleGetCallWithErrorResponseNode(url) {
  var resp;
  return await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("auth_token"),
    },
  })
    .then((response) => {
      resp = response;
      return response.json();
    })
    .then((json) => {
      return {
        response: resp,
        json: json,
        error: !resp.ok,
      };
    });
}
export async function getLocationName  (latLng) {
  return await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${Number(latLng.lat)}&lon=${Number(latLng.lng)}`, {
  })
    .then((response) => response.text())
    .then((result) => getResult(result))
    .catch(err => console.error("catch error of search address,", err))
}
export async function simpleGetCall(url) {
  return await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
   
      Authorization: localStorage.getItem("api_key"),
      user_customer_id:localStorage.getItem("customer_id"),
      user_id:localStorage.getItem("id")
    },
  })
    .then((response) => response.text())
    .then((result) => getResult(result));
}
export async function simpleGetCallTime(url) {
  return await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
   
      // Authorization: localStorage.getItem("api_key"),
      // user_customer_id:localStorage.getItem("customer_id"),
      // user_id:localStorage.getItem("id")
    },
  })
    .then((response) => response.text())
    .then((result) => getResult(result));
}
export async function simpleGetCallNew(url,customerId) {
  return await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Authorization:CustomerData?.api_key,
      user_customer_id:customerId,
      // user_id:CustomerData.id
      // Authorization: localStorage.getItem("api_key"),
      // user_customer_id:localStorage.getItem("customer_id"),
      // user_id:localStorage.getItem("id")
    },
  })
    .then((response) => response.text())
    .then((result) => getResult(result));
}

export async function simplePostCall(url, requestBody) {
  return await fetch(url, {
    method: "POST",
    // mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      //'Access-Control-Allow-Credentials': "*"
      Authorization: localStorage?.getItem("api_key"),
      user_customer_id:localStorage?.getItem("customer_id"),
      user_id:localStorage?.getItem("id")
    },
    withCredentials: true,
    body: requestBody,
  })
    .then((response) => response.text())
    .then((result) => getResult(result));
}

//addedby me////////////////////////////////////////////////////////////////////

export async function simplePostCallPromise(url, requestBody) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: localStorage?.getItem("api_key"),
      user_customer_id: localStorage?.getItem("customer_id"),
      user_id: localStorage?.getItem("id"),
    },
    withCredentials: true,
    body: requestBody,
  });
  const result = await response.text();
  return getResult(result);
}
//////////////////////////////////////////////////////////////

export async function simplePostCallShare(url, requestBody,customerId) {
  return await fetch(url, {
    method: "POST",
    // mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      //'Access-Control-Allow-Credentials': "*"
      // Authorization:CustomerData?.api_key,
       user_customer_id:customerId,
      // user_id:CustomerData.id
    },
    withCredentials: true,
    body: requestBody,
  })
    .then((response) => response.text())
    .then((result) => getResult(result));
  //.then(data=>data.json());
}


export async function SimpleUploadFiles(url, requestBody) {
  return await fetch(url, {
    method: "POST",
    // mode: "cors",
    headers: {
      Accept: "application/json",
      // "Content-Type": "application/json",
      //'Access-Control-Allow-Credentials': "*"
      Authorization: localStorage.getItem("api_key"),
      user_customer_id:localStorage.getItem("customer_id"),
      user_id:localStorage.getItem("id")
    },
    withCredentials: true,
    body: requestBody,
  })
    .then((response) => response.text())
    .then((result) => getResult(result));
  //.then(data=>data.json());
}
export async function simpleDeleteCall(url, requestBody) {
  return await fetch(url, {
    method: "DELETE",
    // mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      //'Access-Control-Allow-Credentials': "*"
      Authorization: localStorage.getItem("api_key"),
      user_customer_id:localStorage.getItem("customer_id"),
      user_id:localStorage.getItem("id")
    },
    withCredentials: true,
    body: requestBody,
  })
    .then((response) => response.text())
    .then((result) => getResult(result));
  //.then(data=>data.json());
}


export async function simplePostCallNode(url, requestBody) {
  return await fetch(url, {
    method: "POST",
    // mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      //'Access-Control-Allow-Credentials': "*"
      Authorization: localStorage.getItem("auth_token"),
    },
    withCredentials: true,
    body: requestBody,
  })
    .then((response) => response.text())
    .then((result) => getResult(result));
  //.then(data=>data.json());
}
export async function simplePUTCall(url, requestBody) {
  return await fetch(url, {
    method: "PUT",
    // mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      //'Access-Control-Allow-Credentials': "*"
      Authorization: localStorage.getItem("api_key"),
      user_customer_id:localStorage.getItem("customer_id"),
      user_id:localStorage.getItem("id")
    },
    withCredentials: true,
    body: requestBody,
  })
    .then((response) => response.text())
    .then((result) => getResult(result));
  //.then(data=>data.json());
}
export async function simplePostCallAll(url, requestBody) {
  return await fetch(url, {
    method: "POST",
    // mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      //'Access-Control-Allow-Credentials': "*"
    },
    withCredentials: true,
    body: requestBody,
  })
    .then((response) => response.text())
    .then((result) => getResult(result));
  //.then(data=>data.json());
}

export async function multipartPostCall(url, requestBody) {
  return await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      //'Content-Type': 'multipart/form-data',
      Authorization: localStorage.getItem("api_key"),
      user_customer_id: localStorage.getItem("customer_id"),
      user_id: localStorage.getItem("id")
    },
    body: requestBody,
  })
    .then((response) => response.text())
    .then((result) => getResult(result));
}

export async function getWithAuthCall(url) {
  return await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("api_key"),
      user_customer_id:localStorage.getItem("customer_id"),
      user_id:localStorage.getItem("id")
    },
  })
    .then((response) => response.text())
    .then((result) => getResult(result));
}

export async function postWithAuthCall(url, requestBody) {
  return await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Token " + localStorage.getItem("auth_token"),
    },
    body: requestBody,
  })
    .then((response) => response.text())
    .then((result) => getResult(result));
}

export async function putWithAuthCall(url, requestBody) {
  return await fetch(url, {
    method: "PUT",
    headers: {
      // Accept: "application/json",
      // "Content-Type": "application/json",
      Authorization: localStorage.getItem("api_key"),
      user_customer_id:localStorage.getItem("customer_id"),
      user_id:localStorage.getItem("id")
    },
    body: requestBody,
  })
    .then((response) => response.text())
    .then((result) => getResult(result));
}

export async function postMultipartWithAuthCall(url, requestBody) {
  return await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      // "Content-Type": "multipart/form-data",
      // "Access-Control-Allow-Origin": "*",
      Authorization: "Token " + localStorage.getItem("auth_token"),
    },
    withCredentials: true,
    body: requestBody,
  })
    .then((response) => response.text())
    .then((result) => getResult(result));
}

export async function putMultipartWithAuthCall(url, requestBody) {
  return await fetch(url, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
      //Authorization: 'Token ' + (await AsyncStorage.getItem(AppStrings.TOKEN)),
      Authorization: localStorage.getItem("api_key"),
      user_customer_id:localStorage.getItem("customer_id"),
      user_id:localStorage.getItem("id")
    },
    body: requestBody,
  })
    .then((response) => response.json())
    .then((result) => getResult(result));
}

export async function deleteWithAuthCall(url, requestBody) {
  return await fetch(url, {
    method: "DELETE",

    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Token " + localStorage.getItem("auth_token"),
    },

    body: requestBody,
  }).then((response) => response.json());
}

export async function deleteWithAuthCallNode(url, requestBody) {
  return await fetch(url, {
    method: "DELETE",

    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("auth_token"),
    },

    body: requestBody,
  }).then((response) => response.json());
}
export async function simpleGetCallWithErrorResponseNodeCreate(url) {
  var resp;
  return await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Authorization:  localStorage.getItem("auth_token"),
      // Authorization: 'YOUR_ACCESS_KEY'
    },
  })
    .then((response) => {
      resp = response;
      return response.json();
    })
    .catch(err => {
      return err
    });
}

export async function postMultipartWithAuthCallWithErrorResponseNodeCreate(
  url,
  requestBody
) {
  var resp;
  return await fetch(url, {
    method: "POST",

    headers: {
      Accept: "application/json",
      Authorization:  localStorage.getItem("auth_token"),
    },
    body: requestBody,
  })
    .then((response) => {
      resp = response;
      return response.json();
    })
    .then((json) => {
      return {
        response: resp,
        json: json,
        error: !resp.ok,
      };
    });
}


export async function putMultipartWithAuthCallWithErrorResponseNodeCreate(
  url,
  requestBody
) {
  var resp;
  return await fetch(url, {
    method: "PUT",
    headers: {
      // Accept: "application/json",
      // "Content-Type": "multipart/form-data",
      Authorization: localStorage.getItem("auth_token"),
    },
    body: requestBody,
  })
    .then((response) => {
      resp = response;
      return response.json();
    })
    .then((json) => {
      return {
        response: resp,
        json: json,
        error: !resp.ok,
      };
    });
}


//-------------------------------------
export async function getResult(data) {
  return JSON.parse(data.trim());
}
//-------------------------------------


