import React from 'react';
import { useState } from 'react';

//** componente Square */
function Square({ value, onSquareClick }) {
  return (
    <button className='square' onClick={onSquareClick}>{value}</button>
  );
}

//** componente Board */
export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {

    if (squares[i] || calculateWinner(squares)) {
      return; //si el cuadrado ya tiene un valor, no hace nada
    }

    const nextSquares = squares.slice();
    xIsNext ? nextSquares[i] = 'X' : nextSquares[i] = 'O'; // if condicional
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares); //almacena el ganador
  let status;

  if (winner) {
    status = "Ganador: " + winner;
  } else {
    status = "Siguiente jugador: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
    <div classNNNNAme="status">{status}</div> 
      <div className='board-row'>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function calculateWinner(squares) { //calcula el ganador
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) { 
    const [a, b, c] = lines[i]; // En cada iteración, se desestructuran los índices a, b y c del arreglo actual de lines[i]. a = 0, b = 1, c = 2
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) { // si todos los cuadrados tienen el mismo valor
      return squares[a];
    }
  }
  return null;
}


/*Recapitulemos lo que sucede cuando un usuario hace clic en el cuadrado superior izquierdo de su tablero para agregarle una X:

Al hacer clic en el cuadrado superior izquierdo, se ejecuta la función que el button recibe como prop onClick del Square. El componente Square recibe esa función como una prop onSquareClick del Board. El componente Board define esa función directamente en el JSX. Llama a handleClick con un argumento de 0.
handleClick usa el argumento (0) para actualizar el primer elemento de la matriz squares de null a X.
El estado squares del componente Board se actualiza, por lo que Board y todos sus elementos secundarios se vuelven a renderizar. Esto hace que la prop value del componente Square con el índice 0 cambie de null a X.
Al final, el usuario ve que el cuadrado superior izquierdo ha pasado de estar vacío a tener una X después de hacer clic en él. */