// https://github.com/corax89/chip8-test-rom
// https://johnearnest.github.io/chip8Archive/
// http://devernay.free.fr/hacks/chip8/chip8def.htm

// Code	Assembler	Description	Notes
// 00FE	low	disable extended screen mode	Super only
// 00FF	high	enable extended screen mode (128 x 64)	Super only 
// 1xxx	jmp xxx	jump to address xxx	
// 2xxx	jsr xxx	jump to subroutine at address xxx	16 levels maximum
// 3rxx	skeq vr,xx	skip if register r = constant	
// 4rxx	skne vr,xx	skip if register r <> constant	
// 5ry0	skeq vr,vy	skip f register r = register y	
// 6rxx	mov vr,xx	move constant to register r	
// 7rxx	add vr,vx	add constant to register r	No carry generated
// 8ry0	mov vr,vy	move register vy into vr	
// 8ry1	or rx,ry	or register vy into register vx	
// 8ry2	and rx,ry	and register vy into register vx	
// 8ry3	xor rx,ry	exclusive or register ry into register rx	
// 8ry4	add vr,vy	add register vy to vr,carry in vf	
// 8ry5	sub vr,vy	subtract register vy from vr,borrow in vf	vf set to 1 if borroesws
// 8r06	shr vr	shift register vy right, bit 0 goes into register vf	
// 8ry7	rsb vr,vy	subtract register vr from register vy, result in vr	vf set to 1 if borrows
// 8r0e	shl vr	shift register vr left,bit 7 goes into register vf	
// 9ry0	skne rx,ry	skip if register rx <> register ry	
// axxx	mvi xxx	Load index register with constant xxx	
// bxxx	jmi xxx	Jump to address xxx+register v0	
// crxx	rand vr,xxx   	vr = random number less than or equal to xxx	
// drys	sprite rx,ry,s	Draw sprite at screen location rx,ry height s	Sprites stored in memory at location in index register, maximum 8 bits wide. Wraps around the screen. If when drawn, clears a pixel, vf is set to 1 otherwise it is zero. All drawing is xor drawing (e.g. it toggles the screen pixels
// dry0	xsprite rx,ry	Draws extended sprite at screen location rx,ry	As above,but sprite is always 16 x 16. Superchip only, not yet implemented
// ek9e	skpr k	skip if key (register rk) pressed	The key is a key number, see the chip-8 documentation
// eka1	skup k	skip if key (register rk) not pressed	
// fr07	gdelay vr	get delay timer into vr	
// fr0a	key vr	wait for for keypress,put key in register vr	
// fr15	sdelay vr	set the delay timer to vr	
// fr18	ssound vr	set the sound timer to vr	
// fr1e	adi vr	add register vr to the index register	
// fr29	font vr	point I to the sprite for hexadecimal character in vr	Sprite is 5 bytes high
// fr30	xfont vr	point I to the sprite for hexadecimal character in vr	Sprite is 10 bytes high,Super only
// fr33	bcd vr	store the bcd representation of register vr at location I,I+1,I+2	Doesn't change I
// fr55	str v0-vr	store registers v0-vr at location I onwards	I is incremented to point to the next location on. e.g. I = I + r + 1
// fx65	ldr v0-vr	load registers v0-vr from location I onwards	as above.
// The Chip-8 instruction set runs in 4k of memory (addresses 000 - FFF). Programs start at 200, memory before that containing the chip-8 interpreter on a real 1802 based machine. The screen is 64 x 32 (128 x 64 on superchip) and is monochrome. Their is a sound buzzer

// There are 16 primary registers, called v0 - vf. vf is used for carries and borrows and shouldn't really be used as a general purpose register. There is a 12 bit index register called I. There is a program counter and stack pointer, but neither of these are accessible from program code.

// There are 2 counters, the sound timer and the delay timer. Both count down at about 60Hz (on Chip8 they count down in threes using the PC's 18.2Hz Clock). When the sound timer is non-zero the buzzer sounds.

// This is the Chip-8 Instruction set as I understand it....

const registers = [];
let soundTimer = 0;;
let delayTimer = 0;
const memory = 4096; // kb
//The Chip-8 language is capable of accessing up to 4KB (4,096 bytes) of RAM, from location 0x000 (0) to 0xFFF (4095). 
//The first 512 bytes, from 0x000 to 0x1FF, are where the original interpreter was located, and should not be used by programs.
// 64x32 screen display
// 16 key hexadecimal keypad


export const parseInstructions = (instructions: string[], context: CanvasRenderingContext2D) => {
    instructions.forEach((instruction: string) => {
        parseInstruction(instruction, context);
    })
}

const parseInstruction = (instruction: string, context: CanvasRenderingContext2D) => {
    // instruction could be either binary or hex
}