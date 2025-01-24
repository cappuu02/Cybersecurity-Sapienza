



We can have two models for failures
- **Crash-Stop** $Crash(p_j)$: after this event process $p_j$ does not execute any local computation step $Exec(j)$.
![[Pasted image 20240930182101.png|500]]
Star means that the process end in that point.
If a process ends it can't be rebooted, it's died forever.

- **Byzantine Failure** $Byz(p_j)$: after this event process $p_j$ behaves in an arbitrary way ($Exec(j)$ does not follow anymore the automaton of $p_j$).
![[Pasted image 20240930182309.png|500]]![[Pasted image 20240930182422.png|500]]
$Byz(p_j)\in Crash(p_j)$: if a byzantine is provided by the automaton then it works even if the crash-stop occurs.
![[Pasted image 20240930182435.png|500]]

A **process** is **correct** if deos not experience failure. We indicate with $f$ the max number of failures and cannot be more than $n-1$.

____
# ABSTRACTION

**Abstraction** formalize a problem with a description.
$\to$ implement the abstraction with a distributed protocol.

**Formalize a link** (link: comunication channel between 2 processes $p$ and $q$). If we can implement a link for 2 processes, it can be extendend in an easy way.

A **link loses messages with a certain probability** $pr$, the channel can duplicate a message a finite number of times, and it does not crate messages from thin air (if you recive a message, it must be sent by a process not by the link).

link is an object that has 2 events:
- Request (input): $<Send \hspace{3px}|\hspace{3px} q,m>$ that sends a message $m$ to process $q$.
- Indication (output): $<Deliver, p,m>$ delivers message $m$ from the process $p$.

**Proprieties**:
- **FL1** (fair-loss): if a correct process $p$ sends infinitely often $m$ to a process $q$, then $q$ deòivers $m$ an infinite number of times. (example, the process faile every even number).
- **FL2** (finite-duplication): if a correct process $p$ sends $m$ a finite number of times of times to $q$, then $q$ cannot deliver $m$ an infinite number of times.
- **FL3** (no creation): if some process $q$ delivers a mesage $m$ with sender $p$, then $m$ was sent by $p$ to $q$.
![[Pasted image 20240930182648.png|500]]

There are two classes of proprieties: **safety** or **liveness**.
- **Safety**: if violated a time $t$, it can never be satisfied after $t$ (if a safety propriety is violated in execution $E$, there is a prefix $E'$ of $E$ such that any extension of $E'$ also violates property example: die). FL3 is a safety propriety.
- **Liveness** cannot be violated in finite executions (any finite executione $E$ thath does not satisfy a liveness property there is an extensione of $E$ that satisfy it)

When you put a bound on a liveness proprety it becomes safety.
If we bound **FL2** with at most 7 duplications (if a correct process $p$ sends $m$ a finite number of times to $a$, then $q$ cannot deliver $m$ more than 7 times). In that case **FL2** **becomes safety**.

Other Properties:
- **Mutual Exclusion**: if a process $p$ is granted a resource $r$ at time $t$, then no other process $q$ is granted $r$ at $t$.
- **No-deadlock**: if $r$ is not already granted, eventually someone get a grant on resource $r$.
- **No-starvation**: if a process $p$ request a grant on resource $r$, it will eventually get it.
___
**Baddly written propierty** (example: if process $p$ sends a message $m$ to $q$, then $q$ will eventually deliver it and this deliver is unique) $\to$ it is mixing two aspects:
- a livenesse ($q$ will eventually deliver it)
- a safety: the deliver is unique

It should be decomposed in two propierties:
- if $p$ sends a message $m$ to $q$, then $q$ eventually delivers it.
- if $p$ sends a message $m$ to $q$ then $m$ is delivered at most once.

____
# ALGORITHM - COMMUNICATION LINK

### Step 1 - Fair Lossy Link $\to$ Stubborn Link

Taken **FL1**, **FL2** and **FL3** to get a better algorithm we have to change:
- **FL1**: $p$ sends infinitely often $m$.
- **FL2**: $q$ cannot deliver $m$ ad infinite number of times.
that becomes:
- **SL1** (Stubbom-delivery): if a correct process $p$ sends $m$ to $q$ then $q$ delivers $m$ an infinite number of times.
and we also have:
- **FL3** (No Creation): if some process $q$ delivers a message $m$ with sender $p$, then $m$ was sent by $p$ to $q$.
![[Pasted image 20240930183837.png|300]]

In the pseudocode we can find **handlers** (a function that react when an event happens), they are all atomics. When an hendler starts, the handler take a lock and in the process where the handler is executed, can't happen anything else. So we can't have a round robin execution (zig-zag).

![[Pasted image 20240930184001.png|500]]

But that isn't a correct algorithm because:
1. **FL3** (proof by contradiction):  suppose process $q$ executing our algorithm receives message $m$ that was not sent by $p$.
	1. If $q$ delivers a message, then it delivers here: ![[Pasted image 20240930184239.png|500]]Implies that **FLL**, is delivering a message that was not sent by $p$. This implies that FLL is not fair-lossy. This contradicts our hypothesis: FLL is fair-lossy.
2. **SL1** (proof by contradiction - suppose $q$ delivers $m$ a finite number of times):  
	1. $p$ sends $m$ on FLL an infinite number of times: ![[Pasted image 20240930185213.png|500]]
	2. If $q$ stubborn delivers $m$ a finite number of times, then FLL delivered $m$ a finite number of times: ![[Pasted image 20240930184428.png|500]] 
____
### Step 2 - Stubborn Link $\to$ Perfect P2P Link

We can improve the Stubborn changing SL1 in:
- **PL1** (Reliable Delivery): if a correct process $p$ sends $m$ to $q$, then $q$ eventually delivers $m$.
- **PL2** (No Duplication): a message is delivered at most once.
and we also have:
- **FL3** (No Creation):  if some process $q$ delivers a message $m$ with sender $p$, then $m$ was sent by $p$ to $q$.
![[Pasted image 20240930185632.png|500]]

Also this one isn't a good algorithm:
1. **FL3** (proof by contradiction): suppose process $q$ executing our algorithm receives message $m$ that was not sent by $p$.
	1. if $q$ delivers a message then it delivers here: ![[Pasted image 20240930190231.png|500]]and this implies that SL delivered a message that was not created. Violates the hypothesis that SL is a stubborn. 
2. **PL2**: the pp2p-delivery of a message is guarded by an if $m$ $\in$ $delivered$: ![[Pasted image 20240930190417.png|500]]suppose $m$ is delivered twice, at time $t$ and $t’$ (with $t< t’$). We obtain that at time $t$ the delivery handler is executed. Since the handler is atomic we have that $delivered:=delivered \cup {m}$ is executed before $t’$. Therefore, at $t’$, $m$ is in delivered, this contradict the fact that trigger is executed at (or after) time $t’$.
3. **PL1**: suppose, $p$ sends $m$ and $q$ does not deliver it. There could be two reasons for $q$ to not deliver $m$:
	1. $m$ is in delivered when the delivery handler is executed: ![[Pasted image 20240930190716.png|500]]if m is in delivered then, $q$ eventually will execute trigger . This contradicts the fact that $q$ does not deliver $m$.
	2. The delivery handler is never triggered with $<p,m>$: ![[Pasted image 20240930190855.png|500]]this means that SL is not stubborn. Violating our hypothesis.