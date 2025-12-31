// netlify/functions/contact.js
export const handler = async (event) => {
  // Autoriser uniquement les requêtes POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { name, email, message } = JSON.parse(event.body);

    // Validation côté serveur (sécurité supplémentaire)
    if (!name || !email || !message || message.length < 10) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Données invalides" }),
      };
    }

    // LOGIQUE : Ici tu pourras plus tard connecter Resend ou une BDD
    console.log("Message reçu du Front-end:", { name, email, message });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Succès" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erreur serveur" }),
    };
  }
};