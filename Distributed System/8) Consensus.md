Generals must reach consensus: attack or retreat?
![[184.png]]

>Reach a consensus on what to do. 
# Single-Value Consensus Definition
Insieme di valori iniziali $\in \{0,1\}$.
Tutti i processi decideranno lo stesso valore $\in \{0,1\}$ in base alle proposte iniziali.

![[185.png]]

# Consensus: In synchronous systems algorithm

## Consensus specification
![[186.png]]
liveness: C1
Safety: C2, C3, C4
### Execution 
==Correct Execution==
![[187.png]]

This is not correct because they decide a value that is not proposed yet! (violate the validity)
![[199.png]]

**Violated run 1**
È stata violata la proprietà di agreement (p4 correct)
![[188.png]]

**Violated run 2**
Violata C3  
![[189.png]]

**Violated run 3**
Violate the termination property: $P1$ does not decide a value
![[190.png]]

**Violated run 4**
Violata la proprietà di validity
![[191.png]]

Violated run? No, because $p2$ and $p4$ choose different value but crashes.
![[192.png]]
This is not correct. $P4$ decide a value that is not propose yet!
![[193.png]]

>Which technique can we use?

## Leader Based Strategy
Leader imposes consensus:
![[194.png]]

Upon crash, new leader is elected ad new impose
![[195.png]]

```ad-danger
title: Problem
The leader $1$ imposed $1$ on $p4$, then it crashes and $p2$ imposes $2$ on others.

![[196.png]]


```

## Hierarchical Consensus
==Idea==: A livello locale, un nuovo round $r$ inizia quando: 

$N$ round = $N$ process
The leader of round $1$ is $p1$ and so on

$P1$ is the leader and he decide his value. after that it send a message to the other process to change their mind.
$P3$ and $P4$ receive the value and changes his value. Then i go to a new round.

A new round start (means election to another leader) in two different cases:
1. You received the messages from the leader of the previous round 
2. You detect that the leader of the previous round is dead, so elect new one

```ad-important
title: The **first correct leade**r impose on all the correct processes
since to decide you have to go to the new round, if you go to the new round you have to receive the message from correct leader. If you received the message from the correct leader your idea changed to the value of the correct leader so when you will be the leader of the round you cannot decide a different value, is impossible. Because you receive the message from the first correct leader

```



![[202.png]]
![[198.png]]

### Hierarchial Consensus Algorithm
![[200.png]]

#### Correctness
- **Integrità**: Esiste una sola linea in cui si decide. Questa linea è protetta da una variabile booleana `Broadcast False`, che viene impostata su `True` all'interno del gestore. Di conseguenza, può essere eseguita al massimo una volta.

- **Validità**: Puoi decidere solo il valore della tua variabile di proposta. Tale variabile può essere impostata in due punti:  
	- Nel gestore `propose` -> questo significa che viene proposto un valore da te stesso.  
	- Nel gestore `BebDelivery` -> in questo caso ricevi una variabile di proposta da qualcun altro, quindi è stata proposta da qualcuno (vedi punto precedente).  

- **Terminazione**: Per induzione sull'id del processo.  
	- Caso base: $id=1$ decide o si arresta -> $round 1=id=1$, quindi il gestore utilizzato per decidere viene eventualmente eseguito o il processo si arresta.  
	- Ipotesi induttiva: un processo con $id=k-1$ si arresta o termina.  
	- Caso induttivo $id=k$: Per ipotesi induttiva, tutti i processi con $id$ in $1..k-1$ o terminano o si arrestano. Questo implica che il gestore che incrementa il round sarà vero per tutti i round in $1..k-1$. Di conseguenza, il round sarà eventualmente $k$. A questo punto, come nel caso base, o decido o mi arresto.  

- **Accordo**:  
	- Sia $p_i$ il processo corretto con ID minimo.  
	- Nessun processo andrà al round $i+1$ senza aver ricevuto il messaggio di decisione da $p_i$ (ricorda che $p_i$ è corretto).  
	- Questo significa che, affinché un processo aggiorni il proprio round a $i+1$, deve impostare la proposta sulla stessa proposta di $p_i$.  
	- Di conseguenza, ogni processo con ID maggiore di $p_i$ decide la stessa proposta di $p_i$. Ricorda che non accetterai, nel round $i+1$, messaggi da leader precedenti.  
	- L'ID di $p_i$ è il minimo, quindi questo insieme contiene tutti i corretti.  


**Performance Messages**
$O(N^2)$ messages: 
- We have n rounds, in each round the leader Beb-Broadcast: $n$ messages $x$ $n$ rounds

**Performances communication steps**
- $O(N)$ fixed, does not depend on $f$.


## Uniform Consensus Specification 
![[201.png]]

>Does the previous algorithms satisfy the Uniform Consensus specification?NO!

![[203.png]]
![[205.png]]

### Uniform Hirerarchical consensus
![[206.png]]

### Correttezza  

- **Integrità e Validità**: La stessa dimostrazione dell'algoritmo gerarchico non uniforme.  

- **Terminazione**: Per induzione sugli ID, simile all'algoritmo precedente:  
	- **Caso base ID=1**: Per il BebCast e il rilevatore di fallimenti perfetto, se $p_1$ è corretto, esegue eventualmente il `reliableBroadcast` di Decided e lo consegna terminando.  
	- **Ipotesi induttiva, ID=k-1**: Termina o si arresta.  
	- **Passo induttivo ID=k**: Se un processo con $ID \leq k-1$ è corretto, allora termina attraverso un `ReliableDelivered` di un messaggio Decided; per la proprietà del reliable broadcast, se sono corretto riceverò anch'io un messaggio Decided e terminerò. Se tutti i processi con $ID \leq k-1$ si arrestano, allora, per la proprietà di $P$, passo al round $r=k$. Poiché il mio $ID$ è $k$, mi arresto o termino come dimostrato nel caso base.  
- **Accordo uniforme**: Sia $p_i$ il primo processo che decide; allora ha ricevuto gli acks da tutti i processi corretti (ogni processo ha $proposed[i]=v$, dove $v$ è il valore deciso da $p_i$). Abbiamo due casi:  
	- **$p_i$ è corretto** -> gli altri processi ricevono il messaggio Decided da $p_i$ e devono decidere lo stesso valore.  
	- **$p_i$ si arresta** -> tutti i processi che passano al round $i+1$ impostano $proposal=v$. I processi che decidono nel round $i$ decideranno ricevendo il messaggio Decided di $p_i$, che contiene anche $v$.  

**Message Complexity**
Message complexity 
- $(1Beb + 1 Rb)*(f+1)$
Step complexity 
- $2$ delays for each leader failed, and $3$ for each leader that succeeds in sending and delivering one decided = $O(f)$

## CONSENSUS: IN SYNCHRONOUS SYSTEMS, LOWER BOUND ON TIME

Remember the equivalence between round-based model and synchronous system (Failure-Detector Lecture)

>NB: this round is different from the concept of round used in the previous algorithm

Synchrony assumptions are abstracted by assuming:
- Processes switch rounds exactly at the same time.
- If I a correct process send a message to a set of processes at the beginning of round r, the messages will reach all correct processes in the set by the end of round r.

### Full-Information Protocol
In a Full-Information Protocol (FIP) at each round, each process sends its entire states
to others (broadcast). Each synchronous protocol (or algorithm) can be expressed as a FIP. Intuition: With FIP each process collect all possible information on the system, it builds a view of the system and then decides locally.

![[339.png]]

Consensus FIP - ASSUME you cannot used processes ID in the algorithm:
- Broadcast my set of proposed values (initially, just my value) to all at the beginning of round $r$
- Collect all messages at the end of round $r$ and updates proposed value as union of the received message.
- At round $r=k$ take the maximum value in the proposed value set and decides.

![[340.png]]

```ad-question
What is the good value for $k$ in a system with $f$ failures to solve uniform consensus?

```

What happens with 1 failure? Note that using min instead of max does not save you

![[341.png]]
![[342.png]]

But if $f=1$ at the end of round $2$, I know that everyone alive has my same set

![[343.png]]
![[344.png]]

```ad-abstract
title: Theorem
Given a synchronous system with $f$ crash failures and $n$ processes. There exists no algorithm that terminates in less than $f+1$ rounds, and so there exists no algorithm that has a step complexity of $f$ or less

```


![[345.png]]
