"use client";

import React, { useState, ChangeEvent } from 'react';
import styles from './page.module.css';

const caesarCipher = (str: string, shift: number): string => {
  return str.replace(/[a-z]/gi, (char) => {
    const start = char <= 'Z' ? 65 : 97;
    return String.fromCharCode(((char.charCodeAt(0) - start + shift) % 26) + start);
  });
};

const vigenereCipher = (text: string, key: string): string => {
  let result = '';
  for (let i = 0, j = 0; i < text.length; i++) {
    const c = text.charCodeAt(i);
    if (c >= 65 && c <= 90) {
      result += String.fromCharCode((c - 65 + key.charCodeAt(j % key.length) - 65) % 26 + 65);
      j++;
    } else if (c >= 97 && c <= 122) {
      result += String.fromCharCode((c - 97 + key.charCodeAt(j % key.length) - 97) % 26 + 97);
      j++;
    } else {
      result += text.charAt(i);
    }
  }
  return result;
};

const frequencyAnalysis = (text: string): Record<string, number> => {
  const frequency: Record<string, number> = {};
  for (let char of text.replace(/[^a-zA-Z]/g, '').toLowerCase()) {
    frequency[char] = (frequency[char] || 0) + 1;
  }
  return frequency;
};

const Home: React.FC = () => {
  const [caesarText, setCaesarText] = useState<string>('');
  const [caesarShift, setCaesarShift] = useState<number>(3);
  const [vigenereText, setVigenereText] = useState<string>('');
  const [vigenereKey, setVigenereKey] = useState<string>('KEY');
  const [frequencyText, setFrequencyText] = useState<string>('');

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Cifra de César</h1>
      <input
        type="text"
        value={caesarText}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setCaesarText(e.target.value)}
        placeholder="Digite o texto"
        className={styles.input}
      />
      <input
        type="number"
        value={caesarShift}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setCaesarShift(parseInt(e.target.value))}
        placeholder="Deslocamento"
        className={styles.input}
      />
      <p>Texto Cifrado: {caesarCipher(caesarText, caesarShift)}</p>

      <h1 className={styles.title}>Cifra de Vigenère</h1>
      <input
        type="text"
        value={vigenereText}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setVigenereText(e.target.value)}
        placeholder="Digite o texto"
        className={styles.input}
      />
      <input
        type="text"
        value={vigenereKey}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setVigenereKey(e.target.value)}
        placeholder="Digite a chave"
        className={styles.input}
      />
      <p>Texto Cifrado: {vigenereCipher(vigenereText, vigenereKey)}</p>

      <h1 className={styles.title}>Análise de Frequência</h1>
      <textarea
        value={frequencyText}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setFrequencyText(e.target.value)}
        placeholder="Digite o texto para análise"
        className={`${styles.input} ${styles.textarea}`}
      />
      <pre className={styles.pre}>{JSON.stringify(frequencyAnalysis(frequencyText), null, 2)}</pre>
    </main>
  );
};

export default Home;
