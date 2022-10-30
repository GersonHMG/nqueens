export class BackTracking {

    size : number;
    values: number[];
    safe_up_to: Function;
    solution: number[];

    constructor(values: number[], safe_up_to : Function, size: number){
        this.size = size
        this.values = values 
        this.safe_up_to = safe_up_to 
        this.solution = new Array(size).fill(null) 
    }


    extend_solution(position : number){
        for (var i = 0; i < this.values.length; i++) {
            var value = this.values[i];
            this.solution[position] = value;

            //console.log(this.solution);

            if ( this.safe_up_to(this.solution, position) ){
                if(  (position >= this.size-1) ){
                    return this.solution;
                }

                var result = this.extend_solution(position+1);
                if(( result.length !== 0 )){
                    return this.solution;
                }

            }

        }
        return new Array(0);
    }


    solve() : number[]{
        //return new Array(5).fill(8);
        return this.extend_solution(0);
    }

}

