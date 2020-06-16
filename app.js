/* ---- DOM References ---- */
var game = document.getElementById("game")
var timer = document.getElementById("visibleTimer")
var health = document.getElementById("health")
var cookies = document.getElementById("cookies")
var image = document.getElementById("grass")
var startButton = document.getElementById("startButton")
var badgerSprite = document.getElementById("badger-sprite")
var lionSprite = document.getElementById("lion-sprite")
var cookieSprite = document.getElementById("cookie-sprite")
var birdSprite = document.getElementById("bird-sprite")


/* --- game logic for timer --- */
const STARTING_TIME = 30
let remainingTime = 0
let gameOver = true

/* --- game logic for tallying cookies and damage --- */
var totalHealth = 3
var collectedCookies = 0
var collisionDetected = false

/* ---- Draw on Canvas here --- */
 let ctx=game.getContext("2d")
 game.width = 800
 game.height = 400
 // offset of canvas
 var offsetX = 0
 var offsetY = 0
 var badgerX = 10
 var badgerY = 200
 var badgerWidth = 20
 var badgerHeight = 20
 var badMsg = "BADGER HURT!"
 var goodMsg = "COOKIE COLLECTED!"

 // all locations of grass in game environment used when function calls to draw them
var grass = [
    [750, 150],[200, 100], [300, 40], [350, 300], [500, 350],[700, 200],[850, 150],[800, 100],[900, 40],[950, 300],[1000, 350],[1050, 150],[1100, 100],[1230, 40],[1230, 200],[1150, 300],[1300, 350],[1450, 330],[1500, 200],[1600, 80],[1675, 220],[1820, 150],[1890, 150],[1800, 380],[1900, 40],[1950, 100],[2000, 200],[2120, 100],[2250, 300],[2300, 250],[2450, 200],[2500,30],[2500, 390],[2530, 100],[2590, 210],[2630, 350],[2700, 10],[2730, 100],[2830, 200],[2900, 390],[2930, 100],[3000, 210],[3030, 350],[3100, 10],[3230, 100],[3280, 200]
]

// i wrapped all the code below so the game is initialized when the start game button is clicked
document.getElementById("startButton").addEventListener("click", function newGame() {


    // generate game background
    function draw() {
        ctx.save()
        ctx.translate(offsetX, offsetY)
        // draw grass onto canvas
        var g = grass.length;
        for (var i = 0; i < g; i++) {
            var x = grass[i][0]
            var y = grass[i][1]
            ctx.drawImage(image, x, y, 40, 40)
            }
        ctx.restore();
    }

    /* -- game objects --- */
    // constructor function
    function Object(image, x, y, width, height) {
        this.image = image
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.alive = true
        this.render = function() {
            ctx.fillStyle = this.color
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        }
    }

    // traits of each object populating game foreground
    let badger = new Object(badgerSprite, 10, 200, 30, 30)
    let lion01 = new Object(lionSprite, 550, 30, 55, 55)
    let lion02 = new Object(lionSprite, 820, 300, 55, 55)
    let lion03 = new Object(lionSprite, 900, 200, 55, 55)
    let lion04 = new Object(lionSprite, 1180, 100, 55, 55)
    let lion05 = new Object(lionSprite, 1230, 250, 55, 55)
    let lion06 = new Object(lionSprite, 1400, 100, 55, 55)
    let lion07 = new Object(lionSprite, 1560, 150, 55, 55)
    let lion08 = new Object(lionSprite, 1650, 350, 55, 55)
    let lion09 = new Object(lionSprite, 1720, 200, 55, 55)
    let lion10 = new Object(lionSprite, 2050, 100, 55, 55)
    let lion11 = new Object(lionSprite, 2000, 285, 55, 55)
    let lion12 = new Object(lionSprite, 2300, 310, 55, 55)
    let cookie01 = new Object(cookieSprite, 775, 45, 15, 15)
    let cookie02 = new Object(cookieSprite, 1275, 345, 15, 15)
    let cookie03 = new Object(cookieSprite, 1775, 145, 15, 15)
    let cookie04 = new Object(cookieSprite, 2475, 345, 15, 15)
    let bird01 = new Object(birdSprite, 900, -230, 25, 25)
    let bird02 = new Object(birdSprite, 1210, -450, 25, 25)
    let bird03 = new Object(birdSprite, 1810, -1200, 25, 25)

    // refresh the screen using interval
    const gameTick = () => {
        // clear the canvas
        ctx.clearRect(0, 0, game.width, game.height)
        if (badger.alive = true) {
            detectHit()
        }
        draw()
        badger.render()
        lion01.render()
        lion02.render()
        lion03.render()
        lion04.render()
        lion05.render()
        lion06.render()
        lion07.render()
        lion08.render()
        lion09.render()
        lion10.render()
        lion11.render()
        lion12.render()
        cookie01.render()
        cookie02.render()
        cookie03.render()
        cookie04.render()
        bird01.render()
        bird02.render()
        bird03.render()
    }

    // feed this into gametick ala canvas crawler
    let gameLoop = setInterval(gameTick, 16)

    // detect hit for each lion & cookie object and adjust tally for health or cookies, ignored DRY to get my collisions working sorry!!
    // refactor when possible using array that actually detects collisions
    const detectHit = () => {
        // AABB collision detection
        if (badger.x + badger.width > lion01.x
            && badger.x < lion01.x + lion01.width
            && badger.y < lion01.y + lion01.height
            && badger.y + badger.height > lion01.y) {
                if(!collisionDetected && totalHealth != 0) {
                    totalHealth--
                    collisionDetected = true
                    health.innerText = "HEALTH: " + totalHealth
                    visibleTimer.innerText = badMsg
                } else if (totalHealth === 0) {
                    badgerFainted()
                    timerEnds()
                }
        } else if (badger.x + badger.width > lion02.x
            && badger.x < lion02.x + lion02.width
            && badger.y < lion02.y + lion02.height
            && badger.y + badger.height > lion02.y) {
                if(!collisionDetected && totalHealth != 0) {
                    totalHealth--
                    collisionDetected = true
                    health.innerText = "HEALTH: " + totalHealth
                    visibleTimer.innerText = badMsg
                } else if (totalHealth === 0) {
                    badgerFainted()
                    timerEnds()
                }
        } else if (badger.x + badger.width > lion03.x
            && badger.x < lion03.x + lion03.width
            && badger.y < lion03.y + lion03.height
            && badger.y + badger.height > lion03.y) {
                if(!collisionDetected && totalHealth != 0) {
                    totalHealth--
                    collisionDetected = true
                    health.innerText = "HEALTH: " + totalHealth
                    visibleTimer.innerText = badMsg
                } else if (totalHealth === 0) {
                    badgerFainted()
                    timerEnds()
                }
        } else if (badger.x + badger.width > lion04.x
            && badger.x < lion04.x + lion04.width
            && badger.y < lion04.y + lion04.height
            && badger.y + badger.height > lion04.y) {
                if(!collisionDetected && totalHealth != 0) {
                    totalHealth--
                    collisionDetected = true
                    health.innerText = "HEALTH: " + totalHealth
                    visibleTimer.innerText = badMsg
                } else if (totalHealth === 0) {
                    badgerFainted()
                    timerEnds()
                }
        } else if (badger.x + badger.width > lion05.x
            && badger.x < lion05.x + lion05.width
            && badger.y < lion05.y + lion05.height
            && badger.y + badger.height > lion05.y) {
                if(!collisionDetected && totalHealth != 0) {
                    totalHealth--
                    collisionDetected = true
                    health.innerText = "HEALTH: " + totalHealth
                    visibleTimer.innerText = badMsg
                } else if (totalHealth === 0) {
                    badgerFainted()
                    timerEnds()
                }
        } else if (badger.x + badger.width > lion06.x
            && badger.x < lion06.x + lion06.width
            && badger.y < lion06.y + lion06.height
            && badger.y + badger.height > lion06.y) {
                if(!collisionDetected && totalHealth != 0) {
                    totalHealth--
                    collisionDetected = true
                    health.innerText = "HEALTH: " + totalHealth
                    visibleTimer.innerText = badMsg
                } else if (totalHealth === 0) {
                    badgerFainted()
                    timerEnds()
                }
        } else if (badger.x + badger.width > lion07.x
            && badger.x < lion07.x + lion07.width
            && badger.y < lion07.y + lion07.height
            && badger.y + badger.height > lion07.y) {
                if(!collisionDetected && totalHealth != 0) {
                    totalHealth--
                    collisionDetected = true
                    health.innerText = "HEALTH: " + totalHealth
                    visibleTimer.innerText = badMsg
                } else if (totalHealth === 0) {
                    badgerFainted()
                    timerEnds()
                }
        } else if (badger.x + badger.width > lion08.x
            && badger.x < lion08.x + lion08.width
            && badger.y < lion08.y + lion08.height
            && badger.y + badger.height > lion08.y) {
                if(!collisionDetected && totalHealth != 0) {
                    totalHealth--
                    collisionDetected = true
                    health.innerText = "HEALTH: " + totalHealth
                    visibleTimer.innerText = badMsg
                } else if (totalHealth === 0) {
                    badgerFainted()
                    timerEnds()
                }
        } else if (badger.x + badger.width > lion09.x
            && badger.x < lion09.x + lion09.width
            && badger.y < lion09.y + lion09.height
            && badger.y + badger.height > lion09.y) {
                if(!collisionDetected && totalHealth != 0) {
                    totalHealth--
                    collisionDetected = true
                    health.innerText = "HEALTH: " + totalHealth
                    visibleTimer.innerText = badMsg
                } else if (totalHealth === 0) {
                    badgerFainted()
                    timerEnds()
                }
        } else if (badger.x + badger.width > lion10.x
            && badger.x < lion10.x + lion10.width
            && badger.y < lion10.y + lion10.height
            && badger.y + badger.height > lion10.y) {
                if(!collisionDetected && totalHealth != 0) {
                    totalHealth--
                    collisionDetected = true
                    health.innerText = "HEALTH: " + totalHealth
                    visibleTimer.innerText = badMsg
                } else if (totalHealth === 0) {
                    badgerFainted()
                    timerEnds()
                }
        } else if (badger.x + badger.width > lion11.x
            && badger.x < lion11.x + lion11.width
            && badger.y < lion11.y + lion11.height
            && badger.y + badger.height > lion11.y) {
                if(!collisionDetected && totalHealth != 0) {
                    totalHealth--
                    collisionDetected = true
                    health.innerText = "HEALTH: " + totalHealth
                    visibleTimer.innerText = badMsg
                } else if (totalHealth === 0) {
                    badgerFainted()
                    timerEnds()
                }
        } else if (badger.x + badger.width > lion12.x
            && badger.x < lion12.x + lion12.width
            && badger.y < lion12.y + lion12.height
            && badger.y + badger.height > lion12.y) {
                if(!collisionDetected && totalHealth != 0) {
                    totalHealth--
                    collisionDetected = true
                    health.innerText = "HEALTH: " + totalHealth
                    visibleTimer.innerText = badMsg
                } else if (totalHealth === 0) {
                    badgerFainted()
                    timerEnds()
                }
        }  else if (badger.x + badger.width > bird01.x
            && badger.x < bird01.x + bird01.width
            && badger.y < bird01.y + bird01.height
            && badger.y + badger.height > bird01.y) {
                if(!collisionDetected && totalHealth != 0) {
                    totalHealth--
                    collisionDetected = true
                    health.innerText = "HEALTH: " + totalHealth
                    visibleTimer.innerText = badMsg
                } else if (totalHealth === 0) {
                    badgerFainted()
                    timerEnds()
                }
        }  else if (badger.x + badger.width > bird02.x
            && badger.x < bird02.x + bird02.width
            && badger.y < bird02.y + bird02.height
            && badger.y + badger.height > bird02.y) {
                if(!collisionDetected && totalHealth != 0) {
                    totalHealth--
                    collisionDetected = true
                    health.innerText = "HEALTH: " + totalHealth
                    visibleTimer.innerText = badMsg
                } else if (totalHealth === 0) {
                    badgerFainted()
                    timerEnds()
                }
        }  else if (badger.x + badger.width > bird03.x
            && badger.x < bird03.x + bird03.width
            && badger.y < bird03.y + bird03.height
            && badger.y + badger.height > bird03.y) {
                if(!collisionDetected && totalHealth != 0) {
                    totalHealth--
                    collisionDetected = true
                    health.innerText = "HEALTH: " + totalHealth
                    visibleTimer.innerText = badMsg
                } else if (totalHealth === 0) {
                    badgerFainted()
                    timerEnds()
                }
        }else if (badger.x + badger.width > cookie01.x // this is where cookies add to the tally
            && badger.x < cookie01.x + cookie01.width
            && badger.y < cookie01.y + cookie01.height
            && badger.y + badger.height > cookie01.y) {
                if(!collisionDetected  && collectedCookies != 3) {
                    collectedCookies++
                    collisionDetected = true
                    cookies.innerText = "COOKIES: " + collectedCookies
                    visibleTimer.innerText = goodMsg
                    cookie01.width = 0
                    cookie01.height = 0
                } if (collectedCookies === 3) {
                    gameWon()
                    timerEnds()
                }
        } else if (badger.x + badger.width > cookie02.x
            && badger.x < cookie02.x + cookie02.width
            && badger.y < cookie02.y + cookie02.height
            && badger.y + badger.height > cookie02.y) {
                if(!collisionDetected  && collectedCookies != 3) {
                    collectedCookies++
                    collisionDetected = true
                    cookies.innerText = "COOKIES: " + collectedCookies
                    visibleTimer.innerText = goodMsg
                    cookie02.width = 0
                    cookie02.height = 0
                } if (collectedCookies === 3) {
                    gameWon()
                    timerEnds()
                }
        } else if (badger.x + badger.width > cookie03.x
            && badger.x < cookie03.x + cookie03.width
            && badger.y < cookie03.y + cookie03.height
            && badger.y + badger.height > cookie03.y) {
                if(!collisionDetected  && collectedCookies != 3) {
                    collectedCookies++
                    collisionDetected = true
                    cookies.innerText = "COOKIES: " + collectedCookies
                    visibleTimer.innerText = goodMsg
                    cookie03.width = 0
                    cookie03.height = 0
                } if (collectedCookies === 3) {
                    gameWon()
                    timerEnds()
                }
        } else if (badger.x + badger.width > cookie04.x
            && badger.x < cookie04.x + cookie04.width
            && badger.y < cookie04.y + cookie04.height
            && badger.y + badger.height > cookie04.y) {
                if(!collisionDetected && collectedCookies != 3) {
                    collectedCookies++
                    collisionDetected = true
                    cookies.innerText = "COOKIES: " + collectedCookies
                    visibleTimer.innerText = goodMsg
                    cookie04.width = 0
                    cookie04.height = 0
                } if (collectedCookies === 3) {
                    gameWon()
                    timerEnds()
                }
        } else {
            collisionDetected = false
        }
    }



    // automatically scroll the game environment, badger x value will always be less than 11 because it is set at 10
    function autoScroll() {
        if (badgerX < 11) {
            offsetX -= 12
            lion01.x -= 12
            lion02.x -= 12
            lion03.x -= 12
            lion04.x -= 12
            lion05.x -= 12
            lion06.x -= 12
            lion07.x -= 12
            lion08.x -= 12
            lion09.x -= 12
            lion10.x -= 12
            lion11.x -= 12
            lion12.x -= 12
            cookie01.x -= 12
            cookie02.x -= 12
            cookie03.x -= 12
            cookie04.x -= 12
            bird01.x -= 12
            bird02.x -= 12
            bird03.x -= 12
            bird01.y += 6
            bird02.y += 8
            bird03.y += 10
        }
        draw();
    }

    // set auto scrolling
    var scrollInterval = setInterval(autoScroll, 150)

    var yoshiVariable
    // decrement timer and if timer runs all the way down to zero then game over
    function startTimer(duration, display) {
        let gameTimer = duration, seconds
        yoshiVariable = setInterval(function () {
            seconds = parseInt(gameTimer % 60, 10)
            if (gameTimer-- > -1) { // decrement game timer as long as greater than 0 and display stored time
                display.textContent = "00:" + seconds
                if (gameTimer < 20) { // adjust opacity to indicate shifting to night time
                    document.getElementById("game").style.opacity = "0.66"
                    if (gameTimer < 10) {
                        document.getElementById("game").style.opacity = "0.33"
                        if (gameTimer < 0) {
                            document.getElementById("game").style.opacity = "0.01"
                        }
                    }
                }
            } else { // once game timer runs down to zero, game over
                display.textContent = "NIGHT HAS FALLEN. GAME OVER!"
                document.getElementById("visibleTimer").style.color = "#ff0000"
                timerEnds()
            }
        }, 1000)
    }



    // set timer to 30 seconds and display to player
    function startNewGame() {
        let thirtySeconds = 30
        let display = document.getElementById("visibleTimer")
        startTimer(thirtySeconds, display)
    }

    startNewGame()


    // defines the movement increments of up or down based on each keystroke ala canvas crawler
    const movementHandler = (e) => {
        // press 'w'
        if (e.key === "w") {
            badger.y--
        } switch(e.key) {
            case "w":
                //badger decrement
                badger.y -= 8
                break
            case "s":
                //badger increment
                badger.y += 8
                break
        } 
    }

    // event listener for key strokes
    document.addEventListener("keydown", movementHandler, false)


    // when timer runs end the stored interval
    function timerEnds() {
        clearInterval(scrollInterval)
        clearInterval(gameLoop)
        clearInterval(yoshiVariable)
    }

    // when health bar runs down to zero, badger faints for game over and I turn off 
    function badgerFainted() {
            badger.alive = false
            document.getElementById("visibleTimer").textContent = "BADGER FAINTED! GAME OVER."
            document.getElementById("game").style.opacity = "0.01"
            document.getElementById("visibleTimer").style.color = "#ff0000"
            document.removeEventListener("keydown", movementHandler, false)
    }

    // when badger is still alive and 3 cookies have been collected, game has been won
    function gameWon() {
        console.log(collectedCookies)
        if(collectedCookies === 3 && badger.alive) { // badger.alive is alive if not false
            document.getElementById("visibleTimer").textContent = "BADGER FULL! YOU WIN!"
            document.getElementById("game").style.opacity = "0.01"
            document.getElementById("visibleTimer").style.color = "#00ff00"
            document.getElementById("instructions").innerText = ""
            document.getElementById("instructions").style.backgroundImage = "url(images/stoffle-wins.gif)"
            document.removeEventListener("keydown", movementHandler, false)
        }
    }


})