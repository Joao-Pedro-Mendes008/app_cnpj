import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

app.get('/cnpj/:cnpj', async (req, res) => {
  const { cnpj } = req.params;

  try {
    const response = await fetch(`https://www.receitaws.com.br/v1/cnpj/${cnpj}`);

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Erro na API ReceitaWS' });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});