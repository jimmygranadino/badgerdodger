# Badger Dodger

You're a hungry badger in the Savannah and cookies have spontaneously began sprouting up from the ground! Avoid lions and hawks to acquire 3 cookies to fill that belly up before night falls.

# Gameplay
Scrolling 2D environment where you move the badger up or down to avoid obstacles and reach the ultimate goal of acquiring all cookies in the game field. Use "W" key to move the badger up and the "S" key to move the badger down. Once timer hits zero, the game is lost.

# Wireframe

![High level wireframe](images/wireframe-1.JPG)

![In-game wireframe](images/wireframe-2.JPG)

# MVP
* Render game start button - **Completed**
* Render game window - **Completed**
* Render savannah background - **Completed**
* Render player - **Completed**
    1. Use badger sprite - **Completed**
    2. Use W & S for up/down movement - **Completed**
* Render collision objects - **Completed**
    1. Lions - **Completed**
    2. Cookies - **Completed**
* Render grass sprite - **Completed**
* Render health bar - **Completed**
    1. Set health bar to 3 "damage points" - **Completed**
        * Lions cause 1 damage point - **Completed**
    2. Set lose game condition when health reaches 0 - **Completed**
* Render timer - **Completed**
    1. Set timer to 30 seconds and decrement - **Completed**
* Track number of cookies acquired - **Completed**
    1. Set win game condition when 3 cookies acquired - **Completed**
        * innerText message of belly full/game won - **Completed**
* Continuously scroll game background so new collision objects appear - **Completed**

# Stretch Goals
* Every 10 seconds change game window opacity until pitch black to indicate shifting day light - **Completed**
    1. innerText message of night fall/game over - **Completed**
* Include spacebar for jumping
    1. Differentiate up movement vs. jump movement so game logic doesn't get confused
        * Pitfalls are jumpable
        * Jumping lions causes 3 damage points
            * innerText message of caught in air/game over
        * Jumping a cookie doesn't get acquired
        * Movement on screen to indicate a jump has occurred 
* Insert new collision object  - **Completed**
    1. Hawk sprites that dart across the screen at an angle/diagonally  - **Completed**
        * Hawk collision causes 2 damage points
        * Randomize where a hawk will dart across the screen
    2. Pitfalls
        * Falling into a pit causes 3 damage points
* Repeating movement of lion within a specified direction
* Fade to a dark cave background image when pitfall lose condition triggered
* Include attack for badger
    1. Differentiate attack from standard collision
        * Hawks disappear if attacked by badger
        * Lions are scared off by badger attack and move from "point A" to "point B"
            * Change lion sprite to sad/scared when attacked
* Auto-generate new "terrain" each time a new game is started
    1. Grass & collision objects are placed in new places
* Make movement "smooth"


# Technology Used
* HTML
* CSS
* JavaScript

# Sources
**Using drawImage() in JS** - https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
**Understanding the aside tag** - https://www.w3schools.com/tags/tag_aside.asp
**Understanding the 'new' operator** - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new
**Using the continue statement in JS** (not implemented currently, but still want to use) - https://www.w3schools.com/jsref/jsref_continue.asp
**Understanding collision detection in JS (AABB)** - https://medium.com/@hemalatha.psna/collision-detection-in-javascript-efafe8bba2c0
**Helped resolve a NaN bug I ran into** - https://stackoverflow.com/questions/30140947/why-does-my-value-keep-returning-as-nan
