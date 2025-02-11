# Atomic Register

```ad-abstract
title: Important
Here we will se two implementations of atomic register:
- first based on regular register
- Second based on message passing

```

## Consistency properties
- **Regular Consistency**: every reads on register $x$ outputs the last value written on $x$, or the value that someone is concurrently writing on $x$. We have seen algorithms for $(1,N)$ Regular register with $P$ (fail- stop model) and without $P$ (fail-silent) using quorums and majority of corrects.
- **Sequential Consistency**: there exists a global ordering of all writes and reads that is consistent with the local order of operations that each process sees. (not see implementation)
- ==**Atomic Consistency/Linearizability**==: Each operation appears to take effect instantaneously at some moment between

## (1,N) Atomic Register: Specification

>single writer and $N$ reader
### Properties
- **Termination**: If a correct process invokes an operation, then the operation eventually receives the corresponding confirmation.
- **Validity**: A read operation returns the last value written or the value concurrently being written.
- **Ordering**: If a read returns $v2$ after a read that precedes it has returned $v1$, then $v1$ has not been written after $v2$.

## (1,N) Atomic Register: Scenario
![[140.png]]
**Esecuzione 1**: rompe la proprieta di odering: read 5 avviene dopo read 6 significa che $6$ deve esssere stato scritto prima di 5 ma non risulta vero in questo caso.
**Esecuzione 2**: In this case the register is atomic, it respect the ordering property.

>Registro non atomico: la relazione di precedenza si riferisce anche alle operazioni di lettura effettuate da processi diversi e non solo su uno stesso processo!

![[141.png]]
In questa esecuzione la read 6 precede la read 5 dunque la write di 6 dovrebbe stare prima della write di 5 ma non risulta essere cosi: rompe la proprieta di **ordering**!!



```ad-example
title: Scenario 1
Is regular and atmoic or not? Is atomic and regular because read 5 and write 6 are concurrent so: we can play with the linearization point.
![[150.png]]
```


```ad-important
If a register is regular $\not \Rightarrow$ Atomic Register
If a register is Atomic $\Rightarrow$ Regular Register

```


```ad-example
title: Scenario 2
![[152.png]]

```

```ad-example
title: Scenario 3
![[153.png]]
Write and read are concurrent, so read can read an old value.


```

```ad-example
title: Scenario 4
![[155.png]]

The first read operation has value 5 the second read operation ha value 0. 0 is older than 5, so it's not possible that is atomic! Is only regular register.
```

```ad-example
![[156.png]]
Atomic and regular because the reads operations are concurrents. 
Perche e Atomic? Posso immaginare come se la linearization point di read()=5 avvenga prima della linearization point di read()=6, dunque la proprieta di ordering viene rispettata e il register, oltre che ad essere regular, e anche atomic.
```

## (1,N) Atomic Register: Interface
Algorithm to implement atomic regster which we have 1 writer and $N$ processes that can read.

![[147.png]]

We have two ways to implement an atomic register:
- The first one using (1, N) Regular register (we will not use messages to communicate just regular registers).
- We will show algorithms to implements (1,N) atomic register using directly message passing. (we will only use messages to communicate).

### $(1,N)$ Atomic Register using Regular Register
the algorithm consists of two phases:
- Phase $1$: We use a (1,N) regular register to build a (1,1) atomic register
- Phase $2$: We use a set of (1,1) atomic registers to build a (1,N) atomic register

![[148.png]]
```ad-error
title: Problematic case
![[157.png]]
Image p1 is writer and p2 the reader.
Since read(8) is concurrent with both write and read(5) is concurrent with write(8), the first read can output 8,5 or $\bot$ and the last read can obtain the value $5 or 8$, because the concurrent relationship.

```

#### Phase 1 - FROM (1,N)-RR TO (1,1) AR=
- $p1$ is the writer and $p2$ is the reader of the (1,1) atomic register, we aim to implement 
- We use a (1,N) regular register where p1 is the writer and p2 is the reader 
- Each write operation on the atomic register writes the pair (value, timestamp) into the underlying regular register 
- The reader tracks the timestamp of previously read values to avoid to read something old

**Algorithm FROM (1,N)-RR TO (1,1)-AR**
![[248.png]]


**Correctness**
- **Termination**: from the termination property of the regular register 
- **Validity** – from the validity property of the regular register 
- **Ordering** – from the validity property and from the fact that the read tracks the last value read and its timestamp. A read operation always returns a value with a timestamp greater or equal to the one of the previously read value

**Performance**: 
- **Write** – Each write operation performs a write on a (1,N) regular register (1 write)
- **Read** - Each read operation performs a read on a (1,N) regular register (1 read)

>Weak register (1-1)
#### Phase 2 - FROM (1,1)-AR TO (1,N)-AR
We are not using messages , only registers
![[159.png]]

IDEA: $1$ writer and $N$ processes that can read

Each reader has inside a register.
When a writer want to write, he write on the first atomic register  and so on. for all

>Not work: the write is not istantaneous! He take so time to write for all processes to each register! When i write on P2 all the others are in pending phase.When process P2 wake up he read the value $X$, when $P3$ wake up he reads the value $\bot$ and this tells us that is not atomic anymore!


![[160.png]]
![[161.png]]

```ad-attention
How can we fix it?

```

```ad-success
title: Solution
When $P2$ reads, before completing its operation, writes the Value $X$ on the other processes using another register. read terminate when al the writes operations terminate!

```

![[162.png]]
We need timestamp to decide the last value. A process reads the incoming registers In which P1 and P2 can write.

So, if i have five processes in the system i will have $N$ register. This is called a matrix of registers
$P1 \to (1,N)$
![[163.png]]
Garantisco che quando P4 si sveglia vede che ha un nuovo valore aggiornato con un timestamp nuovo e dunque ritorna l'ultimo valore con il timestamp aggiornato.


![[164.png]]


**Algorithm**
![[165.png]]
![[166.png]]

Con la variabile booleana "writing" decido se sto scrivendo oppure no.
readval = used to write the last value with higest ts (temporaly variable)
readlist = list with N location, used when we want to stamp the valuedis
For loop: ($N^2$): creating a row for all the processes ($r = 1 \to p1$ creation, $r = 2 \to p2$ creation, ...)


>$N$ failures

**Correctness:**
- **Termination** – from the termination of the (1,1) atomic register 
- Validity – from the validity of the (1,1) atomic register.
- Ordering - Consider a write operation w1 which writes value v1 with timestamp s1. Let w2 be a write that starts after w1. Let $v2$ and $s2$ (s1 < s2) be the value and the timestamp corresponding to w2. 
	
	Let assume that a read returns $v2$: by the algorithm, for each $j$ in $[1;N]$, pi has written $(s2,v2)$ in readers$[r; i; j]$. 
	
	For the ordering property of the underlying $(1,1)$ atomic registers, each successive read will return a value with timestamp greater or equal to $s2$. Then $s1$ cannot be returned.

IMPORTANTE!!
![[167.png]]




### Atomic registers implementations using message passing
#### Algorithm READ-IMPOSE WRITE-ALL
![[168.png]]

The algorithm is a modified version of the Read-One Write-All (1,N) Regular Register
==Idea==: The algorithm is called “Read-Impose Write-All” because a read operation imposes to all correct processes to update their local copy of the register with the value read, unless they store a more recent value

##### Structure

![[169.png]]
![[170.png]]
p2 leggera bot, dunque un valore vecchio. Dobbiamo evitare ciò.

![[172.png]]

**Correctness**
- **Termination** – as for the Read-One Write-All (1,N) Regular Register. 
- **Validity** - as for Read-One Write-All (1,N) Regular Register. 
- **Ordering** – to complete a read operation, the reader process has to be sure that every other process has in its local copy of the register a value with timestamp bigger or equal of the timestamp of the value read. In this way, any successive read could not return an older value.

**Performance**
- Write - a write requests at most $2N$ messages 
- Read - a read requests at most $2N$ messages 
- Number of steps? $2$ for write or read

#### IMPLEMENTATION FOR FAIL-SILENT
##### Read impose write majority
Voglio costruire un algoritmo senza il PFD P che mi garantisca un atomic register (1,N).
A majority of correct processes is assumed. The algorithm is a variation of the Majority Voting (1,N) Regular Register.

![[171.png]]

**Algorithm structure**
- Same as the one for regular and fail-silent 
- But a read has to impose after the query phase

![[183.png]]

**Algorithm**
![[fotoalgo.png]]

```ad-question

How many messages we create for a write? $$2N$$ (Broadcast with the reply)
How many messages we create for read? $4N$ ($2$ broadcast with $2$ reply)

How many message delay for read? $4$ ($1$ delay for broadcast $1$ for acks, $1$ for query, $1$ for acks)
```

Is it true that every message from the writer pass the check $ts' > ts$? No, perchè un messaggio inviato dal writer in broadcast potrebbe raggiungere molto tardi un determinato processo e quindi non supererebbe questo controllo. (Guardare esempio di freccie e guardare ultimo processo quando riceve il valore $5$ del writer).

How many of the message that writer generate can reach the process and  be false on this point ($ts' > ts$)? $N-1$. will be a single process that is a disseminator.

## COMPARISONS BETWEEN ALGORITHMS
![[173.png]]

## (N,N) Atomic Register
![[174.png]]

### Simulation
![[175.png]]
![[176.png]]
![[177.png]]
![[178.png]]
![[179.png]]
![[180.png]]
![[181.png]]

**Algorithm**
![[182.png]]



