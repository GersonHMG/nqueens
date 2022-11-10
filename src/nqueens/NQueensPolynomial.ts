export class SolvePolynomialTime{




    createPermutation(array : number[]) : number[]{
        var s : number[] = array.sort((a,b) => 0.5 - Math.random() );  
        return s;
    }


    GetDiagonal(queens : number[]) : [number[],number[]]{
        let n : number = queens.length;
        let d_size : number = 2*n - 1;
        let d1 : number[] = (new Array<number>( d_size )).fill(0); // Positive slopes
        let d2 : number[] = (new Array<number>( d_size )).fill(0); // Negative slopes


        for(let i = 0; i < queens.length; i++){
            d1[ i - queens[i]  + (n - 1) ] += 1
            d2[ i +  queens[i] ] += 1;
        }


        return [d1 , d2];
    }

    GetDiagonalCollisions(d : number[]) : number{
        let n_collisions : number = 0;
        for(let i = 0; i < d.length; i++){
            if( d[i] > 1){
                n_collisions += d[i] - 1;
            }
        }
        return n_collisions;
    }
    
    // Check if a queen is attacked in the diaagonals
    IsAttacked(positive_d : number[] , negative_d : number[], q_pos : number[]) : boolean{
        let n : number = (positive_d.length + 1)/2;
        
        let d1_index : number = q_pos[0] - q_pos[1]  + (n - 1);
        let d2_index : number = q_pos[0] + q_pos[1];
        if( ( positive_d[d1_index] > 1) || (negative_d[d2_index] > 1)){
            return true;
        }

        return false;
    }

    swap(array : number[] , y : number, x: number){
        
        var temp = array[y];
        array[y] = array[x];
        array[x] = temp;
        return array;
    }

    searchSolution(queens : number[], max_i : number) : number[]{
        let sol : boolean = false;
        let n : number = queens.length;
        let [d1, d2] = this.GetDiagonal(queens);
        let iterations = 0;
        while( !sol ){
            iterations += 1;
            for (let i = 0; i < n; i++) {
                for(let j = i + 1; j < n; j++){
                    let before_swap_collisions = this.GetDiagonalCollisions(d1) + this.GetDiagonalCollisions(d2);
                    if(before_swap_collisions <= 0){
                        sol = true;
                        break;
                    }
                    if ( ( this.IsAttacked(d1, d2, [i, queens[i]] )  )|| ( this.IsAttacked(d1, d2, [j, queens[j]] ) )   ) {
                        let swap_queens = this.swap(queens.slice(0), i, j);
                        let [d1_1, d2_2] = this.GetDiagonal(swap_queens);
                        let after_swap_collisions = this.GetDiagonalCollisions(d1_1) + this.GetDiagonalCollisions(d2_2);
                        // If swap reduce the collisions then swap
                        if(after_swap_collisions < before_swap_collisions){
                            d1 = d1_1.slice(0);
                            d2 = d2_2.slice(0);
                            queens = swap_queens;
                        }
                    }
                }
            }
            if(iterations > max_i){
                return [];
            }

        }
        return queens;
    }



    trySolve(n : number, queens : number[] ) : number[]{
        
        let sol = false;
        let current_p : number = 0;
        while( !sol ){
            
            queens = this.createPermutation(queens);
            let current_sol : number[] = this.searchSolution(queens, 20);
            
            current_p += 1;
            if(current_sol.length > 0){
                queens = current_sol;
                sol = true;
            }

            if(current_p >= 50){
                break;
            }


        }
        let [d1, d2] = this.GetDiagonal(queens);
        let collisions = this.GetDiagonalCollisions(d1) + this.GetDiagonalCollisions(d2);
        if(collisions > 0){
            console.log(" SOLUTION NOT FOUND!!");
        }
        console.log("Colisiones: ",  this.GetDiagonalCollisions(d1) + this.GetDiagonalCollisions(d2) );
        return queens;
    }






}