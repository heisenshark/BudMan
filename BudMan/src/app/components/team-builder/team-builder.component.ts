import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-team-builder',
  templateUrl: './team-builder.component.html',
  styleUrls: ['./team-builder.component.scss']
})
export class TeamBuilderComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  newMemberName: string = ""
  members: string[] = []
  errorMessage: string = ""

  outputTeams: string[][] = [];
  teamsNumber: number | "" = "";
  eqR: any = false;

  addMember() {
    if (!this.newMemberName) {
      this.errorMessage = "Name cannot be empty"
      return;
    }
    this.members.push(this.newMemberName)
    console.log(`added ${this.newMemberName}`)
    this.newMemberName = ""
    this.errorMessage = ""
  }

  onInput(value: string) {
    this.newMemberName = value
  }

  generateTeams() {
    if (this.teamsNumber > this.members.length) {
      this.errorMessage = 'Add more members to generate teams'
      return
    }
    if (this.teamsNumber <= 0 || this.teamsNumber == "") {
      this.errorMessage = 'Select non zero positive number for team count'
      return
    }

    this.outputTeams = [];
    let arrcopy = [...this.members]
    this.fisherYatesShuffle(arrcopy)
    let i = 0
    let chunkSize = 0
    if (this.eqR) {
      chunkSize = Math.floor(arrcopy.length / this.teamsNumber)

      let leftout = this.members.length - chunkSize * this.teamsNumber + chunkSize
      if (leftout != chunkSize) {
        console.log(`dupa`)
        this.outputTeams.push(arrcopy.slice(0, leftout))
        i = leftout;
      }
    } else {
      chunkSize = Math.ceil(arrcopy.length / this.teamsNumber)

    }
    for (; i < arrcopy.length; i += chunkSize) {
      let xd = arrcopy.slice(i, i + chunkSize)
      this.outputTeams.push(xd)
    }
    console.log(this.outputTeams)
  }

  fisherYatesShuffle(arr: string[]) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)); //random index
      [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
    }
  }

  onNumberInput(value: string) {
    this.teamsNumber = Number(value)
  }


}
