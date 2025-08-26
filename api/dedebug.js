export default async function handler(req, res) {
  return res.status(200).json({ 
    debug_completo: {
      // Verificar se existem
      GHL_API_KEY_existe: !!process.env.GHL_API_KEY,
      GHL_LOCATION_ID_existe: !!process.env.GHL_LOCATION_ID,
      HOTMART_TOKEN_existe: !!process.env.HOTMART_TOKEN,
      
      // Mostrar primeiros caracteres (para confirmar)
      primeiros_chars: {
        api_key: process.env.GHL_API_KEY?.substring(0, 15) + '...',
        location_id: process.env.GHL_LOCATION_ID?.substring(0, 15) + '...',
        hotmart: process.env.HOTMART_TOKEN?.substring(0, 15) + '...'
      },
      
      // Listar TODAS as variáveis que começam com GHL ou HOTMART
      todas_variaveis_relacionadas: Object.keys(process.env).filter(key => 
        key.includes('GHL') || key.includes('HOTMART')
      ),
      
      // Verificar se NODE_ENV está correto
      node_env: process.env.NODE_ENV,
      
      // Total de variáveis disponíveis
      total_variaveis: Object.keys(process.env).length
    }
  });
}
