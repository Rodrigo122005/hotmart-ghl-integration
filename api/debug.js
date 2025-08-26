export default async function handler(req, res) {
  return res.status(200).json({ 
    debug: {
      GHL_API_KEY: process.env.GHL_API_KEY ? 'EXISTE' : 'NÃO EXISTE',
      GHL_LOCATION_ID: process.env.GHL_LOCATION_ID ? 'EXISTE' : 'NÃO EXISTE',
      HOTMART_TOKEN: process.env.HOTMART_TOKEN ? 'EXISTE' : 'NÃO EXISTE',
      
      primeiros_chars: {
        api_key: process.env.GHL_API_KEY?.substring(0, 10) + '...',
        location_id: process.env.GHL_LOCATION_ID?.substring(0, 10) + '...'
      },
      
      todas_variaveis: Object.keys(process.env).filter(key => 
        key.includes('GHL') || key.includes('HOTMART')
      )
    }
  });
}
