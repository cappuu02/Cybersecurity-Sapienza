# Broadcasting

![[Pasted image 20241016111120.png|500]]

## BEST EFFORT BROADCAST (BEB)
**System model**:
- Asynchronous system
- Perfect links
- Crash failures

![[Pasted image 20241016111324.png]]

### Algorithm
![[Pasted image 20241016111409.png|500]]

==BEB1==: **Validity**: If a correct process broadcasts a message $m$, then every correct process eventually delivers $m$.
==BEB2==: **No duplication**: No message is delivered more than once.
==BEB3==: **No creation**: If a process delivers a message $m$ with sender $s$, then $m$ was previously broadcast by process $s$.


![[Distributed System/Images/71.png]]

### Correctness
- **Validity**: it comes from the reliable delivery property of perfect links and the fact that the sender sends the message to every other process in the system.
- **No Duplication**: it directly follows from the No Duplication of perfect links.
- **No Creation**: it directly follows from the corresponding property of perfect links.

>Correctness comes from the three proofs of perfect-link.

### Observation on BEB
Il BEB assicura la consegna dei messaggi finché il mittente non fallisce.
Se il mittente fallisce, i processi possono essere in disaccordo sulla consegna o meno del messaggio.
![[Pasted image 20241016111750.png|500]]

```ad-missing
title: Problems
I processi non hanno una visione comune dei messaggi inviati dal non corretto, questo può avere un impatto negativo in alcune applicazioni. Vorremmo avere un accordo sull'insieme dei messaggi da consegnare, almeno tra i processi corretti (tutto corretto o niente).

Pensate a una chat distribuita, un messaggio da un client che si blocca potrebbe raggiungere solo un sottoinsieme di processi.



```

## (Regular) Reliable Broadcast (RB)
![[Distributed System/Images/72.png]]

### BEB vs RB
![[Pasted image 20241016112522.png]]
Processo $P1$ invia il messaggio verde acqua
Processo $P2$ invia il messaggio arancione e blu
$Processo P3$ invia il messaggio blu scuro
Quando $P1$ invia in broadcast il messaggio arancione, P3 non lo riceve (non viene eseguita la delivery). La proprieta RB4 si rompe e di conseguenza non e Reliable broadcast ma e Best effort Bradcast.

### Implementation in Fail-Stop (Algorithm)
![[Pasted image 20241016112603.png]]
>Insieme dei messaggi ricevuti dal processo $p$






**Examples of  executions**:
![[Pasted image 20241016113127.png]

![[Pasted image 20241016113141.png]]
![[Pasted image 20241016113201.png]]Difference between 1 and 2: in the first the message is delivered after the FD Crash, in the second case the message is delivered before the crash. In both cases it works.
 ![[Pasted image 20241016113224.png]]Also this execution is correct

### Proof
- **Validity and No Creation** are ensured by th **BEB Broadcast**.
- **No Duplication**: by the check - *if m $\in$ from[p]* - in the Delivery handler from BEB.
- **Accordo**: supponiamo per contraddizione che il processo $p$ sia corretto e consegni il messaggio $m$ con il mittente originale $q$, mentre un altro processo corretto $p'$ non consegni $m$. Cosa succede?
	1) se $q$ non si blocca allora, per BEB, anche $p'$ consegna $m$.
	2) se $q$ si blocca e $q$ rileva il crash prima di ricevere $m$, allora $p$ trasmette il messaggio $m$. Per BEB $p'$ consegna anche $m$.
	3) Se $q$ si blocca e $q$ rileva l'incidente dopo aver consegnato $m$, allora $p$ trasmette anche il messaggio $m$. Per BEB $p'$ consegna anche $m$.

### Complexity
- **Best Case** $n$ point-to-point messages.
- **Worst Case**: $n^2$ total messages.
![[Pasted image 20241016113954.png]]

**Example**:
**Best Case**: $1$ step ($0$ failures):
![[Pasted image 20241016114101.png]]

 **Worst Case**: $n$ steps
![[Pasted image 20241016114240.png]]
>p6 invia il messaggio poi crasha (non fa in tempo ad invialo a tutti)

## Implementation in Fail-Silent (Algorithm)
![[Pasted image 20241016114751.png]]

BEST CASE = WORST CASE - $N$ BEB messages per one RB ($N^2$ point to point messages)

Message Deelay: (quante operazioni avvengono dall'inizio alla fine dell'algoritmo)
- besta case: $1$ step
- worst case: $O(n)$ steps

## Uniform Reliable Broadcast (URB)

**Properties**:
- URB1-URB3 = RB1-RB3
- **URB4** (Uniform Agreement): if a message $m$ is delivered by some process (whether correct or faulty), then $m$ is eventually delivered by every correct process.

![[Pasted image 20241030174012.png]]![[Pasted image 20241030174031.png]]


### Algorithm
![[Pasted image 20241030174110.png]]

**Affermazione**: se un processo corretto $p$ vede un messaggio $m$, alla fine lo consegnerà.
	**prova**: per ipotesi $p$ è corretto, quindi il suo messaggio raggiungerà ogni altro processo corretto (vedi BEB). Per la forte completezza di $FD$, alla fine il processo $p$ individua come crash tutti i processi crashati, quindi non aspetterà per sempre l'ack di un processo crashato. Pertanto, candeliver($m$) su $p$ sarà vero.

**Prova di accordo** (per contraddizione): supponiamo che $p5$ (difettoso) fornisca $m$ e $p6$ corretto no. L'unica possibilità è che $p6$ non veda il messaggio (**dichiarazione**). Ciò implica che $p6$ viene rilevato difettoso da $p5$, $p5$ consegna senza ricevere l'ack da $p6$. Questo **contraddice la forte precisione del rilevatore di guasti P**.

![[Pasted image 20241030174436.png]]
**Costs**:
- BEST CASE = WORST CASE - N BEB messages per one RB ($N^ 2$ point to point messages).
- Deelays:
	- **Best case**: $2$ step ($0$ failures) ($1$ for disseminate $1$ for ACKs).
	- **Worst case**: $O(n)$ steps (chain of failures as in the lazy RB).


# Quorum Definition and Properties
Abbiamo $n$ processi nel nostro insieme di processi totali $P$, **un quorum è un qualsiasi sottoinsieme di $P$ di dimensioni minime**: $$\frac{n}{2}+1 = \text{Majority of the processes}$$![[Pasted image 20241030175001.png|500]]
****proprietà**: due quorum qualsiasi si intersecano in almeno un processo (se due quorum non si intersecano, allora hanno tutti processi distinti. Questo implica $|P|>n$)

If we have:
- $C$: set of correct processes.
- $F$: set of faulty processes.

We don't know who is in $C$ and who is in $F$ but if we assume $f<\frac{n}{2}$ (Majority of the processes are in $C$), then we can say that:

**Any quorum $Q$ of $P$ contain at least one correct process** ($C$ is a quorum, $Q$ is a quorum tooo. Two quorums intesect in at least one process).

```ad-example
takes 4 processes at random, at least one of them will be green. Protip: it works even if you first take your set and then you decide which is green and which is red.![[Pasted image 20241021141413.png|500]]

```

## Implementation in Fail-Silent
![[Distributed System/Images/58.png]]

## Majority-ACK
```ad-question
if $|P|=n$ and $|F|=n/2+1$, this algorithm works?

**Response**: if I reach the treshold is fine but can happen that the number of ACK will never be reached
(if |F| > n/2 and I wait for |F|+1 I will wait forever once everyone in F crashed. This means that the validity will never be satisfied)

```

We can use perfect failure detector:
![[Distributed System/Images/59.png]]
