import React, {useState, useEffect, useRef} from 'react';
import styles from './Chessboard.module.css';
import { BackTracking } from "../algorithms/BackTracking";
import { IsValid } from "./NQueensConstraints";
import { SolvePolynomialTime } from './NQueensPolynomial';
import { clear } from 'console';

class Cell extends React.Component<any, any>{

  constructor(props : any) {
    super(props);
    this.state = {
      index: 0,
      color: 'white', // Cell color
      queen : false, // If queen above or not
      selected : false,
      handleClick : () => {},
    }; 
  }

  selectColor(color : string) : string{
    if(color === 'white'){
      return styles.whitecell;
    }
    return styles.blackcell;  
  }

  onCellClick(){
    if(this.props.queen){
      this.props.handleClick();
    }
  }

  render() {
    const queen = require('./queen.png');
    return (
      
        <div className={ [ styles.cell , this.selectColor(this.props.color)].join(" ") }> 
          <button 
          className={ [styles.cellButton , this.props.selected  ? styles.selectedLayer : '' ].join(" ") } 
          onClick={ () => this.onCellClick() }>
            {
              this.props.queen ? <img className={styles.queen} src={queen} /> : <div/>
            }

          </button>

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
      hover_cells : new Array(this.props.n_queens*this.props.n_queens).fill(false), 
       // for refs cells
    };
  }
  
  handleClick(cell_index : number){
    let board_size : number = this.props.n_queens;
    
    let y : number = Math.floor( (cell_index)/ (board_size  ) ) ; 
    let x : number = cell_index%board_size;

    let new_cells = new Array(board_size*board_size).fill(false);
    // Fill row (x)
    for(let i :number = 0; i < board_size; i++){
      new_cells[board_size*y + i] = true;
    }
    // Fill column (y)
    for(let i :number= 0; i < board_size; i++){
      new_cells[board_size*i + x] = true;
    }


    // For (\) diagonals
    if(x <= y){
      let base_y = y - x; // Initial y
      for(let i :number = 0; i < (board_size - base_y); i++){
        
       new_cells[ (base_y*board_size) + (board_size + 1)*i  ] = true;
      }
    }
    else{
      let base_x = x - y; // Initial y
      for(let i :number = 0; i < (board_size - base_x); i++){
        
        new_cells[ (base_x) + (board_size + 1)*i  ] = true;
      }
    }

    // For (/) diagonals
    if(x + y < board_size){
      let base_x = x + y; // Initial y
      for(let i :number = 0; i < (base_x + 1); i++){
        
        new_cells[ board_size*(i) + (base_x - i)  ] = true;
      }
    }
    else{
      let base_x =  x + (board_size - 1 - x); // Initial y
      let base_y = y - (board_size - 1 - x)
      for(let i :number = 0; i < (board_size - base_y); i++){
        new_cells[ board_size*(base_y + i) + (base_x - i)  ] = true;
      }
    }

    this.setState({hover_cells: new_cells});
  }

  
  renderCell(index : number, color : string, has_queen : boolean){
    return(
      <Cell 
      index={index} 
      color={color} 
      queen={has_queen} 
      selected={ this.state.hover_cells[index] }



      handleClick = {() => this.handleClick(index) }
      />
    );
  }


  clearSelections(){
    const clear_cells = new Array(this.props.n_queens*this.props.n_queens).fill(false);
    this.setState({hover_cells : clear_cells});
  }


  createBoard(){
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

          let new_cell = this.renderCell(this.props.n_queens*i + j,'black', has_queen);
          temp.push( new_cell );
        }
        else { // White cell
          let new_cell = this.renderCell(this.props.n_queens*i + j, 'white', has_queen);
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







const Chessboard = () => {
  const [dimension, setDimension] = useState(0);
  const [solution, setSolution] = useState<number[]>([]);
  const refContainer = useRef<Board>(null);

  const relative_size = {
    gridTemplateColumns: "repeat( " + dimension + ", " + 400/dimension + "px)",
    
  }

  


  const checkInput = (value : string) => {
    //Board.resetBoard();
    if(refContainer.current != null)
      refContainer.current.clearSelections();

    setSolution([])
    let new_value = parseInt(value);
    if(new_value < 90){
      setDimension(new_value);
    }
  }

  const computeSolution = ( n : number, method : string) => {
    let new_solution : number[] = [];
    if (method == "backtracking"){
      new_solution = SolveBacktracking(n);
    }
    else if( method == "qs1"){
      new_solution = SolveQS1(n);
    }
    setSolution(new_solution);

  }


  function SolveBacktracking(n_queens : number) : number[] {
    let solver = new BackTracking(
        Array.from(Array(n_queens).keys()),
        IsValid,
        n_queens
    );
    
    let solution = solver.solve();
    console.log("La solucion es: ", solution);
    return solution;
  }

  function SolveQS1(n_queens : number) : number[]{
      let solver = new SolvePolynomialTime();
      let solution = solver.trySolve(n_queens, Array.from(Array(n_queens).keys())  );
      console.log("La solucion es: ", solution);
      return solution;
    }


  return ( 
    
    <div>
      <div className={styles.center}>
        <h2>
          <span>N x N </span> 
          ChessBoard
        </h2>
        <input type="number" placeholder='Enter the Dimension' onChange={ (e)=>checkInput(e.target.value) } />
      </div>
      
      <div className={styles.board} style={ relative_size } >

        <Board ref={refContainer} n_queens={dimension} queens={ solution }  />
      </div>

    <div className={styles.center}>
      <button className={styles.button} onClick={ () => computeSolution(dimension,"backtracking" ) } > Solve with Backtracking </button>
      <button className={styles.button} onClick={ () => computeSolution(dimension, "qs1") } > Solve with QS1 </button>
      </div>
    </div>
  )
}


export default Chessboard