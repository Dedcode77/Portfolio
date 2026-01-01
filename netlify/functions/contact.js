import { Resend } from 'resend';

// Initialisation de Resend avec la variable d'environnement
// Ne mets JAMAIS ta clé API en dur ici, utilise toujours process.env
const resend = new Resend(process.env.RESEND_API_KEY);

export const handler = async (event) => {
  // Headers pour la sécurité et le CORS
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  };

  // Gestion du "Preflight" (requête OPTIONS du navigateur)
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  // Sécurité : Uniquement du POST
  if (event.httpMethod !== "POST") {
    return { 
      statusCode: 405, 
      headers, 
      body: JSON.stringify({ error: "Méthode non autorisée" }) 
    };
  }

  try {
    // Récupération des données envoyées par ton formulaire React
    const { name, email, message } = JSON.parse(event.body);

    // Validation rapide côté serveur
    if (!name || !email || !message || message.length < 10) {
      return { 
        statusCode: 400, 
        headers, 
        body: JSON.stringify({ error: "Données invalides ou message trop court." }) 
      };
    }

    // ENVOI RÉEL DE L'EMAIL VIA RESEND
    const { data, error } = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>', // Adresse de test par défaut de Resend
      to: 'salifciss222@gmail.com', // Ton adresse de réception
      subject: `🚀 Nouveau message de ${name}`,
      html: `
        <div style="font-family: sans-serif; border: 1px solid #3399ff; padding: 20px; border-radius: 10px;">
          <h2 style="color: #3399ff;">Nouveau contact via Portfolio</h2>
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email :</strong> ${email}</p>
          <hr style="border: 0.5px solid #eee;" />
          <p style="white-space: pre-wrap;"><strong>Message :</strong><br />${message}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Erreur Resend:", error);
      throw new Error("Erreur lors de l'envoi de l'email");
    }

    // Réponse de succès envoyée à ton React
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        status: "success", 
        message: "Email envoyé avec succès !",
        id: data.id 
      }),
    };

  } catch (error) {
    console.error("Erreur Backend :", error);
    return { 
      statusCode: 500, 
      headers, 
      body: JSON.stringify({ error: "Le serveur n'a pas pu traiter l'envoi." }) 
    };
  }
};