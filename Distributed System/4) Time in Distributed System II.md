
## Failure Detector Abstraction
A software module to be used together with process and link abstractions, It encapsulates timing assumptions of a either partially synchronous or fully synchronous system.

- Failure Detectors **only work for Crash Failures** (No byzantine Failure)
- The stronger the timing assumption are, the more accurate the information provided by a failure detector will be. 

Fundamental property of Failure Detectors: 
- **Accuracy** (informally is the ability to avoid mistakes in the detection) 
- **Completeness** (informally is ability to detect all failures)

>They are based on the idea of "Pinging"

## Perfect Failure Detectors (P)
System model 
- Synchronous system 
- Crash failures 
- Perfect Synchronous Point2point: If a message m is sent at time t, m is received by at most t+max_delay.

Using its clock and the bounds of the synchrony model, a process can infer if another process has crashed. In Asynch?

>Immagine pagina 9
### Specification of Perfect Failure Detectors P
**Module**: 
	Name: PerfectFailureDetector, instance P. 
**Events**: 
	< P, Crash | p >: Detects that process $p$ has crashed
**Properties**: 
- ==PFD1==: **Strong completeness**: Eventually, every process that crashes is permanently detected by every correct process. 
- ==PFD2==: **Strong accuracy**: If a process p is detected by any process, then p has crashed.

### Algorithm
![[Distributed System/Images/29.png]]

#### Correctness (Proof)
![[Distributed System/Images/30.png]]
![[Distributed System/Images/31.png]]

![[Distributed System/Images/33.png]]
Is possible because the Strong completness said that "eventually" every process need to detect the failure of a process $p_3$ but after t+x every process must know the failure of the process $p_3$

![[Distributed System/Images/35.png]]
>Is possible? No, because a dead process cannot detect another dead process.

## Improving P (Round-Based P)
Vogliamo ridurre il numero di messaggi necessari mantenendo la stessa accuratezza e completezza. Supponiamo di avere un clock synchronizer con uno scarto globale massimo di $\delta$$ con collegamento sincronizzati con un ritardo massimo (maxdelay) e minimo (mindelay > $\delta$)

![[Distributed System/Images/36.png]]

### Algorithm Round-Based
Tale algoritmo e un approccio per rilevare i guasti nei sistemi distribuiti, utilizzando la divisione dell tempo in intervalli logici chiamati rounds. Ogni processo invia un segnale di "essere attivo" durante ogni round. L'obbiettivo e di garantire accuratezza e completezza nel rilevamento dei guasti, minimizzando la quantita di comunicazione.

```ad-question
title: Perche utilizziamo i round?
Dividendo il tempo in round, si facilita la progettazione e verifica di algoritmi distribuiti, poiche si assume che tutti i processi progrediscano nei round allo stesso ritmo (con piccoli scarti temporali).

```

lo scafrto globale $\delta$ condiviso tra tutti i processi garantisce che i round di diversi processi siano quasi tutti allineati. La durata del round deve essere deve essere abbastanza lunga da compensare  lo scarto massimo e il ritardo nella comunicazione. Ovviamente un messaggio inviato all-inizio del round $r$ arrivera prima della fine del round $r$.

#### Passi dell'algoritmo
1. **Inizio del round**
	ogni processo inizia un nuovo round $r$ al tempo $t$. Il processo invia un messaggio agli altri processi per segnalare che e attivo.
2. **Invio del BEAT**
	 Il processo $p$ invia il BEAT non appena il proprio round numero $r$ inizia. Grazie alla sincronizzazione degli oroglogi e ai limiti temporali, il BEAT viene ricevuto dagli altri processi entro il round $r$.
3. **Ricezione del BEAT**
	Un processo $q$ attende i BEAT da tutti gli altri processi nel round $r$. Se riceve il BEAT da un processo $p$, conclude che $p$ risulta attivo. Se non riceve il BEAT entro la fine del round $r$, conclude che $p$ risulta guasto.


![[Distributed System/Images/37.png]]
![[Distributed System/Images/39.png]]

>Fact 1: If I send a BEAT i am alive
>Fact 2: If i don't send a BEAT, i'm dead

Se invio un BEAT a $p$ quando il mio numero di round mostra $r$, allora il beat raggiunge p quando il suo numero di round mostra $r$.
- **Strong Completness**: Se $p$ muore, non riceverò il BEAT e lo segnalerò.
- **Strong Decision**: Se non ricevo il BEAT atteso da $p$ allora, l'unica ragione possibile è che p non l'ha inviato. Pertanto $p$ è morto.


## Synchronous = Round-Based
An alternative way to see synchronous systems is to imagine time divided in logical slots, the so called round. Synchrony assumptions are abstracted by assuming: 
- Processes switch rounds exactly at the same time. 
- If I a correct process send a message to a set of processes at the beginning of round r, the messages will reach all correct processes in the set by the end of round r

![[Distributed System/Images/38.png]]

>Rounds are a powerful tool for the designer of distributed systems!

A round-based P, is possible?
![[Distributed System/Images/40.png]]
![[Distributed System/Images/41.png]]

## Trade-off
![[Distributed System/Images/42.png]]


----
----
----
----

## EVENTUALLY PERFECT FAILURE DETECTORS $◊P$
$◊P$ sono una classe di rilevatori di guasti utilizzati nei sistemi distribuiti per identificare i processi che falliscono. L'obbiettivo principale e quello di fornire informazioni sui guasti in modo accurato ed eventuale, nonostante le incertezze che derivano dall'asincronia di rete o dai ritardi nella comunicazione.

Un failure detector $◊P$ deve rispettare due proprietà fondamentali:

1. **Completezza forte (Strong Completeness)**  
    Se un processo fallisce (crasha), esso sarà **sempre sospettato** da tutti i processi corretti, e non verrà mai rimosso dall'elenco dei sospetti.
    
2. **Accuratezza forte eventuale (Eventual Strong Accuracy)**  
    Dopo un certo tempo ttt, il sistema diventa sincrono (o sufficientemente stabile) e i failure detector smettono di fare errori. Da quel momento in poi:
    
    - Solo i processi che hanno effettivamente fallito saranno sospettati.
    - Ogni sospetto errato viene rimosso (es. un processo erroneamente sospettato come fallito viene "perdonato").

![[Pasted image 20241014140726.png]]
### Funzionamento Algoritmo
1. Quando si verifica un evento "upon event" (ad es. una richiesta di invio o di risposta), l'algoritmo esegue le seguenti azioni:
    - Imposta lo stato "alive" del processo a 1 (vivo).
    - Imposta lo stato "suspected" del processo a 0 (non sospettato).
    - Imposta il ritardo "delay" a 0.
2. Se si verifica un evento di timeout ("upon event (Timeout)"), l'algoritmo controlla se il processo è considerato sospetto ("suspected" != 0).
    - Se è sospetto, l'algoritmo incrementa il ritardo ("delay := delay + Δ").
    - Altrimenti, se il processo è vivo ("alive"), l'algoritmo imposta lo stato "suspected" a 1 (sospetto).
3. Quando il ritardo supera un certo valore, l'algoritmo esegue le seguenti azioni:
    - Imposta lo stato "suspected" a 1 (sospetto).
    - Attiva il trigger "trigger (◊P, Suspect {p})".
4. Il trigger "trigger (◊P, Suspect {p})" invia una richiesta di "HeartBeatRequest" al processo sospetto.
5. Quando viene ricevuta una risposta di "HeartBeatReply", l'algoritmo:
    - Imposta lo stato "alive" del processo a 1 (vivo).
    - Imposta lo stato "suspected" del processo a 0 (non sospettato).
    - Attiva il trigger "trigger (◊P, Send {p, HeartBeatRequest})".
6. Il trigger "trigger (pl, Send {p, HeartBeatRequest})" invia una richiesta di "HeartBeatRequest" al processo.

>In sintesi, l'algoritmo monitora lo stato dei processi e sospetta quelli che non rispondono entro un certo tempo, inviando loro delle richieste di "HeartBeatRequest" per verificarne la disponibilità. Quando un processo risponde, l'algoritmo lo considera nuovamente attivo.
### Property of Suspected
Il lemma dice: se prendiamo due processi corretti, $p_1$​ e $p_2$​, allora, dopo un certo tempo di stabilizzazione $t$, i rispettivi insiemi dei sospettati ($suspected_1$ e $suspected_2$​) saranno identici. Cioè, dopo $t$, $p_1$​ e $p_2$​ avranno la stessa "visione" di quali processi sono sospettati.

Supponiamo per assurdo che, dopo il tempo di stabilizzazione $t$, gli insiemi dei sospettati non siano uguali. Questo significa che esiste un processo ppp che:

- È sospettato da $p_1$ ($p \in suspected_1$),
- Ma **non** è sospettato da $p_2$​ ($p \notin suspected_2$​).

Ora analizziamo i casi possibili per il processo $p$:

1. **Caso 1: $p$ è un processo corretto**  
    Se $p$ è corretto, allora non dovrebbe essere sospettato da nessuno dei due processi ($p_1$ e $p_2$) dopo il tempo di stabilizzazione $t$, perché ciò violerebbe la proprietà di **accuratezza forte eventuale** (eventual strong accuracy). Quindi, $p$ non può essere corretto in questa situazione.
    
2. **Caso 2: $p$ è un processo fallito**  
    Se ppp è effettivamente fallito, allora dovrebbe essere sospettato da **entrambi** i processi $p_1$​ e $p_2$​, perché ciò è richiesto dalla proprietà di **forte completezza** (strong completeness). Se $p$ è sospettato da uno solo dei due ($p_1$​ ma non $p_2$), questa proprietà viene violata.
    

>In entrambi i casi porta ad una contraddizione.
## Leader Election (monitoring an alive process)
Sometimes, we may be interested in knowing one process that is alive instead of monitoring failures. In this case we can use a different oracle (called **leader election module**) that reports a process that is alive.

- **Name**: LeaderElection, **istance** $le$.
- **Indication**: $\langle le, Leader \hspace{5px}|\hspace{5px} p\rangle$: indicates that process $p$ **is elected as a leader**.
- **Properties**:
	- **LE1** (eventual detection): either there is no correct process, or some correct process is eventually elected as the leader (liveness property).
	- **LE2** (accuracy): if a process is leader, then all previously elected leaders have crashed


### Algorithm
![[Pasted image 20241014143525.png|500]]
$(\Pi \setminus suspected)$ is the subset of alive processes.

### Correctness
**Eventual detection**: from the strong completeness of $P$ (perfect failure).
**Accuracy**: from the strong accuracy of $P$ and the total order on the ranks (IDs) of processes.


![[Pasted image 20241014143136.png]]
When $p_0$ dies it's okay because before he dies everyone know that he's the leader, but in $p_2$ after $p_0$ dead, the leader isn't changed. (broke the eventual detection property).

![[Pasted image 20241014143317.png]]
In this case the accuracy propery is broken because $p_2$ changes the leader even if $p_1$ is still alive.

```ad-question
What if the failure detector is not perfect? In this case, we can use the "Eventual Leader Election $\Omega$"

```
## Eventual Leader Election $\Omega$

- **Name**: $EventualLeaderDetector$, **istance** $\Omega$.
- **Indication**: $\langle \Omega , Trust \hspace{5px}|\hspace{5px} p\rangle$: indicates that process $p$ is trusted to be leader.
- **Properties**:
	- **ELD1** (eventual accuracy): Esiste un momento $t$ (tempo di stabilizzazione) dopo il quale ogni processo corretto inizierà a fidarsi di un processo corretto come leader.
	- **ELD2** (eventual agreement): Esiste un tempo $t$ (tempo di stabilizzazione) dopo il quale nessun processo corretto avrà fiducia in un leader diverso da quello che gli altri processi corretti stanno fidandosi.
Both of properties are **liveness** (pur non garantendo immediatezza, esse assicurano che, dopo un tempo sufficiente, il sistema arriverà alla convergenza in cui un leader sarà riconosciuto da tutti i processi corretti.)

![[Pasted image 20241014150235.png]]

Idea: costruire un meccanismo di **Eventual Leader Election** utilizzando il modello dei **processi crash-stop**. Un processo crash-stop è un tipo di processo che, una volta che fallisce (crasha), non si riprende più, cioè non riprende mai l'esecuzione.

1. Definizione del meccanismo
	L'algoritmo si basa sull'astrazione di un failure detector che sospetta i processi falliti, utilizzando il failure detector che permette di identificare i processi sospettati di essere falliti. I processi che non sono sospettati da **◊P** sono considerati corretti.
	**Regola Deterministica**: tra i processi che non sono sospettati da **◊P**, il processo con l'**identificativo più alto** viene scelto come leader.

2. Selezione del leader:
	Ogni processo si fida del processo con l’identificativo più alto tra quelli che non sono sospettati di essere falliti dal failure detector **◊P**.

![[Pasted image 20241014150514.png|500]]

**Proof**:
- **ELD1** (Eventual Accuracy): by the strong completeness of the FD we have that eventually suspected set contains all the crashed processes. Thus $\Pi \setminus suspected$ contains only correct processes (or its empty).
- **ELD2** (Eventual Agreement): for any pair of correct processes, their suspected sets eventually stabilises to the same content (by the property of the FD). If the set are equals $\Pi \setminus suspected$ returns the same ID on both processes.

## Three Models

![[Pasted image 20241014150957.png|500]]![[Pasted image 20241014151033.png|500]]
We can also say that the set of problems solvable in fail-stop includes the problems solvable in other models.

Relationship between Fail-Stop and SYNC:
![[Pasted image 20241014151416.png|500]]
SYNC is stronger than Fail-Stop (Correct answer is $B$ !!!!possibile domanda esame!!!!).
Problems we can solve with fail-stop is strictly contained in subset of problems we can solve with SYNC (SYNC can solve problems based on **time** like clock synchronization):![[Pasted image 20241014151751.png|250]]


## Application of failure detector and leader elector

```ad-success
title: Obbiettivo
Using $P$ to make Lamport's ME fault tolerant

```

**Events**:
- *Request*: from upper layer - requests access to Critical Section (CS).
- *Grant*: to upper layer - grant the access to CS.
- *Release*: from upper layer - release the CS.
**Properties**:
- **Mutual Exclusions**: at any time $t$, at most one non-crashed process is inside the CS.
- **Liveness**: if a correct process $p$ requests access, then it eventually enters the CS.
- **Fairness**: if a correct process $p$ requests access before a process $q$, then $q$ cannot access the CS before $p$.

![[Distributed System/Images/50.png]]
![[Distributed System/Images/51.png]]

**Patch**
![[Distributed System/Images/52.png]]

**Patch Uncorrect
![[Distributed System/Images/53.png]]

![[Distributed System/Images/54.png]]
![[Distributed System/Images/55.png]]
![[Distributed System/Images/56.png]]

```ad-success
title: Objective
A simpler algorithm using LE and FD P.

```

Fault-tolerance Mutual Exclusion
![[Distributed System/Images/57.png]]

**IDEAS**: 
- Use LE to elect a leader 
- Ask the leader for CS with a request message 
- The leader allows access to CS using FIFO order on requests 
- When done release CS using a release message 
- If the leader detects a crash p: 
- If p is not in CS, it removes the pending request of p (if any) 
- If p is in CS, it acts as p released the CS 
- Problem: What to do when a new leader is elected? The old leader was the only one to know who was in CS,

```ad-failure
title: Problem
What to do when a new leader is elected? The old leader was the only one to know who was in CS

```

If the process that was in CS crashed, is fine. 
If it is alive, then it will answer to a message. 

The new leader starts an new_leader phase: 
- It interrogates any process that has not been detected as faulty to know if is in CS, and it updates its information accordingly. 

After the new_leader phase, the new elected leader satisfies new requests as explained before. When a new leader is elected the processes sends the old requests (if not satisfied) to the new leader.