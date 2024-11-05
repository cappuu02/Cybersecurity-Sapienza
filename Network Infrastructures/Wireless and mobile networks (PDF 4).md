# Wireless and mobile networks 

>Computer networking a top-down approach


```ad-missing


```


Handover: passing signal from two different base station

Tv system 
- 1 to $N$
- single direction broadcast
- channel access is well defined
- less amount of MPEG2 transmission stream
- Less challenging chnnel

Cellular System
- $N$ to $N$
- double direction transmission
- Millions of users compete for wireless channel.
- Huge amount of diverse data (Voice, Data, Video, Message…).
- Worst terrestrial wireless channel


>Il satellite si muove rispetto al movimento della terra.
>Quando i satelliti si muovo il segnale deve switchare tra uno e l'altro per far si che non venga perso il sistema. per avere questa configurazione abbiamo una costellazione di satelliti.


![[Network Infrastructures/images/32.png]]
IEEE (father of wifi). wifi was born in the framework of IEEE.

 wifi6 combine wifi access in local area that is fully integrated into the cellular network of the first (blue part).

## Wireless Access: range of operation of different techniques

![[Network Infrastructures/images/33.png]]
this image explain the typology of connection used outdoor and indoor.
## Wireless and mobile networks: context
Two important challenges:
- ==wireless==: communication over wireless link.
- ==mobility==: handling the mobile user who changes point of attachment to network.

## Element of a wireless network:
![[Network Infrastructures/images/34.png]]
![[Network Infrastructures/images/35.png]]


## Characteristic of selected wireless links
![[Network Infrastructures/images/36.png]]
Image that tells how far we can go if we stay indoor (a home, in the building, ecc...)
Bluetooth is the connectin that has the lower range of connectivity..

## Network infrastructure mode
![[Network Infrastructures/images/37.png]]


## Ad-hoc mode
![[Network Infrastructures/images/38.png]]

# Wireless Link and network characteristics
difference from wired link
- Decrease signal strength: radio signal attenuates as it propagates through matter (path loss)
- Interference from other sources wireless network frequencies shared by many devices 
- Multipath propagation: radio signal reflects off objects ground, arriving at destination at slightly different times

>...make communications across wireless link much more difficult.



```ad-missing
title: Missing IM4 notes


```

![[Network Infrastructures/images/39.png]]

**SNR**: signal-to-noise ratio
- larger SNR – easier to extract signal from noise (a “good thing”) 

SNR versus BER tradeoffs
-  given physical layer: increase power -> increase SNR->decrease BER
- given SNR: choose physical layer that meets BER requirement, giving highest throughput
- SNR may change with mobility: dynamically adapt physical layer (modulation technique, rate).

Multiple wireless sender, receivers create additional problems (beyond multiple access)
We can defines two types of problems:

![[Network Infrastructures/images/40.png]]

Before Introduce CDMA we need to talk about:

## TDMA (Time Division Multiple Access)


## FDMA (Frequence division Multiple Access)



## CDMA (Code Division Multiple Access)
Unique code assigned to each user, i.e, code set partitioning
- all users share same frequency but each user has own "chipping" sequence to encode data
- allows multiple users to coexist and transmit simultaneously with minimal interference 
Encoding" inner product
Decoding: Summed inner-product: (encoded data) X (Chipping sequence)

### Two sender Interface
![[41.png]]



# Wifi: 802.11 wireless LANs

## 802.11 LAN Architecture
![[42.png]]

## Channels Association
spectrum divided into channels at different frequencies
- AP admin chooses frequency for AP
- interference possible: channel can be same as that chosen by neighboring AP!
Arriving host: must associate with an AP
- scans channels, listening for beacon frames containing AP’s name (SSID) and MAC address
- selects AP to associate with
- then may perform authentication 
- then typically run DHCP to get IP address in AP’s subnet

## Passive and Active Scanning

![[43.png]]

## IEEE 802.11: Multiple Access
avoid collisions: 2+ nodes transmitting at same time
802.11: CSMA - sense before transmitting
- don’t collide with detected ongoing transmission by another node
802.11: no collision detection!
- difficult to sense collisions: high transmitting signal, weak received signal due to fading
- can’t sense all collisions in any case: hidden terminal, fading
- goal: avoid collisions: CSMA/CollisionAvoidance

![[44.png]]

## Protocollo CSMA/CA
**802.11 sender**
1. if sense channel idle for DIFS then transmit entire frame (no CD) sender receiver
2. if sense channel busy then start random backoff time timer counts down while channel idle transmit when timer expires if no ACK, increase random backoff interval, repeat 2.

**802.11 receiver**
if frame received OK
return ACK after SIFS (ACK needed due to hidden terminal problem)

![[45.png]]


## Avoid Collisions (more)
**Idea**: Sender reserves channel use for data frames using small reservation packets
- sender first transmit small request-to send (RTS) packet to BS using CSMA
	- RTSs may still collide with each other
- BS Broadcasts clear-to-send CTS in response to RTS
- CTS heard by all nodes
	- sender trasmits data frame
	- other stations defer transmissions

## Collision Avoidance: RTS-CTS exchange
![[46.png]]

## 802.11 Frame: Addressing
![[47.png]]
![[48.png]]
![[49.png]]


## Mobility within same subnet
![[50.png]]


## Advanced Capablities

**Rate Adaptation**
Base station, mobile dynamically change transmission rate as mobile moves, SNR varies.
1. SNR decrease, BER increase as node moves away from base station.
2. When BER becomes too high, switch to lower transmission rate but wit h lower Ber

**Power management**
Node-to-AP " i am going to sleep until next beacon frame"
- AP knows not to transmit frames to this node
- node wakes up before next beacon frame
Beacon frame: contains list of mobiles with AP-to-Mobile frames waiting to be sent.
	-Node will stay awake if AP-to-mobile frames to be sent, otherwise sleep again until next beacon frame

## Bluetooth
Less than 10m diameter, replacement for cables
![[51.png]]

