# Total Order

## Uses of TO-Broadcast (Atoic Broadcast)
Every replica start with counter equal to 1
![[228.png]]

We want that several replica of the same data structure are consistent and if they are updated from different counter in a distributed way we can solve this problem thanks the Total Order Broadcast.

>Se le operazioni vengono eseguite secondo un ordine precis non ci sarebbero problemi nè confusione!

![[229.png]]
![[230.png]]
![[231.png]]
![[232.png]]

>All of these replica's first see the operation $A$ and after they do the $B$ operation. In this case they follow the same path and all of these replica's are consistent!

All of these need a cordination that can be reached thanks to the **Total Order Specifications**!

## Total Order Specifications
total order specifications are usually composed by four properties:
- a ==Validity== property guarantees that messages sent by correct processes will eventually be delivered at least by correct processes;
- an ==Integrity== property guarantees that no invented message or duplicate messages are delivered;
- an ==Agreement== property ensures that (at least correct) processes deliver the same set of messages; (we can have regular or uniform, in uniform if a correct process deliver a message, eventually every correct processes delivers same message)
- an ==Order== property constrains (at least correct) processes delivering the same messages to deliver them in the same order.
	- not uniform: all the correct will see the same order of messages
	- uniform: faulty process cannot see a different order

**Total Order Broadcast**
- $V$ = Validity
- $I$ = Integrity
- $A$ = Agreement
- $O$ = Order

Distinct specifications arise from distinct formulations of each property:
- uniform vs non-uniform
- A uniform property imposes restrictions on the behavior of (at least) correct
processes on the basis of events occurred in some process

## The Agreement Property (already done)
**Uniform Agreement (UA) $\to$ Uniform Broadcast**: If a process (correct or not) TODelivers a message $m$, then all correct processes will eventually TODeliver $m$. (Se un processo non corretto, consegna un messaggio ($m_2$), gli altri processi, che siano corretti o meno, devono consegnarlo)

![[233.png]]

>Se un provesso, corretto o no, consegna un messaggio tutti i processi corretti consegneranno quel messaggio lì!

**Non Uniform Agreement (NUA) $\to$ Non Uniform Agreement**: If a correct process TODelivers a message $m$, then all correct processes will eventually TODeliver $m$. (Se un processo non corretto, consegna un messaggio ($m_5$), gli altri processi corretti non devono consegnarlo)

![[234.png]]

>C'è la possibilita che un processo fault deliver un messaggio e lui è l'unico che deliver quel messaggio. The other correct processes don't deliver this message!

**Constrains the set of delivered messages**
Correct processes always deliver the same set of messages $M$. Each faulty process $p$ delivers a set $M_p$
$$UA: Mp ⊆ M$$
$$\text{NUA}: M_p \hspace{0.3cm} \text{can be} \hspace{0.3cm} \text{such that} \hspace{0.3cm} M_p ∩ M ≠ ∅$$
## Total Order Implementation (Non uniform Variant)
![[235.png]]

>If $P$ deliver first $m_1$ and after $m_2$, $Q$ will deliver the two message in the same order of $P$!

![[236.png]]

### Total Order Algorithm (Non uniform Consensus)
![[242.png]]

```ad-info
![[245.png]]

```


![[252.png]]

```ad-success
title: Round-Based

This algorithm is **round-based**, i.e. we will trigger several instance of consensus and each instance belong to a round so we have round one in which everyone starts consensus, these consensus elaborate (dose some computation) then returns. When returns we will trigger round two of consensus. This second istance of consensus will do some computation and will terminate. Istance one and two are totally independent thanks to using tag of the round in couple with the message. (message with tag r=1 trip in first istance of consensus, and so on...)
```

```ad-example
![[Pasted image 20250129192641.png]]
![[Pasted image 20250129192706.png]]

```

![[244.png]]

### Formal Proof
1. **No creation**
	There are two points at which a message may be created:
	- <rb, deliver, p, m>. -> impossible by no creation of rb
	- <c,r, decided, messages> -> impossible by validity of consensus.

2. **No duplication**
	Suppose by contradiction you deliver message $m$ twice.
	Then you deliver it because it is in the decided of two different instances of
	consensus ($r$, and $r’$ with $r’ > r$).

	**Why?**
	Ma al turno r avete messo m in consegnato (e anche gli altri), e lo avete rimosso da non ordinato. Ora, se a r' vedete m in deciso, allora qualcuno, che sia p, ha innescato <r', Propose, unordered> con unordered contenente m. **Perché?
	Ma alla fine del round r, p mette m in consegnato e lo rimuove da unordered. Quindi significa che ha dovuto aggiungerlo tra la fine del round r e l'inizio del round r'. Ma unordered è protetto da delivered!

3. **Agreement**
	Suppose a correct process $p_0$ delivers $m$ at round $r$. Then $m$ is in decided of the consensus of round $r$. 
	If $m$ is not in the decided of the consensus of round $r$ of a correct process
	$p_1$, which property of consensus are you violating?
	So $m$ has to be in the decided of any correct process at round $r$ $\to$ agreement.


**Total order**: We have to divide the proof in two cases.
1) m and m’ are delivered in the same round $\to$ they must be delivered in the same round on each pair of correct process (WHY?) $\to$ the order is fixed by the deterministic function order. Thus m and m’ are delivered in the same order on each correct process.
1) m and m’ are delivered in two different rounds $r$ and $r’$ on correct process $p \to$ The only thing that we have to show is that each other correct delivers them at the exact same round $r$ and $r’ \to$ but this is direct from the agreement of the consensus.


## Uniform Total Order Broadcast
![[243.png]]

### Total Order Broadcast Algorithm (Uniform consensus)
![[247.png]]

## DIfference between Uniform vs Not Uniform
![[246.png]]