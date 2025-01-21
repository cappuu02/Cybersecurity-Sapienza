
# Model: System and Processes

## System
We have $N$ processes in $\pi:\{p_0, \cdots, p_{n-1}\}$ with distinct identities that communicate using a communication graph $G: (\pi, E)$, where $G$ usually is complete.
The Communication happens by exchanging messages on communication links (edges of $G$)

![[Distributed System/Images/1.png|500]]

## Process
A process is a (possibly infinite) State Machine (I/O Automation).
- **Internal states** - set $Q$
- **Initial States** - set $Q$
- **Messages** - set of all possible messages $M$ in the form <sender, receiver, payload>
- **inBuf_j** - multiset of delivere messages
- **OutBuf_j** - multiset of "inflight messages" (messages sent but not delivered)

==Trasizione di Stato==
![[Distributed System/Images/3.png]]
Il processo $P_j$ parte da uno stato interno $q$ e da un buffer ${InBuf}_j$ 
Dopo l'elaborazione, il processo passa allo stato $q'$ e genera un insieme di messaggi da inviare $Send_{msg}$, che vengono aggiunti al buffer di output. Alla fine i buffer di input viene svuotato!


![[Distributed System/Images/2.png|600]]
Un processo comunica attraverso due livelli:
- Upper Layer (Input/Output): Il processo invia e riceve messaggi verso altri processi o entità applicative.
- Link Layer (Input/Output): I messaggi sono trasportati sulla rete e transitano tra i buffer di input ed output. 

Buffer:
- **Input Buffer**: Accumula messaggi ricevuti ma non ancora processati.
- **Output Buffer**: Contiene i messaggi inviati ma non ancora consegnati.
# Model: Asynchronous executions

## Execution
There is an adversary that schedule a set of events (scheduler):
- Delivery of a msg - $Del(m,i,j)$: move message $m$ from OutBuff_i to InBuf_j
- Execution of a local step - $Exec(i)$: process $i$ executes one step of its state machine.

![[Distributed System/Images/4.png]]
![[Distributed System/Images/5.png]]
![[Distributed System/Images/6.png]]
![[Distributed System/Images/7.png]]

```ad-abstract
title: Configuration Definition
A **configuration $C_t$** is a vector of $n$ components. Component indicates the state of process $j$ , that is $C_t[j]$: $(q_i,InBuff_j,OutBuff_j)$
```

![[Distributed System/Images/8.png]]

```ad-abstract
title: Execution Definition
An **execution** is infinite sequence that alternates configurations events: $(C_0,e_0,C_1,e_1,C_2,e_2,\cdots)$ such that each event $e_{t}$ is enabled in configuration $C_t$ and $C_t$ is obtained by applying $e_{t-1}$ to $C_{t-1}$.

```

![[Pasted image 20250121154144.png]]
![[Distributed System/Images/9.png]]
![[Distributed System/Images/10.png]]
![[Distributed System/Images/11.png]]
![[Distributed System/Images/12.png]]

### Fair Execution
```ad-abstract
title: Definition
Un'esecuzione $E$ è equa se ogni processo $p_i$ esegue un numero infinito di computazioni locali (gli eventi Exec(i) non sono finiti) e ogni messaggio $m$ viene alla fine consegnato (non è possibile bloccare per sempre un messaggio: deve esistere un $Del(m,x,y)$)

```

>We will always consider fair executions.
#### Local Execution (Or local view)
Given an execution $E$ and a process $p_j$, we define has local execution $(E|p_j)$ of $p_j$ the subset of events in $E$ that "impact" $p_j$.

![[Distributed System/Images/13.png]]
