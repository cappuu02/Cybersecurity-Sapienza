>PDF 04 classroom
# Layering Concepts
The communication between the hosts in the network is organized in tasks, each assigned to a layer 
Each layer: 
- offers a service (a host of facilities) to the "Users" in the layer above 
- exploits the services offered the layer below 
The task of a level involves the exchange of messages that follow a set of rules defined by a protocol. 

```ad-example
Example: 
- Layer (N - 1) provides an insecure service in which data can overheard by unauthorized persons. 
- Protocol of level N specifies that messages sent via (N - 1)-service are encrypted with symmetric encryption. 
- Layer N offers a secure, confidential service.

```

>in the header i have information about packet
# Encapsulation/Decapsulation
- The data to be transferred from the application layer to application layer over a network. 
- Each layer adds some protocol information and provides data to the layer below. 
- The physical layer (bottom) sends data over the physical medium to the destination. 
- The physical layer in the destination sends the data up the "stack". 
- Each protocol in the destination reads the appropriate protocol information and forwards the data to the layer above.

# 2 layered architectures
- ISO/OSI model: based on a reference model with 7 layer. 
- TCP/IP model: created by the IETF, based on a reference model with 4 layers. – The lower TCP/IP layer is often split in 2 layers. 
- Common idea: **packet switched network**

# Architecture comparison
![[134a.png]]

# TCP/IP Model
- Application layer: Corresponds to the top three layers of the OSI model. 
	- Protocols: SMTP (sending e-mail), HTTP (web), FTP (file transfer), and others 
- Transport layer: Equivalent to Layer 4 (Transport) of the OSI model 
	- Protocols: TCP, UDP 
- Internet: Equivalent to layer 3 (network) of the OSI model. 
	- Protocols: IP, ICMP, IPSec 
- Datalink: Equivalent to layer 2 (data link) of the OSI model. 
	- Protocols: Ethernet, WiFi, ARP, etc. 
- Physical layer: Equivalent to Layer 1 (Physical) of the OSI model. 
	- NOTE: Datalink + physical layers are known as Network access layer.

# Client-server communication example
![[135a.png]]

# Layer ideal representation
- **Transport**: the illusion of direct end-to-end connection between processes in arbitrary systems. 
- **Network**: transferring data between arbitrary nodes. (routing mechanism performed thanks to network layer)
- **Data Link**: transferring data between directly connected systems (via direct cable or shared medium).

![[136a.png]]

# Addresses in the architectures
Each layer has a type of address: 
- Application layer: Internet name, egcre. `www.sapienza.it `
- Transport layer: Port number, in the range `[0..65535]` that identifies the client or server. For example 80 for HTTP server. 
- Internet layer: IP address that identifies a network card, for example 151.100.17.4 
- Datalink layer: MAC address, also identifies a network cards, for example `49:bd:d2:c7:56:2a`

# Encapsulation in TCP/IP
![[137a.png|500]]

## IP Packets
![[138a.png]]

# Ports
- Range `[0..65535] `
- Source port: randomly chosen by the OS 
- Destination port determines the required service (application) 
	- Assigned Ports `[0..1023]` are said “well-known ports” and used by servers for standard Internet applications: 
		- 25: SMTP (sending mail) 
		- 80: HTTP (web) 
		- 143: IMAP (pick-up of mail) 
	- Ports `[1024..49151]` can be registered with Internet Application Naming Authority (IANA) 
	- Ports `[49152..65535]` ephemeral ports

![[139a.png]]

# TCP vs UDP
![[140a.png]]

**Header**
![[141a.png]]

##  TCP connection handshake
![[142a.png]]

## Services relying on TCP
- FTP on port 20 and 21 
- SSH on port 22 
- Telnet on port 23 
- SMTP on port 25 
- HTTP on port 80 
- IMAP on port 143 
- SSL on port 443

## Services relying on UDP
- DNS on port 53 
- DHCP on ports 67 and 68 
- TFTP on port 69 
- SNMP on port 161 
- RIP on port 520

# DNS (Domain Name Service)
A service to get the IP address from an human-friendly domain name, like` www.sapienza.it`. Hierarchy of entities responsible for domain names.

![[143a.png]]

```ad-example
![[144a.png]]

```

# Dive Into Packets
To capture packets flow in the network we can use different tolls like:
- dumpcat
- wireshark/tshark
- tcpdump

All of them can visualize and save the captured data 
Wireshark and tcpdump can also analyze (decode) the captured packets

## Wireshark
Data from a network interface are “dissected” in frames, segments, and packets, understanding where they begin and end 
Then, they are interpreted and visualized in the context of the recognized protocol Promiscuous mode (also called monitor mode) is required to capture packets not intended for the capturing host.
Best suited for 
- Looking for the root cause of a known problem 
- Searching for a certain protocol or stream between devices 
- Analyzing specific timing, protocol flags, or bits on the wire 
- Following a conversation between two devices 
It shouldn’t be the first tool thought of early on in discovering a problem, but solving a problem...

**Logic of Wireshark**
Frames are collected from the interface and passed to several, consecutive, “dissectors”, one for each layer (Frames pass from bottom layer to upper layer)

# Alternative way to capture traffic info
Traffic represented as “connections”. We can use ==Netflow== for statistics and monitoring or ==Zeek== that is a framework  for traffic inspection and monitoring (Scripting engine to enable immediate processing).

## Netflow
Suite of tools:
- **nfcapd**: Capture and save netflows
- **nfdump**: Analyze netflow files
- **nfsen**: Graphical tool to access captured netflows

# Wireshark Activity
Use Filters, They allow to only focus on requested packets or certain activity by network devices.
Two kinds of filters: ==display filters== and ==capture filters==:
- Capture filters to limit the amount of network data that goes into processing and is getting saved (really limits crossed by wireshark, used at beginning)
- Display filters to inspect only the packets you want to analyze once the data has been processed (use only to display captured packets, used at the end of capture)

## Capture filters – wireshark/tcpdump
Limit the traffic captured and, optionally, analyzed.
- Packets not captured are lost..
Berkeley Packet Filter (BPF) syntax (man pcap-filter)
- Protocol: ether, tcp, udp, ip, ip6, arp 
- Direction: src, dst 
- Type: host, port, net, portrange 
- Other primitives: less, greater, gateway, broadcast 
- Combinations with operators: and (&&), or (||), not (!)

Display only captured packets matching the filters 
- Packets are not discarded or lost 
Easy but refined syntax: only packets evaluating true are displayed 
- Comparison operators 
- Filters use types (strings where numbers are required return errors) 
- Common logical operators 
Filters can be built interacting with the packets

**The logic of Wireshark**
- Frames are collected from the interface and passed to several, consecutive, “dissectors”, one for each layer 
- Frames pass from bottom layer to upper layer 
- Protocols can be detected in two ways: 
	- directly, if a frame (e.g. Ethernet) has the field that states which protocol it is encapsulating 
	- indirectly, with tables of protocol/port combinations and heuristics 
		- Usually working, troubles when protocols are used in nonstandard ports


## How to capture network traffic
- Promiscuous mode
    - Limitations?
    - Remember the difference between hubs and switches!
- Physical tap
- Port mirroring on a managed switch
- More “aggressive” approaches:
    - ARP cache poisoning
    - MAC flooding
    - DHCP redirection
    - Redirection and interception with ICMP
- NOTICE: on virtualized environments and SDN, this can be easier or harder

## Port mirroring
- Switched Port Analyzer (SPAN) or Roving Analysis Port (RAP)

![[145a.png]]

## Less conventional approaches for sniffing
- ARP cache poisoning (or spoofing)
    - Unsolicited ARP replies to steal IP addresses (ettercap, cain&abel)
- MAC flooding
    - Fill the CAM of the switch to make it acting as a hub (macof)
- DHCP redirection
    - Rogue DHCP server: it exhausts the IP addresses of the pool
    - Then pretends to be the default gateway of the network with the new DHCP requests (Gobbler, DHCPstarv, Yersinia)
- Redirection and interception with ICMP
    - ICMP type 5 (redirect) used to indicate a better route (ettercap)

## How to prevent packet capture

- ==Dynamic address inspection==
    - Implemented in switches: Dynamic Address Resolution Inspection (DAI) validates ARP packets
    - IP-to-MAC address binding inspection, drop invalid packets
- ==DHCP snooping==
    - Implemented in switches: distinguishes between trusted and untrusted ports and uses a database of IP-to-MAC
    - Ports that show rogue activity can also be automatically placed in a disabled state
