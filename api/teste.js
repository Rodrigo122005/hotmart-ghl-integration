export default async function handler(req, res) {
  
  // TESTE COM VALORES FIXOS (temporário)
  const teste = {
    env_vars: {
      GHL_API_KEY: process.env.GHL_API_KEY,
      GHL_LOCATION_ID: process.env.GHL_LOCATION_ID,
      HOTMART_TOKEN: process.env.HOTMART_TOKEN
    },
    
    env_vars_exist: {
      ghl_api: !!process.env.GHL_API_KEY,
      ghl_location: !!process.env.GHL_LOCATION_ID,  
      hotmart: !!process.env.HOTMART_TOKEN
    },
    
    // LISTAR TODAS AS VARIÁVEIS
    todas_vars: Object.keys(process.env),
    
    // VARIÁVEIS QUE CONTÉM GHL
    vars_ghl: Object.keys(process.env).filter(k => k.includes('GHL')),
    
    // DEBUG TOTAL
    debug_total: {
      node_env: process.env.NODE_ENV,
      vercel_env: process.env.VERCEL_ENV,
      total_vars: Object.keys(process.env).length
    }
  };
  
  return res.status(200).json(teste);
}
