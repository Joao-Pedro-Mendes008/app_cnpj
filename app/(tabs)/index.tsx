import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView } from 'react-native';

interface AtividadePrincipal {
  code: string;
  text: string;
}

interface Qsa {
  nome: string;
  qual: string;
}

interface CnpjData {
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
}

const fetchCnpjData = async (cnpj: string): Promise<CnpjData> => {
  const response = await fetch(`https://www.receitaws.com.br/v1/cnpj/${cnpj}`);

  if (!response.ok) {
    console.log(cnpj);
    throw new Error('Erro na requisição')
  }

  const data = await response.json();

  return data;
};

const CnpjSearchScreen = () => {
  const [cnpj, setCnpj] = useState('');
  const [data, setData] = useState<CnpjData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    try {
      setError(null);
      setData(null);
      const result = await fetchCnpjData(cnpj);
      setData(result);
    } catch (err) {
      setError('Erro ao buscar CNPJ');
      setData(null);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite o CNPJ"
        value={cnpj}
        onChangeText={setCnpj}
        keyboardType="numeric"
      />
      <Button title="Buscar CNPJ" onPress={handleSearch} />

      {error && <Text style={styles.error}>{error}</Text>}

      {data && (
        <View style={styles.result}>
          <Text style={styles.label}>Nome:</Text>
          <Text>{data.nome}</Text>

          <Text style={styles.label}>Fantasia:</Text>
          <Text>{data.fantasia}</Text>

          <Text style={styles.label}>Abertura:</Text>
          <Text>{data.abertura}</Text>

          <Text style={styles.label}>Situação:</Text>
          <Text>{data.situacao}</Text>

          <Text style={styles.label}>Tipo:</Text>
          <Text>{data.tipo}</Text>

          <Text style={styles.label}>Porte:</Text>
          <Text>{data.porte}</Text>

          <Text style={styles.label}>Natureza Jurídica:</Text>
          <Text>{data.natureza_juridica}</Text>

          <Text style={styles.label}>Logradouro:</Text>
          <Text>{data.logradouro}, {data.numero}</Text>

          <Text style={styles.label}>Bairro:</Text>
          <Text>{data.bairro}</Text>

          <Text style={styles.label}>Município:</Text>
          <Text>{data.municipio}</Text>

          <Text style={styles.label}>UF:</Text>
          <Text>{data.uf}</Text>

          <Text style={styles.label}>CEP:</Text>
          <Text>{data.cep}</Text>

          <Text style={styles.label}>Data Situação:</Text>
          <Text>{data.data_situacao}</Text>

          <Text style={[styles.label, { marginTop: 15 }]}>Atividades Principais:</Text>
          {data.atividade_principal.map((atividade, index) => (
            <View key={index} style={styles.listItem}>
              <Text>{atividade.code} - {atividade.text}</Text>
            </View>
          ))}

          <Text style={[styles.label, { marginTop: 15 }]}>Sócios (QSA):</Text>
          {data.qsa.map((socio, index) => (
            <View key={index} style={styles.listItem}>
              <Text>{socio.nome} - {socio.qual}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  result: {
    marginTop: 20,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  listItem: {
    paddingLeft: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default CnpjSearchScreen;
