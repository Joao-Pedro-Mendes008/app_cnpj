import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

type AtividadePrincipal = {
  code: string;
  text: string;
};

type Qsa = {
  nome: string;
  qual: string;
};

type CnpjData = {
  abertura: string;
  situacao: string;
  tipo: string;
  nome: string;
  fantasia: string;
  porte: string;
  natureza_juridica: string;
  atividade_principal: AtividadePrincipal[];
  qsa: Qsa[];
  logradouro: string;
  numero: string;
  municipio: string;
  bairro: string;
  uf: string;
  cep: string;
  data_situacao: string;
};

const App: React.FC = () => {
  const [cnpj, setCnpj] = useState('');
  const [data, setData] = useState<CnpjData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const cleanCnpj = (input: string) => input.replace(/\D/g, '');

  const handleFetch = async () => {
    const formattedCnpj = cleanCnpj(cnpj);
    if (formattedCnpj.length !== 14) {
      setError('Digite um CNPJ válido com 14 números');
      setData(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`http://localhost:4000/cnpj/${formattedCnpj}`);
      if (!response.ok) {
        throw new Error('Erro na requisição');
      }
      const json: CnpjData = await response.json();
      setData(json);
    } catch (err) {
      setError('Erro ao buscar dados');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        value={cnpj}
        onChangeText={setCnpj}
        placeholder="Digite o CNPJ"
        keyboardType="numeric"
        maxLength={18} // opcional, para cnpj formatado
      />
      <Button title={loading ? 'Carregando...' : 'Buscar'} onPress={handleFetch} disabled={loading} />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {data && (
        <View style={styles.result}>
          <Text style={styles.label}>Nome: <Text style={styles.value}>{data.nome}</Text></Text>
          <Text style={styles.label}>Fantasia: <Text style={styles.value}>{data.fantasia}</Text></Text>
          <Text style={styles.label}>Abertura: <Text style={styles.value}>{data.abertura}</Text></Text>
          <Text style={styles.label}>Situação: <Text style={styles.value}>{data.situacao}</Text></Text>
          <Text style={styles.label}>Tipo: <Text style={styles.value}>{data.tipo}</Text></Text>
          <Text style={styles.label}>Porte: <Text style={styles.value}>{data.porte}</Text></Text>
          <Text style={styles.label}>Natureza Jurídica: <Text style={styles.value}>{data.natureza_juridica}</Text></Text>
          <Text style={styles.label}>
            Atividade Principal: <Text style={styles.value}>{data.atividade_principal?.[0]?.text}</Text>
          </Text>
          <Text style={styles.label}>
            Endereço: <Text style={styles.value}>{`${data.logradouro}, ${data.numero} - ${data.bairro}, ${data.municipio} - ${data.uf}`}</Text>
          </Text>
          <Text style={styles.label}>CEP: <Text style={styles.value}>{data.cep}</Text></Text>
          <Text style={styles.label}>Data Situação: <Text style={styles.value}>{data.data_situacao}</Text></Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginVertical: 10,
  },
  result: {
    marginTop: 20,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 8,
  },
  value: {
    fontWeight: 'normal',
  },
});

export default App;