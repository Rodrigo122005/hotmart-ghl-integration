export default async function handler(req, res) {
  const resultado = {
    testando: "API funcionando",
    variaveis_raw: {
      ghl_key_existe: process.env.GHL_API_KEY ? "SIM" : "NÃO",
      ghl_key_valor: process.env.GHL_API_KEY || "VAZIO",
      location_existe: process.env.GHL_LOCATION_ID ? "SIM" : "NÃO", 
      location_valor: process.env.GHL_LOCATION_ID || "VAZIO"
    }
  };
  
  return res.status(200).json(resultado);
}
