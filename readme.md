# The Old Man Glitch - Presentation of a classic Pokémon First Generation bug.

  This document should contain everything you need to replay or give the the presentation I gave at Jug User Group Toulouse and DevFest 2018 Toulouse.
  If it does not, feel free to contact me via twitter : @ftregan

  You will need about 45 minutes to give this presentation, provided you don't do any error which may require a bit of preparation. There are fourteen intermediate game state save files in case something during goes wrong during the presentation. They have the same name as the corresponding chapters in this documentation. 

## Setting up everything

  This chapter guide you thgough setting everything to reproduce the demonstration.
  If you just want the writeup, skip to next chapter.

### Resolution

  My screen setup is FullHD (1920 x 1080) with auto-hidden taskbar.
  This is usefull for the presentation (compatible with most videoprojectors and choosen font size)
  Having a black empty desktop bacground is nice (at least the bottom of the right half should be clean)

### BGB - GameBoy Emulator

  I used BGB emulator, which can be downloaded at http://bgb.bircd.org/. It's ment for Windows but runs under Wime.

  In the presentation directory, you will find a `bgb.ini`, which have the following changes when compared to default one :
* Font size is increased in order to allow audiance to read
* Color for breakpoints, highlight, and current line are change to look better and for important accessibility reasons
* Key are set for AZERTY keyboard, using A and Z for buttons, 1 and 2 for start and select

### EpicPen

  [EpicPen](https://epic-pen.com/) is a tool to highlight things on screen with different colors. It is usefull only if you plan to give the talk.
  Run it, roll it, and move it to some place on the right side.

### The ROM

  All addresses are given for the Pokémon Red English version ROM.

### Disassembled and commented source code

  Though not used udring the presentation, you may want to download the code from https://github.com/pret/pokered

### Documentation

* The `gb-programming-manual.pdf` document is an unofficial GB Developper doc.  Chapter 4 - `CPU Instruction Set` - lists all instructions and opcodes.
* The [Big HEX list](https://glitchcity.info/wiki/The_Big_HEX_List) gives correspondance between Hex value, Pokémon type, Items, Characters and more
* [Glitch City Laboratories Forums' thread about 8F item](https://forums.glitchcity.info/index.php?topic=6638.0)

### Sylink file

  There is a `Pokemon Red.sym` file in this repository, it must be in the same directory as the ROM file which must be named `Pokemon Red.gb`. This enables the debugger to display human readable labels. (Either copy the `.sym` file to where the ROM file is or copy the ROM in this directory.)

### Run BGB and Pokémon Red

* Start GBG, load the initial state provided in the `00 - Title.sna` file (`ctrl-l`).
* Bgb should either load the `Pokemon Red.gb` ROM file or ask you where it is (else try loading it usingby pressing `F12` key).

### Initial configuration of the screen

* Stretch the screen window of GBG so it takes the full height of the screen and have a 1:1 aspect ratio
* Move this windows to the right side of the screen
* Open the debugger (`esc` key)
* Move it to the left side
* Stretch it so it takes full height and the memory view (bottom of the windows) show the hex value but not the text values

### Initial state of the emulator

* Add breakpoints at the following addresses :
  * `1:D163`
  * `4:789E`
  * `4:78DB`
* Disable the last two breakpoints (they are just used to highlight the lines)
* In the memory (hex) view, go to `WRA1:D887` (use `ctrl-g`) and scroll so it is on fisrt line
* In the code view, go to `4:7888` and scroll so it is on firt line
* Run the game (`F9` key)

### Optional : Modify the menu to display speaker's name

  You can not directly modify the VRAM (video memory) to change the displayed menu because it is recopyed from a buffer in memory at each VBLANK (that is about 60 times per second). You should edit the buffer instead. The buffer will be re-built when you exit the menu, so no trave of the modification will stay in memory and you can start playing directly.
  Here are the addresses at which you whant to modify the buffer:

Addr | Data (hex)     | Tiles   
-----|----------------|---------
c3d4 | 93a7a47f7f7f7f | The     
c3e8 | 8eaba37f7f7f7f | Old     
c3fc | 8ca0ad7f7f7f7f | Man     
c410 | 86aba8b3a2a77F | Glitch  
c424 | 7f7f7f7f7f7f7f |         
c438 | 85a0a1a8a4ad7f | Fabien  
c44c | 93918486808d7f | TREGAN  
c460 | 7f7f7f7f7f7f7f |         
c474 | 93b6a8b3b3b19c | Twittr: 
c488 | a5b3b1a4a6a0ad | ftregan 
c49c | 7f7f7f7f7f7f7f |         

  The data (hex values) can be generated using the [`string to pokemon hex codes.html`](string to pokemon hex codes.html) file.

  Re run (`F9`) after modification.

### Final setup

Your screen should now look like this (except the `Breakpoints` windows which should be closed) :

![Initial screen setup.](Initial%20Screen%20Setup.PNG "Initial screen setup.")

## Introduction

> First lets start with a few question :
> * Who here does love Assembly Language ?
> * Who here writes Assembly ?
> * Who here likes bugs ?
> * Who here loves bugs ?

## 00 - Title

### Showing the bug

> My name is Fabien. Today we are going to speak about a bug. This bugs is known as The Old Glitch, it resides in first generation of Pokémon on Gameboy.

Quit the menu 

> Pokémon is an RPG game which came out in 1994, 1996 in Europe. You can move around in the world.

move around while saying this, stop next to the East shore facing east and re-open the menu.

> Here my character is named GGGGGGG (we'll see later why), he carries 5 items then an `X Special` and a `Dome Fossil` (we'll see why also).

Show while saying

> Here I am safe because I am in a town, but outside of towns if I walk in Long Grass, in Caves or if I surf in Water I can be attacked by Wild Pokémons. I can fight them and try to capture them. Once I've captured them I can use them to fight other Wild Pokémons or again NPC's Pokémon to progress in the game. The Pokémons can level up, and when they have leveled up enough they can learn new attacks. Once I've made enough progress in the game, I can use some of these attack to do other things than fighting. Here as an example I can use my GYARADOS' SURF attack to go in water.

do it, move at least one tile east so you are no longer on the shore.

> Once I'm in water I can be attacked by Wild Pokémons.

Move south-north until you are attacker, hopefully by a level 30 TENTACOOL

> Here I'm rather late in the game so I should be attacked by level 20-30 Pokémons.

Escape the fight, go on the shore and move north-south

> The bug I want to show you occurs here.

Wait for an attack, which hopefully will be a Level 3 RATTATA, press a key to open combat menu

> Did someone see the bug ? I am in water, but I've been attacked by a RATTATA which abviously is a ground Pokémon and should not be found in Water. Moreover, it is Level 3 and this place is rather late in the game ; I should encounter level 20-30 Pokémons, not level 3.
>
> Astonishing, isn't it ? This quiet unimpressiv bug is the starting point of a glitch which is the most famous of the Pokémon game, probably of the GameBoy, and maybe one of the top 10 most famous bugs in videogame history.

### The off-by-one error

> Now to understand why this bug is so famous, let's have a look at what happens inside the code. There are to arrays that help determinate which Wild Pokémon you will encounter : One is here at address `D887`, starting with this `00`, the other one is a little further, starting with this `05`.

Note : you can use EpicPen to highlight the tables.

> The first one is default case, the second one is for Water Pokémons. The first number is the probability of encountering a Wild Pokémon (`00` meaning no encounter because we are safe when in town, and `05` meaning 5 chances out of `256` when on Water). Then we have a list of Pokémons that can be encountered going like this : Level of the most probable encounter, followed by type of the Pokémon of the most probable encounter, Level of a bit less probable encounter, and its type, again and again until the ninth one (with 1.2% encounter probability).
>
> Looking at the code, we see at address `789E` that we load the address `C45D` into `ld` register,

Note : It should be highlited in pale pink.

> then load into register `c` what is at this address, load `wGrassTile` into `a` and compare `a` and `c`. `C45D` is the address of this tile on the bottom right quarter of my character, so here it is Water. If it is Water we'll read the probability of encountering a Wild Pokémon in the second table - the Water one - else we use the first one.
>
> We can then generate a random number, compare it with the given probability to determine if we encountered a Wile Pokémon. If we encounter one, we need to determine which one and for this, line `78DB`, we read again the type of tile we stand on at address `C45C`.

Note : you need to scroll down a few lines. It should be highlited in pale pink.

> And maybe you saw the problem? We read `C45D` - bottom right quarter of my position - to say 'Were are on Water, we have 5 chances out of 256 to encounter a Wild Pokémon', and now we look at `C45C`, which is bottom *left* corner, to determine which is encountered pokemon. We have what we call an off-by-one error.
>
> Since bottom *left* corner of my character does not stand on water, we will use the default table of pokemon to determine the type and level of the encounter, when we used the water table to get the probability of encounter. Hence we encounter a non-Water Pokémon while surfing on a Water Tile.

### Reuse After Free

> Something interesting since we have an off-by-one error, is to study how the data from the table that should not be read are generated.

go left past the `GYM` house, then up to this position :

![Position yourself just above the pond on north of the town](Position%20to%20show%20Reuse%20After%20Free.PNG "Position to go before continuing")

Be carefull not to walk on the pond yet, stay in town.

Both tables of encounters should be highlighted on screen. If not, do it now.

> Here we are in a Town, which is a safe zone with zero probability of encountering a Wild Pokemon except in Water. If we walk forward one step North, we will change of Zone and some code will be executed that generate the new table of possible encounter. See what will change.

Move one step north

> Everything changed: The probability in `D887` went from `00` to `19`, and the whole list of possible Pokémon Types and their level changed. Now if I go back in town, see what happens

Move one step south.

> We executed the code that fills the table for the towns. The towns are safe, there are no possible encounter, so it sets both encounter probabilities to `00`. Then since there is no probability of encounter, there is no need to fill the remaining of the encounter table. So anything that was here stays here, it is just garbage.
>
> The Zone on the east contains only water, so for the same reason when enter it, the probability of encountering a non-Water Pokémon is set to `00` and the garbage stay there. But because we have this off by one error, we are going to use the garbage anyway. This is called a Reuse After Free.
>
> So we hade an off-by-one error, which makes us read the wrong table, and since this table is not reinitialised we now have a Reuse After Free.

## 01 - The Old Man fighting

### What to do when you find a Reuse After Free

> So we now have found a RAF. When we have this kind of bad pattern, it would be fun to find something in the game that any writes any values here, which will later be used as if they were legit Pokémon descriptions.
>
> There is one place in the code that write to `D887`: it is when you link two GameBoys to play Player versus Player. It writes the name of the other player here. But that's not interesting to us because once you entered the PvP mode, you can not go back to normal game. You need to reset the GameBoy, which resets all memory.
>
> But there is another piece of code which uses the buffer that stores the PvP opponent's name.

### Encounter Old Man

> This happens early in the game, in the second town you enter. Lets fly here.

Use the Fly move on Dux to fly to VIRIDIAN CITY.

![Viridian City is second town north of the town where you currently are](Viridian%20City.PNG "Dux going to fly to Viridian City")

> The is an NPC here, called "Old Man" - hence the name of the glitch : The Old Man Glitch - who will show you how to capture Wild Pokémons.

Go a few tiles left, then about to screen north until you meet the Old Man.

![Screen capture of where to find Old Man](The%20Old%20Man.PNG "You in front of the Old Man")

Speak to him, answer `No` to his question.

> If you tell him you are not in a hurry, he will show you how to capture them. The game then start a normal battle, with three main differences

Press button until the Old Man and Wild Pokemon appear on screen

> First the picture here is not mine it is the one of the Old Man. Second, the fight is scripted, I can not play. Third, look at this:

Start the fight, and pause (press `esc`) just after the Old Man has choosed the pokemon, while he is throwing it.

![Old Man using Pokéball](Old%20Man%20using%20POKé%20Ball.PNG "Pause here.")

> Instead of writing `GGGGGGG used POKé BALL!` it says `OLD MAN used Poké BALL!`. To do this and still use the existing code for fights, it copies the name `Old Man` to where my character name was. But of course later it will need my real name, so it saves it. And where does it save it? In the buffer where it write the name of the opponent in PvP mode. So if you now look at the `D887` address, you will see `86 86 86 86 86 86 86`,  which is my name (`GGGGGGG`), followed by a `50`, which is the String terminator in Pokémon - String are not terminated with a `00` but with a `50` in Pokémon.
>
> Now I can leave the fight, I will be back in Town so the probability of encountering a non-Water Pokémon will be set to `00` but the `86 86 86 86 86 86 50 00 00` remains.

show it.

## 02 Fighting MissingNo.

> I can now leave town, hence enter a new zone and the `86`s will be overwritten by correct data. But if I Fly to another town...

Fly back to CINNABAR ISLAND

> The probability is reset to `00` but following garbage remains. Earlier the garbage was made of the list of Pokémons for the last Zone I visited. But now it's made of my name,  which is something I can somehow control. There are heighty-height characters I can choose out of 256 possible values. So if you could choose the pokemon you would encounter, which one will you choose ?

The audience will probably answer with a legendary Pokémon, maybe Mew or Mewtwo

> Mew is not possible, it's code is not in the 70 possible characters for the name. Mewtwo is Possible though, its code is `83` so if my name is set to `DDDDDDD` I can fight it. I can only choose level between 127 and 191, he will heal fulllife constantly, but I can fight it. But it's not what one I choose. There is something more interesting pokemon to fight than a legendary one, lets see what we choosed.

Use surf to go on the shore and encounter a `'M` or a `MissingNo.`. If you encouter something else, explain the audiance that you have just been unlucky and got one of the last pokemon of the table, and try again. If you encounter a MissingNo., tell them that's this is Pokémon number `86` with level `86` (which is hexadecimal code for 134). If it is M', tell them it is Pokémon number `00` with level either `50` or `00`

![Fighting a glitched Pokémon](fighting%20`M.PNG)

> So here is our Pokémon. What happens? The value is not a correct one, so when the code uses it to calculate the address of the name of the Pokémon or the address of the data for the picture, it reaches some weird data.
>
> This starts to be fun: We hade an off-by-one, causing a Reuse After Free, and now we know how to inject weird data to fight a glitched pokemon. But there is more to come ;)
>
