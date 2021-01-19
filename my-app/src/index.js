import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
function Square(props){
      return (
        <button 
        className="square" 
        onClick={props.onClick}>
          {props.value}
        </button>
      );
  }
  
  class Board extends React.Component {
    renderSquare(i) {
      //the parentheses after 'return' are better to be added for avoiding JS to insert a semicolon after 'return' thus breaking the code.
        return (
        <Square 
        value={this.props.squares[i]} 
        onClick={() => this.props.onClick(i)}
        />
          );
    }
  
    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
        }],
        xIsNext: true,
        stepNumber: 0,
      }
    }
    handleClick(i){
      // aqui nos aseguramos que vamos a guardar los cambios que se hagan de ahora en adelante
      // y es +1 porque en el metodo 'slice', el limite superior no se incluye
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length-1];
      // se hace una copia de los cuadros que tenemos hasta el momento
      const squares = current.squares.slice();
      // esto quiere decir que, si ya hay un ganador, o si ese cuadrito ya esta ocupado, entonces no hace nada, por eso el return;
      // de resto todo sigue igual.
      if(calculateWinner(squares) || squares[i]) { 
        return;
      }
      //si xIsNext es verdadero, pues pongo 'X', si no, pongo 'O'
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        // Lo que hacen aqui es como hacerle un .push() al arreglo de history (pero ojo, que este arreglo history es el que tenemos aqui, local, dentro de este metodo 'handleClick()')
        // solo que no se afecta al arreglo que hay local sino que se hace una copia, muy similar al proceso de usar el '.slice()'
        history: history.concat([{
          squares: squares,
        }]),
        // como en el paso 'squares[i] = this.state.xIsNext ? 'X' : 'O';' lo que se hizo fue llenar el cuadrito correspondiente, entonces ahora cambiamos de jugador, es el turno de 'la otra persona', por decirlo asi.
        xIsNext: !this.state.xIsNext,
        // bueno, aqui me surge una duda, este history, es el local, o el de toda la clase Game?
        stepNumber: history.length,
      });
    }
    jumpTo(step){
      this.setState({
        stepNumber: step,
        // okokok, brillante! como 'X' empieza en cero, esta ocupara los numeros pares: 0, 2, 4, 6 etc...
        // por lo que si el step es par, entonces le toca a la 'X', sino entonces el resultado de la comparacion sera false y le tocara a la 'O'
        xIsNext: (step % 2) === 0,
      });
    }
    render() {
      const history = this.state.history;
      // ya no renderizamos el ultimo movimiento sino el movimiento que se haya escogido
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
      const moves = history.map((step, move) => {
        const desc = move ?
        'Go to move #' + move :
        'Go to game start';
        return(
          <li key={move}>
            <button onClick={()=> this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });
      let status;
      if (winner){ 
        status = 'Winner is: ' + winner;
      }else{ 
         status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }  
      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares={current.squares}
              onClick={(i)=>this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  function calculateWinner(squares) {
    // por que no lleva un conteo normal? mas bien, cual es la razon de ser de este conteo?
    // aaaaa ya entendí!! son todas las posibles lineas de victoria! es decir, si estas lineas se llenan todas de 'X' o de 'O', dependiendo de eso se declara el ganador
   // es decir el primer arreglo de lineas es la primera linea de izquierda a derecha y asi horizontal, vertical y diagonalmente.
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for(let i = 0; i < lines.length; i++) {
      //no sabia que esto se podia hacer
      // es decir aqui hacen como una copia de la linea que se este evaluando.
      // por ejemplo, si esta linea es la primera, [a, b, c] seria: [0, 1, 2]
      const [a, b, c] = lines[i];
      console.log('hello!');

      // pero no entiendo este pedazo...
      // ya ya: el primer squares[a] es para determinar que de hecho haya algo en la primera posicion, sea una 'X' o una 'O', porque si no hay pues, para que seguir revisando.
      // luego de verificar que haya algo en la primera posicion, empieza a comparar. 
      // volviendo a tomar como ejemplo la primera linea ([0, 1, 2]), lo que esta haciendo es comparar si 
      // lo que hay en el primer cuadro es lo mismo en los otros dos siguientes
      // este proceso verifica que lo que haya en dicha linea (sea vertical, horizontal o diagonal) sea lo mismo
      // porque si se trata del mismo elemento, quiere decir que hayamos un ganador!
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){ 
        return squares[a];
      }
    }
    return null;
  }
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );


  