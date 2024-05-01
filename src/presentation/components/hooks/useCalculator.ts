import {useRef, useState} from 'react';
//number=previos result
//numberString= numero concatenado

enum Operator {
  add,
  subtract,
  multiply,
  divide,
}

export const useCalculator = () => {
  const [number, setNumber] = useState('0');
  const [prevNumber, setPrevNumber] = useState('0');

  const lastOperation = useRef<Operator>();

  const clean = () => {
    setNumber('0');
    setPrevNumber('0');
  };
  //borrar el ultimo numero ingresado
  const deleteOperation = () => {
    let currentSign = '';
    let temporalnumber = number;

    if (number.includes('-')) {
      currentSign = '-';
      temporalnumber = number.substring(1);
    }

    if (temporalnumber.length > 1) {
      return setNumber(currentSign + temporalnumber.slice(0, -1));
    }

    setNumber('0');
  };

  const toggleSign = () => {
    if (number.includes('-')) {
      return setNumber(number.replace('-', ''));
    }
    setNumber('-' + number);
  };

  const buildNumber = (numberString: string) => {
    if (number.includes('.') && numberString === '.') return;

    if (number.startsWith('0') || number.startsWith('-0')) {
      //punto decimal
      if (numberString === '.') {
        return setNumber(number + numberString);
      }

      // Evaluar si es otro cero y no hay punto
      if (numberString === '0' && number.includes('.')) {
        return setNumber(number + numberString);
      }

      // Evaluar si es diferente de cero, no hay punto, y es el primer numero

      if (numberString !== '0' && !number.includes('.')) {
        return setNumber(numberString);
      }
      //Evaluar 000000

      if (numberString === '0' && !number.includes('.')) {
        return;
      }

      return setNumber(number + numberString);
    }

    setNumber(number + numberString);
  };

  const setLastNumber = () => {
    if (number.endsWith('.')) {
      setPrevNumber(number.slice(0, -1));
    } else {
      setPrevNumber(number);
    }
    setNumber('0');
  };

  const divideOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.divide;
  };
  const multiplyOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.multiply;
  };
  const subtractOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.subtract;
  };
  const addOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.add;
  };

  const calculateResult = () => {
    const num1 = Number(number);
    const num2 = Number(prevNumber);
    switch (lastOperation.current) {
      case Operator.add:
        setNumber(`${num2 + num1}`);
        break;
      case Operator.subtract:
        setNumber(`${num2 - num1}`);
        break;
      case Operator.multiply:
        setNumber(`${num1 * num2}`);
        break;
      case Operator.divide:
        setNumber(`${num2 / num1}`);
        break;

      default:
        throw new Error('operation not implemented');
    }
    setPrevNumber('0');
  };

  return {
    //properties
    number,
    prevNumber,
    //methods
    clean,
    deleteOperation,
    toggleSign,
    buildNumber,
    setLastNumber,
    divideOperation,
    multiplyOperation,
    subtractOperation,
    addOperation,
    calculateResult,
  };
};
