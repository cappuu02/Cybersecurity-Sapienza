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

## writing programs 

file .c for definitions, main program
file .h for variable, declarations, constants, defines, ecc...
Then use make and make files.

a program consist of many modules, often there are dependencies, if one file changes, one or more others need to change.

