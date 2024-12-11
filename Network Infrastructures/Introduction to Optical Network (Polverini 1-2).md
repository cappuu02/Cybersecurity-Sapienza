## Telecommunications Network Architecture
Transport Networks (TNs) are public infrastructures operated by service providers named carriers. Carriers provide a variety of services:
- telephone and leased line services
- interconnect Internet Service Providers
- provide bulk bandwidth to other carriers

![[Network Infrastructures/images/90.png]]

>The goal of a Transport Network is to provide connectivity to clients that ask for a connection.

The network can be broken up into:
- metro network: is the part of the network that lies within a large city or a region
	- metro access network: extends from a central office out to individual businesses or homes
	- interoffice network: connects groups of central offices within a city or region
- Long haul refers to the core network and interconnects cities or different regions

Different parts of the network may be owned and operated by different carriers. The nodes in the network are central offices, sometimes also called points of presence (POPs). Links between the nodes consist of fiber pairs and, in many cases, multiple fiber pairs. 
Two topologies are used: ==ring== and ==mesh==

Service can be:
- ==Connection oriented==: sender and receiver connect each other before communication happen.
- ==Connectionless==: source sends messages to the receiver whenever it has something to send

Core devices work according to one of the following switching paradigm:
- ==circuit switching==: static multiplexing
- ==packet switching==: statistical multiplexing

![[Network Infrastructures/images/91.png]]

## Optical Networks
**Optical Networks (ONs)** can deliver bandwidth in a flexible manner where and when needed. It offers much higher bandwidth than copper cables and is less susceptible to various kinds of electromagnetic interference and other undesirable effects. 
We have two generations of optical networks:

**First generation**: optics used only for better transmission, possibly with optical amplifiers. Intelligent network functions, such as switching, are performed in the electronic domain, since to switch we use binary information and these are available only in the electronic domain
![[Pasted image 20241209163224.png]]\
1st gen adopted Time Division Multiplexing (TDM), to assign statically the use of a slot to a specific user, so to always distinguish the users. This requires working in the electronic domain, since we need the concept of clock and bit rate

![[Pasted image 20241209163412.png]]

**Second generation**: also intelligent functions are done in the optical layer. We try to stay as much as possible in the optical layer for the performance benefits. The problem is that in the optical domain we don’t have binary information and it’s impossible to understand which is the source and which is the destination, since the TN is shared (e.g. if a light bulb it’s transmitting we receive 1 if not 0, but we don’t know which light bulb transmitted the signal). To solve this problem we have to find a way of switching a light ray. We use Wavelength Division Multiplexing (WDM), or FDM2 :

![[Pasted image 20241209163354.png]]

>fiber optic is used just to realize point-to-point links (for transmission purpose)

![[Pasted image 20241209163428.png]]

## Multiplexing Techniques
How to allow different users to share the same physical resource that is optical fiber.
We know two main ways of increasing the transmission capacity on a fiber:
- **TDM (Time Division Multiplexing)**: (1 generation of optical)
	- increase the bit rate (requires higher-speed electronics) 
	- many lower-speed data streams are multiplexed into a higher-speed stream

![[Network Infrastructures/images/94.png]]

>TDM is abandoned!

- **WDM (Wavelength Division Multiplexing)** (2 generation of optical)
	- transmit data simultaneously at multiple carrier wavelengths over a fiber 
	- virtual fibers


![[102.png|500]]
![[104.jpeg|500]]
## Second-Generation Optical Networks
Also known as wavelength routed networks, where the main idea is to incorporate some of the switching and routing functions into the optical part of the network. The network provides lightpaths to its users.  These are optical connections that:
- Carried end to end from a source node to a destination node 
- over a wavelength on each intermediate link 
At intermediate nodes the ==lightpaths are switched from one link to another link==.
Lightpaths may be ==converted from one wavelength to another wavelength==.

![[Network Infrastructures/images/92.png]]

- different shades (triangle, square, ecc...) are modelling different devices.
	- square = **OXC** (same function of router: swicthing + routing), is multi port device and has large number of ports. OXC is re-configurable, we can change how it works. It has many different ports. (mesh topology)
	- Triangle = **OLT** (like an optical link) used at the ends of a p2p to multiplex and demultiplex wavelength. It is composed by:
		- Transponder
		- Optical Amplifier
		- Wavelength multiplexer
	- Trapezio = **OADM** (Optical Add Drop Multiplexer) is fixed, we cannot change it!

- The dot line between IP Router $E$ and $F$ are the logical connection.

>A principle difference between OXC and OADM is the position in the network scheme:

- OXC Part is the **core part of the network**, composed by performing devices (OXC).
- **Egde network** where topology is a ring and is meanly composed by  OADM. We find the clients into this ring (IP router). SONET is a different solid component.

>Transport network has different types of clients used to interconnect the IP routers and in other case is used to interconnect SONET devices. This means that a single infrastructure can serve multiple type of clients.

```ad-abstract
title: Transparent Property

Optical network is transparent to who is serving. Is important for business reasons: more clients i can accomodate with the same infrastructure and is better for me.

==Concept of transparent==: serve multiple users with the same infrustructures.
```

**Wavelength conversion** (==change color of the light==): if i want to change, in an optical domain, the color of the light i have to convert it from optical to electrical and then using a different laser to send it out.

>two different clients must use different wavelengths!

## Optical add/drop multiplexers (OADM)
==Optical add/drop multiplexers (OADMs)== provide a cost-effective means for handling passthrough traffic in both metro and long-haul networks.

![[Network Infrastructures/images/96.png]]
Represent a possible physical network which once more is composed of three elements $a$, $b$ and $c$.
In the image ($a$), node $A$ is an OLT whit multiple inputs and a multiplexer.
Node $C$ is also an OLT with four output (means that we have four different $\lambda$).
They are multiplexed together over the optical link which has a capacity of four wavelengths in this case ($A$ to $B$) and after will be de-multiplexed.

![[Network Infrastructures/images/98.png]]
![[Network Infrastructures/images/97.png]]

```ad-missing
title: Problem
Using so many transponders (16) Are so expensive, are so big and consume a lot of electricity.
```

```ad-check
title: Idea

Use a device which is able to deal with this type of situation but in a cost-effective manner (reducing number of responders). This device is the OADM.
```

>We don't need to demultiplex and multiplex but te optical passthrough.
>I drop and add locally a lambda and the other lambdas passthrough.

![[Network Infrastructures/images/99.png]]
**transponder**: receive in input an electrical signal and send in output a laser signal.

### OADM Architectures 
OADM has four port:
- first two able to pass through the signal
- second two able to drop and add locally

![[100.png]]
## OLT (Optical Line Terminal)
==OLTs== are used at either end of a point-to-point link to multiplex and demultiplex wavelengths . It is composed by three functional elements: 
- Transponders 
- Wavelength multiplexers 
- Optical amplifiers (gives power to the signal)

**Transponder (O-E-O)**, adapts the signal coming in from a client of the optical network, and vice versa, converts the signal into a wavelength that is suited for use inside the optical network 
- adds OTN overhead (OPU, ODU, OTU, FEC, etc.) 
- monitors the bit error rate of the signal at the ingress and egress points in the network 
- OLT also terminates an optical supervisory channel (OSC)

Transponders typically  constitute the bulk of the cost, footprint, and power consumption in an OLT.  Therefore, reducing the number of transponders, helps minimize both the cost and the size of the equipment deployed.

![[101.png]]

----
![[103.png]]
1. Client ask to the network the creation of a logical circuit.
2. As this requested is received by the transport network a whole process start. First, we need to find an end-to-end path
3. Founded the path (with switch elements organized in a mesh topology), next step is to do results reservation on each link. (We have links divided in subchannels using multiplexing techniques (TDM-FDM)). We have to go over each link of this path and look if there is available resources. In case there are, we can book these resources for the connection that we are just creating.
4. Instruct the switches on how to perform the "switching function". (Switch = multiboot device, the goal is move something that is received from input (that can be a digital or an analog signal) and to move it toward the proper output port, one with table for example)
5. Since all switches are correctly configurated, the logical circuit is up at this point and the clients in the client layer can start exchanging information.
6. Circuit has to be constantly monitored by the transport network (carrier need to ensure a good quality of services toward the customers)
7. When the connection and the communication is finally done, the logical circuit turn off an the resources are released.

----
# Lesson 8 novembre 2024

The goal of the transport network is to interconnect clients. (Create the IP link)
Client 1 send a connection request to the optical network and, the optical network, will perform different actions as searching for a path and assigning, for this connection request, a wavelength because we said that this network works according to the WDM multiplexing technique.

![[WhatsApp Image 2024-12-09 at 16.57.03.jpeg]]

>VDM: we can let users to share the physical infrastructure by using different wavelengths. wavelength we can refer to the color of the light signal of the optical signal that we are sending into the optical network.

Once we have the lightpath we can think that the logical connection has been established, and finally, the clients can send their own signals into the client layer. But actually, they will be using the lightpath to communicate.

we want to keep the communication as much as possible in the so-called optical domain, meaning that the nature of the signals that we send is optical light rays (no electronic). the main difficulty when we deal with optical signals is that they are analog signals, we don't have the same representation as a binary string information for the signal that we are sending. So it means that if we have to do switching function. We need to introduce the OADM, a device which basically has 4 ports. There is an input and output fiber plus 2 local port that connect OADM into the ring topology (backbone) and then there are two other ports: one for dropping traffic and inject port. A main problem is that this device cost so much.

>Classi OADM is static, not dynamic!

## OLT = is in the optical network
One of the 2 endpoints of a point to point optical link
takes as input electrical signal and convert it into the optical signal.

![[Pasted image 20241209170318.png]]


The main components of OLT are:
- Transponder: converter from optical to electrical and viceversa and for this reason is generally called O/E/O.
- Multiplexer/Demultiplexer:
- Optical amplifier

![[WhatsApp Image 2024-12-09 at 17.04.48.jpeg]]

>We can compose these in different way!

Transponders typically constitute the bulk of the cost, footprint, and power consumption in an OLT Therefore, reducing the number of transponders helps minimize both the cost and the size of the equipment deployed

Logical representation of Optical line terminal (OLT)
![[Pasted image 20241208163000.png|600]]
```ad-info
title: Explaination
These arrows here models the client signal that is sent into the optical network and this is the ingress point of the optical network. The 1st element that we will meet as a client will be an optical line terminal.  This optical line terminal, as you see, has 3 different ports. There is one port dedicated to this client, another port to this other client, and another port to this other client here, and as you see, the different ports are kept in different ways. For instance, here there is a transponder, and here there is not. Ip router has an own OLT and so, send an optical signal to the Optical Line Terminal.
The client is sending injecting into the optical network a lambda which is not compliant with the one that we use into the optical network. So for this reason, the transponder, what he has to do, is to take this optical signal as input, convert it into the electrical domain, And it will do 2 different things:
1. Center the signal into the 1.5 micrometer wavelength (this is the lambda-in)
	- $\lambda_{IN} \in 1,3 nm$ $\Rightarrow$ $\lambda_{OUT} \in 1,5 nm$
2. Add the overhead 

After that, multiplexer in the image generate a unique output light ray that will go inside the optical network (core part). After the core part, need to do the inverse so, demultiplex the unique light ray in multiple rays, eventually we need to convert it into a suitable lambda for the clients and we deliver the signal to the client.

The laser/receiver device in the figure, is a dedicated transponder to monitor purposes of network. We dedicate  We dedicate a single transponder for monitoring purposes, for instance, analyze the health status of the network. This is keep with a laser that sends optical signal to a specific wavelength that cannot be used for carrying client signals, but it is only used for monitoring purposes, and this specific channel is called optical supervisory channel.
```

## Optical Crossconnects
For each port we have an incoming fiber.
Element $1$ must be able to recover this signal here so the multiplex send it from port one to port six. We must define a switching matrix.

![[WhatsApp Image 2024-12-08 at 17.23.53.jpeg]]
![[WhatsApp Image 2024-12-08 at 17.24.29.jpeg|500]]

>At time $t_1$ i do switching $1-6$
>At time $t_2$ i do switching $1-5$

These type of connections can't be realized through interconnection of the ports with fibers because it would be fixed. We must have a physical structure that is able to adapt is behaviour depending on our goal.

```ad-example
magine that there is a light ray like the the red one that is going straight because it's you know it's guided from the fiber. It enters the device, and it would like to proceed ahead because it goes straight.But, as you see, we must force it to turn to turn toward the port number 6. So how would you change the journey of a light ray, and to force it to go in a different direction with respect to the one it is currently going?

```

The answer to this question is: thanks to the "==reflection phenomenon=="

>For **reconfigurable** we means that we must be able to change the positions of this mirrors depending on the interconnection between input and output port that we want to realize

There are other functions that OXC does: **Grooming**: multiplexing and grooming capabilities to switch traffic internally at much finer granularities. This time division multiplexing has to be done in the electrical domain.

![[WhatsApp Image 2024-12-08 at 17.31.28.jpeg]]


**Protection**
Thanks to the fact that OXC are reconfigurable devices i can for instance look for an alternative path to by-pass the failure and to restore the service.
![[Pasted image 20241208173815.png]]

## The Optical Layer
Network architectures can be organized by means of the ISO/OSI model. A more realistic layered model for today’s networks would employ multiple protocol stacks residing one on top of the other. 

![[Pasted image 20241208174638.png]]

## Transparency and All-Optical Networks
Using a single infrastructure our aim is to server as many clients as possible, not only in the numbers but also in the type. It would be good to be able to serve  more than a single client like, for istance telephone network or internet!

Lightpaths are service transparent: once the lightpath is set up, it can accommodate different types of services (The telephone network had this property, a channel can be used to transfer voice, data, fax, etc.) 
- **Advantages**: data is carried from its source to its destination in optical form. No optical-to-electrical conversions along the way 
- **Hard to realize**: analog signals require higher SNR with respect to digital ones 

>Optical networks almost always include a fair amount of electronics

The best option is to **stay interiorly in the optical domain**. Why? Because once i have converted the client signal from electrical to optical i don't see any difference anymore among the two.

Electronics plays a crucial role in performing the intelligent control and management functions. Electronic is required at:
- the edge of the network to adapt the signals entering the optical domain 
- in the core of the network for regeneration and wavelength conversion

![[Pasted image 20241208175518.png]]
>Electronic allow us to interconnect different optical subnetworks to create a network of networks.

What are the points where we need the electronic functions? There are essentially two points:
- **edge**: at the edge we need to interface with the clients and we know that client signal most of the time cannot be directly injected into the optical network, because we need to adapt it to the right form.
- Sometimes we need to use electronic in the middle of  the infrastructure in the core part. Why? for two reasons:
	- _regeneration_ about attenuation and degrading phenomenon 
	- wavelength conversion

>Electronic is used for regeneration purposes

Electronic regenerators reduce the transparency of the network. Three types of electronic regeneration techniques for digital data:
- 1R: Regeneration (Can be seen as an Optical Amplifier)
- 2R: Regeneration with reshaping
- 3R: regeneration with retiming and reshaping

![[Pasted image 20241209171557.png]]
## Network Evolution
As we move from top to down, you have to imagine that the time are passing and the technology evolves.

>Every grey object work in electrical domain, white color we are in optical domain. The element that is half white and half grey is a regenerator and actually perform OEO conversion.

![[Pasted image 20241208182422.png]]

![[Pasted image 20241209170800.png]]
**Image a**: optical multimodel is used only for transmission. The multiplexing technique used here is the TDM (Time Division Multiplexing). ==Problem==: modal dispersion. In fact, thanks to all of these regenerator, they allowed to restore the signal and the fiber that we were using (multimodal fiber).

![[Pasted image 20241209170944.png]]
**Image b**: Change the source of the light become a laser instead of lead (there is a difference in the power spectrum). He is able to generate a multi mode colors. The lambda that we were using was centered at 1.3 micrometers (is almost flat, so it guarantee good performance and does a good attenuation level but it's not the best one, the best is 1.55).
In this new structure we use single-mode fiber:

![[WhatsApp Image 2024-12-08 at 18.48.09.jpeg]]

>We can use single mode fiber that has a very thin core, this way there are still multiple rays that enter the core but since the core is thin the paths of the rays are almost the same

![[Pasted image 20241209170953.png]]
**Image c**: Source of light which is laser (single mode lasers). We are able to send single lambda and we move in a different window for the wavelength which now is centered around 1.5 5 micrometers, where the attenuation is much lower. There is another advantage of passing from multimode laser and single mode laser, which is about another degrading phenomenon that, let's say, affects the optical fibers.

==Problem==: our source of lights was still generating different wavelengths. So you have to think that the same client signal was sent over the fiber carried through different light rays of different colors (depends on the lambda. The speed at which the light ray propagates is different. ). So it means that one light rate is faster than others.

>The speed of electromagnetic wave at which it propagates depends on the lambda on the wavelength.

So if they go over the same distance, but a different speed, they arrive at different time intervals, different times. This caused another type of dispersion called "==chromatic dispersion==" that can be attenuated by:
1. creating a source of lights. Transmitter which is equipped which more precise laser which is able to concentrate all the power that we give to the signal on a smaller window of wavelengths (we are sending single color out).
2. We can engineer fibers which that have a smaller, a thinner core for contrasting the multimode dispersion, plus the the density of the core made in such a way most of the different wavelength propagate at the same speed in general.

```ad-info
title: To Clarify...
From image A to image C we have seen three different models of 1st generation optical network. In all of these schemes we are using lots of electronic and the multipexing that we used was time division multiplexing. So it means that the switching was still performed in the electrical domain. But we know that in a lambda switch network we use Wdm for multiplexing as you see in the four image.
```


![[Pasted image 20241209171147.png]]

 **Image d**: A 2nd generation WDM system with optical amplifiers instead of regenerators. Different lasers share the same p2p link through a multiplexer that sends a single light ray containing all the several colors (lambdas). The degradation is so small that amplification can be performed directly in the optical domain. This is the most transparent of the systems.
## Control and Management

_Control_: we refer to control plane (routing). In this case it will be let's say that function that is in charge of establishing the connections. Find the light path and find the suitable wavelength to carry a a client signal.

_Management_: Part of the network that we use to make configuration. (assign ip to interface, configure routing protocols, all the things that we do in khatara)

all these functionalities, either routing and configuration they can be performed in in basically in 2 different ways, manual or automatically in centralized mode or distributed mode. IP generally works in a distributed fashion. Optical networks instead, at least at the beginning, they worked using a centralized architecture where we find a central element.  

![[WhatsApp Image 2024-12-09 at 17.16.53.jpeg]]

that allows the central element to communicate with the different elements of the optical network, to make control and management. In this type of centralized architecture, when we say there is a client that make a connection request to the optical network, the connection request is actually performed through  toward the management element control and management element. So this is a connection request. When the client does the connection request it can specifies different. You know, parameters different performance that he wants to get. (the list of services that he wants to buy from the from the provider).

Client layers can specify to the optical layer the following services during lightpath setup: 
- the endpoints to interconnect 
- the amount of bandwidth that is require
- it can specify if an adaptation function is needed at the ingress or egress point
- the targeted Bit Error Rate (BER). This is about quality of services.
- the level of protection against failure events (if fiber fails there is a service disruption in the client layer, meaning that i see that logical connection fall down). Two ways to recover from it. Maybe i'm a customer, a client that is able to deal with failures.
- requirements related to jitter and maximum end to end delay. 

![[Pasted image 20241209161238.png]]

----
## Lezione 18 Novembre

## Multi-Layered Network
The optical network consists of a multi-layered infrastructure designed to handle various
challenges such as bit-error checking, recovery, routing, and transmission. It includes the
following layers:

![[Pasted image 20241211170703.png]]

1. Client Layer: This abstract layer provides the logical connection between clients. Although clients transmit packets, these are always encapsulated before being sent to lower layers. Encapsulation adds overhead to ensure the packets function in subsequent layers.
2. Electrical Domain: 
	- **ODU Layer**: This layer features two OLTs at either end of the connection, represented as a single, straightforward light path. Packets, encapsulated with additional overhead, become Optical Data Units (ODUs). This layer primarily interacts with the client layer.
	- **OTU Layer**: Moving deeper, we gain a clearer understanding of system transmission. What appears to be a simple light path often traverses multiple optical sub-networks. At the edges of each sub-network, OLTs play a crucial role, particularly their transponder components, which enable wavelength conversion. Wavelength uniformity is maintained within each sub-network, making wavelength conversion frequent at sub-network boundaries.
3. Optical Domain:
	- **Optical Channel (Och)**: This layer represents the portion of a light path between two transponders. The complete light path consists of concatenated optical channels. Transponders and other devices at this layer interact with the OTU Layer to perform their functions, including tracking the number of sub-networks a signal traverses (involving transitions back to the electrical domain).
	- **Optical Multiplexing Section (OMS)**: This layer delves into optical sub-networks, identifying elements like OLTs and Optical Add-Drop Multiplexers (OADMs).
	- **Optical Transmission Section (OTS)**: This is the most granular layer, detailing individual fiber sections between devices, regardless of multiplexing. It reflects the actual physical topology of the optical network.

![[Pasted image 20241209161238.png]]
## Performance and Fault Management
To provide guaranteed quality of service to end users, constant monitoring of both performance and fault management is essential. This process involves the following:

### Performance Management
1. monitoring performance parameters for all connections
2. Taking necessary actions to ensure desired performance goals are met

### Fault Management
1. Detecting problems in the network.
2. Alerting management systems appropriately through alarms.
3. Attempting to recover lost services in case of a fault.

## Bit Error Rate (BER) and Optical Trace

### BER
- The Bit Error Rate (BER) is a critical performance metric for lightpaths.
- BER detection is only possible when the signal is in the electrical domain, typically at regenerator or transponder locations.
- Overhead inserted in OTN (Optical Transport Network) frames, consisting of parity check bytes, enables BER computation.

### Optical Trace
Lightpaths traverse multiple nodes and multiple cards within the equipment at each node.
A unique identifier, called the optical path trace, is associated with each lightpath.
This trace helps the management system identify, verify, and manage lightpath
connectivity.
The trace contains at least the following four values:
1. ID of the client sender.
2. ID of the client receiver.
3. ID of the transponder on the left side.
4. ID of the transponder on the right side.

## Alarm Management
In optical networks, a single failure event can generate multiple alarms. For example, in a
network with 32 lightpaths on a given link, each traversing two intermediate nodes, the failure of a single link could trigger a total of 129 alarms.

### Alarm Suppression
![[Pasted image 20241211171323.png]]
- Alarm management identifies the root cause of the failure and suppresses redundant alarms.
- This is accomplished using special signals:
	- Forward Defect Indicator (FDI): Sent downstream to the next node to notify them of the failure and suppress alarms further downstream.
	- Backward Defect Indicator (BDI): Sent upstream to notify the previous node of the failure.

### Operation
![[Pasted image 20241211171445.png]]
- FDI and BDI signals are sent at different sub-layers of the optical layer.
- A node receiving an FDI or BDI stops sending alarms. This ensures that only one node, closest to the fault location, continuously raises alarms.
- Devices sensing network issues continue to raise alarms until they receive an FDI or BDI.
- FDI and BDI are transmitted multiple times across different layers to ensure all devices are informed of the fault's location and nature.

## OSC and Pilot Tone
Protocols and functions in the optical network, such as BER, path trace, and defect indicators require special overhead. Two methods are used to achieve this:

![[Pasted image 20241211171644.png]]
### Pilot Tone
- Any wavelength is centered at a certain frequency, with gaps between signals for distinction.
- The Pilot Tone is placed in one of these gaps, utilizing low power and data rate.
- Messages, encoded in binary, are modulated and converted into optical signals sent via the Pilot Tone band.
- The Pilot Tone is added as overhead to the Optical Channel Layer (OCh) by the transponder and is terminated at the end of the OCh.
- It reflects faults or errors in the associated client signal.

## Optical Supervisory Channel (OSC)
- The OSC uses a reserved wavelength for control-monitoring purposes, independent of client signals.
- It has a single-fiber lifespan and monitors fiber health.
- Unlike the Pilot Tone, the OSC is not client-signal-specific and can be applied anywhere in the network.

### Application of OSC and Pilot Tone
![[Pasted image 20241211171825.png]]

1. Trace:
	- The OSC can trace multiple client signals within the OTS (Optical Transmission Section).
	- Since an OTS section may carry signals from different clients with individual traces in the Optical Channel, the OSC wavelength can provide additional trace overhead.
2. Defect Indicators:
	- The OSC covers defect indicators across all optical layers (OTS, OMS, OCh).
	- Devices without a transponder for generating a Pilot Tone rely on the OSC for fault communication.
3. Performance Monitoring:
	- In the optical domain, the Pilot Tone monitors the optical power of client signals. If the Pilot Tone experiences attenuation, the client signal is likely affected similarly.
	- In the electrical domain, BER techniques evaluate signal degradation.
4. Rate-Preserving Overhead:
	- Overhead carried in Optical Network headers without reducing client data rate is referred to as Rate-Preserving Overhead.