import React, {useState, useEffect} from 'react';
import styles from './Chessboard.module.css';
import { BackTracking } from "../algorithms/BackTracking";
import { IsValid } from "./NQueensConstraints";

class Cell extends React.Component<any, any>{

  constructor(props : any) {
    super(props);
    this.state = {
      color: 'white', // Cell color
      queen : false, // If queen above or not
    };
  }

  render() {
    const queen = require('./queen.png');
    return (
      <div className={ [styles.cell , this.props.color === 'white' ? styles.whitecell : styles.blackcell ].join(" ") }> 
        {
          this.props.queen ? <img className={styles.queen} src={queen} /> : <div/>
        }
      </div>

    );
  }
}



class Board extends React.Component<any, any>{
  
  constructor(props : any) {
    super(props);
    this.state = {
      n_queens: 0, // number of queens == dimension (n*n)
      queens: Array(10).fill(1), // each pos is a row, each value in a row is a col
      
       // for refs cells
    };
  }
  
  
  renderCell(color : string, has_queen : boolean){
    return(
      <Cell color={color} queen={has_queen}/>
    );
  }



  createBoard(){
    //this.props.queens = Array(this.props.n_queens).fill(null);
    //this.props.cells = Array(this.props.n_queens*this.props.n_queens).fill(null);



    let root = document.documentElement;
    root.style.setProperty('--dimension', this.props.n_queens);
    let arr = [];
    
    for (let i=0;i< this.props.n_queens; i++){
      let temp = [];
      for (let j=0;j< this.props.n_queens;j++){
        let has_queen = false;
        if( this.props.queens[i] === j ){
          has_queen = true;
        }
        if ((i+j)%2){// Black cell

          let new_cell = this.renderCell('black', has_queen);
          temp.push( new_cell );
        }
        else { // White cell
          let new_cell = this.renderCell('white', has_queen);
          temp.push( new_cell );

        }
      }
      arr.push(temp);
    }




    return arr;
  }

  render(){
    return this.createBoard();
  }



}

function Solve(n_queens : number) : number[] {
  let solver = new BackTracking(
      Array.from(Array(n_queens).keys()),
      IsValid,
      n_queens
  );
  let solution = solver.solve();
  console.log("La solucion es: ", solution);
  return solution;
}





const Chessboard = () => {
  const [dimension, setDimension] = useState(0);
  const [solution, setSolution] = useState<number[]>([]);

  const relative_size = {
    gridTemplateColumns: "repeat( " + dimension + ", " + 400/dimension + "px)",
    
  }

  const checkInput = (value : string) => {
    setSolution([])
    let new_value = parseInt(value);
    if(new_value < 90){
      setDimension(new_value);
    }
  }

  const computeSolution = ( n : number) => {
    let new_solution : number[] = Solve(n);
    setSolution(new_solution);

  }


  return ( 
    
    <div>
      <div>
        <h2>
          <span>N x N </span> 
          ChessBoard
        </h2>
        <input type="number" placeholder='Enter the Dimension' onChange={ (e)=>checkInput(e.target.value) } />
      </div>
      
      <div className={styles.board} style={ relative_size } >

        <Board n_queens={dimension} queens={ solution } />
      </div>

      <button onClick={ () => computeSolution(dimension) } > Solve </button>

    </div>
  )
}

export default Chessboard