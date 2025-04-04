
# <mark style="background: #FFB8EBA6;">Polverini Part</mark>
## <mark style="background: #BBFABBA6;">Discuss the advantages of using wavelength conversion in optical networks</mark>
The optical network is composed mainly on fiber cable that allow us to transmit data and information at higher frequency and higher speed. In the first optical network all the intelligence functions are performed in the electrical domain such as switching and here, the tecnique used to allow multiple user to communicate was the Time division Multiplexing tecnique. For this type of multiplexing is preferable the electrical domain thanks to the concept of bit and clock rate. In the second optical domain the main target is to stay as much as possible in the optical domain but in this case we cannot use the TDM since the concept of bit and clock are not in the optical domain so a new tecnique was introduce: The wavelength multiplexer.
Wavelength multiplexing tecnique allow different user to communicate by associate each user to a specific $\lambda$ value composed by (c / f) that is a spike of the wave. This value allow to recognized each customer's wavelength that initial form the tributary flow in the ingress point. This tributary point sequentially is multipexed togheter and in output we have a single wavelength composed by all the lambda of the tributary flow. The main advantages of the wavelength multixeing tecnique are:
- We work entirely in the optical domain, we have high speed and higher frequency with better resistence to the interference.
- The bitrate before multipex is equal as the bitrate after the multiplex.
- Allow to transmit data simultaneously at multiple carrier wavelengths over a fiber 

>Vari disegni che conosco!


## <mark style="background: #BBFABBA6;">Explain packet forwarding in MPLS with an example</mark>

![[Immagine WhatsApp 2025-02-12 ore 10.26.20_00d0e6d1.jpg]]

## <mark style="background: #BBFABBA6;">With reference to the Fault Management of an Optical Network, explain, through an example, what is the role of the Alarm Management</mark>

Alarm Management in the optical network is a process that allow to detect failures in a device or systems, alarming the other device through an alarm and attempting to recover lost service in case of fault. In the optical network a single failure event can generate multiple alarm error around the system. To avoid redundant alarm is useful to implement the so called "Alarm Suppresion".

>Alarm management identifies the root cause of the failure and suppresses redundant alarms.

**Alarm suppression**
to suppress reduntant alarm around the system we can use differente messages:
- BDI: message sent in downstream to the next node to notify them about the failure and suppress all the alarms in dowstream
- FDI: message sent in upstream to the previous node to notify them about the failure and suppress all the alarms in upstream 

About the section of Alarm Management we have:
- **Pilot Tone**: Is a signal used for monitoring and manage the failures that can happend. Every wavelength is center in a specific frequency. Between these holes there is a gap where is positioned the pilot tone avoiding to interfere with the main signal. The signal power of pilot tone is lower than the transmission power signal to avoid an overload of the internet traffic. The control messages are encoded in bit, processed and after are outputted like optic signal. The pilot tone is added like an hoverhead of transpoder.
- **OSC**: Is a dedicated channel, not used for trasmission, used to monitor the traffic flow and check the status of the fiber cable. Thanks to this independent channle, allow OSC to work independently from the other signals.


## <mark style="background: #BBFABBA6;">Explain, by means of an example, the main differences between a connectionless packet network and a connection oriented one</mark>

Connectionless packet network and connection oriented network are two fundamental approaches to data communications, Their main difference lies in how they establish, mantain and terminate the communication between devices.

- **Connectionless packet network**: In this type of network when a device want to communicate with another device start sending the packet directly without define or establish a logical path before. 
- **Connection Oriented Network**:  In this type of network when two devices want to communicate, at first is created a path that connect the two devices and only after the communication over this logical path can append. An example in this case can be the MPLS packet forwarding. In fact when two router of differents IP network wants to communicate first of all an MPLS domain is created with different LSR router that own a switching table that allow to define multiple path based on the label binding. Two main characteristich of this type of connection are:
	- Reliable delivery: The packets are delivered is the same order without loss.
	- Netowrk maintains state information about the connection.

## <mark style="background: #BBFABBA6;">Describe how to implement a VPN using MPLS</mark>

VPN also called Vitual Private Network is a service that a customer can buy from an internet service provider. Vpn allow two or more user to communicate over a dedicated and private network over a transport infrastructure without send the traffic over a public one. There are three main steps to create a VPN using the MPLS domain:

1. **Achieve any-to-any IP connectivity among PEs**: We need to add a loopback address to each PE router and use an Interior gateway protocol, like OSPF or IS-IS, to announce these addresses like /32 prefixes, in terms to guarantee any-to-any connectivity among them. We use the loopback interface because their always active and stable over the time.
2. **Use BGP to distributes customers prefixes**: In the second phase, a border gateway protocol is used like a protocol to distribute reachable information of the customer's prefix. Each PE router announce to all the others the customer's prefix that he can reach through the router to which it is connected. To avoid ambiguity for the IP addresses we use a modified version of BGP: we notify a list of entities and not of addresses to avoid this type of problem
3. use MPLS encapsulation among PEs: In the third phase, is used a label commutation phase. If we use the labels instead IP addresses doesn’t mind what type of IP address appear, the PE will read only the associated label. To avoid the previous problem, a logical path, called trunk, is created to connect the router with the correct final destination. This trunk is identified with another Additional Internal Label.

To conclude, let’s iconsider a customer that send a packet to a specific network IP, like 10.0.0.100 and there are two different VPNs. How customer decide the VPN to use? Thanks to the VRF (Virtual Routing and Forwarding).





----
## <mark style="background: #BBFABBA6;">Talk about BGP, the main messages and policy adopted for exhanging messages</mark>

BPG (Border Gateway Protocol) is  a commonly used protocol to exhange messages and manage the routes between differents domain. It's a simple protocol with a complex configuration with an higher level of error because a single failure can affect the entire global network.
The border gateway protocol work with the AS (autonomous systems). An autonomous systems is a collection of IP network and devices like routers under the control of a single organization that adopt a specific policy of routing. An AS is identified by a uniuqe number also called ASN (Autonomous systems number).


For an end to end route the BGP and IGP must cooperate to each other. The routes node of an AS typically interact with both the protocols to inform the other nodes that the packet should be forwarded to the corresponding router node.

In the BGP we have four types of messages:
- **Open**: Establish a peering session
- **Keep Alive**: handshake at regular intervals
- **Notification**: Shuts down a peering sessione
- **Update**: Announcing new routes or withdrwaing route announced previously

With the open message a communication between two differents AS is established. During this essione, the peers exchange routing information, including actives nodes over a TCP connection.

- Establish sessione on TCP port 179
- Exchange all active routes
- Exchange incremental updates

We can have two differents types of policy that can be adopeted in a BGP:

1. **Distance-Based Routing**: This policy relies exclusively on the number of **hops** (the number of routers traversed) to choose the shortest path. However, this method ignores commercial relationships between ISPs, which may have peering agreements, transit arrangements, or other restrictions.
    
2. **Policy-Based Routing**: BGP does not simply select the shortest path but follows policies defined by ISPs, which depend on economic agreements and routing preferences. Some paths may be avoided for economic or political reasons.
    

> **Distance-Based Routing** may seem more efficient in terms of hop count, but **Policy-Based Routing** is more realistic in the Internet world, where ISPs establish rules to optimize traffic based on economic and contractual interests.


----
## <mark style="background: #BBFABBA6;">Talk about the first generation and second generation of optical network and the main difference between them</mark>

Optical network can deliver bandwidth in a flexibility manner where and when needed. It offers so miuch bandwidht than copper cables and is less susceptible to various kind of interferences.

The first generation of optical network:
In the first generation we stay as much as possible in the electrical domain to implement various kind of intelligence functions like switching thanks to the concept of clock rate and bit. In this first generation, to multiplex and allow different user to communicate over the same logical link the TDM technique is used that allow to divide in multiple slot the time axis and assign each of them to a specific customers.

**TDM (Time Division Multilpexing)**
![[Pasted image 20250213102746.png]]


In the second generation of optical Network we want to stay as much as possible in the optical domain, due the multiple advantages, and here we want to implement also the intelligence functions. There is here a problem, we cannot use the TDM technique because in the optical domain we cannot have the concept of clock rate and bit. To solve, in this generation was implemented the Wavelength division multiplexing that allow different user to communicate over the same logical link thanks to a paramenter $\lambda$ that is assigned to each customers.

**WDM**
![[fffffff.jpg]]
## <mark style="background: #BBFABBA6;">Talk about OADM, OXC and OLT</mark>

The optical transport network is made up by an infrastructures composed by different devices that allow different customer's to communicate over logical link. In particulare there are:

**OADM**: OADM, also named Optical add drop multiplexer, is a very important device that provide a cost-effective means for handling passthrough traffic in both metro and long-haul networks. He is used mainly in a ring topology and is the substitute of the transponder. Infact use so many transponder can be very expensive, occupies a lot of spaces and consume a lot quantity of energy
The OADM is an optical device composed by four port:
- First two are able to passthrough the traffic
- Second Two are able to drop and add locally lambda's

>Disegno OADM

**OXC**: OXC, also named Optical Crossconnect, is a device used in the optical domain that work manly in a mesh topology. This is a device (like switch+routers) composed by multiple ports, each capable to transmit optical signal and each of these porrt is able to receive an incoming fiber. This devices is re-configurable so we can change the way it works.
Thanks to the "reflection phenomenon" we can change the journey of light ray and force it to go in a different direction with respect to the one it is currently going. 

>For reconfigurable we means that we can change the position of the mirrors depending on the interconnections between input and output port that we want to realize.

Another functions that can be performed by the Optical crossconnect can be the Grroming: technique able to multiplex and optimize and organize better the traffic inside the optical network (optimize the data flow into the network).

![[WhatsApp Image 2024-12-08 at 17.23.53.jpeg]]

**OLT**: OLT, also named Optical Line terminal, are used either of a point-to-point link to multiplex and demultiplex wavelength It is composed by three different elements:
- Transponder
- Multiplexer/Demultiplexer
- Optical Amplifier

**Transponder**: Transponder adapts the signal received form a client decive in a optical network. It convert the signal from its original wavelength in one that is optimized for the optical network. The transponder has a main target: converting the incoming optical signal into an electrical signal, process it and at the end re-convert it into an optical signal that is an appropriate wavelength for the network. In this element different operations are performed like:
- Adds OTN overhead (OPU, ODU, FEC, ...)
- Monitor the BER, bit error rate, of the signal
- OLT also terminates an optical OSC (optical supervisory channel)
Transponder typically constitute the bulk of the cost, footprint and power consuption in an OLT. In an infrastructures is important to reduce the number of OLT to minimize cost and footprint.

**Multiplexer/Demultiplexer**: Multiplexer, take as input different lambdas, that constitute the tributary flow, and gives in output a unique lightpath composed by all of the previous lamdas (each has a unique colors to recognize each customer prefix). Demultiplexer Receive a lightray which is composed of different color and divides this lightray in multiple lighray one for each color. 

**Optical Amplifier**
The optical amplifier is an optical device able to take in input an attenuade signal and regenerate it in output. Works entirely in the optical domain

>Disegno per ciascun elemento
## <mark style="background: #BBFABBA6;">What does it mean the trasparency property of a infrastuctures?</mark>
The transparency property is fundamental in the optical transport network infact the optical network is considered transparent on who is serving. It means that a single infrastructures can serve multiple users with the same infrastructures. This is really important also for business: more client can i accomodate with the same infrastructures, and better is for me.

An ISP aim to serve as many clients as possible not only in the numbers but also in the type. It would be good to serve more than a single client like, for istance a telephone network or internet.

Once a lightpath is set up it can accomodate differents type of services and this reach many advantages:
- Advantages: Data is carried from the source to destination in the optical form
- Hard to realize: Analog signals require higher SNR with respect to digital ones
## <mark style="background: #BBFABBA6;">Talk about Signal Regeneration types</mark>

In the optical transport network the signal can be affected by an attenutation, degradation, dispersion and noisy. To counter this phenomenom is helpfully tu use the electrical regenerator. These regenerators can be of three types:
- 1R (Amplification)
	- optical amplifiers provide power to a signal, regenerating in entirely in the optical domain. While transparent, repeated can use a distort signal, making it inefficient solution.
- 2R (Amplification with Reshaping)
	- This process occurs in the electronic domain, assuming a singal presence. It reshapes degraded signals using thei original timing. However it introduce two different limitation:
		- Jitter: Timing delays accumulate
		- Reduce Transparency: regenerators cannot distinguish signal types, requiring compatibility with specific impulse types and revealing potential technological details
- 3R (Amplification with retiming and reshaping)
	- This method recover both the signal shape and timing, producing a signal closely resembling the original, While affective, it further reduces trsnaprency, as it can reveal both the sender's data rate and technology.



## <mark style="background: #BBFABBA6;">Talk about traffic engineering</mark>
This scheme is divided into two different part:
- The bottom part: there is a lot of traffic
- The top part: there is no traffic

The problem into these scheme is that i'm using half of the avalaible resources to go from input point to the output point. nother problem that can append is the congestion that can block all the entering traffic directed to a specific destination. If i look at the source address i can manipulate better the traffic and this can be done by the so called "==traffic engineering==". This is a service that a customer can buy from an ISP (Internet service provider) to use all the resources and to distribute equally the traffic flow into the scheme.

![[Immagine WhatsApp 2025-02-13 ore 11.19.03_7337b608.jpg]]
## <mark style="background: #BBFABBA6;">Talk about Recovery against failures</mark>
In an optical transport network there can be the possibilities that a link fails and this implies losgin packet in a transmission. The answer is: How we restore the service in this IP network? Thanks to the restoration service, works in accordly with the MPLS domain, that a customer can buy from an internet service provider.

This is an example: Suppose router one of an IP network want to communicate with R2 of another IP network. The message pass through an MPLS domain but a link fails and the transmission start losing packets. 

There can be two different implementation that can be adopted to solve this:
- **Link bypass method**: When a link fail we use the trunk to guarantee the transmission between two different node (i set it before and this trunk start where i detect the failure).This mechanism is faster because not need to notify to all node that in the node X there was a failure.
- **Backup LSP**: Instead of creating a bypass for every single link we create a backup path when happend a failure in our infrastructures. In this case the node has to be notified since the link is not contiguous but remote.

>Disegni vari
## <mark style="background: #BBFABBA6;">Talk about the overhead in the second optical network</mark>

 The optical network consists of a multi-layered infrastructure designed to handle various challenges such as bit-error checking, recovery, routing, and transmission. It includes the following layers:

**Layer Client**: This abstract layer provide a logical connection between the clients. Before sending the packet to the lower layer it is always encapsulated. The encapsulation add an overhead to ensure that packets work correctly in the lower layer.

Electrical Domain
- **ODU Layer**: This layer has two OLT (Optical Line terminal) on the start-end of the connections represented with a unique lightpath. The packet incapsulated with ODU overhead become the Optical data units. (ODU is the representation of the data into the optical domain but is managed in the electrical one)
- **OTU layer**: In this layer we have a more clear vision of the transmission. We can see that pass through different optical subnetwork. In particular here we can see that, inside each OLT, is present a transponder able to convert the wavelength to ensure a better quality of transmission.

Optical Domain
- OCH Layer: This layer represent the portion of a lightpath between two transponder. The complete lightpath is composed by the optical concatenated channel. Transponder and the other devices works togheter to do their main function.
- OMS Layer: This layer explore the optical subnet and identify different devices like OADM, that are able to add and drop loccally the traffic or to passthrough them.
- OTS Layer: This is the most detailed layer that describe each fiber section between the devices. This layer represent the physical topology in the optical network, showing how the cables and the devices are physically connected each other. 

![[Pasted image 20241209161238.png]]
## <mark style="background: #BBFABBA6;">Talk about adaptation function in 2ng Gen Optical Networks</mark>
La funzione di adattamento nelle reti ottiche di seconda generazione è fondamentale per collegare i protocolli lato client (come Ethernet, IP o metodi di trasporto legacy) allo strato di trasporto ottico. Ecco una spiegazione dettagliata:

- **Conversione e Mappatura del Segnale:**  
    Converte i segnali provenienti da diversi protocolli in formati ottimizzati per la trasmissione tramite la rete ottica. Questo può comportare, ad esempio, la mappatura dei dati basata su pacchetti su lunghezze d'onda specifiche o la conversione di segnali elettrici in segnali ottici.
    
- **Adattamento delle Interfacce:**  
    Si occupa di far interagire in modo efficiente dispositivi e standard differenti, garantendo che l'hardware con protocolli o interfacce diverse possa comunicare senza problemi. Questo è particolarmente importante in un contesto in cui la rete deve supportare traffico eterogeneo.
    
- **Adattamento di Modulazione e Lunghezza d'Onda:**  
    La funzione di adattamento permette di regolare dinamicamente le tecniche di modulazione e la scelta delle lunghezze d'onda in base alle condizioni del canale, alla distanza e al tasso di trasmissione. Questo contribuisce a massimizzare l’efficienza spettrale e le prestazioni complessive della rete.
    
- **Riconfigurazione Dinamica:**  
    Grazie all'elaborazione digitale dei segnali, è possibile monitorare in tempo reale le condizioni di rete e adattare dinamicamente le impostazioni, ottimizzando così le risorse disponibili e rispondendo efficacemente alle variazioni nella domanda di traffico.
    
- **Correzione degli Errori e Integrità del Segnale:**  
    La funzione può includere tecniche come la correzione degli errori in avanti (FEC) e la compensazione della dispersione, che aiutano a mantenere l'integrità del segnale anche su lunghe distanze.
    

In sintesi, la funzione di adattamento nelle reti ottiche di seconda generazione è un elemento chiave che consente la trasformazione efficiente dei segnali provenienti da vari protocolli, rendendoli adatti per la trasmissione ottica. Questo approccio favorisce l'implementazione di reti più flessibili, dinamiche e capaci di gestire un'ampia varietà di servizi e applicazioni.







# <mark style="background: #FFB8EBA6;">Cuomo Part</mark>

## <mark style="background: #BBFABBA6;">Describe the functions that are performed in the different functional areas of a network and the main network topologies used in that areas</mark>

- **Access Network**: is that part of a network that allow end-user to connect to their service provider (end user stipulate a contracts with their ISP to guarantee access to the internet). The topology used here are tree and start topology.
- **Edge Network**: Part of the network between the access network and  core one. This type of network implements intelligence functions like switching that are not performed into the core part. The kind of technologies used here are partially fiber, partially copper and partially wireless. The topology used here are star and point-to-point
- **Core Network (Backbone)**: the core network is that part where IP routers are interconnected each other thanks to the fiber cables and their main taget is to routing the information from source to destination point. This part mainly-composed by fiber optic cables with a mesh topology.

>Disegno zone!

## How upstream and downstream are managed in PONs
PON also named Passive Optical Network  is a type of network that use a passive splitter to create differente diggings to redirect the traffic to different homes intead of using an active node that occupies a lot of space and consume a big quantity of energy (AON).

```ad-bug

Upstream and Downstream talk
```
## <mark style="background: #BBFABBA6;">What is CSMA for wireless systems and how it works</mark>
CSMA/CA is a protocol used in the IEEE802.11 to avoid differents problem like hidden terminals when two or more terminal (multiple terminal) want to access and communicate at the same time.
The hidden terminal problem occurs when:
- There are 3 terminal: A, B and C
- A can listen and send messages to B
- C can listen and send messages to B
- A and C cannot listen each other, they need to pass through the terminal B to avoid this problem

802.11 Sender
1. Send a sifs in the cannel to trasmit frame from sender to receiver
2. If the channle is busy start a backoff timer down while the channle idle transmit, when timer expires with no ack, repeat

802.11 Receiver
1. If frame received is right return ACK after the SIFS messages

There can be also the collision problem: when two different sender want to communicate at the same time:
First of all the AP send a CTS to all the nodes that want to communicate and said that only a specific node is now able to transmit untile the ack(p). At the end of transmission the AP send the ACK and another node will be able to transmit to different or to the same destination.

>Immagine

## <mark style="background: #BBFABBA6;">In the computation of the capacity that a channel can provide, both the effects of the bandwidth and of the SNR are present: discuss how these have an impact and how they can be managed to improve the channel capacity</mark>

The computation of the capacity that a channel can provide, are affected by the bandwidth and the SNR (ratio signal noise), thanks to this formula:

$$ C = B \cdot \log_2(1+SNR) $$
The bandwidth B has a linear effects on the capacity C, more bandwitdh available imply higher capacity.

- **Higher SNR** values imply a better quality of the signal but with lower increment of the capacity due the logaritmic function.
- **Lower SNR** values imply a worse quality of the signal, with lower increment of the capacity due the logaritmic function.

>Advanced modulation techniques such as high-order **QAM** allow more bits per symbol to be transmitted, increasing channel capacity.
## Describe how the modulation of the ADSL allows to use, in an efficient way, copper cables

## Describe the hidden terminal problem in Wi-Fi (IEEE 802.11) and how it can be solved



## DMT in xDSL: usage and advantages

## Describe the architecture of access networks for fiber optics

## <mark style="background: #BBFABBA6;">Talk about solution to use optical fiber in the access network</mark>
Optical network infrastructure can serve multiple and different users like businesses, Home and can work in the long-metro haul.
The are multiple solution to use and connect to the optical fiber in the access network. A list of all the possible solution is:
- FTTH: fiber to the home
- FTTB: Fiber to the building
- FTTC: Fiber to the cabinet
- FFTP: Fiber to the premises
- FFTD: Fiber to the desk
- FTTO: fiber to the office
- FTTZ: fiber to the zone

Each of this solution is unique and can be adapted in terms of advantages of the customer's that want to use it. Every type of optical fiber has it's particular configuration and characteristic. The tree main important and well known are:
- FTTH = Disegno che arriva fino a casa (tutto in fibra)
- FTTB = Disegno che arriva fino al building (fibra fino all'appartamento)
- FTTC = Disegno che arriva fino alla cabina (fibra fino alla cabina poi copper)

## <mark style="background: #BBFABBA6;">Describe the two types of cross-talk noise in ADLS and how to solve them</mark>
The two types of cross-talk in ADSL are:
- FEXT (Far end cross talk)
- NEXT (Near End cross talk)

**FEXT**: Is the cross talk noise between a transmitter and a receiver placed on the opposite sides of teh cable. FEXT travel to the entire length of the channel.

The ADSL use short cable the signal carried on other pairs, even though coming from far away, are not strongly attenuated and create interferences that affect other pairs.

![[Network Infrastructures/images/23.png]]

Is an interference that occurs when two cables inside the same binder group are communicating to the same moment. The signal of the trasmitter of the first cable interfere with the reciver of the second cable. The transmission of the two happend in the same direction and in the same moment.
The solution to avoid this type of cross-talk-noise is to reduce the number of cables used inside the binder group (max a dozine of twisted pairs inside the binder group).

**NEXT**: Is a cross-talk-noise between a transmitter and a receiver placed on the opposite sides of a cable. Next is one of the reason of the frequency division for upstream and downstream in ADSL.

![[Network Infrastructures/images/24.png]]
In this case the cross talk is between TX and RX of different cables. This type of cross-talk noise occurs in the same binder group inside the same cabinet.
A way to solve this type of cross talk is to reduce the echo cancellation with multplie technique. It is necessary to apply filters at the customers premises to avoid interferences with the voice service.