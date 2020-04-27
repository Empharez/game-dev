import { Cell } from "./cell.js";

export class Grid {
    constructor(numRow, numCol) {
        this.numRow = numRow;
        this.numCol = numCol;

    };
    draw() {
        const container = $("#container");
        let cells = [];

        for (let row = 0; row < this.numRow; row++) {
            for (let col = 0; col < this.numCol; col++) {
                let cellDiv = $(`<div class="grid"></div>`);
                container.append(cellDiv);


                cellDiv.width(100 / this.numRow + "%");
                cellDiv.height(100 / this.numCol + "%");

                let newCell = new Cell(col, row, cellDiv);
                cells.push(newCell)
            };
        };

        this.cells = cells;
        return container;
    };

    elementsInBoard() {
        let board = this.cells.slice();
        return board;
    };

    getCells(numOfCells) {
        let boardCopy = this.elementsInBoard();
        let newBoard = [];

        for (let i = 0; i < numOfCells; i++) {
            let seed = Math.floor(Math.random() * boardCopy.length);
            newBoard.push(boardCopy[seed]);
            boardCopy.splice(seed, 1);
        };
        // console.log(boardCopy.length)
        // console.log(this.elementsInBoard().length)
        
        return newBoard;
    };

    placeImg(players, weapons, wallNum) {
        let cellPicked = this.getCells(players.length + weapons.length + wallNum);

        cellPicked[0].player = players[0];
        cellPicked[0].htmlElement.addClass(players[0].name);

        let playerOneCell = cellPicked[0];

        cellPicked.splice(0, 1);

        for (let i = 0; i < cellPicked.length; i++) {
            if (!playerOneCell.isAdjacent(cellPicked[i])) {
                cellPicked[i].player = players[1];
                cellPicked[i].htmlElement.addClass(players[1].name);

                cellPicked.splice(i, 1);
                break;

            };
        };

        for (let j = 0; j < cellPicked.length; j++) {
            cellPicked[j].htmlElement.addClass(weapons[j].name);
            cellPicked[j].weapon = weapons[j];
            cellPicked.splice(j, 1);
        }

        for (let w = 0; w < wallNum; w++) {
            cellPicked[w].htmlElement.addClass("wall");
            cellPicked[w].wall = true;
        }
    };


    exist(){
        let allCells = this.elementsInBoard();
        let allCellCord= [];
        for (let i in allCells){
            console.log(allCells[i])
            let me = allCells[i].x
            let you = allCells[i].y;
            console.log("all xy---", me, you);
            // allCellCord.push(me,you)
            
        }
        
        
    }

    showAvailableCells(cell) {
        let totalNumCells = this.elementsInBoard();
        let cellPlayerPresent = [];
        totalNumCells.some(cell => {
            if(cell.player != null){
                cellPlayerPresent.push(cell);
            };
        });
        console.log(cellPlayerPresent);
      
        let xValue = cellPlayerPresent[0].x;
        let yValue = cellPlayerPresent[0].y + 1;

        // const rightDirectionOne = xValue + 1;
        // const rightDirectionTwo = xValue + 2;
        // const rightDirectionThree = xValue + 3;

        // const bottomDirectionOne = yValue;
        // const bottomDirectionTwo = yValue + 1;
        // const bottomDirectionThree = yValue + 2;

        let rx = xValue;
		let by = yValue;
		const right = 5 - rx;
		const down = 5 - by;
		const rightDirection = [];
		const bottomDirection = [];

		if (right < 3) {
			for (let i = 0; i < right; i++) {
				rightDirection.push(rx);
				rx++;
			}
		} else if (right >= 3) {
			for (let i = 0; i < 3; i++) {
				rightDirection.push(rx);
				rx++;
			}
		}

		if (down < 3) {
			for (let i = 0; i < right; i++) {
				bottomDirection.push(by);
				by++;
			}
		} else if (down >= 3) {
			for (let i = 0; i < 3; i++) {
				bottomDirection.push(by);
				by++;
			}
		}

		// const firstCellDirRight = [
		// 	{xValue, rightDirectionOne},
		// 	{xValue, rightDirectionTwo},
		// 	{xValue, rightDirectionThree}
		// ];
		const firstCellDirRight = [];
		const secCellDirRight = [];

		rightDirection.map(rd => {
			firstCellDirRight.push({xValue, rd});
		});
		// const secCellDirRight = [
		// 	{bottomDirectionOne, xValue},
		// 	{bottomDirectionTwo, xValue},
		// 	{bottomDirectionThree, xValue}
		// ];

		bottomDirection.map(bd => {
			secCellDirRight.push({bd, xValue});
        });
        
        console.log('right direction', firstCellDirRight);
		console.log('bottom direction --', secCellDirRight);

        // const firstCellDirRight = [{ xValue, rightDirectionOne }, { xValue, rightDirectionTwo }, { xValue, rightDirectionThree }];
        // const secCellDirRight = [{ bottomDirectionOne , xValue}, {bottomDirectionTwo, xValue }, {bottomDirectionThree, xValue}]

        // console.log("right direction", firstCellDirRight);
        // console.log("bottom direction --", secCellDirRight);

       
    };

};
