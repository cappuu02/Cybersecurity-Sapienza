
>Lesson 05 classroom
# Intoduction to IPV6 

## Introducing IPv6
- Not a “new” protocol. Developed in the mid to late 1990s.
- Much learned from IPv4.
- 128-bit address space, written in hexadecimal.
- Provides 340 undecillion addresses.
![[57a.png]]

340 undecillion is an astronomically large number—equivalent to 10 nonillion addresses per person (that's a 1 followed by 30 zeros). The Internet has become a vastly different space and will keep evolving with trends like mobile devices, video on demand, and the Internet of Everything. It plays a crucial role in how we live, work, play, and learn.

`10 nonillion = 10,000,000,000,000,000,000,000,000,000,000`

## IPv6 Addresses Scale

- 3.4×10^38 total addresses.
- Enough to assign one address to every atom on Earth and still have more.
- IPv6 exhaustion is extremely unlikely.

## IPv6 Characteristics
IPv6 is not just about more addresses:
- Stateless autoconfiguration.
- End-to-end reachability without NAT.
- Better mobility support.
- Peer-to-peer networking improvements.
- Enhanced support for VoIP and QoS.



# Hex and IPv6 Address Representation
![[58a.png]]

## IPV6 Address Notation
![[59a.png]]

IPv6 addresses are 128-bit addresses represented in:
• Hexadecimal: 1 hex digit = 4 bits
• Eight 16-bit segments or “hextets” (not a formal term) between 0000 and FFFF
• Separated by colons
• Reading and subnetting IPv6 is easier than IPv4…. Almost always!

## IPv4 vs IPv6 Capacity

- IPv4: 4.3 billion addresses.
- IPv6: 340 undecillion addresses.
- Comparison of number scales: thousand, million, billion, ... undecillion.

## IPv6 Compression Rules

### Rule 1: Omit Leading Zeros
==First rule==: Leading zeroes in any 16-bit segment do not have to be written. Only leading 0s can be excluded, trailing 0s must be included.

![[60a.png]]


### Rule 2: Use Double Colon ::
The second rule can reduce this address even further. ==Second rule==: Any single, contiguous string of one or more 16-bit segments consisting of all zeroes can be represented with a double colon (::).

`2001 : 0DB8 : 1000 : 0000 : 0000 : 0000 : 0000 : 0001`


```ad-important
title: Rule $1$+ Rule $2$
![[61a.png]]

If there are multiple possible reductions, RFC 5952 states that the longest string of zeroes must be replaced with the :: and if they are equal then only the first string of 0’s should use the :: representation.

```



# IPv6 Global Unicast Address

![[62a.png]]

>IPv6 does not have a “broadcast” address.

==IPv6 Source==: Always a unicast (link local or GUA)
==IPv6 Destination==: Unicast, Multicast, or anycast

![[63a.png]]
![[64a.png]]

## Global Unicast Address
Global Unicast Address (GUA)
- 2000::/3 (First hextet: 2000 to 3FFF)
- Globally unique and routable
- Similar to public IPv4 addresses
- 2001:DB8::/32 - RFC 2839 and RFC 6890 reserves this range of addresses for documentation
- These are the addresses we will be referring to the most.

**Range**
![[65a.png]]

Except under very specific circumstances, all end users will have a global unicast address.

>Note: A host (an interface) can potentially have multiple IPv6 addresses on the same or different networks.

Terminology:
- **Prefix** equivalent to the network address of an IPv4 address
- **Prefix length** equivalent to subnet mask in IPv4
- **Interface ID** equivalent to host portion of an IPv4 address

![[66a.png]]

- 64-bit Interface ID = 18 quintillion (18,446,744,073,709,551,616) devices/subnet
-  16-bit Subnet ID (initially recommended) = 65,536 subnets

### /64 Global Unicast Address and the 3-1-4 Rule
![[67a.png]]

### Subnetting IPv6
![[68a.png]]

### Static GUA Configuration
![[69a.png]]

``` bash
R1(config)#interface gigabitethernet 0/0
R1(config-if)#ipv6 address 2001:db8:cafe:1::1/64
R1(config-if)#no shutdown
R1(config-if)#exit
R1(config)#interface gigabitethernet 0/1
R1(config-if)#ipv6 address 2001:db8:cafe:2::1/64
R1(config-if)#no shutdown
R1(config-if)#exit
R1(config)#interface serial 0/0/0
R1(config-if)#ipv6 address 2001:db8:cafe:3::1/64
R1(config-if)#no shutdown
R1(config-if)#exit
```

## Link-local Unicast

### Link-Local Unicast Address
- ==IPv6 Source== – Always a unicast
- ==IPv6 Destination== – Unicast, multicast, or anycast.
- Unicast, including a link-local address

![[70a.png]]
Used to communicate with other devices on the link.
- Are NOT routable off the link (network).
- Only have to be unique on the link.
-  Not included in the IPv6 routing table.
- An IPv6 device must have at least a link-local address.

![[71a.png]]
 Link-local addresses are created
- Automatically :
	- FE80 (usually) – First 10 bits
	- Interface ID
		- EUI-64 (Cisco routers)
		- Random 64 bits (many host operating systems)
- Static (manual) configuration – Common practice for rout

### Modified EUI-64 Format (Extended Unique Identifier–64)
![[72a.png]]

### Verifying the PC’s Link-Local Address

```
PC> ipconfig
Windows IP Configuration
Ethernet adapter Local Area Connection:
	Connection-specific DNS Suffix :
	Link-local IPv6 Address . . . . : fe80::50a5:8a35:a5bb:66e1
	IPv4 Address. . . . . . . . . . : 192.168.1.101
	Subnet Mask . . . . . . . . . . : 255.255.255.0
	Default Gateway . . . . . . . : 192.168.1.1
```

### An Important Role in IPv6

![[73a.png]]
Used as a source IPv6 address before a device gets one dynamically
(SLAAC and DHCPv6).
- Router’s link-local address is used by devices as the default gateway.
- Routers exchange routing messages.
- Router use the link-local address as the next-hop address in the routing table: via link-local address.

# SLAAC: stateless Address Autoconfiguration

## ICMPv6 Neighbor Discover Protocol
ICMPv6 Neighbor Discovery defines 5 different packet types

![[74a.png]]
![[75a.png]]
![[76a.png]]

## Address Resolution: IPv4 and IPv6
![[77a.png]]

## Router Solicitation & Router Advertisement Messages
ICMPv6 Neighbor Discovery defines 5 different packet types:

![[78a.png]]
![[79a.png]]

## Dynamic IPv6 Address Allocation
![[80a.png]]

## Dynamic Address Allocation in IPv4
![[81a.png]]

## Dynamic Address Allocation in IPv6
![[82a.png]]

**Router Advertisement: 3 Options**
![[83a.png]]
![[84a.png]]


**Obtaining an IPv6 Address Automatically**
![[85a.png]]

**SLAAC: Stateless Address Autoconfiguration**
![[86a.png]]

**SLAAC: Interface ID**
![[87a.png]]

**SLAAC: EUI-64 Option**
![[88a.png]]

**Modified EUI-64 Format (Extended Unique Identifier–64)**
![[89a.png]]

**Verifying SLAAC on the PC Using EUI-64**
![[90a.png]]

**Verifying SLAAC on the PC Using Privacy Extension**
![[91a.png]]

**Ensuring Unique Unicast Addresses**
![[92a.png]]

# DHCPv6 (Stateless vs Stateful)

![[93a.png]]

## RA Message
![[94a.png]]

## Router as a Stateless DHCPv6 Server
![[95a.png]]

## SLAAC for Addressing & DNS for Other Information
![[96a.png]]

## RA Message
![[97a.png]]

## Router as a Stateful DHCPv6 Server
![[98a.png]]

## Stateful DHCPv6
![[99a.png]]


# DHCPv6 Prefix Delegation Process

## DHCPv4 and Private Addresses for the Home

![[100a.png]]
ISP only has to deliver a public IPv4 address for Home router interface

## DHCPv4 and Private Addresses for the Home
![[101a.png]]
- ISP only has to deliver a public IPv4 address for Home router interface.
- DHCPv4 and RFC 1918 private address space is used for home network.
- NAT is used for translation – but has its drawbacks!
- No NAT between private-public IPv6 (always in debate)

## HOME Router’s ISP Facing Interface
![[102a.png]]
First, HOME’s ISP facing interface needs an IPv6 address
Similar to any IPv6 client it may dynamically get an address using:
- SLAAC - Using prefix in RA
- Stateless DHCPv6 – SLAAC but DHCPv6 for DNS address
- Stateful DHCPv6 - Like DHCPv4
What about the address for the HOME LAN?
## DHCPv6 Steps
![[103a.png]]



