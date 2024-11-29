## Telecommunications Network Architecture
Transport Networks (TNs) are public infrastructures operated by service providers named carriers. Carriers provide a variety of services:
- telephone and leased line services
- interconnect Internet Service Providers
- provide bulk bandwidth to other carriers

![[Network Infrastructures/images/90.png]]

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
- First generation: 
	- optics essentially used for transmission and simply to provide capacity 
	- switching and other intelligent network functions handled by electronics 
- Second generation 
	- routing, switching, and intelligence in the optical layer

>fiber optic is used just to realize point-to-point links (for transmission purpose)

## Multiplexing Techniques
How to allow different users to share the same physical resource that is optical fiber.
We know two main ways of increasing the transmission capacity on a fiber:
- TDM (Time Division Multiplexing): (1 generation of optical)
	- increase the bit rate (requires higher-speed electronics) 
	- many lower-speed data streams are multiplexed into a higher-speed stream

![[Network Infrastructures/images/94.png]]

```ad-failure
title: Problem with TDM
![[Pasted image 20241108161908.png]]

>TDM is abandoned!
```

- WDM (Wavelength Division Multiplexing) (2 generation of optical)
	- transmit data simultaneously at multiple carrier wavelengths over a fiber 
	- virtual fibers


![[102.png|500]]
![[104.jpeg|500]]
## Second-Generation Optical Networks
Also known as wavelength routed networks, where the main idea is to incorporate some of the switching and routing functions into the optical part of the network. The network provides lightpaths to its users. 
These are optical connections that:
- Carried end to end from a source node to a destination node 
- over a wavelength on each intermediate link 
At intermediate nodes the lightpaths are switched from one link to another link.
Lightpaths may be converted from one wavelength to another wavelength.

![[Network Infrastructures/images/92.png]]

- different shades (triangle, square, ecc...) are modelling different devices.
	- square = **OXC** (same function of router: swicthing + routing), is multi port device and has large number of ports OXC is re-configurable, we can change how it works. it has many different ports. (mesh topology)
	- Triangle = **OLT** (like an optical link)
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

**Wavelength conversion** (change color of the light): if i want to change, in an optical domain, the color of the light i have to convert it from optical to electrical and then using a different laser to send it out.

>two different clients must use different wavelengths!

## Optical add/drop multiplexers (OADM)
Optical add/drop multiplexers (OADMs) provide a cost-effective means for handling passthrough traffic in both metro and long-haul networks.

![[Network Infrastructures/images/96.png]]
Represent a possible physical network which once more is composed 
of three elements $a$, $b$ and $c$.
In the image ($a$), node $A$ is an OLT whit multiple inputs and a multiplexer.
Node $C$ is also an OLT with four output (means that we have four different $\lambda$).
They are multiplexed together over the optical link which has a capacity of four wavelengths in this case ($A$ to $B$) and after will be de-multiplexed.

![[Network Infrastructures/images/98.png]]
![[Network Infrastructures/images/97.png]]

```ad-missing
title: Problem
Using so many transponders (16)! Are so expensive, are so big and consume a lot of electricity.
```

**Idea** 
Use a device which is able to deal with this type of situation but in a cost-effective manner (reducing number of responders). This device is the OADM.

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
OLTs are used at either end of a point-to-point link to multiplex and demultiplex wavelengths . It is composed by three functional elements: 
- Transponders 
- Wavelength multiplexers 
- Optical amplifiers (gives power to the signal)

**Transponder**, adapts the signal coming in from a client of the optical network, and vice versa, converts the signal into a wavelength that is suited for use inside the optical network 
- adds OTN overhead (OPU, ODU, OTU, FEC, etc.) 
- monitors the bit error rate of the signal at the ingress and egress points in the network 
- OLT also terminates an optical supervisory channel (OSC)

Transponders typically  constitute the bulk of the cost, footprint, and power consumption in an OLT. 
Therefore, reducing the number of transponders helps minimize both the cost and the size of the equipment deployed.

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

