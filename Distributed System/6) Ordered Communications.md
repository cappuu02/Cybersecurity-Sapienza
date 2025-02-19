
# Ordered Communications
Define guarantees about the order of deliveries inside group of processes
- Type of ordering:
	- Deliveries respect the FIFO ordering of the corresponding send
	- Deliveries respect the Causal ordering of the corresponding send
	- Delivery respects a total ordering of deliveries (atomic communication, we will see them after consensus)

## Advantages of ordered communication
Orthogonal TO reliable communication
	Reliable broadcast does not have any property on ordered delivery of messages.
This can cause anomalies in many applicative context

![[Distributed System/Images/60.png]]

>nessuna regola ordinamento dei messaggi
## FIFO BROADCAST

>Can be regular or uniform

![[Distributed System/Images/61.png]]

### Implementation
![[Distributed System/Images/62.png]]
lsn used by sender
pending is empty
next = array of sequence number 

```ad-example

![[Pasted image 20241021145408.png]]
```

>Ogni processo invia un messaggio. Ciascun processo riceve (deliver) i messaggi inviati da uno specifico processo nell'ordine in cui il processo li ha inviati quindi non risulta essere un total order ma un local order (locale al processo).

**FIFO RELIABLE BROADCAST**:
FIFO property is orthogonal with reliability guarantees (you can be FIFO but not regular or uniform):

![[Pasted image 20241021145510.png]]

![[Pasted image 20241021145630.png]]

Sometimes FIFO is not enough:
![[Pasted image 20241021151346.png]]

**SOMETIMES FIFO IS NOT ENOUGH**
![[Pasted image 20241021151403.png]]
![[Pasted image 20241030180132.png]]![[Pasted image 20241030180148.png]]![[Pasted image 20241030180207.png]]


## Causal Order Broadcast
**Guarantees that messages are delivered such that they respect all cause–effect relations**.
Causal order is an **extension of the happened-before relation**.
A message $m_1$ may have potentially caused another message $m_2$ (denoted as $m_1$ → $m_2$) if any of the following holds:
- some process $p$ broadcasts $m_1$ before it broadcasts $m_2$.
- some process $p$ delivers $m_1$ and subsequently broadcasts $m_2$.
- there exists some message $m′$ such that $m_1$ → $m′$ and $m′$ → $m_2$

![[Pasted image 20241021152538.png ]]

![[Distributed System/Images/63.png]]
### NO-WAIT Casual Reliable Broadcast (NO-Wait CRB)
![[Pasted image 20241021152724.png]]
Past = lista vuota 
processo $P0$ invia un messaggio in broadcast ed appende nella lista past la coppia ID, messggio. L'altro processo che deve consegnarlo vede:
- se è stato consegnato non fa nulla
- se non è stato consegnato vede prima se ci sta qualche messaggio che deve essere consegnato prima nell'ordine temporale, dunque in past, e nel caso consegna quello e poi consegna il messaggio attuale.

![[Pasted image 20241021152806.png]]
## IMPROVED no-wait CRB
The no-wait causal reliable broadcast algorithm has a practical limitation :
- Each message travels together with all its causal history 
- Requires infinite memory! 
Can we improve? Actually there is no need to retain old messages forever, a message can be discarded once it has been delivered by all correct processes. We can implement a “garbage collection” mechanisms by keeping track of “who delivered what”. (It only orks with $P$)

![[Distributed System/Images/64.png]]

## Waiting casual reliable broadcast
![[Distributed System/Images/65.png]]

```ad-example
title: Waiting CRB Example
![[Distributed System/Images/66.png]]
![[Distributed System/Images/67.png]]
![[Distributed System/Images/68.png]]

```

## Limitations of Causal communication
Causal Order is not enough strong to avoid anomalies.

Si considera un conto bancario replicato su due siti diversi (**R₁** e **R₂**).  
Ogni replica inizia con lo stesso saldo: **£100**.
Due operazioni vengono eseguite in parallelo:
1. **R₁** esegue un deposito di **£20** (portando il saldo a **£120**).
2. **R₂** applica un interesse del **10%** (portando il saldo a **£110**).
Successivamente, entrambi ricevono l'operazione dell'altro e la applicano:
- **R₁** applica l'interesse del 10% su **£120** → saldo finale **£132**.
- **R₂** applica il deposito di **£20** su **£110** → saldo finale **£130**.

![[Distributed System/Images/69.png]]
Anche se entrambe le repliche hanno ricevuto gli stessi aggiornamenti, i saldi finali non coincidono! Il problema nasce dal fatto che il sistema non ha imposto un ordine globale sugli eventi, causando risultati incoerenti.

## Total Order Broadcast
A ==total-order (reliable) broadcast abstraction== orders all messages, even those from different senders and those that are not causally related.
The total-order broadcast abstraction is sometimes also called atomic broadcast. 

Message delivery occurs as if the broadcasts were an indivisible “atomic” action.

The message is delivered to all or none of the processes and, if the message is delivered, every other message is ordered either before or after this message.

![[Distributed System/Images/70.png]]

>BEWARE!! Total order is orthogonal with respect to FIFO and Causal Order.

Total order would accept indeed a computation in which a process $p_i$ sends $n$ messages to a group, and each of the processes of the group delivers such messages in the reverse order of their sending. 

The computation is totally ordered but it is not FIFO.
## Relationship Among BCAST Specifications
![[Distributed System/Images/77.png]]![[Pasted image 20250214172846.png]]