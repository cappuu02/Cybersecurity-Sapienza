# Pointer

- Function pointer Argument.
- When i pass an array without nothing, the array basically is a pointer to void elements.
- free() to make memory void for next time memorization. 
# Command line parameters
parameters to the main() function can be specified on the command line
main() receive two arguments:
- the number of parameters on the command line
- an array of pointers to strings (`Args[]`)
# I/O 
_Permanent_ storage refers to solutions that retain information even when they're not powered up. This contrasts with temporary storage devices, like random access memory (RAM), which lose data when you turn them off. On permanent storage, data is usually kept in files.

They are a few things that identify a file:
- file name
- size
- location
- timestamps
- Logic Location
## Operations in file

## Flow of file operation in C
```ad-missing
title: Missing image


```

- All requests to perform I/O are managed by OS.
- Usually data is buffered before/after being transfered o disk.

## File in C
C provides a library to perform I/O on lines.
Common to all file-related functions is the use of an handle.
Files are closed automatically when i exit to the program by the OS.

### File struct
`File` is a struct defined when including `<stdio.h>`
path could be either absolute or relative.
Append = if file does not exist, it ill be created

```ad-missing
title: Missing summary image


```


# System Programming 

>programming using system calls

the kernel is the part of the OS that manages HW resources and arbitrates and coordinates their use between the various applications and the various users.
Kernel code is always resident in memory. The kernel provides the programmer with a series of functions called system calls. The set of system calls constitutes the kernel interface towards the programmer. System programming consists of using kernel system calls.

## System calls
all program that run under linux ultimately make use of this interface; system libraries also rely on system calls.
Often a system call corresponds to a standard C library function.
The invocation of the system can follows the calling syntax of a normal C function. Each system call has a prototype, defined in the system include files.
Some system calls can only be successfully invoked if the calling process is running with root privileges.

```ad-info
Use man system_call to display the system call prototype and include necessary files.
```

## The C standard library
The C standard library contains utility functions that provide general purpose services to the programmer.
These functions are Not direct calls to kernel services, altrough some of them can mak use of system calls to implement their services. Standard C library functions generally reside in a dynamic library (why?)

................................

## System calls vs library function

**Distinction**
From the programmer's point of view, there are no major distinctions between library functions and system calls, both are function
From the point of view someone implementing an OS, the difference is notable.


**Note**
In general it is possible to replace library functions with other functions that performs the same risk, perhaps in a different way. While it is not easily possible to replcae system calls.............................

```ad-missing
title: Missing image system call vs library functions


```

## The syscalls
`syscall()`
- A request to the kernel to do something
- allows to switch from user mode to kernel mode
- runs in process context

## Execution mode and context 
> I think this image is in a different file.

## Cause of errors in system calls
System calls can fail for various reasons:
The system has exhausted the availability of a certain resource.
The kernel blocks execution because the process does not have permission to request the execution of a certain operation.
Arguments passed to a system call are invalid.
A device is not working or it is missing.
An interrupt, caused by an external event, such as the reception of a signal, causes the system call to determinate prematurely.

>For all of these reasons ..................................

system calls return
- `0` = OK
- `-1` = Error
To print the specific error use errno code to the global variable.
If the system call is successful, errno is not set.
The file `errno.h` contains the definitions of symbolic names for error codes.

## Error handling 
perror() can be used to display the description of the previous error.
.................................


## Types of system calls
There are various types of system calls related to
- process control
- memory management
- management of files and file systems
- signals
- inter-process communication 
- Networking

>`man 2 intro` and `man 2 syscalls` give some info about the system calls available under linux.

## Standardization of system calls
In order to facilitate the porting of applications between different operating systems, a reference standards has been defined for the system calls that a kernel should offer to the programmer.
POSIX is a family of standards developed by the IEEE.

```ad-missing
title: Missing image of standardization of system calls (last slide of PDF)


```
