## Execution
two main models of process failures:
- Crash-Stop Failure
- ==Byzantine Failure==

Byz($p_j$): after this event process $p_j$ behaves in an arbitrary way (when we have $Exec(j)$ we do not follow anymore the automaton of $p_j$).

![[310.png]]

```ad-example
title: What append?
Supponiamo che in ogni processo è in esecuzione un algoritmo di broadcast ma, ad un certo momento, il processo $P1$ diventa bizantino dunque l'algoritmo di broadcast si blocca e al suo posto parte un arbitrary algorithm (process start to do the worst possible action to make the distributed algorithm failed).

Byzantine failure: worst possible failure that can append.

Quando un processo $P1$ diventa bizantino potrebbe anche decidere di non fare nulla ma continuare ad esistere (from the outside is equal to crash, infact a crash-stop failure is a specific case of byzantine failure).

```

![[336.png]]

```ad-question
Suppose we have a system with an algorithm with $N=10$ processes and can tolerate $f=3$ byzantine failures. It's true that this algorithm, let's call it $A$, tolerate also the same number of crash-stop failures? Yes, because crash stop is a specific case that is included!

The contrary is not true!

```

```ad-question
Suppose we have an algorithm for byzantine failures $A$ that can tolerate 3 byzantine failures. Works in a system which three process start work in a byzantine way (arbitrary message) and one process crash-fail? No, because the number of failures become four so, the correct are $N-4$.

Algorithms tolerate $f$ byzantine failures means that tolerate $f$ failures, this failures can be byzantine, bit crash-stop. Does not tolerate $f+c$ failures where $c$ of them crashed, It stop work!!

```

I processi bizantini possono:
- deviare arbitrariamente dalle istruzioni che un algoritmo gli assegna
- creare messaggi falsi
- droppare i messaggi
- ritardare le consegne
- alterare il contenuto dei messaggi
- agiscono come se stessero deliberatamente impedendo all'algoritmo di raggiungere i suoi obiettivi.
Anche l'asincronia è sotto il controllo dei bizantini:
- Possono ritardare i messaggi sui canali p2p.


 >ASSUMIAMO CHE TUTTI I PROCESSI BIZANTINI COLLABORINO IN MODO MALIGNO CON LO SCHEDULER DEI MESSAGGI, PUR MANTENENDO LA GARANZIA CHE OGNI MESSAGGIO VERRÀ PRIMA O POI CONSEGNATO.

## Byzantine power
Synchronous system
Assume we have single byzantine process and a crash-failure.

Take even a single byzantine process. Assume it can send messages faking an arbitrary sender… then it can entirely decide the local view of a process p3 (when channels do not have bounds on delay).

![[311.png]]
$P4$ è il processo bizantino che può impersonificare un sender ed inviare messaggi per contro di altri processi.

>So, Authentication is necessary.

## Cryptography Abstractions 1
We need cryptographic mechanisms:
- **Hash functions**
- **Message Authentication Codes**

There is a distributed oracle Authentication:
- **Authenticate Operation**: any sender process $p$ invokes the oracle call with message $m$ and destination $q$ and it obtains a special object $a$.
- Verify Operation: Any receiving process $q$ invokes the orale call with message $m$, sender $p$ and object $a$. The oracle answer yes if and only if the $p$ previously invoked authenticate on $m$ with destination $q$, and it obtained object $a$. Otherwise, it answer no.

![[Pasted image 20250201160802.png]]

**We need cryptographic mechanisms:** ==Public signatures==
- **Sign Op**: Any sender process $p$ invokes the oracle call with message $m$ and it obtains a special object $s$
- **VerySign OP**: Any process q invokes the oracle call with message m, sender p and object s. The oracle answers yes if and only if the p previously invoked sign on m, and it obtained object $s$. Otherwise, it answers no.

![[Pasted image 20250201160813.png]]

## Authenticated Perfect Link
![[312.png]]
![[313.png]]

```ad-question
In the autheticity properties why $p$ must be correct?

```
 
## Uniform Consensus Specification
![[314.png]]

### Faulty State
NOTA: un processo bizantino può agire arbitrariamente e nessun meccanismo può garantire qualcosa che ne limiti le azioni.
1) Non definiamo alcuna variante “uniforme” delle primitive nel modello di fallimento bizantino.
2) Nessuna proprietà può essere applicata ai processi difettosi. Ad esempio, nel consenso possono decidere più di una volta, possono consegnare messaggi arbitrari in pp2p, ...

**Che dire del rilevatore di guasti? ** Non può esistere.
## Byzantine Broadcast
Broadcast is a fundamental primitive, and it is used in a set of applications.
When we have seen crash failure a key achievement has been to create a broadcast property with an agreement property:
- Regular Reliable $\to$ If a correct delivers a message m, then all corrects deliver m. (all-or-nothing-semantic)

![[315.png]]
![[316.png]]

```ad-failure
title: Problem
In questo caso un Byzantine sender può inviare in broadcast due tipi di messaggi differenti a tutti i processi corretti e dunque creare confusione.

```

```ad-success
title: Solution
PER COSTRUIRE UNA PRIMITIVA DI BROADCAST CHE IMPEDISCA AL BYZANTINE DI FAR SÌ CHE PROCESSI ONESTI CONSEGNINO MESSAGGI DIVERSI:

- **FASE 1**: Costruiamo una primitiva di broadcast (Consistent Broadcast) in cui con un byz. Bcaster un processo onesto o non consegna alcun messaggio, o se consegna un messaggio m, allora nessun altro corretto consegna un messaggio diverso da m.

- **FASE 2**: Costruiamo un Broadcast più potente (Byzantine Reliable Broadcast),  in cui abbiamo una semantica “tutto o niente”: quando il Bcaster è byz.  nessun processo corretto consegna un messaggio, oppure tutti i processi corretti consegnano lo stesso messaggio.  stesso messaggio.
```
### Byzantine Consistent Broadcast
![[317.png]]
#### Tentative 1
Un processo bizantino può inviare due tipi di messaggi $m$ o $m'$
Tramite gli echos riusciamo a garantire una soglia che ci permette di evitare che il processo bizantino confonda i vari processi.
![[337.png]]
Questo non soddisfa le proprietà dato che tre processi corretti consegno messaggi differenti!
#### Tentative 2
![[319.png]]
![[320.png]]
![[321.png]]
![[322.png]]
![[Pasted image 20250201174046.png]]![[Pasted image 20250201174052.png]]
You know that a correct can see at most one message Different! (one byz).
1) `[m’,m’, m, m]` no deliv. (safe)
2) `[m’,m,m,m]` ame deliv.(safe)
3) `[m’,m,m]` (no del.) or `[m,m,m]` (same del).
4) (impossible `[m’,m’,m]`) why?

Why not $4$ echoes? If the byz does not echo (or does the echo of a different message) no one delivers even if sender is correct!

#### Generalise
What happens if $f$ is an arbitrary value? (assuming $f<n/3$). What is the threshold $k$ of echoes we have to see?

echoes are votes for a certain message:
- A byzantine could give a different vote to each honest process;
- An honest process gives the same vote to everyone;

Suppose $p$ delivers message $m$ that reaches threshold $k$. Then it means there is a set $V_m$ of $k$ processes that voted $m$

Suppose $p’$ delivers $m’$ that reaches threshold $k$, then there is a set $Vm’$ of $k$ processes that voted $m’$.

if $V_m \cap V_m' = f + 1$ then the same honest process voted in both set, this implies $m = m'$. 
$$k > \frac{N + f}{2} = k \ge \frac{n+f+1}{2} \hspace{0.9cm} \text{sostituendo} \hspace{0.9cm} k \ge \frac{4+1+1}{2}=3$$

![[Pasted image 20250201174131.png]]
![[Pasted image 20250209213057.png]]

#### Byzantine Consistent Broadcast Algorithm
![[Pasted image 20250131162221.png]]

##### Proof
**Validity**: 
Se il mittente è corretto, allora almeno $N - f$ processi riceveranno il messaggio $m$ e faranno l'**echo** di $m$. Affinché gli altri processi possano **deliverare** $m$, devono ricevere almeno **$(N+f)/2$** messaggi **echo(m)** (soglia fissata dall'algoritmo).

La condizione per garantire questo è:
$N - f > \frac{N+f}{2}$
Risolvendo questa disuguaglianza:
$N > 3f$


**No duplication**: Immediate from the auth. channel. (thanks also to the variable delivered)

**Integrity**: Immediate from the auth. channel

**Consistency**: 
La **consistenza** garantisce che se un processo corretto consegna un messaggio $m$, allora tutti gli altri processi corretti che consegnano **devono** consegnare lo stesso $m$.

Un processo può **deliverare** $m$ solo dopo aver ricevuto **più di** $(N+f)/2($ messaggi **ECHO(m)**. Questo valore rappresenta un **Byzantine quorum**.

#### **Proprietà del Byzantine quorum**
- Qualsiasi due **Byzantine quorum** devono sovrapporsi in **almeno un processo corretto**.
- La sovrapposizione tra due quorums è di almeno $f+1$ processi.
- Poiché ci sono al massimo $f$ processi bizantini, l'intersezione di due quorums **contiene almeno un processo corretto**.

#### **Dimostrazione della Consistenza**
1. Supponiamo che un processo corretto $p$ consegni $m$. Ciò significa che ha ricevuto un **Byzantine quorum** di ECHO(m).
2. Supponiamo che un altro processo corretto $p′$ consegni un altro messaggio $m′$.
3. Poiché ogni Byzantine quorum ha un’intersezione di almeno $f+1$ processi, esiste almeno un processo corretto $p′$ comune tra i due quorums.
4. Un processo corretto invia **un solo messaggio** ECHO. Quindi, se $p′$ ha inviato un ECHO per $m$, allora anche $p$ deve aver ricevuto mmm, garantendo che $m = m'$.

>**Conclusione**: Non esistono due processi corretti che consegnano messaggi diversi.

>Note that it is possible for some correct to not deliver message, while other corrects deliver (and deliver the same message).

![[323.png]]

##### Performances
- **Messages**: (only messages generated by correct are counted. Why?)
	- At most $n^2$ messages.
- **Delays**: 2 step.

### Byzantine Reliable Broadcast
![[Pasted image 20250131162535.png]]
![[Pasted image 20250131162550.png]]
![[326.png]]
How many ready messages before delivering? There are at least $2f+1$ correct. If I see
$2f+1$ I deliver.

![[324.png]]
We need an additional mechanism $P2$ and $P4$ delivers, $P3$ does not.
==Idea==: if I see a ready message $f+1$ times, I know That at least one sender is correct.

It is not possible that two correct processes Send ready messages for different source Message (why?). Thus if I see f+1 ready, one sender is correct, It is safe for me to send a ready message.

P3: performs an "amplification" technique

####  Byzantine Reliable Broadcast Algorithm
![[325.png]]

##### Proof
**Validity**: if the sender is correct at least n-f processes do the echo (all the correct) of $m$. For our discussion of the consistent byz. Cast, we know that all corrects will send ready messages. Thus each correct receives (at least) $2f+1$ ready for m and delivers.

**No duplication**: Immediate from the auth. channel

**Integrity**: Immediate from the auth. channel

**Consistency**: A correct process p sends a ready for m only in two cases:
5) if it received from a quorum of echo.
6) if it received f+1 ready for m.
It is not possible that two correct for (1) send ready for messages different from m. For (2) is the same considering that at least one of that f+1 is correct. Thus no two corrects send ready for two different messages. Therefore, it is impossible that two corrects see 2f+1 ready for different messages (at lest f+1 of these 2f+1are correct)

**Totality**: A correct process p delivers if it sees 2f+1 ready for m. At least f+1 of these 2f+1 are correct. Therefore, any correct sees at least f+1 ready for m. This implies that any correct will amplify (if it does not send a ready upon receipt of a byzquorum of echo). There are at least 2f+1 corrects in our system, thus each correct will see at least 2f+1 ready for m, delivering.