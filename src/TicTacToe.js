// Importul React și al stilurilor CSS
import React, { useState } from 'react';
import './TicTacToe.css';

const TicTacToe = () => {
    // Inițializarea stărilor: rândul curent, starea celulelor, câștigătorul și scorul
    const [turn, setTurn] = useState('x'); // X sau O, începe cu X
    const [cells, setCells] = useState(Array(9).fill('')); // Array pentru celulele jocului, inițial gol
    const [winner, setWinner] = useState(); // Câștigătorul jocului, nedefinit
    const [score, setScore] = useState({ x: 0, o: 0 }); // Scorul pentru fiecare jucător

    // Funcție pentru verificarea câștigătorului
    const checkForWinner = (squares) => {
        // Combinațiile posibile pentru a câștiga jocul
        const winningCombinations = {
            across: [[0, 1, 2], [3, 4, 5], [6, 7, 8]],
            down: [[0, 3, 6], [1, 4, 7], [2, 5, 8]],
            diagonal: [[0, 4, 8], [2, 4, 6]],
        };

        // Verifică fiecare combinație pentru un câștigător
        for (let combo in winningCombinations) {
            winningCombinations[combo].forEach((pattern) => {
                if (
                    squares[pattern[0]] !== '' &&
                    squares[pattern[0]] === squares[pattern[1]] &&
                    squares[pattern[1]] === squares[pattern[2]]
                ) {
                    setWinner(squares[pattern[0]]); // Setează câștigătorul
                    updateScore(squares[pattern[0]]); // Actualizează scorul
                }
            });
        }

        // Verifică dacă este egalitate
        if (!squares.includes('') && !winner) {
            setWinner('Egalitate');
        }
    }

    // Funcție pentru actualizarea scorului
    const updateScore = (winner) => {
        setScore((prevScore) => ({
            ...prevScore,
            [winner]: prevScore[winner] + 1
        }));
    };

    // Funcție pentru gestionarea clicului pe o celulă
    const handleClick = (num) => {
        if (cells[num] !== '' || winner) {
            alert('Aceasta celulă este deja ocupată sau jocul s-a terminat!');
            return;
        }

        let squares = [...cells];
        squares[num] = turn; // Setează celula cu simbolul curent
        setTurn(turn === 'x' ? 'o' : 'x'); // Schimbă rândul
        checkForWinner(squares); // Verifică dacă există un câștigător
        setCells(squares); // Actualizează starea celulelor
    };

    // Funcție pentru a începe un nou joc
    const handleRestart = () => {
        setWinner(null);
        setCells(Array(9).fill(''));
    }

    // Componenta pentru o celulă individuală
    const Cell = ({ num }) => {
        return <td onClick={() => handleClick(num)}>{cells[num]}</td>
    };

    // Renderarea componentei
    return (
        <div className='container'>
            <div className="score-board">
                Scor: X - {score.x} | O - {score.o} 
            </div>
            <table>
            
                Turn: {turn} 
                <tbody>
                    <tr><Cell num={0} /><Cell num={1} /><Cell num={2} /></tr>
                    <tr><Cell num={3} /><Cell num={4} /><Cell num={5} /></tr>
                    <tr><Cell num={6} /><Cell num={7} /><Cell num={8} /></tr>
                </tbody>
            </table>
            {winner && (
                // Afișează mesajul de victorie și butonul de restart
                <div className="winner-message">
                    {winner === 'Egalitate' ? 'Egalitate!' : `Felicitări! ${winner.toUpperCase()} a câștigat!`}
                    <button onClick={handleRestart} className="restart-button">Joacă din nou</button>
                </div>
            )}
        </div>
    );
}

export default TicTacToe;
