## Execution
two main models of process failures:
- Crash-Stop Failure
- ==Byzantine Failure==

Byz($p_j$): after this event process $p_j$ behaves in an arbitrary way (when we have $Exec(j)$ we do not follow anymore the automaton of $p_j$).

![[310.png]]

Byzantine processes may
- deviate arbitrarily from the instructions that an algorithm assigns to them
- creating fake messages
- dropping messages
- delay the deliveries
-  altering the content of messages
- act as if they were deliberately preventing the algorithm from reaching its goals
- Asynchrony is also under control of the byzantines:
▪ They can delay messages on p2p channels.
▪ …

WE ASSUME THAT ALL BYZANTINE PROCESSES AND THE SCHEDULER OF EVENTS
COLLUDE. THE FAIRNESS OF THE SCHEDULER IS KEPT.

## Byzantine power
Take even a single byzantine process. Assume it can send messages faking an arbitrary sender… then it can entirely decide the local view of a process p3 (when channels do not have bounds on delay).

![[311.png]]
$P4$ è il processo bizantino che può impersonificare un sender ed inviare messaggi per contro di altri processi.

>So, Authentication is necessary.

## Cryptography Abstractions 1
We need cryptographic mechanisms:
- Hash functions
- Message Authentication Codes
There is a distributed oracle Auth.

- Authenticate Operation
- Verify Operation

**We need cryptographic mechanisms:** Public signatures
- **Sign Op**: Any sender process $p$ invokes the oracle call with message $m$ and it obtains a special object $s$
- **VerySign OP**: Any process q invokes the oracle call with message m, sender p and object s. The oracle answers yes if and only if the p previously invoked sign on m, and it obtained object $s$. Otherwise, it answers no.

## Authenticated Perfect Link
![[312.png]]
![[313.png]]

```ad-question
In the autheticity properties why p must be correct?

```

## Uniform Consensus Specification
![[314.png]]

### Faulty State
NOTE: a Byzantine process may act arbitrarily and no mechanism can guarantee anything that restricts its actions.
1) We do not define any “uniform” variant of primitives in the Byzantine failure model.
2) No properties can be enforced on faulty process. E.g., in consensus they can decide more than once, they can deliver arbitrary messages in pp2p, …

**WHAT ABOUT FAILURE DETECTOR?**

## Byzantine Broadcast
Broadcast is a fundamental primitive, and it is used in a set of applications.
When we have seen crash failure a key achievement has been to create a broadcast property with an agreement property:
- Regular Reliable $\to$ If a correct delivers a message m, then all corrects deliver m. (all-or-nothing-semantic)

![[315.png]]
![[316.png]]

PER COSTRUIRE UNA PRIMITIVA DI BROADCAST CHE IMPEDISCA AL BYZANTINE DI FAR SÌ CHE PROCESSI ONESTI CONSEGNINO MESSAGGI DIVERSI:
- FASE 1: Costruiamo una primitiva di broadcast (Consistent Broadcast) in cui con un byz. Bcaster un processo onesto o non consegna alcun messaggio, o se consegna un messaggio m, allora nessun altro corretto consegna un messaggio diverso da m.

- FASE 2: Costruiamo un Broadcast più potente (Byzantine Reliable Broadcast), in cui abbiamo una semantica del tutto o niente: quando il Bcaster è byz. o nessun processo corretto consegna un messaggio, o tutti i processi corretti consegnano lo stesso messaggio.
### Consistent Broadcast
![[317.png]]

#### Tentative 1
Un processo bizantino può inviare due tipi di messaggi $m$ o $m'$
Tramite gli echos riusciamo a garantire una soglia che ci permette di evitare che il processo bizantino confonda i vari processi.
![[318.png]]

#### Tentative 2
![[319.png]]
![[320.png]]
![[321.png]]
![[322.png]]
You know that a correct can see at most one message Different! (one byz).
1) `[m’,m’, m, m]` no deliv. (safe)
2) `[m’,m,m,m]` ame deliv.(safe)
3) `[m’,m,m]` (no del.) or `[m,m,m]` (same del).
4) (impossible `[m’,m’,m]`) why?

Why not $4$ echoes? If the byz does not echo (or does the echo of a different message) no one delivers even if sender is correct!

#### How do we generalise?
What happens if $f$ is an arbitrary value? (assuming $f<n/3$). What is the threshold $k$ of echoes we have to see?

echoes are votes for a certain message:
- A byzantine could give a different vote to each honest process;
- An honest process gives the same vote to everyone;

Suppose $p$ delivers message $m$ that reaches threshold $k$. Then it means there is a set $V_m$ of $k$ processes that voted $m$

Suppose $p’$ delivers $m’$ that reaches threshold $k$, then there is a set $Vm’$ of $k$ processes that voted $m’$.

if $V_m \cap V_m' = f + 1$ then the same honest process voted in both set, this
implies $m = m'$. 
$$k > \frac{N + f}{2} = k \ge \frac{n+f+1}{2} \hspace{0.9cm} \text{sostituendo} \hspace{0.9cm} k \ge \frac{4+1+1}{2}=3$$
#### Byzantine Consistent Broadcast Algorithm
![[Pasted image 20250131162221.png]]

##### Proof
**Validity**: if the sender is correct at least $n-f$ processes do the echo (all the correct) of $m$. In order for others to deliver m we need $N-f > (N+f)/2$ (threshold in the algorithm). That is $N/2>f+f/2$ that is: $N> 3f$ ( algorithm assumption).

**No duplication**: Immediate from the auth. channel.

**Integrity**: Immediate from the auth. channel

**Consistency**: A process delivers m only after al-delivering more than $(N+f)/2$ ECHO
messages.$(N+f)/2$ processes represent a byzantine quorum.
- Any two byzantine quorums overlap in at least one correct process. Why? The intersection of any two byzquorums is at leat $f+1$. Any set of $f+1$ processes contains at least one correct (disegno Alessandro)

-  Let $p$ correct deliver message $m$, then it received from a byzquorum.
- Let p’ correct deliver $m’$, then it received from a byzquorum (not necessarily the one above).
- The two byzquorum intersect in a correct $p’’$. Since $p’$' sends a single broadcast, then $m=m’$.


>Note that it is possible for some correct to not deliver message, while other corrects deliver (and deliver the same message).

![[323.png]]

##### Performances
- **Messages**: (only messages generated by correct are counted. Why?)
	- At most $n^2$ messages.
- **Delays**: 2 step.

### Byzantine Reliable Broadcast

![[Pasted image 20250131162535.png]]
![[Pasted image 20250131162550.png]]
![[Pasted image 20250131162843.png]]
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
1) if it received from a quorum of echo.
2) if it received f+1 ready for m.
It is not possible that two correct for (1) send ready for messages different from m. For (2) is the same considering that at least one of that f+1 is correct. Thus no two corrects send ready for two different messages. Therefore, it is impossible that two corrects see 2f+1 ready for different messages (at lest f+1 of these 2f+1are correct)

**Totality**: A correct process p delivers if it sees 2f+1 ready for m. At least f+1 of these 2f+1 are correct. Therefore, any correct sees at least f+1 ready for m. This implies that any correct will amplify (if it does not send a ready upon receipt of a byzquorum of echo). There are at least 2f+1 corrects in our system, thus each correct will see at least 2f+1 ready for m, delivering.