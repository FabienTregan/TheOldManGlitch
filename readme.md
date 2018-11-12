# The Old Man Glitch - Presentation of a classic Pokémon First Generation bug.

  This document should contain everything you need to replay or give the the presentation I gave at Jug User Group Toulouse and DevFest 2018 Toulouse.
  If it does not, feel free to contact me via twitter : @ftregan

## Setting up everything

  This chapter guide you thgough setting everything to reproduce the demonstration.
  If you just want the writeup, skip to next chapter.

### Resolution

  My screen setup is FullHD (1920 x 1080) with auto-hidden taskbar.
  This is usefull for the presentation (compatible with most videoprojectors and choosen font size)
  Having a black empty desktop bacground is nice (at least the bottom of the right half should be clean)

### BGB - GameBoy Emulator

  I used BGB emulator, which can be downloaded here : [http://bgb.bircd.org/] It's ment for Windows but run well under Wime.

  In the presentation directory, you will find a `bgb.ini`, which have the following changes when compared to default one :
* Font size is increased in order to allow audiance to read
* Color for breakpoints, highlight, and current line are change to look better and for important accessibility reasons
* Key are set for AZERTY keyboard, using A and Z for buttons, 1 and 2 for start and select

### EpicPen

  [EpicPen](https://epic-pen.com/) is a tool to highlight things on screen with different colors. It is usefull only if you plan to give the talk.
  Run it, roll it, and move it to some place on the right side.

### The ROM

  All addresses are given for the Pokémon Red English version ROM.

### Documentation

  The `gb-programming-manual.pdf` document is an unofficial GB Developper doc.  Chapter 4 - `CPU Instruction Set` - list all instructions and opcodes.

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

![alt text](Initial%20Screen%20Setup.PNG "Initial screen setup.")