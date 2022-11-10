// N Queens problem constraints


function NotInSameColumn(variables: number[], i : number){
    let n_collisions : number = 0
    for (let j = 0; j < i; j++) {
        if(variables[i] === variables[j]){
            n_collisions += 1;
        }
    }
    return n_collisions;
}


function NotInSameSEDiagonal(variables: number[], i: number){
    let n_collisions : number = 0
    for (var j = 0; j < i; j++) {
        if( (variables[i] ) === (i-j + variables[j]) ) {
            n_collisions += 1;
        }
    
    }
    return n_collisions;
}


function NotInSameSWDiagonal(variables: number[], i: number){
    let n_collisions : number = 0
    for (var j = 0; j < i; j++) {
        if( (variables[i] ) === (variables[j] - i + j )) {
            n_collisions += 1;
        }
    
    }

    return n_collisions;

}

export function GetCollisions(queens : number[], queen_i : number){
    var c1 : number = NotInSameColumn(queens, queen_i);
    var c2 : number = NotInSameSEDiagonal(queens, queen_i);
    var c3 : number = NotInSameSWDiagonal(queens, queen_i);
    return c1 + c2 + c3;

}


export function IsValid(solution: number[], pos: number){
    var c1  : number = NotInSameColumn(solution, pos) ;
    var c2  : number= NotInSameSEDiagonal(solution, pos);
    var c3  : number = NotInSameSWDiagonal(solution, pos);
    if(c1 + c2 + c3 <= 0){
        return true;
    } 
    return false;
}


