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
    const getRandomInt = (min: number, max: number) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    if (this.teamsNumber > this.members.length) {
      this.errorMessage = 'Add more members to generate teams'
      return
    }
    if (this.teamsNumber <= 0 || this.teamsNumber == "") {
      this.errorMessage = 'Select non zero positive number for team count'
      return
    }

    this.outputTeams = []
    let arrcopy = [...this.members]

    for (let i = 0; i < this.teamsNumber; i++)
      this.outputTeams.push([])
    let i = 0
    while (i < this.members.length && arrcopy.length > 0 && i < 30) {
      this.outputTeams[i % this.teamsNumber].push(arrcopy.splice(getRandomInt(0, arrcopy.length - 1), 1)[0])
      console.log([arrcopy.length, i])
      ++i
    }

    console.log(this.outputTeams)
  }

  onNumberInput(value: string) {
    this.teamsNumber = Number(value)
  }


}
