
Byzantine processes could behave in an arbitrary way.

**Assumption**: modello di round sincrono
- Fixed delay
- Se un processo corretto invia un messaggio al round $0$, ogni destinatario corretto lo riceve entro la fine del round $0$. (Nessun ritardo nei messaggi).  

![[327.png]]  
## Consensus with crash failures
![[328.png]]  

 Property of ==Validity==
- (Validità dell'input corretto) Se un processo decide $v$, allora $v$ è stato proposto da un processo corretto.  
- Cosa succede se il processo Bizantino si comporta correttamente ma falsifica il suo valore di input? In molti casi, è impossibile distinguerlo da quello corretto.  

**Validità totale (o validità debole)**: Se tutti i processi corretti iniziano con il valore $v$, allora il valore di decisione deve essere $v$. Questo ha senso in alcune applicazioni: si pensi ai sensori, se tutti i sensori corretti leggono lo stesso valore, dobbiamo deciderlo.  

>All the others properties remains the same!
## Bizantine Agreement Problem
**Events**: 
- Propose(V) 
- Decide=V 

**Properties**: 
- **Termination**: Every correct eventually decides some value
- **All-same validity (Weak validity)**: If all correct processes propose $v$, the only decision is $v$. 
- **Integrity**: No correct decides twice. 
- **Agreement**: All correct decides the same value

```ad-info

Dimostreremo la prova formale dell'impossibilità di risolvere Byzantine Agreement (BA quando $n=3f$ (quando non ci sono firme digitali). Mostreremo the king algorithm che risolve BA purché $n=3f+1$.  
```

> **IMPORTANTE**: Assumiamo canali autenticati (MAC) ma nessuna firma digitale.  

Impossibilità del consenso in sistemi sincroni con canali autenticati quando $N=3F$ (o meno). Quando sono disponibili firme digitali, è possibile tollerare $f < N/2$ guasti.

## Impossibility for $3$ processes if one bizantine
```ad-summary
title: Statement
Consider a synchronous system with authenticated channels composed by $3$ processes. It is not possible to solve consensus if one of the processes is byzantine.

```

**Proof**: The proof is by contradiction we assume that an algorithm $A$ exists and tolerates $1$ bz failure in a system of $3$ process. We will show that $A$ is not able to satisfy all the properties of the specification. The proof uses a “**scenario argument**”

----

## Scenario - 6 Processi
![[329.png|600]]
Abbiamo un algoritmo **A** eseguito su un sistema **S** di **6 processi** disposti in un anello. Tutti i processi in **S** sono corretti. Tuttavia, **A non è stato progettato per S**, quindi il suo comportamento potrebbe essere arbitrario.

>Una violazione di proprietà in **S** non implica necessariamente che **A sia errato**.

### **Passaggio 1: Dimostrazione della terminazione**
Dobbiamo dimostrare che **ogni processo in $S$ termina**. Questo **non è garantito**.

![[330.png|600]]

- Supponiamo che il processo **P2 grigio non termini**.
- Se ciò avviene, possiamo costruire un sistema **B ridotto** con **3 processi**, di cui **uno bizantino** che simula il resto di **S** (==Byz = simula tutti i processi nel yellow cut==).

Il comportamento del processo bizantino è **ben definito**:
- Se **P1 blu in S** invia un messaggio **m** a **P3 al tempo t**, allora il processo bizantino in **B** farà lo stesso.
- Se **P1 grigio in S** invia un messaggio **m' a P2 al tempo t'**, il processo bizantino in **B** farà lo stesso.

Possiamo replicare questo algoritmo per ogni processo in $S$!

✅ **Facts 1:** Nel sistema **S**, ogni processo termina ed emette un valore di decisione.


### **Passaggio 2: Decisione di P2 e P3 grigi** 

![[330.png|600]]

- **P2 grigio in S** non può distinguere **S da B**.
- In **B**, **P2 e P3 sono corretti** e propongono **0**.
- Quindi, **P2 deve decidere 0 in S**.
- Lo stesso vale per **P3 grigio**.

✅ **Facts 2:** **P2 e P3 emettono il valore di decisione 0 in S**.
### **Passaggio 3: Decisione di P1 e P3 blu**

![[331.png]]

- Costruiamo un sistema **B'** e ripetiamo il ragionamento precedente.
- In **B'**, i processi bluastri **P1 e P3** **devono decidere 1**, perché **non possono distinguere B' da S**.

✅ **Fatto 3:** **I processi bluastri P1 e P3 devono decidere 1 su S**.

### **Passaggio 4: Contraddizione**
![[332.png]]
Sul sistema $S$ possiamo identificare due tagli:
- Il **taglio verde** indica che **P2 e P3 grigi decidono 0**.
- Il **taglio rosso** indica che **P1 e P3 bluastri decidono 1**.

🚨 **Contraddizione:** Abbiamo processi nello stesso sistema che decidono valori diversi! Questo **viola la proprietà di agreement dell’algoritmo **A**.
### **Passaggio 5: Caso Generale**
![[334.png]]

Costruiamo un sistema **B''**, dove:
- **P3 grigio e P1 bluastro** emettono lo stesso output che emettono in **S**.
- **B'' non è distinguibile da S**.
- Questo implica che **P3 grigio emette 0 e P1 bluastro emette 1**.

🚨 **Contraddizione:** P3 grigio e P1 bluastro **violano la proprietà di agreement in B''**, quindi **A non è corretto su B''**.

✅ **Conclusione:** **Non esiste un algoritmo di consenso con validità all-same per 3 processi se uno è bizantino**.

>POSSIAMO ITERARE QUESTO PER QUALSIASI ROUND R

## **Passaggio 7: Caso Generale con n = 3f**
Il ragionamento si estende a **qualsiasi numero di processi**:
- Se **n = 3f**, possiamo usare lo stesso metodo per dimostrare che **non può esistere un algoritmo di consenso corretto**.

📌 **Regola fondamentale:** In un sistema sincrono con **canali autenticati**, **non esiste un algoritmo che risolva il consenso se un terzo o più dei processi sono bizantini**.

🔴 **Conclusione Finale:** Se **f < N/3**, il consenso è possibile; altrimenti, **è impossibile**.

>**RICORDA**: Con i fallimenti di tipo crash eravamo in grado di tollerare qualsiasi numero di fallimenti in un Sistema Sincrono (usando $P$)

## Introduction to the King Algorithm
Solve byzantine agreement in a Synchronous systems when we have authenticated channel (no public key property). 

If the number of correct is at least $3f+1$ is possible to solve byzantine agreement. 
**This algorithm can be seen as an adaptation of Hierarchical consensus for byzantine failures**. The king algorithm works in synchronous, when $f < n/3$ and when no signatures are available. **Authenticated channels - MAC are needed**.

## The king algorithm
The king algorithm runs for $f+1$ phases.
- In each phase $j$ there is a king. One way is for the king of phase $j$ to be the node with $id=j$. 
- Each node keep a variable $x=$ to its proposal at the beginning. 
- Variable $x$ is updated during the algorithm. 
- At the end of phase $f+1$ (algoritmo ha al max $f+1$ fasi), each correct decides variable $x$.

Each phase (that has a unique leader) is divided in the following $3$ rounds:
- ==vote round==: Ogni processo corretto trasmette $x$, ovvero il proposal.
- ==Round di proposta==: Ogni processo corretto trasmette un valore $y$ se è stato ricevuto almeno $n-f$ volte nel turno di votazione. Alla fine del turno di proposta un processo corretto aggiorna il suo valore $x$ a $z$ se vede $z$ proposto almeno $f+1$ volte.
- ==Round del re==: Il re è l'unico a trasmettere il suo valore $x$. Alla fine del round del re un nodo imposta il suo valore sul valore del re se durante il round di proposta nessun valore è stato visto $n-f$ volte.

Esempio (processi inviano lo stesso valore)
![[Pasted image 20250202150610.png]]


Esempio (processi inviano valori diversi)
![[Pasted image 20250202152505.png]]
![[Pasted image 20250202152518.png]]

```ad-question
Se $P1$ era corretto e non byzantine allora avrebbe funzionato dato che, essendo un correct process, avrebbe inviato lo stesso valore a tutti.

```

Intuitively the king algorithm has the following mechanisms inside:
-  **Mechanism 1 - All same no change of idea (Implemented in Vote-Propose rounds)**: If all correct processes have the same value for $x$, they detect this during Vote-Propose round and they do not get influenced by a byzking and other byzantines.
- **Mechanism 2 - Not All Same**: Correct King imposes value (implemented in the king round) -> if corrects disagree the correct king imposes agreement.

### Algorithm
![[Pasted image 20250202154016.png]]

==Events==:
- **Propose($V$)**
- **Decide = $V$**
==Properties==:
- **Termination**: Every correct eventualy decides
- **All-same Validity (Weak validity)**:  If all correct processes propose $v$, the only decision is $v$.
- **Integrity**: No correct decides twice
- **Agreement**: All correct decides the same value

### Proof

#### Termination
```ad-tip


Termination is immediate from the structure of the algorithm, each correct decides at round $f+1$ and terminates
```
#### Integrity
Integrity is immediate from the fact that there exist a single line where a correct decides and this line can be executed just once. 

#### Validity and Agreement
We have to show: 
- **Validity** $\to$ if all correct starts with $v$ they have to decide $v$. 
- **Agreement** $\to$ no two correct process decide differently.


```ad-abstract
title: Theorem 1
If all corrects starts with the same value $v$, then $v$ is decided

```

**Proof** (**Mechanism 1**):
- Each correct broadcast $v$ at the vote round. Each correct sees v voted $n-f$ times (note that a value voted only by the Byz has at most $f$ votes). 
- Each correct proposes $v$ at the propose round. 
- Each correct sees $v$ proposed $n-f$ times 
- Each correct ignores the king round and keeps its value to $v$. 
- **At phase $f+1$ each correct decides $v$**

```ad-abstract
title: Lemma 1
If a correct process $p$ proposes a value $x$ in a phase (propose phase), no other correct $p'$ proposes a value $y$ different than $x$. Two correct processes can never disagree!

```
 
**Proof** (**Mechanism 2**):
If $p$ proposes $x$, then $N-2f$ votes seen are from correct. 
If $p'$ proposes $y$, then $N-2f$ votes seen are from correct. 
This implies that $N>=2(N-2f)+f$, $N>=2N-3f$ (but $3f < N$), so $N>=N+\epsilon$. Contradiction.

![[Pasted image 20250202160503.png]]

```ad-abstract
title: Lemma 2
There is a phase with a correct king.

```

**Proof**: 
There $f$ failures and $f+1$ phases, in each phase we pick a different king any set of $f+1$ processes contains at least a correct process.

```ad-abstract
title: Observation 1
Only a single value can be proposed more than $f+1$ times.

```

**Proof**:
By Lemma $2$ we have that all correct process propose the same value. Suppose there are two values $v$ and $v’$ each proposed $f+1$ times. Then there is a correct that proposes $v$ and a correct that propose $v’$. By Lemma $2$ we have $v=v’$.

```ad-summary
title: Lemma 3
After a phase with a correct king, all correct processes have the same value.

```

Proof:
The correct king sends the same value to each process. All correct that change their proposal to the one of the king get the same value. It remains to show what happen to a correct process $p'$ that do not accept the value of the king (let $p$ be the king). $P’$ does not accept the value if it has seen a value $v$ proposed $n-f$ times in the propose phase. This means that $v$ has been proposed by $n-2f$ correct processes (at least) $n-2f>f+1$ (recall $n>3f$). This implies that $v$ has been seen at least $f+1$ time by each correct in the system. This implies that at the end of the propose round all correct have set their value to $v$ (also the king $p$) (see Obs. $1$). Thus $p’,$ even if does not accept the value of the king, has the same value $v$ of the king (that he sets at line $8$).

![[Pasted image 20250202160211.png]]
![[Pasted image 20250202160225.png]]
![[Pasted image 20250202160236.png]]
![[Pasted image 20250202160249.png]]

```ad-abstract
title: Theorem 2
The king algorithm respects the agreement property. 

```

**Proof**:
From Lemma $3$ and Lemma $2$.


![[Pasted image 20250202160335.png]]