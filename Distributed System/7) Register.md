# Register Definition
Register store a single value or multiple in case of concurrent operations.

```ad-abstract
title: Definition
A register is a shared variable accessed by processes through read and write operations (2 operations).

```


![[Distributed System/Images/119.png]]

## Register Abstraction

**Multiprocess machine**
Processes communicate through registers at hardware level. The set of these registers constitute the physical memory

![[Distributed System/Images/120.png]]

**Distributed message passing system**
- No physical shared memory
- Processes communicate exchanging msg ever a network

![[Distributed System/Images/121.png]]

Register abstraction support the design of distributed solution, by hiding the complexity of the underlying message passing system and the distribution of the data

## Register Simulation
![[Distributed System/Images/82.png]]

## Register Operations
A process accesses a register through:
- ==Read==: it returns the “current” value $v$ of the register; this operation does not modify the content of the register ( $read() \to v$ )
- ==Write==: it writes the value $v$ in the register and returns true at the end of the operation ( $write v$ )

>Each operation starts with an invocation and terminates when the corresponding response is received

Every operation is characterized by **two events**:
- ==Invocation==: is not atomic, it take time $T$
- ==Return==: confirmation for the write operation, A value for the read operation

![[Distributed System/Images/122.png]]

Each of these events occur at a single indivisible point of time

>An operation is complete if both the invocation and the return events occurred.

## Register Assumption
A Register stores only positive integers and it is initialized to $0$ or $\bot$ (NULL).
Each written value is univocally identified (similar assumption of unique messages). Processes are sequential, a process cannot invoke a new operation before the one it previously invoked (if any) returned. 

![[Distributed System/Images/123.png]]

## Failed Operations
A Failed operation is an operation invoked by some process $p_i$ that crashes before obtaining a return.

>Se un'operazione di un processo fallisce ovvero crasha prima del return, tutte le successive operazioni del **sistema** avvengono in maniera concurrent, dato che è come se il processo non termini mai.

![[Distributed System/Images/124.png]]

## Operation Precedence
L'esecuzione di un'operazione invocata da un processo p è l'intervallo di tempo definito dall'evento di invocazione e dall'evento di ritorno.

Given two operations $o$ e $o’$, $o$ precedes $o’$ if the return event of $o$ precedes the invocation event of $o’$. 

An operation $o$ invoked by a process $p$ may precede an operation $o’$ invoked by $p’$ only if $o$ completes. 

If no precedence relation between two operations can be defined, they are said to be **concurrent**.

![[Distributed System/Images/83.png]]

>Se l'operazione OP2 è una read, e la write termina correttamente, allora OP2 leggera il valore scritto nel register. Se l'operazione OP2 inizia ancor prima che la OP1 termini, questa leggera zero oppure il valore scritto da OP1.

```ad-example
![[Distributed System/Images/84.png]]
![[Distributed System/Images/85.png]]

```

# Register Semantic

## STRICTLY SERIALISED SEMANTIC

**Assumptions**: 
- serial access: a process does not invoke an operation on the register if there is another process that previously invoked an operation on it and this latter did not complete yet 
- no failures 

**Specification**: 
- Liveness. Each operation eventually terminates ▪ Safety. Each read operation returns the last value written

![[Distributed System/Images/86.png]]

## Goal 
Definire una serie di semantiche utili per gestire la concorrenza. La semantica limita l'insieme delle esecuzioni consentite.

![[Distributed System/Images/87.png]]

Three different types of Semantics:
- **Regular Consitency**
- **Sequential Consistency**
- **Linearizability**

## Regular Consitency: Fail stop and Fail Silent
$(X,Y)$ denotes a register where $X$ processes can write and $Y$ processes can read. 
- (1,1) denotes a register where only a process can write and only a process can read. 
- It is a priori known which process can write and which can read.

![[Distributed System/Images/88.png]]
$(1,N)$ denotes a register where a single process, a priori known, can write, and N processes can read 
![[Distributed System/Images/89.png]]
$(N,N)$ denotes a register where everyone can read/write

![[Distributed System/Images/125.png]]

### (1,N) REGULAR REGISTER: SPECIFICATION
**Termination**: If a correct process invokes an operation, then the operation eventually receives the corresponding confirmation. 
**Validity**: A read operation returns the last value written or the value concurrently written.

![[Distributed System/Images/90.png]]

```ad-note
_**NOTE**_: In a regular register, a process can read a value $v$ and then a value $v’$, even if the writer has written $v’$ and then $v$, as long as the write and the read operations are concurrent 

```

![[Distributed System/Images/91.png]]
![[Distributed System/Images/92.png]]
![[Distributed System/Images/93.png]]
![[Distributed System/Images/94.png]]

#### Interface
![[Distributed System/Images/95.png]]

#### Algorithm Creation
>Idea: each process keeps a **local copy of the register**. (an integer initially set to $\bot$). The single writer has to ensure the consistencies of copies. When I read I read from my local copy.

![[Distributed System/Images/97.png]]
When a write of value $v$ is trigged by the only write p0, then p0 BEBCast v to all. When I receive a new value, I update my local copy. 

![[Distributed System/Images/99.png]]

```ad-error
title: Problem
When the write returns? If it returns After the BEBCast, or after the local delivery on $P0$, It does not work! ASSUME FD P.

```

![[Distributed System/Images/98.png]]

>I use ACK to solve the problem of the return value of write operations.

#### Fail-Stop Algorithm
Processes can crash but the crashes can be reliably detected by all the other processes 

Uses: 
- Perfect failure detector 
- Perfect point-to-point link
- Best effort broadcast

Algorithm Idea: Each process stores a local copy of the register
- **Read-One**: each read operation returns the value stored in the local copy of the register.
- **Write-All**: each write operation updates the value locally stored at each process the writer consider to have not crashed 
- A write completes when the writer receives an ack from each process that has not crashed (Use of perfect failure detector)

![[Distributed System/Images/126.png]] 
Writeset = used for the ACKs

##### Correctness
![[Distributed System/Images/101.png]]

**Termination**:
- **Read**: Trivial, it is local
- **Write**: from the properties of the communication primitives and from the completeness property of the perfect failure detector.

**Validity**: A causa della forte proprietà di precisione del perfect failure detector $P$, ogni operazione di scrittura può essere completata solo dopo che tutti i processi che non si sono bloccati hanno aggiornato la loro copia locale del registro. Pertanto, possono verificarsi i due casi seguenti:
- L'operazione di lettura non è concomitante con l'ultima scrittura che è stata invocata, il processo leggerà l'ultimo valore scritto.
- L'operazione di lettura è concomitante con l'ultima scrittura. Per la proprietà no creation dei canali, il valore restituito è l'ultimo valore scritto o quello in corso di scrittura. Quest'ultimo è contemporaneo all'operazione di lettura.

![[Distributed System/Images/102.png]]
>In questo caso anche se $P0$ crasha, $p1$ e $p2$, dopo aver inoltrato l'ACK leggeranno in memoria solo il valore $5$ e non zero, anche se p1 continuerà ad essere faulty.

##### Complexity
**Message complexity**:
- $O(N)$ for each write: (1 Beb, and at most N acks)
- $O(1)$ for each read: local no message exchanged.

**Communication Steps (Or message Delays)**
2 steps: 1 to reach everyone, and 1 to get acks back

![[Distributed System/Images/103.png]]

![[104.png]]
![[Distributed System/Images/105.png]]

**The problem**: The algorithm does not guarantee validity if the failure detector is not perfect. The following scenario could happen:

![[Distributed System/Images/106.png]]

$P1$ invokes write(6) and then falsely suspects $P2$. Thus, $P1$ completes the write operation without waiting for the ACK of $P2$ , i.e. without being sure that the value has been written in the local copy of the register at p2 p1 write(5) p2 write(6)

IS IT POSSIBLE TO ADAPT THE ALGORITHM FOR FAIL- SILENT?
#### Fail-silent algorithm
I crash dei processi non possono mai essere rilevati in modo affidabile
- Failure model: crash 
- No failure detector 

Assumptions: 
- $N$ processes: $1$ writer and $N$ readers 
- A majority of correct processes 

Communication Primitives: 
- Perfect point-to-point link 
- Best-effort broadcast

>Write: BEBCast, and then I wait for acks from n/2+1 processes (a quorum of processes). Assuming majority of corrects this eventually terminates.

![[Distributed System/Images/107.png]]

>Read: BEBCast, and wait for register values from n/2+1 processes (another quorum). Assuming majority of corrects this eventually terminates.

![[Distributed System/Images/108.png]]

A small problem has to be fixed. You write 1. In the purple area, read operation return $1$ or $2$?
![[Distributed System/Images/127.png]]
A small problem has to be fixed. You write 1, then you update to 2. Then someone reads and sees both values. How to pick the 

![[Distributed System/Images/128.png]]
![[Distributed System/Images/129.png]]

**Idea**:
- Ogni processo memorizza localmente una copia del valore corrente del registro. 
- Ogni valore scritto è associato univocamente a un timestamp 
- I processi writer e reader utilizzano un insieme di processi witness, per tenere traccia dell'ultimo valore scritto 
- Quorum: l'intersezione di due qualsiasi insiemi di processi testimone non è vuota
- Voto a maggioranza: ogni insieme è costituito dalla maggioranza dei processi. 
- Il lettore prende il valore con il timestamp maggiore tra i processi in quorum.

#### Majority Voting
![[Distributed System/Images/131.png]]

**Correctness**
 Termination – from the properties of the communication primitives and the assumption of a majority of correct processes ▪ Validity – from the intersection property of the quorums Performance - Message Complexity: ▪ Write –at most 2N messages ▪ Read - at most 2N messages Performance - Communication Steps: ▪ Write -2 steps ▪ Read - 2 steps Resiliency? (How many faults do you tollerate?)

```ad-example
title: Example of execution
![[Distributed System/Images/130.png]]

```

**Correctness**: 
- **Termination** – from the properties of the communication primitives and the assumption of a majority of correct processes 
- **Validity** – from the intersection property of the quorums

**Performance, Message Complexity**: 
- Write –at most 2N messages 
- Read - at most 2N messages

**Performance - Communication Steps**: 
- Write -2 steps 
- Read - 2 steps

## Sequential Consistency
Il risultato di ogni esecuzione è lo stesso che si avrebbe se le operazioni (di lettura e scrittura) di tutti i processi sull'archivio dati fossero eseguite in un certo ordine sequenziale e le operazioni di ogni singolo processo apparissero in questa sequenza nell'ordine specificato dal suo programma.
![[Distributed System/Images/110.png]]
![[Distributed System/Images/111.png]]
![[Distributed System/Images/112.png]]

>There exists a global ordering, that respects the local ordering seen by each process.

![[Distributed System/Images/113.png]]
![[Distributed System/Images/114.png]]
Sequential consistency gives to each process the illusion of using a single storage. Even if the results does not respect the global constraint that happens in the real execution.

![[Distributed System/Images/115.png]]
![[Distributed System/Images/116.png]]
**SeqEx**: P1R,  P3R, P0W(5),  P3R,  P2W(8),  P1R

This Run is sequential consistent but no Regular
![[132.png]]

```ad-important
Sequential Consistency and Regular consistency are orthogonal.

![[133.png]]

```
## Atomicity
Each operation should appear to take effect instantaneously at some moment between its start and completion. The "moment” is the linearisation point of the operation.

>The horizontal line is the linearisation point of each operation.

![[134.png]]





This is sequential consistent? Yes
Atomic? Yes, LP are horizontal lines
![[Distributed System/Images/117.png]]
![[Distributed System/Images/118.png]]

This run is bot regular and sequential consistency but no atomic.
![[135.png]]

## Relationship between Cons
![[136.png]]

# Compositionality of consistency conditions
Given a set of registers, such that each one of them independently respects a consistency condition, we would like that any execution on this set of registers respects the same consistency conditions.

Stated more formally: 
- Let an execution $E$ be the sequence of write and read operations on a set of registers $R$. 
- $E \mid r_i$ be the sequence of operations in E that operate on register r_i. 
We say that a consistency property C is compositional iff:

$$\forall r_i \in R \mid C(E\mid r_i) = True \Leftrightarrow C(E) = True$$

## Sequential consistent
![[137.png]]
![[138.png]]

Attention:
![[139.png]]

## Atomic and Regular
**Atomic and regular consistency are compositional**: 
- You can use a set of atomic registers independently implemented, and the resulting executions is linearisable 
- You can use a set of regular registers independently implemented, and the resulting executions is regular
**Sequential consistency is not compositional**: 
- If you use a set of sequentially consistent registers that are independently implemented, the resulting run is not always sequentially consistent