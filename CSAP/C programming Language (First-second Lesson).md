Link to information course: https://twiki.di.uniroma1.it/twiki/view/CSaP/WebHome

# Data Types Supported in C
![[image1.png]]

>Unsigned by default is an integer.
## Integer numbers

Keywords: int, short, long can be signed or unsigned
the size depends on architecture
Sizeof() function, returns the number of bytes used for the argument

# The problem of overflow

the problem exists for all primitive data types. Remember, memory is cheap.

# Floating Point Numbers
Floating point numbers are real numbers $x \in R$.
Usually only 4/8 bytes are used for float/double so we have problems with precision, ranges, etc...

Floating point number is composed of:
- mantissa
- exponent
- signed

Most CPU Architectures natively supports only single and double precision numbers.

# Char (second lesson)
Can be signed or unsigned.
Size is 1 byte (8 bit) in almost every architecture to represent 255 character
Intended to represent a single character, using ASCII encoding
A char can be initialized with either a number or a symbol:

```C
char a = 65;
char b = 'A';
```

>Don't use double quotes because indicate a string

There is the pssibility to print a char like an integer with %d or like a char using %c

# Data types and their size

To remember size of variable use sizeof() function.
Memory considerations could be important when defining arrays.

> C does not have a primitve data type for strings 
> (they are represented as array of chars).

# Variable
Consist of English letters (a-z, A-Z), Numbers (0-9) and underscore.
Start with letters or underscore
Are case sensitive (number differs from Number)
Must non be reserved words.

>A variable can change his value

In the project me must use camelCaselIdentifiers or snake_identifier.
write all the name and comment in English.

# Constant
`const` modifier before type definition
Constants means tat memory is allocated but it is illegal to change the value.

> Check: whit a pointer to constant we can change his value.

```c
const int a = 5;
const float c = 2.1;
```

# Endianess (little-endian and big-endian)

Foto pdf pagina 22.

# Printf with placeholders
- `printf("%d, %f, %id", d1, d2, d3)`
- function included in the C standard library.
- it prints character into the screen.
- Number and type of arguments must match with the placeholder.
nsigned by default is an integer.
Image of supported placeholders (page 26/50).
do not insert example image.

- Some special character are commonly used: ""

# Variable Input
scanf("%d...%f, &a, &b") is used it to read values from the command line
Like printf:
- it is declared in stdio.h and it is included in the C standard library
- It needs a format string with placeholders

```c
int i;
scanf("%d", &i);
```

The & operator returns the address if the variable.
`scanf` require an address to store the value.
scanf use the same placeholder as printf.

# Data Operators and Expression
Legal expressions consist of legal combination of:
- constant
- literals
- variables
- operators
- functions
A function always has a value.
A statement is made up of one or more expression.
A statement is always terminated by a semicolon.

## Operators
- Arithmetic
- Relational
- Logic
- Bitwise 
- Shift <<,>> 

### Operator precedence
C has a complex set of rules for precedence and associativity
use brackets to force evaluation. compiler 
## Implicit type Conversion
automatically performed by the evaluation of an expression which contains different and compatibles type.
FINIRE!

# Casting

## Implicit data conversion
Inserire foto

- `(<type>)` is an operator called cast
- converts the operand (on its right) to the type `type`

Inserire foto.

# Introduction section in linux

# Compiler and Linker
Image compiler and linker

## Writing programs 

file .c for definitions, main program
file .h for variable, declarations, constants, defines, ecc...
Then use make and make files.

a program consist of many modules, often there are dependencies, if one file changes, one or more others need to change.

# Third Lesson (programming in C)
- Compiler must be GCC
- any text editor with gdb debugger
- Vscode = ok

principle file = main.c
`gcc main.c` = create executable `a.out`.
`-o` to change the name.e
to run the program: `./a.out`

## Program Structure
1. preprocessor directives: create a new source (temporally file)
2. `stdio.h` contains the definitions of many functions, including `printf`
3. main function = the first function run into the C program. (only one main function can exist), is the mostly important function in the C program. entry point called when program starts. This function take parameters (or nothing) and can return a value of type void or int. `{}` marks the start and the end of the function.

```c
int main(void){

}
```

Contains program statements
last statement is return:
- ends the main function.
- 0, as convention, tells the OS that everything went right.
- if omitted, a random value would be send back.

- Statement are actions to be performed, translated into one or more executable instructions.
	- expression
	- compound
	- control
	Always end with a `; = empty statement` (if we write only `;`)
- Comments:
	- Line (single line)
	- Block (multi line)

```ad-info
title: Info statement
statements inside one block are executed sequentially, from top to bottom. This is  a convention for all procedural languages. For readability, write only one statemente per line.

```

## Program with sequential flow
Prof explain some example of simple C program.

## Control Statement
- If-else statement $\to$ i know it ;)
	- logical expression
	- we can have nested if
- else is optional
>In C anything different than $0$ is considered true (0 false).


## Logical expression
- `&&` Logical AND
- `||` Logical OR
- `!` Logical NOT

>Remember the operators precedence

>For the example take a look to the pdf of third lesson.e

# Fourth Lesson

## Switch

```C
switch(variable){
	case val1: 
		statement1; 
		break;
	case val2: 
		statement2; 
		break;
	default:
		statement4;
		break;
}
```

Each case defines a label where execution can jump.
After a case there could be multiple statements.
All statement following a matching case will be executed, until the end of block or a break statement.

>If there is not the break the execution continue.

## Loop Control
- `for` = we use this when we know how much time we want to repat a certain block of code.
	- initialization `i = 0`
	- condition `i < 5`
	- iteration `i++`
- `while` = we use this when we want to repeat until a variable or condition are satisfy.
	```C
	while(condition){
		statement...
	}
	```

- `do-while` = similar to while loop with one certain initial statement.
	```c
	do{
		statement...
	}while(condition)
```

```ad-note
Into every loop we can use the `break`,it permit to jump out immediatly.

`Continue` can be only used inside a loop. COntinue skip following statement and go to the end of the loop.
```

```ad-missing
title: Import the flow scheme of loops (find in internet, is equal).
```

>Some example of type of loops.

>For example, create a program that detective if a number is prime or not.

