# Motivation - IoT Environments
- Distribute a bunch of nodes in some environment  
- Need to collect data, monitor  
- No reliable wireless infrastructure  
- They need to cooperate and work together to achieve tasks  

![[5k.png|300]]

# Mesh Networking
```ad-abstract
title: Definition

Mesh networking consists in managing connections between networking elements in a dynamic way to forward data   Dynamically self-organise and self-configure. 
```

We use distributed algorithms that need to solve key challenges:  
  - Addressing and identifying nodes  
  - Routing across multiple hops  
# Addressing

## Hardware Addresses
Interface/node comes with a built-in address/key from factory (e.g., MAC address)  
- **Benefit**: No address assign protocol needed  
- **Downside**: Addresses might be too long, harder to route on addresses  

![[6k.png]]

## Geographic Addressing
We add an Addresses based on location!
- Addresses are assigned depending on the location of the devices (geographical, not topological)  
- Define a coordinate system and assign addresses (2D or 3D) to nodes, e.g., using GPS  
**Benefit**: No address assignment protocol needed  
**Downside**: Long addresses in small areas (many decimals) or address collisions  

![[7k.png]]


## Hierarchical Addressing (1)

==Idea==: Impose a tree on top of our topology and constrain addresses accordingly  
- Select a node as the root of the tree (usually reliable, powered and wired)  
- Assign a set of addresses to the root  
  - The root keeps one address and assigns the rest to its children 

![[8k.png]]

 
## Hierarchical Addressing (2)

- Uses a simple distributed protocol to do so, simply each node allocates a bunch of addresses for their children.
- **Benefit**: Easier routing on addresses  
- **Downside**: Requires a tree-like organisation.   If many new nodes join the network, you do not want to re-allocate addresses. Better to predict a worst case scenario for pre-allocation, but this requires some advance knowledge of future arrival patterns.


![[9k.png|400]]


---

## Zigbee’s Distributed Addressing Scheme (1)
This is a Distributed addressing scheme with hierarchical paradigm which assigns each node a unique 16-bit address and makes the following assumptions: 
  - Tree has maximum depth $L$  
  - Max children per parent: $C$  
  - Max forwarding (router) nodes per parent: $R$ where $R \leq C$  
- Address of the $n$-th router child at level $d+1$:  
  $A_{r,n}^{d+1} = A_{par} + S(d) \cdot (n - 1) + 1$  
- Address of the $l$-th non-router child at level $d+1$:  
  $A_{e,l}^{d+1} = A_{par} + S(d) \cdot R + l$  
- $S(d)$ is the number of nodes in each subtree rooted at level $d$
## Zigbee’s Distributed Addressing Scheme (2)

$$S(d) =\begin{cases} 0 \hspace{0.5cm} R=0 \\ 1 + C(L - d - 1) \hspace{0.5cm} R=1 \\  CR^{L - d - 1} - 1 - C + R \hspace{0.5cm} R > 1   \end{cases}$$  
## Zigbee’s Distributed Addressing Scheme (3)

![[10k.png]]

## Stochastic Addressing

- Nodes choose random numbers as their address  
- Simple to implement, but needs conflict resolution  
  - A new node broadcasts its address  
  - If a match occurs, a conflict is detected, and the node retries  
- More common than expected (birthday paradox)  
- Addresses are location-independent and harder to route  

![[11k.png]]




# Mesh Routing

Key approaches:
1) “We should always have routes available to everyone, at all times” proactive routing.
	- better for fixed/static environments, frequent communication.
	- lower route acquisition time.
	- Requires more control overhead, memory, power.
2) “We should create routes only when we need them” - reactive routing.
	- Better for dynamic environments, rare communication.
	- higher route acquisition time.
	- Requires less control overhead, memory and power.
## Link State Routing 

![[12k.png]]

## Distance Vector Routing 
Each router knows the links to its neighbours (does not flood this information
to the whole network). Each router has provisional “shortest path” to every other router (e.g., node A knows the cost of getting to router B). Nodes exchange this distance vector information with their neighbouring
routers. Routers look over the set of options offered by their neighbours and select the best one (that is, the one with smallest cost/weight). Iterative process, converges to set of shortest paths.

![[13k.png]]

### Convergence
![[14k.png]]
![[15k.png]]


## Mesh Routing
Link state and distance vector are not optimised for battery and bandwidth:
- in wireless communication, you get local broadcast “for free” (signal propagates out in all directions). No need do unicast all the neighbours.
- not always need all routes to all nodes.
In Mesh Networking, used in wireless environments, these factors need to be accounted for.
-  Node cooperate to efficiently route data
- Nodes can act as relays, enabling multi-hop forwarding
- Mesh networks dynamically self-organise and self-configure
	- reduce management and configuration overhead
	- improves fault-tolerance
	- dynamically distributes workloads

## Mesh Networking ALgorithms

### Optimised Link STate Routing (OLSR)
This is a distributed, proactive link-state routing protocol that minimizes unnecessary updates. Nodes broadcast messages to all neighbors, and each node selects specific neighbors—called multipoint relays (MPRs)—to forward packets. MPRs are chosen based on their ability to reach two-hop neighbors, ensuring full coverage. Only MPRs transmit routing updates, while other nodes remain silent.

1. Each node discovers its two-hop neighbours proactively by sending “hello” packets with a list of the sender’s neighbour set

![[16k.png]]
![[17k.png]]
![[18k.png]]
![[19k.png]]![[20k.png]]

2. Each node selects a subset of its 1-hop neighbours to forward its link states (Multipoint Relays, MPRs). Each node maintains information about the set of neighbours that have selected it as MPR.

![[21k.png]]

The ==goal== is to select the smallest possible set of one-hop neighbors N1(H) of node $H$ that can cover all two-hop neighbors $N2(H)$. The procedure works as follows:

**Procedure**
First, include any one-hop neighbors that are the sole connection to isolated two-hop nodes (i.e., nodes in $N2(H)$ reachable through only one node in N1(H)). Next, iteratively select the remaining one-hop neighbor that covers the most uncovered two-hop nodes until all nodes in $N2(H)$ are reached.

>This heuristic provides an efficient solution, as finding the optimal multipoint relay (MPR) set is an NP-complete problem.

```ad-missing
Missimg Image slide scorrevole!

```

#### forwarding
Once each node selected its MPRs, the topology database is built as in regular link-state routing. Having done that, nodes perform forwarding by running Dijkstra, store shortest path next-hop for each destination, through their MPRs. Observe that nodes tend to select highly connected nodes as MPRs, i.e., some nodes are MPRs of several nodes.

![[22k.png]]

#### downsides
Maintains routes to all nodes, all the time
- good if most nodes need to talk to each other
- causes overhead if communication is more sparse/rare
- reveals entire topology to all nodes (bad for privacy)

Solution: what if we build routes “on demand” just when we need them? (Reactive routing)


### Dynamic Source Routing (DSR) 
This is a Reactive Algorithm of routing!

==Reactive protocol==: no proactive network discovery when the network is
initialised. Nodes perform a discovery process only when data needs to be sent.
Route to a destination is discovered and stored by the source node and
embedded in the data packet.

**Main Idea**:
When a source node generates data to send to a destination node of which it
does not know the route to, it floods a route request message (RREQ).
Intermediate nodes append their ID.
When the RREQ reaches the destination, it sends back a route reply message
(RREP) along reverse of path contained in RREQ.
When the source gets the RREP, it sends the data along the path written in the header of the RREP (called “source route”)

![[23k.png]]

```ad-missing
Missimg Image slide scorrevole!
```

To improve efficiency, we can implement caching, i.e., source will cache
route for some period of time, in case it wants to send more packets to
that same destination later. 

Intermediate nodes and other nodes overhearing RREQs and RREPs may
also cache they see. Entries are deleted after timeout (tunable parameter).
- highly dynamic network -> set a low timeout,
- mostly static network -> set a high timeout

Route cache size can be limited (tunable parameter).

```ad-missing
Missimg Image slide scorrevole!

```

The ==idea== behind source routing has been around for decades. In fact, the
Internet technically supports source routing (there are fields in the IPv4
specification that allow source routing of packets). But it is deprecated.
Can be good for IoT applications.
**Downsides**:
- as the network gets big, source routes get long - packet overhead
- caches can get stale (outages not discovered until packets are sent - reactive routing is “lazy”)
==Idea==: distribute information more in the network (more like link state,
embed the path in the network rather than on the packets)

### Ad Hoc On-demand Distance Vector (AODV)

Reactive routing algorithm (no route discovery process until data has
to be sent) with Route Request messages (RREQ) to discover a route.

RREQ creates distance-vector entries at each hop pointing back to
source.
- Nodes on active path maintain routing information.
- Convergence issues typical in distance Vector can be restrained by introducing a destination-controlled sequence number stored with each route.
The destination increments the value of the sequence number every time there is an event (like a failure or a new node coming up)

![[24k.png]]

```ad-missing
Missimg Image slide scorrevole!
```

The protocol uses withdraw messages (RERR) for error handling, differing from DSR. An RERR is triggered in three cases: (1) a node detects a broken link for the next hop in its routing table, (2) it receives a data packet with no valid route, or (3) it gets an RERR for one of its active routes.

Nodes can attempt local repair instead of propagating the RERR. They broadcast a new RREQ to find an alternative path around the failure. While this avoids immediate route invalidation, repeated repairs may gradually increase path lengths over time.

Every route table entry at every node must include the latest information
available about the destination sequence number. it is updated every time a node receives new information about the sequence number from RREQ, RREP or RERR messages. Each node owns and maintains its sequence number to guarantee loop-freedom of all routes towards it. A node increases its sequence number:
1. Before beginning a route discovery (i.e., before sending a RREQ message)
2. Before originating a RREP.

### Hierarchical/Tree Routing
Each node knows subrange of addresses for each children and is responsible for
that block of addresses. A node getting a packet to send to some other nodes just needs to check if the address is in its children’s subranges
- if yes, sends to appropriate child
- if no, sends to parent.

>Simple routing.

![[25k.png]]

### Geographic Routing 
Uses geographic address: uses geographic position information to make
progress to destination. The source sends messages towards the geographic location of the destination. Each node keeps track of geographic location of neighbours, so it knows which neighbour makes most progress to destination.

More complex than you might think
- can get stuck in dead ends (“voids”, i.e., a node has no neighbours towards the destination)
- can get stuck in loops (two neighbours think each other makes the most progress to the destination)

#### Greedy Forwarding

```ad-missing
Missimg Image slide scorrevole!
```

#### Different distance metrics for Greedy Forwarding
![[26k.png]]

#### Greedy routing does not guarantee delivery

```ad-missing
Missimg Image slide scorrevole!
```


### Delay-Tolerant networking: Gossip Algorithms 
==Idea==: there is new rumor, people start gossiping about that. Initially they
gossip a lot and the rumor spreads out very quickly, then people get
bored about the rumor and mention it more rarely. If a node has data to send, it waits a random amount of time, picks a random target direction and broadcasts to nodes towards that direction. Such nodes apply the same mechanism.

```ad-missing
Missimg Image slide scorrevole!
```

- If all link failures are transient and reoccurring, message will eventually reach the destination.
- Very simple algorithm, easy to implement, will likely reach all other nodes too (good for broadcasting).
- Slow propagation.
- Variant: Rumor mongering
	- When nodes get new update, it becomes a “hot rumor” (probability of sending out packets is higher)
	- When a node hears the packet many times, it propagates it less frequently.

## Back to our Motivation
We have been assuming that the network is not partitioned. This is not always realistic in IoT.
- occasionally connected networks: sensors mounted on animals, floating in
sea, space satellites that “pass” occasionally.
- Highly unreliable environments: military networks suffering from jamming, acoustic links in air/water, free-space optical communications
- Low-power environments: low-duty cycle sensors/actuators

## Delay-Tolerant Networking
![[27k.png]]


