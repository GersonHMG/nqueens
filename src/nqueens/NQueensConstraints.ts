// N Queens problem constraints


function NotInSameColumn(variables: number[], i : number){
    for (let j = 0; j < i; j++) {
        if(variables[i] === variables[j]){
            return false;
        }
    
    }
    return true;
}


function NotInSameSEDiagonal(variables: number[], i: number){
    for (var j = 0; j < i; j++) {
        if( (variables[i] ) === (i-j + variables[j]) ) {
            return false;
        }
    
    }
    return true;
}


function NotInSameSWDiagonal(variables: number[], i: number){
    for (var j = 0; j < i; j++) {
        if( (variables[i] ) === (variables[j] - i + j )) {
            return false;
        }
    
    }
    return true;
}


export function IsValid(solution: number[], pos: number){
    
    var c1 = NotInSameColumn(solution, pos);
    var c2 = NotInSameSEDiagonal(solution, pos);
    var c3 = NotInSameSWDiagonal(solution, pos);
    if(c1 && c2 && c3){
        return true;
    } 
    return false;
}


