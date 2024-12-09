## Client-Server model
we have the client layer and server layer.

![[WhatsApp Image 2024-12-07 at 22.03.45.jpeg]]

we know that optical network work according to the circuit switching parading, idea: this logical connection is realized though the establishment of light path here. client layer has to ask to the server layer (optical network) "create me this light path, this is the clients to connect".

**MCE** = This have an optimization algorithm. It take as input the logical network topology, the list of all the lambda for all link (status) and Qos and it take in output a lightpath, the blue one that we can see in the image.

control plain = routing



![[WhatsApp Image 2024-12-07 at 22.43.07.jpeg]]

Control plane if the IP layer wants to route packets from $R1$ to $R2$. So, the IP layer run Dijkstra algorithm to search the better lightpath and find the green one. 
In the optical network that follows, there is a second lambda that was previously occupied but is now free so, the IP control plane find a different way to go from $R1$ to $R2$ with lower latency. Infact, for the operal performance is better. So the IP control plane modify the routing table in $R1$ to follow this new path.

$R1$ need to know the topology of network and it must have a method to create a lightpath thanks to the signal protocol.

>This conclude the journey in the optical world.

---- 
we move in the client layer now with the Multiple protocol label switching argument
## Client Layer (electrical domain)
**Electric domain**: now we have full access on binary version of information

![[WhatsApp Image 2024-12-07 at 22.56.36.jpeg]]

This scheme is divided into two different schemes:
- **Bottom part**: much traffic flow
- **Top part**: Not used, it

I'm using half resources. Over the link from $R5$ to $R4$ there are much traffic. How can i switch the logical link? I look into $R5$ and modify the output door. But the problem still exist. If i look source address i can manipulate better the traffic. All this work is called: "==traffic engineering==".
This consist in distributes resources among all the resources that i have.
![[WhatsApp Image 2024-12-07 at 22.56.48.jpeg]]

>The traffic engineering is a service that a customer can buy from service provider

The thing that is difficult to realize with IP layer is this one: 
![[WhatsApp Image 2024-12-07 at 23.00.22.jpeg]]
Service that customer want to buy from service provider

Another service that the customer want to buy from service provider is the "==restoration service==" (against failures).

```ad-missing

IMMAGINE
```


Image that this link fails $\Rightarrow$ Losing packets
**How we do restore the service in this IP network**? with the OSPF a link state protocol that notify all the other network nodes that here there is a failure. To discover a failure i send an hello message to my neighbor, if they don't respond, i understand that there is a failure. I flag the information about the failure to all the other nodes. all the routers re-compute the shortest-path and at the very end, after 100 of millisecond, the network find an alternative path.

>In the **pure IP layer** we cannot create the concept of backup path.

3 services that customer want to buy from service provider.
The Service provider is realized through the IP tech the services they are less efficient (have limitations). For these reasons in 199* the MPLS was founded.

## The needs of a TLC provider of data services
 Offer services to its customers
- good “Quality of Service” – QoS
- Service Level Agreements – SLAs
Run its backbone in a cost-effective way
- convergence of services (example voice and data services)
For its Data backbone the provider needs good support for:
- Virtual Private networks
- Traffic Engineering
- Protection/restoration mechanism
It turns the IP layer into a Connection-oriented packet switching technologies that represent a good answer to these needs

## MPLS over Ethernet
Situation in the 199X for the stack of transport network:
![[Pasted image 20241207231845.png]]

>MPLS is a layer between 2 and 3 defined to improve set of service that a service provider can offer to a customer or company. 3 different type of services:  VPN, traffic engineering and restoration (fast recovery from failure).
## Connection-Oriented Packet Network
![[Pasted image 20241207232121.png]]
Network domain with MPLS.
It's connection oriented parading. why? Because, before selling traffic we must create entries inside this table, we need to insert a new row into each of these tables.

Create connection means go inside every single switching elements (router) and insert a line inside the switching table in order to handle the communications. for each row we find two number. How is realized this table? Two parts:
- **input**: (1)-> input interface. (25)-> label, is carried on top of packets
	- if this router receive something from port 1 with label 25 it will send out on port 4 with label 43. 
- **output**: (4)-> output interface. (43)-> label

if i receive somethings from interface 1, this rule is applied.
Packet has a special header added to IP packet where the label is inserted. (20 bit long number).

```ad-example
Packet with label 26, when arrive into the first circle (router) go into the second row of the switching table. so it output to the port 4 with label 12. And so on!

```

![[WhatsApp Image 2024-12-08 at 00.12.03.jpeg]]

Client is out the provider network. The scheme is an MPLS domain but client is outside.
Client can adopt different technologies. Who is encapsulating the packet (who perform the tunneling? Performed by edge   

![[WhatsApp Image 2024-12-08 at 00.11.53.jpeg]]

Traffic flow is described by:
- src-IP
- dest-IP
- Protocol (UDP, TCP)
- src-pt
- dest-pt

>these are the five couple classifier

![[Pasted image 20241208000525.png]]
>MPLS allows us to define an $n$ to $n$  tunnel to pass through a MPLS domain.


![[Pasted image 20241208000654.png]]
>We can have multiple tunnels. (overlay model)

How can we enforce the packets to follow a different path?
- Classification performed at this ingress node
- Use different labels

![[Pasted image 20241208001039.png|600]]



----
## Lezione 2 Dicembre 2024

For the next step, remove the MPLS stack. (MPLS today is not so much used)
![[Pasted image 20241208123918.png]]
MPLS is connection oriented paradigm, turn a connectionless environment as IP networks into connection oriented (before two clients send traffic, they has to ask for the creation of end to end tunnel that is called label switch path). One thing that MPLS done is to move from the concept of "switching base on destination address to switching function performed over the MPLS label". A label is a number which is carried on top of the packets. Labels are used to distinguish different packets carried over the same link.

MPLS is cost full in term of overhead. For this reason we are moving into the ...


## MPLS Network Node

![[Pasted image 20241208125242.png]]
Every node that support IP support also MPLS. A layer 3 node is divided in two parts:
- **Switching component** (move the packet from input to output)
	- A set of modules for Label allocation and Label binding and for exchanging Label allocation information with adjacent nodes
- **Control component** (routing and support LDB (label distribution protocol))
	- Forwarding with Label switching paradigm

The Control Component and the Forwarding component are integrated within an IP Router that becomes “IP/MPLS router. The MPLS Forwarding Component is an extension of IP forwarding capability.

## Label Encoding

Structure of MPLS Header. The MPLS label is carried in a MPLS header (also known as “shim header”). It is inserted between Layer 2 and Layer 3 header


![[Pasted image 20241208125406.png]]
- **Label**: 20 bit long string.
- **Exp**: used for different purpose (assign a level of quality service to the quality).
- **S**: flag:
	- 1 = next header is IP header
	- 0 = is more than MPLS
- **TTL**: decrement by 1 when packet is sent.

## Terminology for MPLS Network

IMMAGINE

the first edge node need to understand what is the proper header to use. This node perform a function called "classification". LER has to classify packet based on the header fields of the packet.
These information's are called FEC (Forwarding equivalent class).
$$11.0.1.0/25 \hspace{0.2cm} \wedge \hspace{0.2cm} 10.0.1.0/25 \hspace{0.9cm} \text{Form a FEC}$$
this is a set of packets that must be processed in the same way in the MPLS domain. Have to follow the same path, and so long so for.
All the traffic generated from network $A$ with destination to network $B$, since it is classifier at the same FEC, is deliver with the orange tunnel. **FEC** is negotiated between client and provider when customer is buying the transport service.

![[Pasted image 20241208131408.png]]
The LSP is the result (output) of control plane functionality called LDP. LDP is a distributed control plane protocol. 

Remember, control plane is divided into: 
- **Centralized**: central control that computes the path and then goes node by node and tells "this is input and output label".
- **Distributed**: 

 ![[WhatsApp Image 2024-12-08 at 13.33.38.jpeg]]
 

## Structure of a Label Switched Router

![[Pasted image 20241208133542.png]]
The red bar implement the label processing and up there is LDP protocol.
This device has two different table, because it's an IP/MPLS Device.
- traditional IP routing table
- Label Lookup Table: 
	- Row 0000 use IP routing table to deliver the packet.

## Label Switched Router

![[Pasted image 20241208133926.png|500]]
- Yellow part is the IP header and the green one is MPLS label
- packets with 45 go inside an tunnel. In the image I'm performing the swap function.  '

## Connectionless Forwarding along the IP path
We are exploiting the connectionless IP environment. Apply the $0000$ label and it follows the shortest path. Look that, in the image, the green path is the shortest with $4$ nodes instead of $5$.

![[Pasted image 20241208134424.png]]

## Connection oriented forwarding along a LSP

![[Pasted image 20241208134454.png]]
- A implement the push operation and F the pop operation.


**LSP Control Plane distributed procedure used when we want to setup  an LSP.**
- The procedure start by the node $A$  which sends message that is called "path message".
	- This packet has to explore the path from the ingress to the exit point.
- **Option 1**: Insert the path message inside of IP packet where destination address is D. With this, the packet follow the shortest path!
- **Option2**: We specify every single hop in the path and for this reason, message, will have as destination address the next middle point that we want to visit. At the node $B$ the destination  address will change with the next one and so long so for.
	- explicit routing information will be contained inside the path message.
- When a node receive a path message it creates into his memory (internally) the "socks state". Store temporally some information's like id packet message and the previous node that sent to us the path message. After send the message to the next node.
-  So, every node that receive the path message create the socks state and store into it the predecessor node. after that send the message to the next node. 

No label as been assigned so far. The label binding is created on way back (down stream direction) with new type of message called RESV allows node $D$ to specify to the predecessor node what label he want the packets is delivered, for example node D can said "for the label packets i want the label 100!". The $RESV$ message is deliver to the previous node by creating an IP packet which will have the RESV in the payload and as the destination address he will use the node $C$. 

> Very important here is the socks state

When we return to the node $A$ the tunnel has successfully setup and from this moment the source can start sending data. The duration of the initial phase correspond to connection setup latency.

>This operation is periodically refreshed!

When the node $C$ receive the RESV message he does the same! And so long so for.
This is the way to create the Label binding process that allows us to create an LSP. 

## Label stack

IMMAGINE

How can we create something like this? By the concept of **Label stack** 
![[Pasted image 20241208143227.png]]
We have two different FECS the blu and the green one. 
The blue one is associated with label 25 to the top link and the green is associated with label 35 to the bottom link. this two packets are MPLS packets. There is an internal node that perform the second push operation, we are adding one more label which in this case is label 42 (this label is used for both the packets). With a single line in the MPLS table we can switch those packets from input to output. 

## VPN, Traffic Engineering and Fast Re-Route
Service that we can implement with MPLS domain.

Let us consider a company that needs to run an IP Intranet. A Virtual Private Network (VPN) offers a separated (private) network over a shared transport infrastructure  How can we use an IP based network as transport infrastructure? The two main features of a VPN services are:
- security/privacy
- support of private IP addressing

MPLS is a simple and efficient solution for both features, as the forwarding is based on the Label and not on the IP destination address of the packets.

![[Pasted image 20241208144631.png]]

Transport network which interconnects two different clients.
Customer1 have one network in Milan and the other in Roma. (Create VPN1)
Customer2 have one network in Torin and the other in Roma. (Create VPN2)
One network of customer1 use the same private addresses scheme ($10.0.0.0/24$)
Yellow one is an MPLS domain.
The grey node are label switched router and the blue nodes are edge nodes in two different sense.
- LER 3,2,1 between MPLS network and non-MPLS network
- LER 3,2,1 are also the edge between two infrastructures that are owned by different operators one belongs to the carrier (transport network provider) and the other one belong to the customer.

We also have AS (autonomous system) number 100. 

**Goal**: let two customers sides to communicate over the transport network over the transport network. Customer 2 will be communicate directly with the address of customer2.

Three main steps to create a VPN:
1) Achieve any-to-any IP connectivity among PEs (provider equipment).
2) Define a signaling mechanism to distribute customer prefix among prex.
3) Define an encapsulation mechanism to transport packets from one PE to another across the network. (Use MPLS)

## Move 1 **Any-to-any IP connectivity among PEs**

Assign a loopback address to each PE router and use an IGP (e.g. OSPF or IS-IS) to announce these addresses as /32 prefixes in order to ensure any-to-any connectivity among them. So we want to assign an ID to every single PE (at the border!). We use a loopback interface and assign to it an IP. Why do we identify the router like that, with a loopback interface? The reason is that physical interfaces can be up or down, due to failures or other reasons. On the other hand, logical interfaces such as loopback interfaces are always up, they are stable over time. So we use it as an ID.

>We must be sure then that every router knows how to reach the others. For doing so we use a routing algorithm that lets reachability information travel: the OSPF protocol.
![[Pasted image 20241209140832.png]]
>In the system 100 will be a OSPF daemon running which provides any to any connectivity
## Move 2 **Use BGP to distribute customer prefixes**

Multi-Protocol BGP (MP-BGP) used as signaling protocol to distribute reachability information about customer prefixes. BGP treats VPNs as a separate address family.
**PE routers establish a full-mesh of iBGP peerings**: a PE announces to all the other PEs the customer prefixes that it can reach via the CE router it is connected to.
![[Pasted image 20241209141233.png|400]]

>We use BGP that allows two nodes to exchange messages that contain all the reachable prefixes.

```ad-example
![[Pasted image 20241209141601.png]]
AS stands for Autonomous system. After the BGP updates $R2$ knows that $AS1$ has $p_1, p_2, …, p_k$ prefixes and so it knows that these nodes are reachable through $R1$. So we want to have BGP sessions between all the PEs in the provider network. But there is a problem: there is no problem in having $2$ different routers that both say “hey through me you reach node $x$”. But here Rome PoP says “you can reach $10.0.0.0$ through me” and idem Turin Pop, but they are two different private nets with the same IP $10.0.0.0$. For solving this we use BGP modified: notify a list of entities (L3VPN identifier) not addresses, so there is no ambiguity.
```

## Move 3**Use MPLS encapsulation among PEs**

![[Pasted image 20241209151554.png]]
Until now, with the first 2 moves, the packet still carries private addresses. Now it’s time to create a label switched path. If we use labels no matter what address is there, even private, the router will not read them; it will just read the labels. There is a problem: let’s assume we have this situation:

IMMAGINE

The node does the POP operation and it’s left with a bare IP packet, so it has to use only the IP address to deliver it. The problem is, there is ambiguity, the ending network has the same IP address, to solve e that let’s create a trunk, with the internal label that tells us which of the two it’s our destination (the label addressed with “this label” in the picture).

There is a last problem to address. Let’s consider this situation:
![[Pasted image 20241209142707.png]]
Customer 1 sends a packet to destination 10.0.0.100, should it use VPN 1 or VPN 2? I have to define multiple routing tables, one for each customer. These routing tables are called VRF (Virtual Routing and Forwarding). When the packet comes from the interface connecting Customer 1 and Rome node, Rome node knows which VRF to inspect.

![[Pasted image 20241209142732.png]]
VRF are not necessarily one-to-one in terms of interfaces, but we have a VRF for each customer.

## LSP for Traffic Engineering
**Traffic Engineering Service**: in the context of routing, so finding a path from one point to another, we use routing tables, installing rules in it and we run algorithms, such as Dijkstra. Dijkstra looks for the shortest path, but sometimes the shortest path is not the best choice. For instance, look at this image:

![[Pasted image 20241209143010.png]]
This scenario implement the shortest path routing logic giving an high cost to link $R1-R2$
We can change the scheme like this but this will make the net converge in another state, just moving the congestion in another place, as shown in the picture:
![[Pasted image 20241209143241.png]]
We would like to have a technology that supports traffic engineering: a function that allows a net operator to balance the load. MPLS can state, for instance, that red flow is the only one that can pass through this link. So we are actually creating a LSP. The picture below, represent the best scenario:
![[Pasted image 20241209143413.png]]
How can I find a router configuration like that? There are other uni subjects that explain this problem:

## Fast Recovery after Failure Service
how does the IP net react to the failures? The net will find a new path but it takes time. So the provider can provide fast restoration, in the order of milliseconds, thanks to MPLS. Let’s consider this example:

![[Pasted image 20241209143608.png]]
And then, we obtain this: 
![[Pasted image 20241209143703.png|300]]

>This way I don’t have to wait until the optical network has converged, because I can find the alternative path directly in the IP net.

### Implementation
Two different ways:

#### Link Bypass (FAST RE-ROUTING)
![[Pasted image 20241209143945.png]]
For doing so we use LSP trunk: we have to push a label that make the packet follow the alternative path (gray arrow).

![[Pasted image 20241209144142.png]]
we can assume that in the R1 label switching table there is the command written in the image. It’s a trunk because the incoming traffic is already labeled.

This mechanism is faster than logical control place because:
- not need to notify to all node that in the node 3 there was a failure
- Only the node $b$ needs to know the failure and not all the nodes.

>Il percorso lo setto prima!
>In questo caso creo la connessione logica nuova a partire dal nodo dove ha inizio il failuire.

## Backup LSP
Instead of creating a bypass for every single link of the net, create a path ingress-egress (BACKUP LSP). In this case the node has to be notified since the link is not contiguous but remote.
![[Pasted image 20241209144229.png]]

>La differenza rispetto a prima è che vado a settare in anticipo un cammino di backup invece di andare a creare un bypass link per ogni link della rete.