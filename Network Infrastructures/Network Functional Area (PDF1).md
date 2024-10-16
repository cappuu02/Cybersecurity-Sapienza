
# Network functional areas

```ad-abstract
title: Access Network
Access network is that part of a communications network which connects subscribers to their immediate service provider.

```

Network can be divided in three part:
- ==Access Network==: Is the part where end-users (human and machine) that use infrastructure. This part is connected to the core.
- ==Core (Backbone)==: part with professor Polverini.
- ==Edge Network==

>Have completely different technology that are used in different manners.

![[Network Infrastructures/images/10.png]]
The access network domain plays an important role in a network by connecting communications carriers and service providers with the individuals and companies they serve. We can distinguish
two parts as for the wired and several part for wireless.
- Wired:
	- copper based (copper is material)
	- fiber based (thin glass or plastic fibers to transmit data)
- Wireless

>Material as an impact on how the infrastructure build up.

>Are different by they functioning (how they work).

> The faster cable today is fiber-optic cables.

## Core Network (backbone)
A core network is a backbone network:
-  usually with a mesh topology
- provides any-to-any connections among devices on the network
- consists of multiple switches (e.g., ATM- Asynchronous Transfer Mode) or consists of IP routers
- is constituted by an optical backbone
- The Internet could be considered a giant core network
- it really consists of many service providers that run their own core networks, and those core networks are interconnected 
- Significant to core networks is "the edge," where
networks and users exist

>Core part can be identified as a full optical network.

## Edge Network
The edge may perform intelligent functions that are not performed inside the core network.
The core network then switches the packets which significantly improves performance
The kind of technologies used are partially copper, partially fiber and partially wireless.

## Type of Access

1. **Wired Access**
	- Description: Wired access uses physical cables to connect to the network.
	- Advantages: High reliability, stable and fast connections.
	- Use Cases: Ethernet, Fiber-optic, DSL.
2. **Wireless Access**
	- Description: Wireless access uses radio signals to connect to the network.
	- Advantages: Mobility, flexibility, easy setup.
	- Use Cases: Wi-Fi, Bluetooth, Cellular.
3. **Satellite Access**
	- Description: Satellite access connects via communication satellites orbiting Earth.
	- Advantages: Wide coverage, suitable for remote areas.
	- Use Cases: Rural internet, global communication.
4. Fiber-optic Access
	- Description: Fiber-optic access uses thin glass or plastic fibers to transmit data using light.
	- Advantages: High bandwidth, low latency, secure.
	- Use Cases: High-speed internet, data centers.
5. DSL (Digital Subscriber Line) Access
	- Description: DSL access uses telephone lines to transmit data.
	- Advantages: Widespread availability, cost-effective.
	- Use Cases: Home internet, small businesses.
6. Cable Access
	- Description: Cable access uses coaxial cables to deliver internet and TV services.
	- Advantages: High-speed internet, shared infrastructure.
	- Use Cases: Residential broadband, cable TV.

but, how fast our data is sent? it depends on the kind of cable that we use.

![[Network Infrastructures/images/11.png]]
Core network is composed by router that are interconnected each other with fiber cables.

>Nowadays there are two different operators, one control the Access Network and another control the backbone network.

## In the past...

![[Network Infrastructures/images/12.png]]
Before we have a big unique spaces: **central offices**.
Lot of branches around a city-area and in this branches there are cabinets and dispensers to propagate copper cable (splitting to the end user).
This central office are buildings located in the city where network elements are present.


## Optical Access
> New kind of wired connection: fiber
>Fiber allow to transmit data with faster connection.

This domain will be the mode of choice for fixed access in the coming years.
GE-PON (individual), GPON (enterprise), and COF (long-distance) represent systems capable of delivering ultra-high-speed, high-reliability performance.

The infrastructure that we build up by using fiber is distinguished on the basis of where the fiber ends. We have these:

- FTTH - Home
- FTTC - Curb
- FTTN - Node or Neighborhood
- FTTP - Premise
- FTTB - Building or Business
- FTTU - User
-  FTTZ - Zone
- FTTO - Office
- FTTD - Desk

## FTTx: reference architectures

![[Network Infrastructures/images/14.png]]

>Important

- fiber has the loop
- copper is dashed

In this picture we have 3 different digging.
In the contrary we have one single digging with the local exchange and after three different.
Active node can have some problem. This is an intelligence element like router able to disaggregate traffic entering and directing part of the traffic to different home but uses a lot amount of energy. Second, it occupies a lot of space.

>Remember, public spaces have a cost, every time in every where.


Fortunately, the fiber networks has another solution. This is named ==passive optical networks==.
There not anymore the active element. There is now a splitter element (glass element) that split the traffic in different home and buildings.
![[Network Infrastructures/images/15.png]]

## Bandwidth requirements

![[16.png]]

Web surface is unbalanced, there is more downstream then upload.
Today we need more and more unbalanced network able to provides more traffic in downstream.

## Fiber based access network

![[17.png]]


















--------------- 
------------------
## Wired

Optical access, this domain will be he mode of choice for fixed access in the coming years. represent systems capable of delivering ultra high speed, high reliability performance. 

- GE-PON
- GPON
- COF

> For example, video streaming require a fiber connection.

There are many different types of fiber connection:
- ftth (!)
- fttc (!)
- fttn
- fttp
- fttb (!)
- fttu
- fttz
- ftto
- fttd

### PON (passive optical network)
Passive branching of fibes via optical splitters and tree-based topologies.
It is created by combine two optical cable. The signal enter and exit in two parts.



## Wireless
Wireless access uses radio signals to connect to the network.
Use case: WiFi, Bluetooth, Cellular.





