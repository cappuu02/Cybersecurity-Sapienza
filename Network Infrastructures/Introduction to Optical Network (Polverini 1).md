## Telecommunications Network Architecture
Transport Networks (TNs) are public infrastructures operated by service providers named carriers. Carriers provide a variety of services:
- telephone and leased line services
- interconnect Internet Service Providers
- provide bulk bandwidth to other carriers

![[90.png]]

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

![[91.png]]

## Optical Networks
**Optical Networks (ONs)** can deliver bandwidth in a flexible manner where and when needed. It offers much higher bandwidth than copper cables and is less susceptible to various kinds of electromagnetic interference and other undesirable effects. 
We have two generations of optical networks:
- First generation: 
	- optics essentially used for transmission and simply to provide capacity 
	- switching and other intelligent network functions handled by electronics 
- Second generation 
	- routing, switching, and intelligence in the optical layer

We know two main ways of increasing the transmission capacity on a fiber:
- TDM (Time Division Multiplexing): 
	- increase the bit rate (requires higher-speed electronics) 
	- many lower-speed data streams are multiplexed into a higher-speed stream
- WDM (Wavelength Division Multiplexing)
	- transmit data simultaneously at multiple carrier wavelengths over a fiber 
	- virtual fibers

## Second-Generation Optical Networks
Also known as wavelength routed networks, where the main idea is to incorporate some of the switching and routing functions into the optical part of the network. The network provides lightpaths to its users. 
These are optical connections that:
- Carried end to end from a source node to a destination node 
- over a wavelength on each intermediate link 
At intermediate nodes the lightpaths are switched from one link to another link.
Lightpaths may be converted from one wavelength to another wavelength.

![[92.png]]

1. Network Receive the request from $S1$
2. Connection Creation (Search for a path) with an algorithms.
3. Check if each node has the resources to allow this specific routing (after using multiplexing)
4. Device Configuration

