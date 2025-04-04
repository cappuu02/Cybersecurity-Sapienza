# Total Order

## Uses of TO-Broadcast (Atomic Broadcast)
Every replica start with counter equal to 1
![[228.png]]

We want that several replica of the same data structure are consistent and if they are updated from different counter in a distributed way we can solve this problem thanks the Total Order Broadcast.

>Se le operazioni vengono eseguite secondo un ordine preciso non ci sarebbero problemi nè confusione!

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
	- not uniform: all the correct will see the same order of messages (not the non correct)
	- uniform: faulty process cannot see a different order

**Total Order Broadcast**
- $V$ = Validity
- $I$ = Integrity
- $A$ = Agreement
- $O$ = Order

Distinct specifications arise from distinct formulations of each property:
- uniform vs non-uniform
- A uniform property imposes restrictions on the behavior of (at least) correct processes on the basis of events occurred in some process

## The Agreement Property (already done)
**Uniform Agreement (UA) $\to$ Uniform Broadcast**: If a ==process (correct or not)== TODelivers a message $m$, then all ==correct processes== will eventually TODeliver $m$.

![[233.png]]

>Se un processo, corretto o no, consegna un messaggio, tutti i processi corretti consegneranno quel messaggio lì!

**Non Uniform Agreement (NUA) $\to$ Non Uniform Agreement**: If a correct process TODelivers a message $m$, then all correct processes will eventually TODeliver $m$.

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
![[346.png]]
![[347.png]]
![[348.png]]
![[349.png]]

```

### Formal Proof
1. **No creation**
	There are two points at which a message may be created:
	- `<rb, deliver, p, m>` $\to$ impossible by no creation of rb
	- `<c,r, decided, messages>` $\to$  impossible by validity of consensus.

2. **No duplication**
	![[350.png]]
	

3. **Agreement**
	![[351.png]]
	


**Total order**
![[352.png]]



## Uniform Total Order Broadcast
![[243.png]]

### Total Order Broadcast Algorithm (Uniform consensus)
![[247.png]]

## DIfference between Uniform vs Not Uniform
![[246.png]]