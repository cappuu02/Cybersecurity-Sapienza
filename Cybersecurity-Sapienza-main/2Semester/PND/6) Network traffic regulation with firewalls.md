>PDF 010 classsroom
# Traffic regulation
```ad-abstract
title: Definition

A ==router== is a device that connects two networks.
A ==firewall== is a device that besides acting as a router, also contains (and
implements) rules to determine whether packets are allowed to travel
from one network to another.
```

>Router also can perform some form of screening (packet filter)

![[PND/images PND/16a.png]]

**Why Firewalls?**
Restricts access from the outside. 
`Internet = millions of people` $\to$ `together bad things happen`
Prevents attackers from getting too close. Restrict people from leaving.

To attain a certain level of network security, you can: 
- Regulate which traffic is allowed (sources, destinations, services, ...)
- Protect the traffic by encryption
- Monitor the traffic for “bad behaviour”
- Monitor the hosts for “bad behaviour”

>The choice will depend on the security policy to be fulfilled (particularly the CIA targets).

## Firewall Design & Architecture Issues
- Least privilege
- Defense in depth
-  Choke point
-  Weakest links
-  Fail-safe stance
-  Universal participation
-  Diversity of defense
-  Simplicity
## Host based packet filters
Kind of firewall that disciplines the traffic in/out a single host. It specifies the packets that can be received and sent. Vendor products generally work per-app: each installed application has a known policy that has to obey.

```ad-example
iptables, windows firewall and all the so called “personal firewalls”

```

## Screening router (ACL-based)
![[17a.png]]

## Network Access Control Lists
List the rights for accessing/using networks
- Extensively used in switches, routers and firewalls
Usually distinguish between incoming and outgoing traffic, per interface/port
- Ex: lists of IP addresses that can send packets to an interface/port
**Stateless**: every packet is treated independently, without any knowledge of what has come before

## Dual-homed Host
![[18a.png]]

## Bastion Host
Hardened computer used to deal with all traffic coming to a protected network from outside. Hardening is the task of reducing or removing vulnerabilities in a computer
system:
- Shutting down unused or dangerous services
- Strengthening access controls on vital files
-  Removing unnecessary accounts and permissions
-  Using ”stricter” configurations for vulnerable components, such as DNS, sendmail, FTP, Apache, Tomcat, etc.
-  Specially suitable for use as Application Proxy Gateways

## What is a DMZ
```ad-abstract
title: Definizione
A ==DMZ (demilitarized zone)== is a host or small network positioned as a neutral zone between a company's private network and the external public network, serving as a secure segregated area for services accessed by users, visitors, or partners. Its implementation has become essential for a multi-layered, defense-in-depth security strategy, reducing and controlling access to internal (private) IT system components.

```

### Defense in depth
A security approach in which IT systems are protected using multiple overlapping systems
- Add redundancy to the defensive measures
- Aim to remove the single point of failure
- Find the right balance between complexity and multiplicity of defense measures
In order to compromise the system, an attacker has to find multiple vulnerabilities, in different components

### DMZ as a screened host
![[19a5.png]]

### Screened Subnet Using Two Routers/Firewalls
![[PND/images PND/20a.png]]

### DMZ to segment the network
![[21a.png]]

### Security in depth: split DMZ
![[22a.png]]


## A simple plan for network security
Use a firewall to filter ingoing and outgoing traffic between “your” network (or individual PC) and the Internet.

![[23a.png]]

**Assumption**
1. You have security policy stating what is allowed and not allowed.
2. You can identify the “good” and the “bad” traffic by its IP-address, TCP port numbers, etc, …
3. The firewall itself is immune to penetration.

### Packet filters (stateless firewall)
Drop packets based on their source or destination addresses or port numbers or
flags (No context, only contents). Can operate on:
- incoming interface
- outgoing interface
- both
Check packets with fake IP addresses:
- From outside ("ingress filtering")
- From inside ("egress filtering")

### Packet filters operating layers
![[24a.png]]

**Three-Step Process**
1. Know your policy
2. Translate the policy in a formal language
	- E.g.: logical expression on packet fields
3. Rewrite the policy in terms of the firewall syntax
General mechanism:
- Rules are checked from top to bottom
- The first matching rule is applied
- One implicit rule is assumed if no rule matches
	- Block/Allow everything

![[25a.png]]


## How to check the direction of TCP?
Consider the TCP flags:
![[26a.png|600]]

```ad-example
We distinguish the replies to our SMTP connection considering the ACK
flag.

![[27a.png]]
```


# Filter rules for network firewalls

**More complex network topology**
![[28a.png]]

Policy:
- Internal Net 1 is a DMZ and only hosts Mail GW
- Very limited connections between Mail GW and Internet (only partner servers)
- Limited connections allowed between Mail GW and net 2 and net 3
-  Anything can pass between net 2 and net 3
-  Outgoing requests only between net 2 or net 3 and the link to the Internet

## Requirements
![[29a.png]]
We cannot only consider where packets have to go (destination→ egress
filtering)
- Open access to net 2 only allowed for traffic with source address in net 3
-  No way to avoid fake source addresses (address spoofing) from outside
We need to define rules based on from where packets are arriving, (source → ingress filtering)

## Interface towards Internet
![[PND/images PND/30a.png]]

## Interface on net 1
![[PND/images PND/31a.png]]

## Interface on net 2 (net 3 is similar)
![[32a.png]]

## Problems with Packet Filters
Only a small number of parameters. It is (unfortunately) easy to specify filtering rules which are too specific or too general
-  Payload of TCP packet is not inspected (No protection against attacks based on upper-layer vulnerabilities)
-  Limited logging ability (restricted to the few parameters used by the filter)
-  No authentication facilities
-  Susceptible to attacks based on vulnerabilities in various implementations of TCP and/or IP

### Filter, rules 1
![[PND/images PND/41a.png]]

### Filter rules, 2
![[PND/images PND/42a.png]]

### Filter rules, 3
![[PND/images PND/43a.png]]

### Filter rules, 4
![[PND/images PND/44a.png]]

### Filter rules, 5
![[PND/images PND/45a.png]]

### Filter rules, 6
![[46a.png]]
### Filter rules, 7
![[47a.png]]


### Filter rules, 8
![[48a.png]]

### Filter rules, 9
![[49a.png]]

## IP Fragmentation
![[50a.png]]

## Incoming TCP connections with IP frag
Firewall blocks any incoming TCP connection. ACK packet is allowed for outgoing packets.
Internal host reassembles a packet with the SYN bit set because two fragment offsets are chosen in order to set the SYN bit. Attacks:
-  SYN scan
- Create TCP connection
- SYN flood - DoS

![[51a.png]]


# Stateful firewalls

## Stateful packet inspection
Stateful Inspection Firewalls (or Dynamic Packet Filters) can keep track of established connections. Can drop packets based on their source or destination IP addresses,
port numbers and possibly TCP flags.

Solve one major problem of simple packet filters, since they can check that incoming traffic for a high-numbered port is a genuine response to a previous outgoing request to set up a connection.

## Stateful Firewall
![[52a.png]]

## Connection tracking
Considered TCP States. Setting up connection:
-  client calls from (high-numbered) port to port for application on server.
- server replies to (high-numbered) port on client.
- connection is considered established when the server gives correct SYN/ACK response.

Closing connection:
- both parties have to close the connection by sending a TCP packet with FIN flag set before connection is considered closed

![[53a.png|400]]

```ad-example
![[54a.png]]


```

# Other types of firewalls

## Application-Level filtering (proxy-like)
Deal with the details of services. Need a separate special-purpose mechanism for each application.
- Example: mail filters, FTP, HTTP proxy
- Big overhead, but can log and audit all activity
Can support user-to-gateway authentication
- Log into the proxy server with username and password
- Example: Microsoft ISA, SQUID

![[55a.png]]

## Host based firewalls
A firewall on each individual host to protect that one machine. Selectively enable specific services and ports that will be used to send and receive traffic
- Ex: it's unlikely that an employee would need remote SSH access to her laptop
A host-based firewall plays a big part in:
- reducing what is accessible to an outside attacker
- protecting the other elements of the IT system if one of the component (ex, a process) is compromised

## Application-level firewall pro and cons
-  + Logging capacity
-  + Intelligent filtering
-  + User-level authentication
-  + Protection from wrong implementations
 - - Can introduce lag
-  - Application-specific
-  - Not always transparent

## Circuit-level gateways (or generic proxy)
Also known as a TCP relay
- Able to deal with several protocols
SOCKS (v5.0: Internet RFC1928) is the de facto standard
- It also works with UDP
- WinSock for Windows
SOCKS performs at Layer 5 of the OSI model
- The Session Layer above transport layer
TOR (the onion routing): socks-like interface

- The client connect to a proxy that relays its connections in a protocol-independent manner
- Provide user-authentication
- Usually no content filtering

## TCP relay
Splices and relays TCP connections
- Does not examine the contents of TCP segments
- Can use ACL (like packet filtering, i.e. dst IP/dst port)
-  Less control than application-level gateway
Client applications must be adapted for SOCKS
-  “Universal” interface to circuit-level gateways
Example: ssh -D 12345 <remote_host>
-  More on this when talking about tunneling

![[56a.png]]

## Common firewall weaknesses
No content inspection causes the problems
- Software weakness (e.g. buffer overflow, and SQL injection exploits)
- Protocol weakness (WEP in 802.11)
No defense against
-  Denial of service
- Insider attacks
Firewall failure has to be prevented
- Firewall cluster for redundancy

## NG-Firewalls
Next Generation firewalls try to include additional features. Not only traffic filtering, but also:
-  Intrusion Detection System
- VPN gateway
- Deep Packet Inspection
-  Traffic shaping

```ad-info
title: Summary
Traffic regulation: routers and firewall
- Decide the packets that can pass through the node
Firewall architectures: where they go in the network?
- Network segmentation and DMZ
Types of firewalls:
- Host firewall, stateless, stateful, application-gateway, circuit-gateway
Stateless firewall weaknesses
- No state, IP fragmentation

```
