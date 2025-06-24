
>PDF 02 classroom
# What is Internet
==Internet==: an interconnected network of networks. Is organized like a hierarchical networks:
- **Internet backbone**: connecting the ISPs’ backbones
- **ISP backbone**: connecting organizations’ backbones
- **Organization backbone**: connects local area networks (LANs)
- **LAN** connects end systems

>Public Internet versus private intranet (private internal internet for company or house)

==Internet standards==
-  **RFC**: Request for comments, containing ufficial document about standards, protocols and technologies used on internet. RFC are free to download.
- **IETF**: Internet Engineering Task Force (group that develop and publish internet standards)

**Architecture**
![[124a.png|600]]

## Internet hierarchy

==Access Network==
Le **reti di accesso** sono quelle che connettono gli utenti al **network edge**, cioè alla rete vera e propria.

>Can be wired (Ethernet, optical fiber, ADSL) or wireless (WI-FI, mobile network 3G, 4G, 5G)

==Network Core==
Il **core** della rete è il cuore dell'infrastruttura Internet: la parte interna che gestisce il trasferimento dei dati tra i vari edge.

>Edge router connect private network with internet thanks to fiber cables. There are also multiples services like DNS.

==Network edge==
Il **network edge** è la "periferia" della rete, cioè la parte in cui si trovano i dispositivi finali e le applicazioni usate dagli utenti.

>An host can be a server, client or P2P device. Instead, applications are HTTP, Mail, and so on...


![[125a.png]]

## Internet Core
```ad-abstract
title: Definizione
Rappresenta l'**insieme globale** di tutte le reti interconnesse che formano Internet.

```

![[126a.png]]

- **Global ISP**: Fornitori di servizi internet globali che collegano reti a livello mondiale.
- **Regional ISP**: fornitori che operano a livello regionale/nazionale.
- **Internet backbone**: Spina dorsale collegata con fibra ottica.

```ad-todo
title: How it work
Router e collegamenti formano l-infrastruttura fisica. 
I router calcolano il percorso più efficiente tramite algoritmi distribuiti, che permettono di adattarsi ai cambiamenti della rete.
Tabelle di routing calcolate e mantenute in tempo reale per ottimizzare tutto.

```


The core is provided by ISPs that interconnect multiple continents
- _ISPs_
- _Global ISPs or Tier-1 ISPs_
- _Regional ISPs or Tier-2 ISPs_

## Internet: network of networks
Internet Backbone connects tier-1 ISPs
- e.g., `Verizon, Comcast, AT&T, Telstra, Arelion`
The backbones of tier-1 ISPs are interconnected at various access points called Internet eXchange Points (IXP)
-  They do “peering”, namely a direct exchange of internet traffic

![[Pasted image 20250617221903.png|400]]

## Protocols
The types and sequences of exchanged messages must follow defined syntax and semantics. Actions regarding messages and events include adhering to message format, size, and encoding, as well as timing between events. Additionally, medium access, flow control, and timeouts must be regulated.

### Protocol specification examples

**Modularization**
Using multiple protocols for each layer hides implementation details, allowing layers to change without affecting others. This approach simplifies development, as different companies can focus on individual modules, and improves maintenance and system updates.

**Packet Switching**
Packet switching operates on a best-effort delivery model, making it more efficient for resource sharing. However, it requires mechanisms for network congestion and flow control to manage traffic effectively.

## Router and subnet
![[127a.png]]

## Residential Internet access overview
Point to point protocol (PPP) for access to an ISP. Modern Access Technology:
- DSL: digital subscriber line
- Cable modem
- Fiber In The Loop (FITL)
- Broadband over a power line (internet via prese elettriche)
- Broadband wireless: such as WiMAX 
- Satellite

## Local area network connected to Internet
A **local area network (LAN)** or subnet connects hosts to an **edge router**, which links the LAN to the wider Internet. Telecom providers often use **Asynchronous Transfer Mode (ATM)** over fiber-optic connections for this interconnection.  

**Ethernet LAN**  
- Hosts connect to an **Ethernet switch**.  
- Common speeds include **10 Mbps, 100 Mbps, 1 Gbps, and 10 Gbps**.  

**ATM (Asynchronous Transfer Mode)**  
A high-speed networking standard used in telecom backbones, supporting efficient data transfer over fiber-optic networks.  

![[128a.png]]

## Access layer
Costituito da reti con endpoint della stessa gestione locale
- Fornisce connettività tra stazioni sulla stessa rete
- I nodi nella stessa rete possono comunicare direttamente tra loro
Protocollo utilizzato: famiglia Ethernet

## Ethernet (IEEE 802.3) networks
Each host in a Ethernet network has a NIC (Network Internet Card) with a (generally) fixed address. MAC addresses are 48 bits (6 bytes) long and UNIQUELY ideintify hosts
in the network. Each host only processes packets intended for it. Each Ethernet packet (“frame”) has a fixed format.

![[129a.png]]

### How to build a Ethernet network
A network is formed when hosts are interconnected through a shared **Ethernet-based transmission system**, functioning as if they were on the same medium. This includes:

- **Two computers** linked by a single Ethernet cable.
- **Multiple computers** connected via multiple Ethernet cables to a **central device** (typically a switch, but also repeaters, hubs, or bridges).
- **Large-scale networks** where multiple computers are linked through several Ethernet cables to **multiple interconnected switches**.

This structure enables seamless communication within the network, regardless of the physical connection layout.

### Ethernet and its broadcast domains
An Ethernet network constitutes a broadcast domain (invio pacchetto a tutti nella stessa rete). Ciò prima causava collisioni dato l'utilizzo di connessioni half duplex. IL problema è stato superato tramite l'utilizzo di connessioni full duplex.

In una rete Ethernet pura, tutti gli host ricevono **tutti i frame**, ma processano solo quelli a loro destinati (inefficiente).

Gli **switch intelligenti** limitano il traffico inutile imparando gli indirizzi MAC e inoltrando i frame solo alle porte corrette (**unicast**). **Solo i messaggi broadcast/multicast** vengono replicati a tutte le porte (es. ARP, DHCP).

.Troppi broadcast possono saturare la rete


### How switches segment the network
Gli switch migliorano l'efficienza della rete Ethernet riducendo il traffico inutile, tramite:
1. **Learning MAC Address**: ogni switch mantiene una tabella che associa indirizzo MAC sorgente alla porta fisica da cui è arrivato il frame.
2. **Inoltro Intelligente dei Frame**: Quando arriva un frame, lo switch controlla la destinazione e cerca nella tabella MAC per trovare su quale porta si trova il dispositivo destinatario.


![[130a.png|300]]

```ad-question
title: Why Internet is not a large Ethernet net?
Internet **non può essere una grande rete Ethernet** perché Ethernet usa molti **broadcast**, che diventano **inefficienti su larga scala**. Per questo, le reti vengono suddivise e organizzate **logicamente**:

- **Ethernet** gestisce la parte locale (Access Layer),
 
- mentre la comunicazione tra reti avviene tramite il **livello di distribuzione** (Distribution Layer), basato su **IP**.  

I dispositivi usano un **Default Gateway** per uscire dalla rete locale e accedere a Internet.



```

## Distribution and core layers
==Distribution Layer==
È il livello che collega più reti locali all’interno di una **grande organizzazione** o tra diverse organizzazioni. Opera a livello di **Autonomous Systems (AS)**.

==Core Layer==
È il **cuore di Internet**, che collega le grandi dorsali di rete a livello **continentale o globale**.
È gestito da pochi, grandi operatori internazionali, chiamati **Tier-1 ISP**

Entrambi i livelli usano l’**indirizzamento IP**, che permette di identificare ogni dispositivo in rete in modo univoco.
La comunicazione tra reti avviene grazie ai **router**, che decidono dove inviare i pacchetti dati in base agli indirizzi IP.

![[131a.png|400]]

## Ethernet vs IP addresses
- Ethernet has physical addresses
    - You can not( change the MAC address of your NICs
		- It is like your name: it goes wherever you go
    - An Ethernet address tells WHO you are, but does not tell anything on WHERE you are
- IP has logical addresses
    - You can change IP address of your NIC
		- It is like your home address: it changes if you go somewhere
    - IP addresses are used to identify and reach networks and hosts


## Local addresses and remote addresses
Se **tu e la persona** siete **nella stessa stanza**, puoi semplicemente **chiamarla per nome**:  
È una **connessione diretta**, si parla di **indirizzo locale**.

Se invece **la persona è in un’altra stanza**, devi: 
1. Sapere **dove si trova**,
2. **Far uscire il messaggio dalla tua stanza** (es. tramite un corridoio o una porta). Questo è un **indirizzo remoto**, perché il destinatario è su **un’altra rete**.****



```ad-question
title: How to know if one IP is the same network than you? 
Si usa la **subnet mask**, una sorta di "filtro" che ti dice **quali indirizzi IP fanno parte della tua stessa rete**. 
- Se l’indirizzo IP del destinatario **è nella tua rete** (secondo la subnet mask), allora è **locale**.
- Se invece **non è nella tua rete**, allora è **remoto** e il messaggio deve passare attraverso il **router/gateway**.

```



## Two versions of IP addresses: IPv4 and IPv6.
Two versions of IP addresses:
- **IPv4** defines IP address with 32 bits organized in four octets (8 bits in each).
- **IPv6** (version 6) has 128 bits.
- For human readability, the bits in each octet are separated by dots while writing an IPv4 address (colons in IPv6).
    - E.g. `69.58.201.25` and `fe80::250:56ff:fec0:1`
- **Certain** bits from the left correspond to the network address (69.58.201) and the remaining correspond to define the computer (host) on the network (25).
- **Subnet mask** defines boundary between network portion and the host portion of the IP address.


## Dotted decimal IP Address
![[132a.png]]

## Network address and Host address
![[133a.png]]

## Types of IP Addressing
There are three types of IP addresses
- **Unicast** (one to one)
    - These refer to a single destination host
- **Broadcast** (one to all)
    - These refer to every host on a network or subnet
- **Multicast** (one to many)
    - Refers to a group of IP addresses in a network, not necessarily all of them

## IP Addressing, Classful
Allocation classes of IP addresses
```python
- Class A (24 bits for host addresses, or /8)
    - 0.0.0.0 to 127.255.255.255
- Class B (16 bits for host addresses, or /16)
    - 128.0.0.0 to 191.255.255.255
- Class C (8 bits for host addresses, or /24)
    - 192.0.0.0 to 223.255.255.255
- Class D (Multicast)
    - 224.0.0.0 to 239.255.255.255
- Class E (Reserved)
    - 240.0.0.0 to 255.255.255.255
```

## Classfull addresses

| Class | Leading bits | Net bits | Host bits | Networks | Addresses | Start address | End address     |
| ----- | ------------ | -------- | --------- | -------- | --------- | ------------- | --------------- |
| A     | 0            | 8        | 24        | 128      | 16777216  | 0.0.0.0       | 127.255.255.255 |
| B     | 10           | 16       | 16        | 16384    | 65536     | 128.0.0.0     | 191.255.255.255 |
| C     | 110          | 24       | 8         | 2097152  | 256       | 192.0.0.0     | 223.255.255.255 |
| D     | 1110         | nd       | nd        | nd       | 268435456 | 224.0.0.0     | 239.255.255.255 |
| E     | 1111         | nd       | nd        | nd       | 268435456 | 240.0.0.0     | 255.255.255.255 |

## IP Addressing

- There are routeable and non-routeable address ranges
- Routeable addresses need to be unique on the Internet
- Non-routeable address can exist in different networks but can not be used on the Internet
- Several non-routeable ranges are defined in several RFCs

| Class | Leading bits | Net bits | Host bits | Networks | Addresses | Start address | End address     |
| ----- | ------------ | -------- | --------- | -------- | --------- | ------------- | --------------- |
| A     | 0            | 8        | 24        | 128      | 16777216  | 0.0.0.0       | 127.255.255.255 |
| B     | 10           | 16       | 16        | 16384    | 65536     | 128.0.0.0     | 191.255.255.255 |
| C     | 110          | 24       | 8         | 2097152  | 256       | 192.0.0.0     | 223.255.255.255 |

## Non-routeable addresses list
- RFC1918, private networks
    - 10.0.0.0 - 10.255.255.255 (10/8 prefix)
    - 172.16.0.0 - 172.31.255.255 (172.16/12 prefix)
    - 192.168.0.0 - 192.168.255.255 (192.168/16 prefix)        
- Loopback: 127.0.0.0/8
- RFC3927, Link-local unicast: 169.254.0.0/16
    - Automatic Private IP Addressing (Microsoft uses the APIPA protocol)
- RFC5737, documentation addresses:
    - TEST-NET-1, 192.0.2.0/24
    - TEST-NET-2, 198.51.100.0/24
    - TEST-NET-3, 203.0.113.0/24

## IP Addressing, example

192.168.8.0/24
- The last eight (32 minus 24) bits of 32 total will be used for host addresses
- The first address reserved for the network address
- The last address reserved for the broadcast address
    - Then, we have 2^(32-netmask) – 2 hosts in any CIDR specified network
- So, if we are given 192.168.8.0/24, 192.168.8.0 is the network address, 192.168.8.255 is the broadcast address, and .1 to .254 are host addresses


## IP Addressing, Classless
- Each set of 8-bits (octet) can hold values from 0-255
    - Poor flexibility!
- Idea: let’s use a Variable Length Subnet Mask (VLSM)
- Introduced by CIDR (Classless Inter-Domain Routing), a new notation for the netmask:
    - specify how many bits of the 32-bit total will specify the network address
    - The remaining bits specify the host addresses
- Ex: 10.10.10.0/26
    - the netmask can also be specified in dotted-quad notation, as in 10.10.10.0/255.255.255.192
## IP Addressing, other example

`192.168.1.248/30`
- 2^(32-30) – 2 = 2^2 – 2 = 4 -2 = 2 hosts (2 usable addresses)
    - 192.168.1.248 is the network address
    - 192.168.1.251 is the broadcast address
- Large networks can be subnetted:
    - We say things like “There are 64 /30 subnets in a /24 network”
- Many smaller networks can be “supernetted” for routing reasons → “summarization”

## Notes about IP addresses
- In Point-to-Point links, using a 30 bit netmask is a waste…
    - If A sends a broadcast, only B will receive it...
- There is the proposal of RFC 3021:
    - Using 31-Bit prefixes on IPv4 Point-to-Point Links
- Reduce the waste of IP addresses in a subnet
    - Other ways to reduce it?
        - NAT
        - IPv6    

