# Models of systems
- **Asynchronous**:
	- no bound on the delay that message can cumulate
- **Synchronous**:
	- known bound on the delay that a message can cumulate (if I send a message at time $t$, it has to be recived by $t+\Delta$).
	- we can synchronize clocks
	- local executions steps happen at certain predeterminated interval, and that they take bounded time.
- **Eventually Synchronous**:
	- there is a time, unknown to us, after which the system will be synchronous.


## Asynchronous
- No global clock
- No boun on message delay
- Local-computational steps (Exec) happen at unpredictable time (the scheduler...)

## Synchronous
Delay are bounded
You can synchronise (up-to a certain precision)
You can assume that local execution steps happen at certaain predeterminated interval, and that they take bounded time

![[Pasted image 20241002171415.png|400]]

>Real systems are synchronous most of the time


## Partially-Synchronous
System that in certain point is sync and in some points is async. ![[Pasted image 20241002171454.png]]

An algorithm with Safety property (ex: Mutex) is not good for partial synchrony sistems. There can be some points where the proprery is broken by async parts.

An algorithm with liveness property (ex: No-Starvation) can be used for partial synchrony sistems (There is a time $t$, unknown to us, after which the system is synchronous and will be synchronous forever).

## Relationship between executions

![[Pasted image 20241002171756.png|250]]
![[Pasted image 20241002171822.png|250]]

# Clock Synchronisation in Synchronous Systems

Many applications require ordering among events and synchronisation to terminate correctly (air traffic control, network monitoring, ...)

Time breaks the diagram of indistinguishability because time can order the events.
![[Pasted image 20241002171951.png|500]]

As we can see, an indistingushable diagram can be decifrated thanks to the time using:
- **Timestamps**: each process attaches a label to each event (using a timestamp). In this way it should be possible to realise a **global history** of the system.
- **Naif** **solution**: each process timestamps events by mean of its physical clock.

## Physical Clocks

### Physical clocks in computers
The local clock is obtained by the operating system by reading a local hardware clock. Hardware clocks consists of an _oscilator_ and a _counting register_ that is incremented at every tick of the oscillator. 
$$H_i(t) = \int_0^t{h_i(\tau)d\tau}$$
At real time $t$, the operating system reads the hardware clock $H_i(t), and produces the local (software) clock ($C_i(t)$): $$C_i(t) = \alpha H_i(t)+\beta$$
### Parameter affecting accuracy
Different local clocks may have different values, due:
- **Skew**:  difference in time between two software (local) clocks.
$$Skew_{i,j}(t) = |C_i(t)-C_j(t)|$$
- **Drift Rare**: gradual misalignment of synchronized clocks caused by the slight inaccuracies of the time-keeping mechanisms$$\frac{dH(t)}{dt}$$
**Drift Rate**
![[Pasted image 20241002172806.png|500]]

A drift rate of 2 microsec/sec means clock increases its value of $1sec+2microsec$ for each seconds.
Ordinary quartz clock derivate nearly by $1 sec$ in 11-12 days. Hig precision quartz clocl dirft rate is $10^{-7}/10^{-8}$ ssec/sec.

![[Pasted image 20241002172854.png|500]]

This image shows how difficult is to set a correct $\alpha$ because quartz can oscillate from slow bound to fast bound.

### Correct Clock
**An hardware clock $H$ is correct if its drift rate is within a limited bound of $\rho>0$**, (es: $10^{-5}$ ssec/sec).$$1-\rho\le\frac{dH(t)}{dt}\le1+\rho$$
In presence of a correct hardware clock $H$ we can measure a time interval $[t,t']$ (for all $t’>t$) introducing only limited errors. $$(1-\rho)(t_q-t_0)\le H(t_1)-H(t_0)\le (1+\rho)(t_1-t_0)$$**Bounding the skew**
![[Pasted image 20241002173206.png|500]]

**Bounding the Skew**:
![[Pasted image 20241002173339.png|250]]![[Pasted image 20241002173410.png|250]]![[Pasted image 20241002173428.png|250]]


### Monotonicity
software clocks have to be monotone:
$t'>t \to C(t')>C(t)$

>Don't go back in time NEVER.

The monotonic property can be guaranteed choosing opportune values for $\alpha$ and $\beta$. Note that $\alpha$ and $\beta$ can be a function of time:$$C_i(t) = \alpha H_i(t)+\beta$$
So to have a situation where two pc have the same clock is **slow down one and speed up the other one**.

- Non è possibile imporre un valore di clock nel passato. Questa azione può violare l'ordinamento causa/effetto degli eventi prodotti da un processo e la monotonicità temporale.
- Di conseguenza rallentiamo i clock nascondendo gli interrupt. Nascondendo gli interrupt, il clock locale non viene aggiornato, quindi dobbiamo nascondere un numero di interrupt pari al tempo di rallentamento diviso per il periodo di interrupt.
## UNIVERSAL TIME COORDINATED (UTC)
UTC is an international standard: the base of any international time measure. UTC-signals come from shortwave radio broadcasting stations or from satellites (GPS) with an accuracy of:
- $1\hspace{3px}msec$ for broadcasting.
- $1\hspace{3px}\mu sec$ for GPS.

### External Synchronization
Processes synchronize their clock $C_i$ with an authoritative external source $S$. Let $D>0$ be a synchronization bound and $S$ be the soure of the UTC.
- Clocks $C_i$ (for $i = 1,2,...,N$) are **externally synchronized** with a time source $S$ (UTC) if for each time interval $I$: $$|S(t)-C_i(t)|<D\hspace{50px}\forall i\in\{1,2,...,N\},\hspace{10px}\forall t\in I$$ We say that clock $C_i$ are **accurate** within the bound of $D$.

### Internal Synchronization:
All the processes synchronize thei clocks $C_i$ among them. Let $D>0$ be a synchronization bound an let $C_i$ and $C_j$ be the clock at any two processes $p_i$ and $p_j$.
- clocks are **internally synchronized** in a time interval $I$: $$|C_i(t)-C_j(t)|<D \hspace{50px} \forall i,j \in \{1,2,...,N\},\hspace{10px} \forall t\in I$$
>We say that clock $C_i, C_j$ **agree within the bound of $D$.


### Physical clock Synchronization
- Clocks that are internally synchronized are not necessarily externally synchronized
- A set of processes $P$, externally synchronized within the bound of $D$, is also internally synchronized within the bound of $2D$.
- This property directly follows from the definition of internal and external clock synchronization.

## SYNCHRONIZATION ALGORITHMS
There are **3 algorithms** used of time synchronization:
### Christian's Algorithm (request-driven)
```ad-abstract
title: Definition
Questo algoritmo viene utilizzato per sincronizzare l'orologio di un client con un server in un sistem distribuito. SI basa sul tempo di risposta (RTT) ossia il tempo totale necessario per inviare una richiesta al server e ricevere una risposta.

```

Uses a **time server** $S$ that recives a signal from an UTC source. 
- Si basa sulla misurazione dei tempi di andata e ritorno (RTT) dei messaggi.
- synchronization is reached only if $RTTs$ are small with respglobal historyect to the required accuracy.

A process $p$ asks the current time through a message $m_r$ and receives $t$ in $m_t$ from $S$.
$p$ sets is clock to $t+T_{round}/2$ where $T_{round}$ is round trip time measured by $p$
![[Pasted image 20241002174623.png|500]]

**Notes**:
- a time server can crash
- cristian's algorithm suggests to use a cluster of synchronized time server.
- a time server can be attacked

#### Accuracy
**If the delay is equal in direction $p\to S$ and $S\to p$, then this algorithm works in a perfect way**. But if the message from me to the server is very fast and the message from the server to me is slower, so in real life it doesn't work properly.

![[Pasted image 20241002174710.png|500]]

**Case 1**
- Reply time is greater than estimate $(RTT/2)$.
- Assume it is equal to $RTT$-$min$, we have: $$\Delta = RTT/3-(RTT-min)= \frac{-RTT+2\hspace{3px}min}{2}=-\frac{RTT}{2}+min= -(\frac{RTT}{2}-min)$$ it means that the algorithm will set $p$ into the past.

**Case 2**
- Reply time is smaller than estimate $(RTT/2)$.	
- Assume it is equal to $min$, we have: $$\Delta=\frac{RTT}{2}-min$$it means that the algorithm will set $p$ into the future.

> We can correct that using **several servers** and adding **redundancy**.

### Barkeley's Algorithm (Broadcast-based)
```ad-abstract
title: Definition
- Master-slave structure
- Based on steps

```


This algorithm use a master-slave structure that works in two different steps:
- Raccolta di tutti gli orologi provenienti da altri processi e calcolo della differenza.
- Calcoli della correzione.

The master process $p_m$ sends a message with a timestamp $t_1$ (local clock value) to each process of the system ($p_m$ included).

When a process $p_i$ receives a message from the master, it sends back a reply with its timestamp $t2$ (local clock value).

When the master receives the reply message it reads the local clock ($t3$) and computes the difference between the clock.

**Master Behavior**:
- computes of the differences $\Delta p_i$ between the master clock and the clock of every other process $p_i$ (including the master itself)
- computes the average $avg$ of all $\Delta p_i$ without considering faulty processes (processes that have a clock wich differ from the one of the master more than a given threshold $\gamma$).
- Computes the correction for each process (including faulty processes):$$adg_{p_i} = avg-\Delta p_i$$
**Slaves Behavior**:
- each process recives the correction and applies it to the local clock.
- if the correction is a negative value, it slows down its clock.

> Example: ![[Pasted image 20241002175733.png|500]]the third slave is discarded because it has the most distant value compared to the others (standard deviation is often used to calculate this).

**Accuracy**
The accuracy depends on the maximum round-trip time (the master does not consider clock values associated to $RRT$ grater than the maximum one).

**Fault Tollerance**:
- If the master crashes, another master is elected (in an unknown amount of time).
- It is tolerant to arbitrary behavior (ex: slaves that send wrong values)
	- Master process consider a certain number of clock values and these values do not differ between them more than a certain threashold.

### Network Time Protocol (NTP)
Il **Network Time Protocol (NTP)** è un protocollo utilizzato per sincronizzare gli orologi dei computer su una rete. Ecco i concetti principali:
1. **Sincronizzazione dell'orario**
	NTP allinea l'orologio di un dispositivo con server di riferimento che forniscono un orario estremamente preciso, come quelli basati su orologi atomici o satelliti GPS.

2. **Stratificazione (Stratum)**
	I server NTP sono organizzati in livelli, chiamati "**stratum**".  
	- I server di livello **Stratum 0** forniscono l'orario esatto (es. orologi atomici).  
	- I server di livello superiore (**Stratum 1, Stratum 2**, ecc.) ottengono l'orario da quelli dei livelli inferiori, propagandolo ai client.

3. **Correzione del ritardo**
	NTP calcola il ritardo di rete tra il client e il server. Questo serve ad aggiustare l'orario con precisione, tenendo conto del tempo che i pacchetti impiegano per viaggiare attraverso la rete.

4. **Affidabilità**
	NTP utilizza diverse fonti di riferimento (server ridondanti) e scarta eventuali valori inaffidabili, garantendo un'elevata precisione nella sincronizzazione.
## Arbitrary graphs
$G = (V,E)$ is an arbitrary graph where $V$ is the set of edges and $E$ is the set of bows
![[Pasted image 20241002181520.png|250]]

We have teo different arbitrary graph:
- **Tree Like**: server imposes its clock ![[Pasted image 20241002181626.png|250]]
- **Fully Ditributed** : adjust the clock based on you neighbours ![[Pasted image 20241002181650.png|250]]

### Global skew vs Local Skew

Different performances in case of Global Skew (difference in all the graph) and Local Skew (difference between two neighbours)

- **Fully Distributed minimize the local skew** (look at the path from a neighbor to another one)
- **Tree Like minimize the global skew**

Formal definition of global and local skew:
- **Global Skew**: $$max_{t\in R^+}(max_{\forall (v,w)\in V\times V}(|C_v(t)-C_w(t)|))$$
	![[Pasted image 20241002182058.png|250]]
- **Local Skew**:$$max_{t\in R^+}(max_{\forall (v,w)\in E}(C_v(t)-C_w(t)|))$$
	![[Pasted image 20241002182125.png|250]]

## THE LIMIT OF BOUNDED ACCURACY
We can use **timestamps for an event**.
![[Pasted image 20241002182249.png|500]]

In real life we must consider a bound for a timestamp:
![[Pasted image 20241002182401.png|500]]

In the following case we can say that this metodology is correct
![[Pasted image 20241002182412.png|500]]

But we can't say the same thing in that other case because the timestamp are overlayed
![[Pasted image 20241002182817.png|500]]




