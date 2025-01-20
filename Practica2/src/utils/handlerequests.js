import TokenService from "@/utils/TokenService";

export async function getFetch(url, body, method, headers) {
  const token = TokenService.getToken();
  if (token) {
      headers = { ...headers, Authorization: `Bearer ${token}` };
      console.log("Se añade token");
  }

  console.log("Preparando solicitud a:", `https://bildy-rpmaya.koyeb.app/${url}`);
  console.log("Headers:", headers);
  console.log("Body:", body);

  try {
      const res = await fetch(`https://bildy-rpmaya.koyeb.app/${url}`, {
          method,
          headers: {
              "Content-Type": "application/json",
              ...headers,
          },
          body: body ? JSON.stringify(body) : null,
      });

      // Verifica si la respuesta es exitosa
      if (!res.ok) {
          // Lee el cuerpo de la respuesta para el mensaje de error
          const contentType = res.headers.get("Content-Type");
          let errorMessage = "Error en la petición";

          if (contentType && contentType.includes("application/json")) {
              const errorResponse = await res.json();
              console.warn("Respuesta de error JSON:", errorResponse);
              errorMessage = errorResponse.message || JSON.stringify(errorResponse);
          } else {
              const errorText = await res.text(); // Si no es JSON, intenta obtener texto
              console.warn("Respuesta de error texto:", errorText);
              errorMessage = errorText;
          }

          if (res.status === 401) {
              errorMessage = "No autorizado. Verifica el token o las credenciales.";
          }

          throw new Error(errorMessage);
      }

      // Determina si el cuerpo es JSON o texto y retorna el formato correcto
      const contentType = res.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
          return await res.json();
      } else {
          return await res.text();
      }
  } catch (error) {
      console.error("Error en la solicitud:", error.message);
      throw error; // Relanza el error para que sea manejado por el código que llama a esta función
  }
}

