import React, { useState, } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading, } from 'expo'; // force wait on splash screen until a condition is met

import osContext from './context/osContext';

import Header from './components/Header';
import StartGameScreen from './views/StartGameScreen';
import GameScreen from './views/GameScreen';
import GameOverScreen from './views/GameOverScreen';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })
}

const os = Platform.select({
  ios: 'ios',
  android: 'android',
})

const App = () => {
  const [initialDataIsLoading, setInitialDataIsLoading, ] = useState(true);
  const [numberOfGuesses, setNumberOfGuesses, ] = useState(1); // 1 for the initial guess
  const [numberToGuess, setNumberToGuess, ] = useState(null);
  const [isGameOver, setIsGameOver, ] = useState(false);

  // load fonts
  if (initialDataIsLoading) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setInitialDataIsLoading(false)}
        onError={(error) => console.log('error while loading initial data:', error)}
      />
    );
  }

  handleMoveToStartScreen = () => {
    setNumberToGuess(null);
    setNumberOfGuesses(1);
    setIsGameOver(false);
  }

  return (
    <osContext.Provider
      value={os}
    >
      <View style={styles.app}>
        <Header 
          title={"Guess A Number"}
        />

        {
          isGameOver
          ? <GameOverScreen
            moveToStartScreen={handleMoveToStartScreen}
            numberOfGuesses={numberOfGuesses}
          /> 
          : numberToGuess
              ? <GameScreen 
                moveToGameOverScreen={() => setIsGameOver(true)}
                numberToGuess={numberToGuess} 
                incrementNumberOfGuesses={() => setNumberOfGuesses(numberOfGuesses + 1)}
                setNumberToGuess={setNumberToGuess}  
              />
              : <StartGameScreen 
                setNumberToGuess={setNumberToGuess} 
              />
        }
      </View>
    </osContext.Provider>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
  }
});

export default App;