**Topics that we touched in the previous slides**:
![[Pasted image 20241016111120.png|500]]

UNicast

# Broadcasting
![[Pasted image 20250126153325.png]]
I problemi arrivano quando avvengono i failures, alcuni ricevono il messaggio correttamente, altri invece no.
## BEST EFFORT BROADCAST (BEB)

![[Pasted image 20250126153612.png]]

>someone receive a messagge only if the sender is correct. If the sender is faulty it\s possible that you do not receive the message.

![[Pasted image 20250126153626.png]]

1. Invio di un messaggio in broadcast: quando un processo p vuole inviare un messaggio $m$ in broadcast, genera un ciclo for e lo invia a tutti i processi tramite il point to point link.
2. Ricezione messaggio: Quando ricevo un messaggio dal point-to-point link  lo mandiamo sopra. 
### Correctness
- **Validity**: it comes from the reliable delivery property of perfect links and the fact that the sender sends the message to every other process in the system.
- **No Duplication**: it directly follows from the No Duplication of perfect links.
- **No Creation**: it directly follows from the corresponding property of perfect links.

>Correctness comes from the three proofs of perfect-link.

### Observation on BEB
Il BEB assicura la consegna dei messaggi finché il mittente non fallisce.
Se il mittente fallisce, i processi possono essere in disaccordo sulla consegna o meno del messaggio.
![[Pasted image 20241016111750.png]]

>Se $m_1$ è corretto allora il messaggio sarà inviato a tutti


```ad-important
title: Importante!
Ci sta una differenza tra le due frecce su un $m_1$, esse avvengono in due momenti diversi:
- la freaccia che arriva su m_1 significa che il messaggio ha fisicamente raggiunto il processo
- la freccia che va in su (arrow generating) significa che il processo sta consegnando il messaggio (Corrisponde al **BEB deliver**)

Le due freccie, corrispondono ai due eventi iniziali!

```


```ad-missing
title: Problems
I processi non hanno una visione comune dei messaggi inviati dal non corretto, questo può avere un impatto negativo in alcune applicazioni. Vorremmo avere un accordo sull'insieme dei messaggi da consegnare, almeno tra i processi corretti (tutto corretto o niente).

Pensate a una chat distribuita, un messaggio da un client che si blocca potrebbe raggiungere solo un sottoinsieme di processi.



```

To solve, we want to have an agreement on the set of messages to be delivered, at least among the correct processes (all correct or nothing)
##  Regular Reliable Broadcast (RB)
![[Distributed System/Images/72.png]]

>RB4 is lveness property, RB3 and RB2 are saftey property
### BEB vs RB
![[Pasted image 20241016112522.png]]
Processo $P1$ invia il messaggio verde acqua in broadcast (doppia freaccia in su e giu = generazione broadcast operation)
Processo $P2$ invia il messaggio arancione e blu in broadcast
Processo $P3$ invia il messaggio blu scuro in broadcast
$P2$ deliver message green that is not delivered by process $P3$, that is a correct process, violating the agreement property of RB.

The second scheme is RB because it satisfies the agreemente property:
p2 deliver orange and blue messages as p3 that is a correct process. $P1$ isn't a correct message $\to$ does not have to deliver the orange message to satisfy the property of agreement. The second scheme is also BEB.

If in the second scheme i delete the orange arrow is BEB or RB? Is not even BEB because violate the first property (validity)!

```ad-important
$$RB \Rightarrow BEB$$
$$BEB \not \Rightarrow RB$$

```


### Implementation in Fail-Stop (Algorithm)
![[Distributed System/Images/78.png]]
>Insieme dei messaggi ricevuti dal processo $p$

>Is called lazy because reate a new broadcast event only when is necessary.
 
1. Inizializzazione:
	- Correct process
	- Array (ogni indice ha l'id del processo e corrisponde ad un set, un insieme che inizialmente è vuoto)

2. Broadcast event:
	Viene inviato un messaggio m in broadcast su RB e in BEB in entrata viene creato un messaggio composto da: Data, self e il mesaggio. (messaggio è incapsulato, self è l'id)


```ad-question
**If I take the relay line and put it before the first IF condition, does the algorithm break down?** No, happen that i see message and i start do the relay.

**Can you imlpement a Regular Reliable Broadcast withouth the Failure Detector P or not?** Is possible, thanks to moving the relay line before the first IF condition. If i am correct and i receive a message $m$, i start doing the relay immediately. By definition, if i am correct and i also deliver the message and i do the relay, all the correct process will receive the message, because it's BEB.

```


**Examples of  executions**:
![[Pasted image 20241016113127.png]]
$P3$ want to send in broadcast the message $m$ but it fails and send it only to process p2 and crash. The failure detector of $P2$ detect that $P3$ is crashed. At this point process two remove $P3$ from the set of corrects processes and re-broadcast the message $m$ to all the other correct processes to guarantuee the validity property of BEB. 


![[Pasted image 20241016113141.png]]
$P3$ send message in broadcast to all but fails and send it only to process $P5$. 
$P5$ receive the message m and after that detect that $P3$ crash. After that $P5$ remove $P3$ from the set of correctness processes and start re-broadcast the message m to the others correct processes. The same of $P5$ can be done by, for example, $P2$.


![[Pasted image 20241016113201.png]]
This example is important to understand why $P2$ verify the correctness of the source instead of considering the correctness of Relay $P5$. P2 trust the correctness of the source because the relay can fails, like in this example for P5, and if i do not do the re-broadcast in P2 i'm in trouble because i'm the only who see it because the relay (P5) is dead.
 
 ![[Pasted image 20241016113224.png]]
If two faulty processes send to each other a message m and m' and after that they crash is fine.

### Proof
- **Validity and No Creation** are ensured by th **BEB Broadcast**.
- **No Duplication**: by the check - *if m $\in$ from[p]* - in the Delivery handler from BEB.
- **Accordo**: supponiamo per contraddizione che il processo $p$ sia corretto e consegni il messaggio $m$ con il mittente originale $q$, mentre un altro processo corretto $p'$ non consegni $m$. Cosa succede?
	1) se $q$ non si blocca allora, per BEB, anche $p'$ consegna $m$.
	2) se $q$ si blocca e $q$ rileva il crash prima di ricevere $m$, allora $p$ trasmette il messaggio $m$. Per BEB $p'$ consegna anche $m$.
	3) Se $q$ si blocca e $q$ rileva l'incidente dopo aver consegnato $m$, allora $p$ trasmette anche il messaggio $m$. Per BEB $p'$ consegna anche $m$.

### Complexity for number of messages
- **Best Case**: $1$ BEB message per one RB message (n total point-to-point messages)
- **Worst Case**: $n^2$ total messages. (source fail)

![[Pasted image 20241016113954.png]]

### Complexity for message delays
È una misura che utilizziamo per valutare le prestazioni temporali del nostro algoritmo. Facciamo finta di trovarci in un ambiente in cui ogni messaggio impiega 1 unità di tempo per essere consegnato (se consegnato). Per esempio un evento di broadcast occupa una unità di tempo.

>UTILIZZIAMO QUESTA ASSUNZIONE SOLO PER COMPUTARE LE PRESTAZIONI, NON PER CORRETTEZZA.

**Best Case**: $1$ step ($0$ failures):
![[Pasted image 20241016114101.png]]

 **Worst Case**: $n$ steps
![[Pasted image 20241016114240.png]]
>p6 invia il messaggio poi crasha (non fa in tempo ad invialo a tutti)



## Implementation in Fail-Silent (Algorithm)
![[Pasted image 20241016114751.png]]

>Here, when a process receive a message immediatlely start doing broadcast b 

### Complexity on number of messages
Best Case = Worst Case = $N^2$
Because the original souce send the message, everyone received the message , send other $N$ and so on...
### Complexity on delay of messages
Message Deelay: (quante operazioni avvengono dall'inizio alla fine dell'algoritmo)
- best case: $1$ step
- worst case: $O(n)$ steps

```ad-question
In this algorithm if two processes send the same message like '$X$', the second copy will be not received because the message $m$ already belongs to me.

>There is not a really probem because always in broadcast as P2P link we assume that message $m$ is unique.
```

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
