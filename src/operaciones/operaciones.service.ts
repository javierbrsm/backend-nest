import { Injectable } from '@nestjs/common';

@Injectable()
export class OperacionesService {

    operar(operacion: string = '', a: number, b: number) {
    if (operacion === 'suma') {
      return this.#suma(a, b);
    }

    if (operacion === 'resta') {
      return this.#resta(a, b);
    }

    if (operacion === 'multiplicacion') {
      return this.#multiplicacion(a, b);
    }

    if (operacion === 'division') {
      return this.#division(a, b);
    }

    if (operacion === 'potencia') {
      return this.#potencia(a, b);
    }

    if (operacion === 'factorial') {
      return this.#factorial(a);
    }

    throw new Error(`Operación no soportada: ${operacion}`);
  }

  #suma(a: number, b: number) {
    if (a === undefined || b === undefined) {
      throw new Error('No se puede llamar con números indefinidos.');
    }
    if (typeof a !== 'number' || typeof b !== 'number') {
      return NaN;
    }
    return a + b;
  }

  #resta(a: number, b: number) {
    if (a === undefined || b === undefined) {
      throw new Error('No se puede llamar con números indefinidos.');
    }
    if (typeof a !== 'number' || typeof b !== 'number') {
      return NaN;
    }
    return a - b;
  }

  #multiplicacion(a: number, b: number) {
    if (a === undefined || b === undefined) {
      throw new Error('No se puede llamar con números indefinidos.');
    }
    if (typeof a !== 'number' || typeof b !== 'number') {
      return NaN;
    }
    return a * b;
  }

  #division(a: number, b: number) {
    if (a === undefined || b === undefined) {
      throw new Error('No se puede llamar con números indefinidos.');
    }
    if (typeof a !== 'number' || typeof b !== 'number') {
      return NaN;
    }
    if (b === 0) {
      throw new Error('División por cero no permitida.');
    }
    
    return a / b;
  }

  #potencia(a: number, b: number) {
    if (a === undefined || b === undefined) {
      throw new Error('No se puede llamar con números indefinidos.');
    }
    if (typeof a !== 'number' || typeof b !== 'number') {
      return NaN;
    }
    return Math.pow(a, b);
  }

  #factorial(a: number): number {
  if (a === undefined) {
    throw new Error('No se puede llamar con número indefinido.');
  }
  if (typeof a !== 'number') {
    return NaN;
  }
  if (a < 0 || !Number.isInteger(a)) {
    throw new Error('Solo se permiten enteros positivos en factorial.');
  }

  let result = 1;
  for (let i = 2; i <= a; i++) {
    result *= i;
  }
  return result;
}

}
