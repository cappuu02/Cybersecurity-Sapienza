
# Motivation
![[255.png]]
![[256.png]]
![[257.png]]
![[258.png]]
![[259.png]]
![[260.png]]
![[261.png]]

## System Model
The system is composed of a set of processes that are connected through perfect point-to-point links. Processes may fail by crashing. We have a perfect failure detector $P$.
$C$ processes are clients and other $N$ are used to implement our distributed object.
![[262.png]]

>$C$ are clients and $P$ processes. $O$ is the list.

- $C$ Clients do operations on the objects
- $P$ processes that implement our distributed objects


![[263.png]]
A client interacts with a distributed object (list) implemented in our set of processes.
- Our object has a certain state $S$ and a set of allowed Operations.
- Each operation (Append, get) is able to either read the state or to modify it.
- An operation is issued by a client with an invocation and it is pending until the client receives a response.

`Invocation: OBJ.OP_NAME([Arguments])` id invoking client
`Response: OBJ.OK([Return Values])` id client

>In the image above, client $1$ want to append a value $1$ in the list. After a bit, return the response of the list.

>We assume that a client does not invoke (or issue) an operation until the pending one completes. (Equivalent to register)

![[264.png]]

![[265.png]]

>Molti clienti significano operazioni concorrenti. Cosa abbiamo definito per gestire la concorrenza nei **Register**? **Consistent Semantic**!

## Consistency Criteria
A consistency criterion defines the result returned by an operation
- It defines all acceptable runs.
Three main consistency criteria are defined in literature
- **Linearizability** (Strong consistency)
- **Sequential Consistency** (Strong consistency) 
- **Causal Consistency** (weak consistency)

>We will only see the linearizability semantic.The Sequential consistency you can imagine how it works (Equivalent to registers imaging that the register is a list). Generalize what we have seen for a register.

### Linearizability
```ad-abstract
title: Definition

An **Execution** on our generic object $O$ is ==linearizable== if for any operation Op on $O$ we can find a fictional point (linearisation point) between the start and the end of $OP$ in which the operation  happens instantaneously and is visible to our entire system.
```


![[266.png]]
Is this execution linearizable? Yes.
![[267.png]]

```ad-example
![[268.png]]

> Is Linearizble!

```

```ad-example
![[269.png]]
![[270.png]]

```

**How do we implement a generic Linearizable (or atomic) replicated object?**
Le repliche (i processi che implementano $O$) **devono accordarsi** sull'insieme di invocazioni che gestiscono e **sull'ordine** con cui gestiscono tali invocazioni. (replica1 esegue append, anche replica2 esegue append).

>Remember if i have two list with same operations but different order, the list are not equal!

>We need Consensus!

There are three conditions that if respected on the invocations automatically implies that $O$ is linearizable.
- Atomicity
- Ordering
- Blocking operations

>If we respect these three properties, we garantuee that all replica agree and execute in the same orders.

==Atomicity==
Given an invocation $[O op(arg) pi]$, if one replica of the object O handles this invocation, then every correct replica of O also handles the invocation $[O op(arg) pi]$. $\to$ **All or nothing**.

==Ordering==
Given two invocations $[O op1(arg1) pi]$ and $[O op2(arg2) pj]$ if two replicas handle both the invocations, they handle them in the same order. $\to$ **Consistency of executed Operations**.

==Blocking Operations==
The client does not see the result of an operation until at least one (correct) replica handled it.

>The conditions are sufficient. If we have them we can implement any Object. However are not necessary (esistono object che sono atomici anche senza implementare queste proprietà). There are some objects that can be Atomic even if we do not have AOB.

**Can you name an atomic object that can be implemented without these conditions?**
Atomic register. (we use just the majority in a system that is Asynchronous)

## Replication techniques
Two main techniques implementing replicated linearizabile objects:
- **Active Replication**
- **Primary Backup (also Passive Replication)**

### Passive Replication (Primary Backup)
![[273.png]]
We have a primary process (leader). Leader has the object and the other processes aprticipate but with a copy of the object (called backup)
![[274.png]]
Client talk only with the primary (leader) and after, primary send to all the others processes.

Replicas are partitioned in two sets:
- **Primary (unique)**: is a singleton (a set with just one process - a leader). Receives invocations from clients and sends back the answers. Is the only ones that interacts with the clients.
	- Given an object $O$, $prim(O)$ returns the primary of $O$.
- **Backup**: Interacts with $prim(O)$ only. Is used to guarantee fault tolerance by replacing a primary when crashes

>**NB**: the following slides assume a synchronous system (you have $P$).

![[275.png]]
![[276.png]]

So, assuming no crash:
- When update messages are received by backups, they update their state and send back the ack to prim(O).
- prim(O) waits for an ack message from each correct backup and then sends back the answer, res, to the client.

#### Case when Backup Crash
![[277.png]]
![[278.png]]


#### Case when Primay Crash
The di cult case is when the primary crashes. Three scenarios:
- **Scenario 1**: Primary fails after the operation is completed and when is not handling any operation.
- **Scenario 2**: Primary fails after its has received all the Acks and before the client receives the response. The client will not receive the response.
- **Scenario 3**: Primary fails while sending update messages and beforereceiving all the ack messages.

>In all cases there is the need of electing a new primary (new leader).


##### Scenario 1
Primary fails after the operation is completed and when is not handling any operation (it fails after the response to client).

![[279.png]]

>We elect a new primary using a EL algorithm. The new primary has the latest copy of the object and can answer to new requests

![[280.png]]

##### Scenario 2
Primary fails after its has received all the Acks and before the client receives the response. The client will not receive the response.

Primary fails after he received all the acks but before it answer to the client. So the response is losed. We need to elect a new leader. There is still a problem: the operation $L.Append(1)$ is still running without a response (waiting for ever).
![[281.png]]
To fix: (use timeout) Client send again the operation to the new primary every $\Delta$ of time.

![[282.png]]

There is also another **problem**: if the client, after a $\Delta$$f$ time send another append request to the primary, the List of the primary now contains two times the same value.
To fix:  Use the timestamp! We need to make every request unique. We have the same request two times, with timestamp, we make these requests unique. That allow us to recognized if this operations was already done.

![[283.png]]
If there is another operations that append after the first, this has timestamp equal to $1$.


##### Scenario 3
Primary fails while sending update messages and before receiving all the ack messages. The problematic case is if the update is received by only some of the backups.


To fix: Run leader election algorithm that elect as a primary (leader) the process with the most updated state!

Assume only append and get operations:
![[285.png]]
Is possible? NO! This would implies that the primary executes the OP append(2) when P3 has not yet done append(1). This is impossible, a primary terminates an op only when all the backups updated.

![[286.png]]
Possible? No! A primary terminates an op only when all replicas are updated. This inconsistency is not possible. It implies that the primary acts in a bizantine way.

![[287.png]]


![[288.png]]

#### Electing The Most Updated Backup
![[Pasted image 20250130144406.png]]

How to Guarantee atomicity? the update must be received either by all or by none of the backups. When a primary fails there is the need to elect another primary among the correct replicas. This primary has to be the one with the most updated copy of the object. The primary has the job of making the backups on par before answering new requests.

>We have to update the state of the others otherwise we may lose the property on the operation counters.

**MAKING BACKUPS ON PAR**
![[290.png]]

![[291.png]]

Positive points:
- Easy to understand: All operations passes through a primary that linearises operations.
- Works even if execution is non-deterministic (Example, getRand(), currentTimeMillis(), any operation on an external oracle).
-  New backups can be added in a relatively easy way.
- Reads can be satisfied locally (on the primary).
Negative points:
- Delivering state change can be costly, the client has to wait for a new primary.
- Backups are just backups.
- Scenario 3 (crash in the middle of the update) is complex to solve in eventually sync-systems. -

> RAFT solves it.


### Active Replication
![[271.png]]
>Client contains software
>Replicas P that has replica of our object

![[272.png]]
Client broadcast operations to all the replica's and every replica receive the operation from the client and execute it. Witch kind of broadcast is this that send the same operations to all? **Total Order**! Reliable broadcast is not enough because is possible that two operations are run in different order.

▪There is no coordinator
▪All replicas have the same role
▪Each replica is deterministic. If any replica starts from the same
state and receives the same input, they will produce the same
output
▪The above implies that if each replica executes the same list of
command, then the clients will receive the same response from all
(non-faulty) replicas


To ensure Linearizability we need to preserve:
- Atomicity
-  Ordering
-  Blocking

>So we need Total Order Broadcast (including the clients)

#### Crash
does not need recovery actions upon the failure of a replica

Pros:
- Crashes are handled directly in the protocol.
- Can be adapted to tolerate n/3-1 Byzantine replicas.
- Clients do not have to wait if a crash happens.
Cons:
- It is hard to implement non-deterministic operations.
- Total order broadcast is generally expensive - especially if we have 1000 clients.
- Reads cannot be local. In primary backup a read can be satisfieed directly by
the primary. In active replication a read has to go through the Total Order Bcast.

## REPLICATED GENERIC OBJECT
A replicated generic object (deterministic) needs consensus to be implemented with linearisable semantic.
- Consensus is sufficient to implement any generic replicated object.
- Consensus is not necessary to implement all the replicated objects. As example we can implement atomic register!