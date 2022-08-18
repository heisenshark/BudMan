import {Component, OnInit} from '@angular/core';
import {SquareComponent} from "../square/square.component";

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss']
})

export class BoardComponent implements OnInit {
    i: any;
    squares: any[] = ['','','','','','','','','']
    turn: 'X' | 'O' = 'X'
    won:boolean = false
    draw:boolean =false
    linescheck: number[][] =[
        [1,2,3],
        [4,5,6],
        [7,8,9],
        [1,4,7],
        [2,5,8],
        [3,6,9],
        [1,5,9],
        [7,5,3]
    ]
    constructor() {}
    checkWin() {
        this.linescheck.map(n=>n.map(n=>n-1)).forEach(
            n=>{
                let resultstring = ''
                n.forEach(b=>resultstring+=this.squares[b])
                if(resultstring=='XXX'||resultstring=='OOO')
                {
                    this.won = true
                }
            }
        )
        if(this.won) return
        if(this.squares.find(n=>n=="")==null)
            this.draw = true

    }

    ngOnInit(): void {
    }

    public printArr() {
        console.log(this.squares)
    }

    clog(index:number) {
        let negateVal = (n:'X'|'O')=>{
            return n=="X"?'O':"X"
        }
        if(this.squares[index]!=''||this.won)return
        this.squares[index] = this.turn
        this.checkWin()
        if(!this.won)
            this.turn = negateVal(this.turn)
        console.log([this.turn,this.won,this.turn])
    }

    resetBoard() {
        this.squares= ['','','','','','','','','']
        this.won=false
        this.draw =false
        this.turn = Math.random()>0.5?'X':'O'
    }
}
