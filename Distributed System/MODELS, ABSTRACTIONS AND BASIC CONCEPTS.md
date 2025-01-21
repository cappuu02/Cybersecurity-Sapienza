
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

Different executions could give the same local exec.
![[Distributed System/Images/14.png]]

>We say that p_1 (and p_2) cannot distinguish E from E’.

**Indistinguishability**
It is not hard to see that: $\forall p_j \in \pi, \hspace{0.5cm} \epsilon \mid p_j = \epsilon' \mid p_j$
In this case we say that $E$ and $E’$ are indistinguishable.

```ad-abstract
title: Theorem
In the Asynch model there is no distributed algorithm capable of reconstructing the system execution.

```


# Synchronous vs Asynchronous
In this course we will see three definitions of synchrony:
- Asynchronous system
- Eventually sinchronous 
- Synchronous system

>A system is synchronous if there is fixed bound on the delay of messages.

## Model Failures
We have two main models:
- Crash-Stop Failure
- Byzantine Failure

>$Crash(p_j)$: after this event, process $p_j$ does not execute any local computation step (no Exec(j)).

![[Distributed System/Images/15.png]]

>Byz(p_j): after this event process p_j behaves in an arbitrary way (when we have Exec(j) we do not follow anymore the automaton of p_j).

![[Pasted image 20250121161940.png]]

This is the relationship between the two models:
![[Distributed System/Images/16.png]]

```ad-abstract
title: Correct Process
We say that a **process is correct** if it does not experience a failure (but we do not know who is correct).

```

We indicate with $f$ the maximum number of processes that can experience a failure event in an execution. $f$ cannot be more than $n-1$. We never do assumptions on when a failure event happens.

# ABSTRACTIONS, PSEUDO-CODE CONVENTIONS AND OUR FIRST ALGORITHM
## The road to build a distributed system
- Step 1: Define a system model
- Step 2: Formalize a problem/object with an abstraction
	- understand how to design an abstract formal object that captures the problem that you want to solve.
- Step 3: Implements the abstraction with a distributed protocol
- Step 4: Prove that the protocol implements the abstraction

## Abstracting a real communication link
**Descrizione informale**: Abbiamo un collegamento che perde messaggi con una certa probabilità $pr$,
il canale può duplicare un messaggio un numero finito di volte e non crea
messaggi dal nulla.

Un collegamento espone due eventi:
- **Richieste**: <Invia | $q,m$> invia un messaggio m al processo $q$.
- **Indicazione**: <Consegna, $p,m$> consegna il messaggio m dal processo $p$.

Properties
- **FL1**: (Fair-loss) Se un processo corretto $p$ invia m infinitamente spesso a un processo $q$, allora consegna $m$ un numero infinito di volte. (_Liveness_)
- **FL2**: (Duplicazione finita) Se un processo corretto $p$ invia m un numero finito di volte a $q$ allora q non può consegnare m un numero infinito di volte.
- **FL3**: (Nessuna creazione) Se un processo q consegna un messaggio $m$ con mittente $p$, allora m è stato inviato da $p$ a $q$. (_Saftey_)

**Fair-Lossy Link**
![[Distributed System/Images/17.png]]


All properties fall in two classes: Safety or Liveness

A **safety property** is property that if violated at a time $t$, it can never be satisfied after $t$. Formally, if a safety property is violated in execution E, there is a prefix E’ of E suc that any extension of E’ also violates the property. Formally, the safety property, state that something bad cannot happen.
	Once a process $q$ delivers a message $m$ that was ot sent by anyone FL3 is violated forever.
	E = (e_1, e_2, e_3, **e_4**, e_5)
	E' = (e_1, e_2, e_3, **e_4**)

A Liveness property is property that cannot be violated in finite executions:
Formally, given any finite execution E that does not satisfy a liveness property there
is an extension of E that satisfy it. Informally, a liveness property specify that something good will happen.
	If p sent a message m, and q has not delivered it at time t, there is always hope that it can deliver it at time t+\Delta.
	$E=(e_1,e_2,e_3,e_4,e_5)$
	$E’=(e_1,e_2,e_3,e_4,e_5, del(p,q,m))$

**FL2 satisfy the liveness property**:
It cannot be violated in finite execution.
$E=(del(p,q,m),del(p,q,m),del(p,q,m),...,del(p,q,m))$
$E’=(del(p,q,m),del(p,q,m),del(p,q,m),...,del(p,q,m),e_1,e_2,e_3,....)$
Such that no $e_j$ is $del(p,q,m).$

### Other Properties
**Mutual Exclusion**: se a un processo $p$ viene concessa una risorsa $r$ al tempo $t$, allora nessun altro processo $q$ riceve $r$ al tempo $t$.
**No-deadlock**: se $r$ non è già stata concessa, alla fine qualcuno ottiene una concessione sulla risorsa $r$.
**No-starvation**: se un processo $p$ richiede una concessione sulla risorsa $r$, alla fine la otterrà.

## Algorithms: Communication Links
Let us go back on our Fair-Lossy Link, and let us fix these:
- **FL1**: (Fair-loss) Se un processo corretto **$p$ invia m infinitamente spesso** a un processo $q$, allora consegna $m$ un numero infinito di volte. (_Liveness_)
- **FL2**: (Duplicazione finita) Se un processo corretto $p$ invia m un numero finito di volte a $q$ **allora q non può consegnare m un numero infinito di volte**.
Into these:
- SL1: (Stubborn-delivery) If a correct process p sends m to q, then q delivers m an infinite number of times
While we keep:
- FL3: (No creation) If some process $q$ delivers a message $m$ with sender $p$, then $m$ was sent by $p$ to $q$.

### Our First Algorithm
![[Distributed System/Images/18.png]]

▪I protocolli  in questo corso sono presentati in pseudo-codice
▪Lo pseudo-codice riflette un modello di elaborazione reattiva in cui:
	▪i componenti dello stesso processo comunicano scambiando eventi
	▪l'algoritmo è descritto come un set di gestori di eventi
	▪i gestori reagiscono agli eventi in arrivo e possono eventualmente innescare nuovi eventi.
	▪I gestori sono atomici. Possono essere interrotti solo in caso di crash.

Events:
- **Request**: $<Send \mid q,m>$ send a message $m$ to process $q$.
- **Indication**: $<Deliver \mid p,m>$ delivers message $m$ from process $p$.
Properties:
- **SL1**: (Stubborn-delivery) If a correct process $p$ sends $m$ to $q$, then $q$ delivers m an infinite number of times
- **FL3**: (No creation) If some process $q$ delivers a message $m$ with sender $p$, then m was sent by $p$ to $q$.

![[Pasted image 20250121165721.png]]

#### Proof of FL3
Suppose process $q$ executing our algorithm receives message $m$ that was not sent by $p$.
**Fact 1**: If $q$ delivers a message, then it delivers here:
![[Pasted image 20250121170139.png]]
Fact 1 implies that fll, is delivering a message that was not sent by $p$. 
This implies that fll is not fair-lossy. This contradicts our hypothesis: fll is fair-loss

#### Proof of SL1
**SL1**: (Stubborn-delivery) If a correct process $p$ sends $m$ to $q$, then $q$ delivers m an infinite number of times.

Proof by reduction. Suppose $q$ delivers $m$ a finite number of times.
**Fact 1**: $p$ sends $m$ on fll an infinite number of times:
![[Distributed System/Images/19.png]]
**Fact 2**: if q "stubborn delivers" m a finite number of times, then delivered m a finite number of times.
![[Distributed System/Images/20.png]]

**IMPROVING STUBBORN**
Properties:
- SL1: (Stubborn-delivery) If a correct process p sends m to q, then q delivers m an infinite number of times
- FL3: (No creation) If some process q delivers a message m with sender p, then m was sent by p to q.
In:
- PL1: (Reliable delivery) If a correct process p sends m to q, then q eventually delivers m.
- PL2: (No duplication) A message is delivered at most once.
- FL3: (No creation) If some process q delivers a message m with sender p, then m was sent by p to q.

## Perfect P2P Link
![[Distributed System/Images/21.png]]

### Perfect P2P Link Proof FL3
Proof by contradiction:
SUpose process $q$ executing our algorithm receives message m that was not sent by p.
Fact 1: If q delivers a message, then it delivers here:
![[Distributed System/Images/22.png]]
This implies that sl delivered a message that was not created. Violates the hypothesis that sl is a stubborn.

### Perfect P2P Link Formal Proof
==PL2==: (No duplication) A message is delivered at most once.
Fact 1: The pp2p-delivery of a message is "guarded" by an if m $\in$ delivered:
![[Pasted image 20250121173110.png]]
Suppose $m$ is delivered twice, at time $t$ and $t’$ (with $t< t’$).
At time t the delivery handler is executed. Since the handler is atomic we have that delivered:=delivered $\cup$ {m} is executed before $t’$ Therefore, at $t’$ m is in delivered, this contradict the fact that trigger $<pl, deliver \mid P, m>$ is executed at (or after) time
$t’$.


==PL1==: (Reliable delivery) If a correct process $p$ sends $m$ to $q$, then $q$ eventually delivers $m$.
Suppose, $p$ sends $m$ and $q$ does not deliver it. There could be two reasons for $q$ to not deliver $m$:
Reason 1: $m$ is in delivered when the delivery handler is executed
![[Distributed System/Images/23.png]]
- If $m$ is delivered then, $q$ eventually will execute trigger <pl Deliver \mid p,m>. This contradicts the fact that q does not deliver m.
Reason 2: the delivery handler is never triggered with $<p,m>$
- This means that sl is not stubborn. Violating our hypothesis.
