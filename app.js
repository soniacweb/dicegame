/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. 
  After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/



//create variable to keep track of everything

let scores, roundScore, activePlayer, gamePlaying

gameInit()
//Dice- i need to calculate a random number 


//dom manipulation because of type coercion, JS converts current-0 or current-1 depending 
//on the value of activePlayer
// document.querySelector('#current-' + activePlayer).textContent = dice
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'
//i can also use querySelector to read by storing it in a variable

var x = document.querySelector('#score-0').textContent
// console.log(x)

//changing css using style method
document.querySelector('.dice').style.display = 'none'



//Event and event handling 

document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {
    //1. first i need a random number 
    const dice = Math.floor(Math.random() * 6) + 1

    //2. display results 
    const diceImgs = document.querySelector('.dice')
    diceImgs.style.display = 'block'
    //changing the image 
    diceImgs.src = './Images/dice-' + dice + '.png'

    //3. update round score IF the rolled number wasnt a 1 - game logic according to what the user rolls
    if (dice !== 1) {
    //add and update score
      roundScore += dice
      //display the roundscore
      document.querySelector('#current-' + activePlayer).textContent = roundScore
    } else {
      nextPlayer()
    }
  }
})


//store saved points

document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {
    //add current score to global score
    scores[activePlayer] += roundScore
    //update ui
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]
  
    //check if player won the game - make a new screen with box congratulating winning player? and play again button
    if (scores[activePlayer] >= 100) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!'
      document.querySelector('.dice').style.display = 'none'
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
      gamePlaying = false

      // document.querySelector('#name-' + activePlayer).textContent = activePlayer
      // window.setTimeout(winningPage, 4000)
    } else {
    //next player 
      nextPlayer()
    }

  }

})

//win page
// function winningPage() {
//   document.querySelector('.player-name').style.display = 'none'
//   document.querySelector('.player-score').style.display = 'none'
//   document.querySelector('.player-current-label').style.display = 'none'
//   document.querySelector('.player-current-box').style.display = 'none'
//   document.querySelector('.player-current-score').style.display = 'none'
//   document.querySelector('.btn-roll').style.display = 'none'
//   document.querySelector('.btn-hold').style.display = 'none'

//   document.querySelector('.btn-new').style.display = 'block'
//   const h = document.createElement('H1')
//   const t = document.createTextNode('Congratulations ' + document.querySelector('#name-' + activePlayer).textContent + ' you won!') 
//   h.appendChild(t) 
//   document.body.appendChild(h)
// } 

// next player function 
function nextPlayer() {
//next player turn
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
  //reset the score for new player
  roundScore = 0
  document.getElementById('current-0').textContent = '0'
  document.getElementById('current-1').textContent = '0'

  //showing the active player by adding and removing the 'active' class

  // if (activePlayer === 1) {
  //   document.querySelector('.player-0-panel').classList.remove('active') 
  //   document.querySelector('.player-1-panel').classList.add('active')
  // } else {
  //   document.querySelector('.player-0-panel').classList.add('active') 
  //   document.querySelector('.player-1-panel').classList.remove('active')
  // }

  //easier way to write the above by toggling!!
  document.querySelector('.player-0-panel').classList.toggle('active') 
  document.querySelector('.player-1-panel').classList.toggle('active')

  //hide the central dice for new player screen
  document.querySelector('.dice').style.display = 'none'

}

document.querySelector('.btn-new').addEventListener('click', gameInit)

function gameInit() {
  scores = [0,0]
  roundScore = 0
  activePlayer = 0
  gamePlaying = true
  //resetting scores to 0
  document.querySelector('.dice').style.display = 'none'
  document.getElementById('score-0').textContent = 0
  document.getElementById('score-1').textContent = 0
  document.getElementById('current-0').textContent = 0
  document.getElementById('current-1').textContent = 0
  document.getElementById('name-0').textContent = 'Player 1'
  document.getElementById('name-1').textContent = 'Player 2'
  document.querySelector('.player-0-panel').classList.remove('winner')
  document.querySelector('.player-1-panel').classList.remove('winner')
  document.querySelector('.player-0-panel').classList.remove('active')
  document.querySelector('.player-1-panel').classList.remove('active')
  document.querySelector('.player-0-panel').classList.add('active')

}

