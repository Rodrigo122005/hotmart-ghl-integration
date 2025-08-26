export default async function handler(req, res) {
  return res.status(200).json({ 
    mensagem: '🎉 API funcionando!', 
    timestamp: new Date().toLocaleString('pt-BR'),
    suas_variaveis: {
      ghl_configurado: !!process.env.GHL_API_KEY,
      location_configurado: !!process.env.GHL_LOCATION_ID,
      hotmart_configurado: !!process.env.HOTMART_TOKEN
    }
  });
}
