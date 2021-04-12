import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

export const useKeyboard = (initialValue: number = 0): [number] => {
  const [height, setHeight] = useState(initialValue);

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', e => {
      setHeight(e.endCoordinates.height);
    });
    Keyboard.addListener('keyboardWillHide', e => {
      setHeight(0);
    });

    return () => {
      Keyboard.removeListener('keyboardWillShow', e => {
        setHeight(e.endCoordinates.height);
      });
      Keyboard.removeListener('keyboardWillHide', e => {
        setHeight(0);
      });
    };
  }, []);

  return [height];
};
