The routing problem concerns all types of networks:
- In a packet network based on the IP protocol, the routers needs to decide where to forward IP packets.
- In an Ethernet based Local Area Network (LAN) the Ethernet switches need to decide where to forward the Ethernet frames.
- In a circuit based traditional telephone network the Central Offices need to decide where to forward a call directed toward a given telephone number

To solve the routing problem usually we need both:
- **Routing Algorithms**: they allow the nodes to take the routing decisions based on the information that they have available.
- **Routing Protocols**: They allow the nodes to exchange the information needed to run the algorithms and take the decision.

The routing protocols define the rules for the exchange of routing information among the routers in a network. Routing protocols dynamically distribute network topology information needed to choose the paths (and update the information when some change happens).

>A routing protocol is typically associated to a routing algorithm that actually selects the «shortest» path on the basis of the known network topology information

## Routing vs Forwarding
- **Routing**: the operations, protocols and algorithms related to taking the decisions of where to forward the packets.
- **Forwarding**: the process of forwarding a packet, usually the decision has already been take.


![[Pasted image 20241209145141.png]]
Il nodo della rete nel primo dominio (?) non sa quali sono i cammini di un altro dominio e la sua struttura. Abbiamo sostanzialmente due problemi di routing su due differenti livelli:

## Level 1: BGP and IGP
Finding a sequence of Autonomous systems that packet should through to go from source to destination. But thanks to this, we find an Interior gateway problem that is more deep and go from the ingress to the egress point of domains.

![[WhatsApp Image 2024-12-09 at 15.14.25.jpeg]]

Schematicamente possiamo suddividere dunque:
![[Pasted image 20241209145825.png|500]]
![[Pasted image 20241209145813.png|500]]


In this last image we can distinguish two types of technology of distributed routing:

### Link State 
Topology information is flooded within the routing domain
Best end-to-end paths are computed locally at each router and determine next-hops
Based on minimizing some notion of distance
Works only if policy is shared and uniform

Thanks to this, all node can create map of topology (internal information). Every node use Dijkstra to find shortest path.

![[Pasted image 20241209151318.png]]

```ad-example
Examples: OSPF, IS-IS
```


### Vectoring
Each router knows little about network topology
Only best next-hops are chosen by each router for each destination network
Best end-to-end paths result from composition of all next-hop choices
Does not require any notion of distance
Does not require uniform policies at all routers

![[Pasted image 20241209151325.png]]

```ad-example
Examples: RIP, BGP

```
