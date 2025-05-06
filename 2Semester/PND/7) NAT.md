> PDF 12 classroom
 
 - In routed mode, a firewall is a hop in the routing process. It Is a router responsible of its own (internal) networks
- In transparent mode, a firewall works with data at Layer 2 and is not seen as a router hop to connected devices

![[1a.png]]
>firewall is a router *between net1 and net2*

```ad-abstract

title:Concept of NAT 
The concept of NAT is to take the address of a packet and change it in different way.
```

NAT allow to translate the address (f.e.: between incompatible IP addressing). Informally speaking, connecting to the Internet a LAN using unroutable in-house LAN addresses.

==NAT== in a routed firewall:
- Can filter requests from hosts on WAN side to hosts on LAN side (away to filter packet coming from the outside in a simple)
-  Allows host requests from the LAN side to reach the WAN side (from private to public)
- Does not expose LAN hosts to external port scans

![[2a.png|400]]

## Routable/Non IP addressing
- ==Routable addresses== **need to be unique on the Internet to be reachable** → public IP addresses
- ==Non-routable addresses== **are not reachable from the Internet** → Special-Purpose IP addresses

![[3a.png]]

We use the `private addresses` like those in the image.
i secondi in private addresses sono quelli che utilizziamo in kathara!
????
Poi abbiamo il loopback addresses e quello di broadcast.
Abbiamo altri non routable addresses chiamati `shared address space` (li utilizziamo in `Proxmox`)


```ad-info
title: One to many translation NAT
One-to-many Network Address Translation (NAT) is ==a technique that allows multiple private IP addresses to be mapped to a single public IP address==. Now we have this!

```

>There are ==13== root IP addresses for the DNS root zone, which is managed by the Internet Corporation for Assigned Names and Numbers (ICANN)

## NAT goals
A private network uses just one IP address provided by ISP to connect to the Internet. Private networks use private IP addresses provided by IETF. Remember that can change address of devices in private network without notifying outside world and can change ISP without changing the address of devices in private network. Devices inside private network are not explicitly addressable by external network, or visible by outside world (a security plus)

```ad-info
- - Se cambi ISP, l’IP pubblico assegnato cambierà, ma gli **IP privati** della tua rete restano invariati.
        
    - Esempio: Passi da ISP A a ISP B, ma i tuoi PC mantengono gli stessi IP locali.
        
- **Sicurezza** (**Isolamento della Rete**)
    
    - I dispositivi nella rete privata **non sono direttamente raggiungibili** dall’esterno.
        
    - Il NAT agisce da "filtro": solo le connessioni iniziate dall’interno possono ricevere risposte.
        
    - Esempio: Un hacker esterno non può connettersi direttamente al tuo PC con IP `192.168.1.5`.

```


## Source NAT (SNAT)
We can translate `source ip addresses` or `destination ip addresses`.

Translate outgoing IP source packet headers from the internal host
addresses to the WAN IP address. The session is masqueraded as coming from the NATting device.

![[4a.png]]

The firewall/router:
- Forwards replies from the client service request by the external server to the client
-  Enables the client-server session or connection to continue on another port as requested by the external server, forwarding any responses by the server to the client (the RELATED connections)
The ==NAT table== is where associations between requests and internal IP addresses are kept.

![[5a.png]]

tc-client2 = save requests!
La mappatura è salvata nella NAT table!

```ad-example
Il processo avviene in questo modo:

1. Un dispositivo nella LAN (es. `192.168.1.10`) invia un pacchetto a un server esterno (es. `8.8.8.8`).
    
2. Il router intercetta il pacchetto e cambia l'IP sorgente da `192.168.1.10` al proprio IP pubblico (es. `85.12.34.56`).
    
3. Il router salva la corrispondenza tra IP privato e pubblico nella NAT table, includendo anche le porte di rete se necessario.
    
4. Il server esterno riceve il pacchetto e risponde all'IP pubblico del router (`85.12.34.56`).
    
5. Il router consulta la NAT table, trova la mappatura originale e inoltra la risposta al dispositivo interno (`192.168.1.10`).
    

La NAT table è essenziale per mantenere traccia delle connessioni attive e garantire che le risposte esterne vengano correttamente instradate ai dispositivi interni. Senza di essa, il router non saprebbe a quale host interno inoltrare i pacchetti in entrata.

```

## Types of NAT: Basic and NAPT
**Basic NAT** operates by allocating a pool of public IP addresses to map private internal addresses when devices initiate connections to external networks. For outbound traffic, it translates the source IP address and updates relevant header checksums (IP, TCP, UDP, ICMP). Inbound packets have their destination IP address and checksums translated back. This method requires one public IP per concurrent private session, which is inefficient due to IPv4 scarcity.

**NAPT (Network Address Port Translation)** extends Basic NAT by also modifying transport-layer identifiers (TCP/UDP ports, ICMP query IDs). This allows multiple private hosts to share a single public IP by distinguishing sessions via unique port numbers. NAPT enables thousands of concurrent connections through port multiplexing, solving IPv4 address exhaustion for most deployments.

Multiplex a number of private hosts into a single external/public IP address.
The IP address binding extends to transport level identifiers such as TCP/UDP ports.
- For most of the small office and home (SOHO) routers
- The private network usually relies on a single IP address, supplied by the ISP to connect to the Internet
- SOHO can change ISPs without changing the private IP addresses of the devices within the network



## NAPT: leaving packets
![[7a.png]]
![[8a.png]]

## NAPT for Incoming Requests
==NAPT router== **blocks all incoming ports by default**. Many applications have had problems with NAPT in the past in their handling of incoming requests. Four major methods
- Application Level Gateways (ALGs)
- Static port forwarding
- Universal Plug and Play (UPnP) Internet Gateway Device (IGD) protocol
- Traversal Using Relays around NAT (TURN)

![[9a.png]]

## Destination NAT (DNAT)
Enables servers located inside the firewall/router LAN to be accessed by clients located outside. The service appears to be hosted by the firewall/router.

![[10a.png]]

The firewall/router uses the NAT table to:
- Translate incoming packets from the firewall/router WAN IP address to the internal address of the server
- Forward the replies to the client service request from the internal server to the external client
- Enables the client-server session or connection to continue on another port as requested by the internal server, forwarding any responses by the client to the server (the RELATED connections)

>It is also called port forwarding or Virtual Server

According to the port accessed from the external interface, the packets
can be forwarded towards different internal hosts.

![[11a.png]]

Change port numbers on DNAT sessions, to enable an internal server to
provide a particular service. Can make use of different or differently-configured server programs to respond to internal LAN requests and to external WAN requests.

## NAT pros and cons

### NAT one-size-fits-all (RFC 4864)
NAT devices provide Local Network Protection (LNP) through key mechanisms: The requirement to establish state before allowing external-to-internal traffic solves security problems. Automatic state expiration after flow termination prevents lingering connections. Nodes appear to be directly connected at the network edge, masking their true location. The use of non-publicly routable addresses shifts state management requirements while conserving global IPv4 space.
### Perceived benefits of NAT and impact on IPv4 (RFC 4864)
NAT serves as a simple gateway between private networks and the Internet. Its stateful nature provides basic security through implicit filtering. The technology enables user/application tracking through connection state, preserves privacy by hiding internal topology, and allows complete addressing autonomy within private networks. NAT significantly conserves the global IPv4 address pool while simplifying multihoming and network renumbering scenarios.

![[12a.png]]

## NAT and firewalls
While firewalls provide essential protection, they cannot fully secure a network. Many attacks originate from inside the network or operate at layers beyond the firewall's protection scope. Ultimately, each system must maintain its own security, with all processes designed to withstand attacks like stack overflows. Firewalls primarily help network administrators by blocking unauthorized traffic, thereby reducing the likelihood of certain cross-boundary attacks while not eliminating all security risks.

**Key Points**  
Firewalls serve as important perimeter controls but have inherent limitations. Internal threats and application-layer attacks often bypass firewall protections. System-level hardening and process resilience remain critical security requirements. The fundamental value of firewalls lies in filtering unauthorized traffic at network boundaries, reducing exposure to external threats while complementing other security measures.

## Applications not working with NAT (RFC 3027)
- Applications that have realm-specific (public or private) IP address information in payload
- Bundled session applications
- Peer-to-peer applications
- IP fragmentation with NAPT enroute
- Applications requiring retention of address mapping
- Applications requiring more public addresses than available
- Encrypted protocols like IPsec, IKE, Kerberos

>MENTIONED
## Possible mitigation
The simplest approach involves developing applications that avoid embedding IP information in their payloads. Another effective method combines NAT with Application Layer Gateways (ALGs), which handle protocol-specific translations for applications like FTP, SIP, and SMTP by modifying both packet headers and payload content. For peer-to-peer scenarios, Interactive Connectivity Establishment (ICE) provides a robust solution by leveraging STUN and TURN servers to facilitate NAT traversal. However, these solutions remain ineffective for encrypted traffic where payload inspection and modification are impossible.
## Hole punching
Technique used for connecting two hosts that are both behind NAT is called Hole punching. A method for establishing bidirectional connections between Internet hosts, both in private networks using NAT.

**Main Idea**
Find the public IP address of the other peer and initiate a connection to create a
NAT state, so that replies can be correctly passed.

>STUN: Session Traversal Utilities for NAT is used for this purpose, discovery and help two peers to communicate

```ad-example
title:Example of third party for NAT traversal
![[14a.png]]
![[15a.png]]

```


# iptables Tables and chains

## Iptables fundamantals
The rules are grouped in “tables”
Each table has different “chains” of rules and different possible “targets” (packet fates)
Each packet is subject to each rule of a chain
Packet fates depend on the first matching rule
To see chains and rules of the filter table

`IPTABLES -l` or for extended output `iptables -L -n -v --line-numbers`

>Chain: list of rules evaluated one by one
## Filter table
Three built-in rule chains:
- INPUT
- OUTPUT
- FORWARD
If a packet reaches the end of a chain, then is the chain policy to determine the fate of the packet (DROP/ACCEPT).

![[33a.png]]

## Useful iptables command switches
![[34a.png]]
![[35a.png]]
![[146a.png]]

>firewall iptables is stateless ?!
## More on the conntrack module
Clever use of logic to recognize connections, even with connection-less
protocols (UDP, ICMP...).
![[147a.png]]

## iptables: four built-in tables
1. ==MANGLE==: manipulate bits in TCP header
2. ==FILTER==: packet filtering
3. ==NAT==: network adress translation
4. ==RAW==: exceptions to connection tracking
	- When present RAW table has the highest priority
	- Used only for specific reasons
	- Default: not loaded

All of them are independent but are used in a logical iptables.
All for different purpose.
## MANGLE table
Used for IP header manipulation (like ToS, TTL,...)
- Should not be used for FILTERING
- Should not be used for NAT
==Five chains to alter==:
-  **PREROUTING**: incoming packets before a routing decision
- **INPUT**: packets coming into the machine itself
- **OUTPUT**: locally generated outgoing packets
- **FORWARD**: packets being routed through the machine
- **POSTROUTING**: packets immediately after the routing decision


## FILTER table
Used for filtering packets
Three built-in rule chains:
- ==INPUT==: incoming packets intended for the filtering machine
- ==OUTPUT==: outgoing packets
- ==FORWARD==: for the packets that are not intended for this machine
The FORWARD chain only used when the machine is configured as a router `(net.ipv4.ip_forward to 1 in the /etc/sysctl.conf file)`

## NAT table
Used for ==NAT (Network Address Translation)==: to translate the packet's source field or destination field
- Only the first packet in a stream will hit this table (the rest of the packets will automatically have the same action)
We have different special targets (packet fates/actions):
- **DNAT**: destination nat
- **SNAT**: source nat
- **MASQUERADE**: dynamic nat (when fw interface address is dynamically assigned) (we don't specify the IP address because he use the ip of the outgoing that the  interface has at the moment of intercept the packet)
- **REDIRECT**: redirects the packet to the machine itself

### NAT'ing targets
**DNAT**: Destination address translation
- Transform the destination IP of incoming packets
- Used in PREROUTING chain
**SNAT**: Source address translation
- Transform the source IP of outgoing packets
- Can be done one-to-one or many-to-one
- Used in POSTROUTING chain
**MASQUERADE**: like SNAT but the source IP is taken form the dynamically assigned address of the interface
## Chain and Table priorities
![[148a.png]]
## User defined chains
It is possible to specify a jumprule to a different chain withinthe same table.
The new chain must be userspecified If the end of the user specified chain is reached, the packet is sent back to the invoking chain.

![[149a.png]]


## iptables logging
LOG as possible target
- "non-terminating target", i.e. rule traversal continues at the next rule
- to log dropped packets, use the same DROP rule, but with LOG target
When this option is set for a rule, the Linux kernel will print some information on all matching packets (like most IP header fields) via the kernel log (where it can be read with dmesg or syslogd(8))
`-- log-level level`: specifies the type of log (emerg, alert, crit, err, warning, notice, info, debug)
`--log-prefix prefix`: add further information to the front of all messages produced by the logging action

```ad-example
title: Log example
![[150a.png]]

```

If we don't consider the mangle, is quite simple!