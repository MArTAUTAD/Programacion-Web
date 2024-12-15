export async function getFetch(url, body, method, headers) {
    const res = await fetch(`https://bildy-rpmaya.koyeb.app/${url}`,{
        method: method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : null
      ,
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Error en la petición");
    }
    
    const data = await res.json()
    console.log(data)
    return(data)
  }