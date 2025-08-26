export default async function handler(req, res) {
  return res.status(200).json({
    FUNCIONOU: "SIM, ESSE É O CÓDIGO NOVO!",
    variaveis: {
      ghl_key: process.env.GHL_API_KEY ? "EXISTE" : "NÃO EXISTE",
      ghl_location: process.env.GHL_LOCATION_ID ? "EXISTE" : "NÃO EXISTE",
      valores: {
        key: process.env.GHL_API_KEY?.substring(0, 10) + "...",
        location: process.env.GHL_LOCATION_ID?.substring(0, 10) + "..."
      }
    },
    timestamp: new Date().toISOString()
  });
}
