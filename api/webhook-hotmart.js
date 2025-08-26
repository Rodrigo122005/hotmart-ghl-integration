const axios = require('axios');
const crypto = require('crypto');

export default async function handler(req, res) {
  // Só aceita POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Só aceito POST' });
  }

  try {
    console.log('🚀 Webhook recebido da Hotmart!');
    
    // Pegar dados do webhook
    const data = req.body;
    console.log('📦 Dados recebidos:', JSON.stringify(data, null, 2));
    
    // Extrair informações importantes
    const comprador = {
      nome: data?.data?.buyer?.name || 'Cliente',
      email: data?.data?.buyer?.email,
      telefone: data?.data?.buyer?.checkout_phone,
      produto: data?.data?.product?.name,
      valor: data?.data?.purchase?.price?.value,
      evento: data?.event
    };

    console.log('👤 Dados do comprador:', comprador);

    // Se for compra aprovada, criar no GHL
    if (data.event === 'PURCHASE_APPROVED' && comprador.email) {
      await criarNoGoHighLevel(comprador);
    }

    return res.status(200).json({ 
      sucesso: true, 
      mensagem: 'Webhook processado!',
      comprador: comprador.email 
    });

  } catch (error) {
    console.error('❌ Erro:', error.message);
    return res.status(500).json({ 
      erro: 'Deu ruim!', 
      detalhes: error.message 
    });
  }
}

async function criarNoGoHighLevel(comprador) {
  try {
    console.log('🎯 Criando contato no GoHighLevel...');
    
    const dadosContato = {
      locationId: process.env.GHL_LOCATION_ID,
      firstName: comprador.nome.split(' ')[0],
      lastName: comprador.nome.split(' ').slice(1).join(' ') || 'Hotmart',
      email: comprador.email,
      phone: comprador.telefone,
      tags: ['hotmart', 'cliente-novo', comprador.produto?.toLowerCase().replace(/\s+/g, '-')]
    };

    console.log('📝 Dados para GHL:', dadosContato);

    const resposta = await axios.post(
      'https://services.leadconnectorhq.com/contacts/',
      dadosContato,
      {
        headers: {
          'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
          'Version': '2021-07-28',
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ Contato criado no GHL!', resposta.data?.contact?.id);
    return resposta.data;

  } catch (error) {
    console.error('❌ Erro ao criar no GHL:', error.response?.data || error.message);
    throw error;
  }
}
