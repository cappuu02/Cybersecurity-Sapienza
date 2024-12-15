## Access-backhaul
fiber very very used in access network.
![[Network Infrastructures/images/72.png]]
==Backhole==: part of access network fundamental today (is not for end user but is for the cellular network operators, so fiber is important also for this).
Initial Solution: BS interconnected each 'other with copper lines.
To avoid bottleneck interconnection using fiber.

## Optical Fiber Attenuation
![[Network Infrastructures/images/73.png]]

We have a lot of possibilities of large bandit. 
## Chromatic Dispersion 
**Fiber monomodal** = transmit a single color
**Fiber multimodal** = transmit multi color
By reflecting on the glass. Thanks to the glass reflection allow signal to propagate in to the fiber. 

![[Network Infrastructures/images/74.png]]
smaller diameter: more fast is the signal.
All this is done by putting the light into the fiber by using a laser.
who is the transmitter of a fiber optic? (laser).

i use ten colors: ten times the bitrate = Total bitrate.
i use two colors: two times the bitrate = Total Bitrate.
## Passive Splitters (passive optical network)
How to avoid digging using splitters. all of this infrastructures is called passive optical network. Splitters: fiber optic piece of glasses fused togheter. one input is closed to permit: 1 input With 2 separate output. this configuration is easy, simply and fast.
There are also a combination of splitter thanks to the fusion of more than one splitter.

```ad-attention
Every time i split i lose a bit of signal but today this is the most used configuration.

```

![[Network Infrastructures/images/75.png]]
**switch**: switch the signal (send signal only in a specific direction).
**splitter**: send signal everywhere.
## Fiber Installation
![[Network Infrastructures/images/76.png]]
**First Possibility**: 1 fiber cable for each home. (cost for each digging).
**Second Possibility**: put single fiber from CO to curb switch(cabinet). after, transmit the signal for each user. curb switch is an active element, it need a lot of energy and space.
**Third Possibility**: configuration obtained by using the splitters. (image up)

The goal is to build a **passive infrastructure**, which offers significant advantages. A passive setup eliminates the need for active components along the entire path from the Central Office (CO) to the end user, including houses and street cabinets.

With fiber optics, reducing the number of fiber cables is preferable, making passive networks particularly appealing. This infrastructure relies entirely on fiber cables and passive optical components, such as filters, to manage signal distribution without the need for external power or active electronics along the way. This simplicity and efficiency make passive optical networks (PON) a cost-effective and scalable solution for modern telecommunications.

- Every fiber are individual in the first, we don't need this configuration of EPON.
- switch has buffer so we don't need.
## GbE based: Fastweb
We have a ring with network elements. from this elements starts another smaller rings.

![[Network Infrastructures/images/77.png]]

>With fiber we use a lot the ring topology

## FTTx
![[Network Infrastructures/images/78.png]]

## Basic PON Operations
>Name of this infrastructures is: passive optical network.

Two windows where the light travels in a good way.
One window is used for downstream and the other for the upstream.

![[Network Infrastructures/images/79.png]]
OLT trasmitter of this infrastructures
ONT the receiver of this infrastructures

In broadcast communication there is the problem to identify only the information to specific receiver. We need to use multiple access protocol to grantee this like TDMA or WDMA.
![[Network Infrastructures/images/80.png]]

## Downstream Traffic Scheduling
![[Network Infrastructures/images/81.png]]
OLT organize the data in time slot
TDMA separate in time
The splitter send the same signal to everybody. They way to distinct users by time.
Mac Address: To recognize something in shared media

>Problems arrives in the upstream.
## Upstream Traffic
![[Network Infrastructures/images/82.png]]

![[Network Infrastructures/images/83.png]]**The units have to be well synchronized**.
**Fully aware of distance, there is the propagation delay.**
The only way is to have a centralized control in the OLT, that control the upstream.
There are different distances between ONU and the passive splitter:  the farther away the more there must be high transmitter power.


![[Network Infrastructures/images/84.png]]
The only way is to have centralized control of it. Who control the upstream is the OLT.
OLT perform a probing of the ONU. this probing is used to be sure of the distance of ONU.
distance is taken to have a precisely control of the scheduling transmission considering the propagation delay.
In terms or receiving, the OLT is a photodiode, receive the light. The light arrives with different attenuation and different power. The idea is to say to user to transmit at power that is configured in a way that when this power arrives at OLT is equal for everybody.
This mechanism need a coordination, the protocol is complicated because everything is controlled by OLT. Thanks to this we are able di transmit in TDMA in two directions and all works well.

All this is done in Passive optical network and this is mostly based on two main standards:
- EPON (E: Ethernet)
All packets carried in EPON are encapsulated in Ethernet frames.

## EPON Downstream Packets
![[Network Infrastructures/images/85.png]]
>Packets are broadcasted by the OLT and detected by desidered ONU.

##  EPON Upstream Traffic
![[Network Infrastructures/images/86.png]]
1. First we need to combine several packets in a unique packet.

## EPON Configuration
![[Network Infrastructures/images/87.png]]
1. Tree topology
2. Ring topology
3. Tree with redundant trunk
4. bus topology

## WDM-PON

![[88.png]]
share multiple wavelength in the same fiber (multimodal fiber). we dedicate each color to each end user. At the receiver side we need to have a filter able to switch and recognized a color respect to the other.

**WDM modulate source**: wich generates optical signal at different wavelength.
**WDM Receiver**: With an array of receivers and an optical to separate incoming wavelengths.

**AWG** Act like an optical filter, routing the optical signals of different wavelengths to the corresponding users ONU. It separates the incoming wavelengths and directs them to the appropriate ONU .......Each ONU is associated with a specific wavelength.

## Elements of PON
![[Network Infrastructures/images/89.png]]