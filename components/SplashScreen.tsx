import React from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';

type SplashScreenProps = {
  message?: string;
};

const SplashScreen: React.FC<SplashScreenProps> = ({ message = 'Carregando...' }) => {
  return (
    <View style={styles.container}>
      <Image style={{height: '200px', width: '200px'}} source={{uri: 'https://th.bing.com/th/id/R.3d245f7da67de00aa844bba4c8fa8bfe?rik=rM89AUel6J0fZA&riu=http%3a%2f%2f2.bp.blogspot.com%2f-0Nw7Itdp34s%2fTxlX0IuGGQI%2fAAAAAAAAABc%2fya7mRjGzEpU%2fs1600%2f200px-Simbolo_konoha_svg.png&ehk=Xh2Do6o6XEIYXfKdx5UQg2sB1ww%2ffpAFgegCOH84PFg%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1'}}/>
      <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4F6D7A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },

});

export default SplashScreen;
