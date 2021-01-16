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
    constructor(props){
      super(props)
      //aqui ponemos el estado inicial del board con un arreglo de nueve nulls, que son los nueve cuadraditos
      this.state={
        //functional JS
        squares: Array(9).fill(null),
      };
    }
    handleClick(i){
      const squares = this.state.squares.slice();
      squares[i] = 'X';
      this.setState({squares: squares});
    }
    renderSquare(i) {
      //the parentheses after 'return' are better to be added for avoiding JS to insert a semicolon after 'return' thus breaking the code.
      return (
      <Square 
      value={this.state.squares[i]} 
      onClick={() => this.handleClick(i)}
      />
        );
    }
  
    render() {
      const status = 'Next player: X';
  
      return (
        <div>
          <div className="status">{status}</div>
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
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  