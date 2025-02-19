## Asynchrnonous Systems

```ad-abstract
title: Theorem
(FLP) Consider an asynchronous system composed by
$n$ processes. If $f>0$ then consensus is unsolvable in such system.

```

The proof shows that for any algorithm there exists a run in which
you either:
- Violates a safety
- Violates livenes

## EVENTUALLY - SYNCHRONOUS

### Paxos
The Paxos provide a viable solution to consensus in eventually synchronous settings with crash failures:
- Safety (validity + integrity + agreement) is always guaranteed
- The algorithm is live (termination) only when the network behaves in a “good way” for long enough periods of time

>**Assumption**: majority of correct processes and eventually synchronous system.

Actors in the basic Paxos Protocol
- **Proposers**: propose values.
- **Acceptors**: processes that must commit on a final decided value.
- **Learners**: passively assist to the decision and obtain the final decided value

>The majority assumption is needed only on the set of acceptors.

![[207.png]]

Let us think about what the protocol should do.
- Only a value that has been proposed may be chosen.
- Only a single value is chosen.
- A process never learns that a value has been chosen unless it actually has been.

>Time(chosen) $\not =$ Time(Learned)

The easiest way to solve the problem is to have a single acceptor
- A proposer sends a proposal to the acceptor
- The acceptor choses the first proposed value it receives

What if the only acceptor fails? We must have more than one acceptor

![[208.png]]
![[209.png]]

**Multiple Acceptors**
- A proposer sends a proposal to a set of acceptors
- An acceptor MAY accept the proposed value
-  A value is chosen when a majority of acceptors accept it

The majority is needed to guarantee that only a value is chosen -> we want to preserve the algorithm invariant that a value is chosen when accepted by the majority of acceptors.

>(First try) Hypothesis: an acceptor may accept at most one value

![[210.png]]
We want a value to be chosen even if only one value is proposed by a single proposer.

>P1: An acceptor must accept the first proposal it receives

Is it ok if an acceptor refuses other proposal?

![[211.png]]

```ad-danger
title: Problem
Problem: if several values are concurrently proposed by different proposers, none of them could reach the needed majority. We have a deadlock.

```

![[212.png]]

This implies that an acceptor should accept multiple proposals.



Teniamo traccia dei diversi valori proposti assegnando loro un numero di proposta unico (ordine totale delle proposte). Una proposta sarà una coppia <round number, value>.
Un valore viene scelto quando una singola proposta con quel valore è stata accettata dalla maggioranza degli accettanti (proposta scelta).
È possibile consentire la scelta di più proposte, ma **tutte le proposte scelte devono avere lo stesso valore**.


>==$P2$==: if a proposal with value $v$ is chosen, every higher-numbered proposal that is chosen has value $v$

first majority decide the value and the next majority set must have the same value with obiviously different round number.

![[213.png]]

Affinché un valore $v$ venga scelto, una proposta che lo contiene deve essere stata accettata da almeno un acceptor:

>$P2a$: if a proposal with value $v$ is chosen, every higher-numbered proposal that is accepted by any acceptor has value $v$

What if a proposal with value $v$ is chosen while an acceptor $c$ never saw it ? A new proposer could wake up and propose to $c$ a different value $v’$ that $c$ must accept due to $P1$

![[214.png]]

We must slightly modify P2a to take into account this case:

>P2b: if a proposal with value $v$ is chosen, every higher-numbered proposal issued by any proposer has value $v$

$$P2b \Rightarrow P2a \Rightarrow P2$$
How can we guarantee $P2b$?
![[215.png]]

Supponiamo che sia stata scelta una proposta di round $m$ con valore $v$. Vogliamo un meccanismo che ci permetta di dimostrare che ogni proposta $n$, con round $n>m$, contiene il valore $v$ per induzione su $n$ assumendo che:
- ogni proposta con numero tondo compreso in $[m, n-1]$ contiene il valore $v$

Perché una proposta nel round $m$ venga scelta, è necessario un quorum $Q$ di accettatori (una maggioranza) che l'abbiano accettata.  
Pertanto, l'ipotesi che un valore sia stato scelto nel round $m$ implica che:
- Ogni accettatore in $Q$ ha accettato una proposta con numero di round $m$ e valore $v$.

Poiché qualsiasi maggioranza di accettatori $S$ contiene almeno un membro di $Q$, possiamo concludere che una proposta con numero di round $n$ ha valore $v$ assicurandoci che venga mantenuto il seguente invariante:

**P2c**: Per ogni $v$ e $n$, se una proposta con valore $v$ e numero di round $n$ viene emessa, allora esiste un insieme $S$ composto da una maggioranza di accettatori tale che:

- (a) nessun accettatore in $S$ ha accettato proposte con numero di round inferiore a nn, **oppure**
- (b) $v$ è il valore della proposta con il numero di round più alto tra tutte le proposte con numero di round inferiore a $n$ accettate dagli accettatori in SS.

$$P2c \Rightarrow P2b$$

P2c può essere mantenuto chiedendo al proposer che vuole proporre un valore numerato $n$ di conoscere il valore più alto (con numero inferiore a n, se presente) che è stato accettato.
- è stato accettato
- o che sarà accettato
da ogni accettante in maggioranza.

![[216.png]]

Prepare: acceptors ditemi se avete qualche valore gia proposto
Response: si ho round 1 con val 0
Boradcast the value returned back



```ad-danger
title: Problem
![[Pasted image 20250205220644.png]]


p3 manda proposer e gli rispondono "non abbiamo nulla"
stessa cosa viene fatta da p1
entrambi mandano due valori diversi con round diversi, NON va bene!

```

```ad-success
title: Solution

To resolve this problem: ask acceptors to promise they will not accept proposals numbered less than n

![[220.png]]
![[221.png]]

```

The protocol has two main phases:
- Phase 1: prepare request ↔ response
- Phase 2: accept request ↔ response


**Phase 1**
Proposer chooses a new proposal round number $n$, and sends a prepare request $(PREPARE,n)$ to a majority of acceptors:
- $(a)$ Can I make a proposal with number $n$?
- $(b)$ if yes, do you suggest some value for my proposal?

![[223.png]]

>Note: $n' < n$

2) If an acceptor receives a prepare request $(PREPARE, n)$ with $n$ greater than $n’$ from any prepare request it has already responded, sends out $(ACK, n, n’, v’)$ or $(ACK, n, ⊥ , ⊥)$
	- (a) responds with a promise not to accept any more proposals numbered less than $n$.
	- (b) suggests the value $v’$ of the highest-number proposal $n’$ that it has accepted if any, else $⊥$

![[223.png]]

2) If an acceptor receives a prepare request $(PREPARE, n)$ with $n$ lower than $n’$ from any prepare request it has already responded, sends out (NACK, n’)

> (a) responds with a denial to proceed with the agreement as the proposal is too old.

![[223.png]]


**Phase 2**
If the proposer receives responses from a majority of the acceptors, then it can issue an accept request $(ACCEPT, n , v)$ with number $n$ and value $v$:
- (a) $n$ is the number that appears in the prepare request.
- (b) $v$ is the value of the highest-numbered proposal among the responses (or the proposer’s own proposal if none was received).

![[224.png]]

If the acceptor receives an accept request $(ACCEPT, n , v$), it accepts the proposal unless it has already responded to a prepare request having a number greater than $n$.

![[224.png]]

**Learning the decided value**
- Whenever an acceptor accepts a proposal, it sends to all learners (ACCEPT, n, v).
- A learner that receives (ACCEPT, n, v) from a majority of acceptors, decides v, and sends (DECIDE, v) to all other learners.
-  Learners that receive (DECIDE, v), decide v

![[225.png]]

```ad-example
![[226.png]]


```

**HOW TO PICK ROUND NUMBERS?**
- se i processi sono due: assegno i round con pari e dispari
- Se i processi sono $N>2$: utilizzo il modulo $N$

## Algoritmo
![[Pasted image 20250217170322.png]]
![[Pasted image 20250217170346.png]]
![[Pasted image 20250217170404.png]]




**Dimostrazione di Paxos**
Se un accettatore $a_i$ accetta una proposta $<num=r, val>$, diciamo che  
$a_i$ ha votato per il valore $val$ nel round $r$.  

Dobbiamo dimostrare tre proprietà:  
1. Solo un valore proposto può essere scelto (facile).  
2. Un solo valore viene scelto (più difficile).  
3. Solo un valore scelto viene appreso dai learner (facile).  

Dimostreremo solo la seconda proprietà:  
Se un accettatore $a$ ha votato per il valore $v$ nel round $i$, allora nessun valore $v'$ diverso da $v$ può essere scelto in un round precedente $j < i$.  

> Questo implica (2) "Un solo valore $v$ è scelto" (in ogni round viene proposto un solo valore - perché?).  

**Affermazione**  
Se un accettatore $a$ ha votato per il valore $v$ nel round $i$, allora nessun valore $v'$ diverso da $v$ può essere scelto in un round precedente $j < i$.  

==**Dimostrazione**  ==
**Osservazione**: Se $a$ ha votato per $v$ nel round $r = i$, allora esiste un proponente $p$ che ha raccolto un insieme di ack $S$ da un quorum $Q$ di accettatori per la sua prepare($r = i$).  

La dimostrazione procede per induzione sul numero di round:  
- **Caso base**: $r = 0$. L'affermazione è corretta poiché il round $r = -1$ non esiste.  
- **Ipotesi induttiva**: L'affermazione è corretta per i round $r = 1, 2, 3, \dots, i-1$.  
- **Passo induttivo**: Analizziamo il round $r = i$. Sia $<r = j, v>$ il voto per il round più alto visto nell'insieme $Q$ (ricorda che $i > j$).  


