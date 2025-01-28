
# Atomic Register

```ad-abstract
title: Important
Here we will se two implementations of atomic register:
- first based on regular register
- Second based on message passing

```

## Consistency properties
- **Regular COnsistency**: every reads on register $x$ outputs the last value written on $x$, or the value that someone is concurrently writing on $x$. We have seen algorithms for $(1,N)$ Regular register with $P$ (fail- stop model) and without $P$ (fail-silent) using quorums and majority of corrects.
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

>Registro non atomico: la relazione di precedenza si riferisce anche alle operazioni di lettura effettuate da processi diversi. e non solo su uno stesso processo!

![[141.png]]
In questa esecuzione la read 6 precede la read 5 dunque la write di 6 dovrebbe stare prima della write di 5 ma non risulta essere cosi: rompe la proprieta di ordering



```ad-example
Is regular and atmoic or not? Is atomic and regular because read 5 and write 6 are concurrent so: we can play with the linearization point.
![[Pasted image 20250128103004.png]]
```


```ad-important
If a register is regular $\not \Rightarrow$ Atomic Register
If a register is Atomic $\Rightarrow$ Regular Register

```


```ad-example

![[Pasted image 20250128104301.png]]
```

```ad-example
![[Pasted image 20250128110009.png]]
Write and read are concurrent, so read can read an old value.


```

```ad-example
![[Pasted image 20250128110142.png]]

The first read operation has value 5 the second read operation ha value 0. 0 is older than 5, so it's not possible that is atomic! Is only regular register.
```

```ad-example
![[Pasted image 20250128110333.png]]
Atomic and regular because the reads operations are concurrents. 
Perche e Atomic? Posso immaginare come se la linearization point di read()=5 avvenga prima della linearization point di read()=6, dunque la proprieta di ordering viene rispettata e il register, oltre che ad essere regular, e anche atomic.
```

## (1,N) Atomic Register: Interface
Algorithm to implement atomic regster which we have 1 writer and N processes that can read.

![[147.png]]

We have two ways to implement an atomic register:
- The first one using (1, N) Regular register (we will not use messages to communicate just regular registers).
- We will show algorithms to implements (1,N) atomic register using directly message passing. (we will only use messages to communicate).

### $(1,N)$ Atomic Register using Regular Register
the algorithm consists of two phases:
- Phase $1$: We use a (1,N) regular register to build a (1,1) atomic register
- Phase $2$: We use a set of (1,1) atomic registers to build a (1,N) atomic register

>Hereafter, RR and AR, will be sometimes used to respectively denote Regular Register and Atomic Registe


![[148.png]]


```ad-error
title: Problematic case
![[Pasted image 20250128111413.png]]
Image p1 is writer and p2 the reader.
Since read(8) is concurrent with both write and read(5) is concurrent with write(8), the first read can output 8,5 or $\bot$ and the last read can obtain the value $5 or 8$, because the concurrent relationship.

```











































### Atomic registers implementations using message passing
