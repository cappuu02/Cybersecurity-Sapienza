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

```ad-question
title: Why Firewalls?
Restricts access from the outside. 
`Internet = millions of people` $\to$ `together bad things happen`
Prevents attackers from getting too close. Restrict people from leaving.
```

To attain a certain level of network security, you can: 
- Regulate which traffic is allowed (sources, destinations, services, ...)
- Protect the traffic by encryption
- Monitor the traffic for “bad behaviour”
- Monitor the hosts for “bad behaviour”

>La scelta dipenderà dalla politica di sicurezza da rispettare

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
Un **host-based packet filter** è un tipo di firewall che controlla il traffico di rete **in entrata e in uscita da un singolo dispositivo** (es. PC, server). A differenza dei firewall di rete (che proteggono un'intera LAN), opera a livello di singolo host.

```ad-example
iptables, windows firewall and all the so called “personal firewalls”

```

## Screening router (ACL-based)
```ad-abstract
title: Definition
Un ==screening router== è un router configurato con **Access Control Lists (ACL)** per filtrare il traffico di rete in base a regole predefinite. È una forma basilare di firewall che opera a livello di rete (Layer 3) e, in alcuni casi, trasporto (Layer 4).

```

![[17a.png]]
**ACL (Access Control Lists)** definiscono quali pacchetti sono consentiti o bloccati in base a:
- IP sorgente/destinazione
- Porte/Protocolli
- Interfaccia ingresso/uscita

Ampiamente utilizzate in switch, router e firewall. Di solito distinguono tra traffico in entrata e in uscita, per interfaccia/porta.

==Stateless==: ogni pacchetto viene trattato in modo indipendente, senza alcuna conoscenza di ciò che lo ha preceduto

## Dual-homed Host
```ad-abstract
title: Definizione
Un **dual-homed host** è un sistema (server o PC) con **due interfacce di rete**, collegato a:
1. **Rete esterna** (es. Internet).   
2. **Rete interna** (LAN aziendale).

- Agisce da **nodo intermedio** per controllare il traffico tra le due reti.
- Funziona come un **firewall semplificato** o gateway filtro.

```


![[18a.png]]

## Bastion Host
```ad-abstract
title: Definizione
Un **Bastion Host** è un computer **fortemente protetto (hardened)** progettato per gestire il traffico in ingresso da reti esterne verso una rete interna sicura.

```

- Esposto ad internet o reti non affidabili
- Ha funzioni di sicurezza avanzate per resistere agli attacchi
- Spesso usato come gateway o proxy per controllare gli accessi

**Hardening** (messa in sicurezza)
- Disattivazione servizi inutili
- Controllo accessi rinforzati
- RImozione di account e permessi superflui
- Configurazioni restrittive per componenti sensibili

```ad-question
title: A Bastion Host can be a Dual-Homed Host?
**Può essere dual-homed** se ha una NIC sulla rete esterna e una sulla rete interna.


```

## What is a DMZ
```ad-abstract
title: Definizione
A ==DMZ (demilitarized zone)== is a host or small network positioned as a neutral zone between a company's private network and the external public network, serving as a secure segregated area for services accessed by users, visitors, or partners. Its implementation has become essential for a multi-layered, defense-in-depth security strategy, reducing and controlling access to internal (private) IT system components.

```

### Defense in depth
A **security approach** in which IT systems are protected using multiple overlapping systems
- Add redundancy to the defensive measures
- Aim to remove the single point of failure
- Find the right balance between complexity and multiplicity of defense measures
In order to compromise the system, an attacker has to find multiple vulnerabilities, in different components.

### DMZ as a screened host
![[19a5.png]]

==Flusso del traffico==:
- **Il traffico Internet entra dal router/firewall**    
- Solo il **traffico autorizzato** viene inoltrato verso il **bastion host** nella DMZ.
- Il bastion host può, se necessario, comunicare con l’**internal network**, ma questi accessi sono strettamente controllati.

>Il bastion host corrisponde al server esposto nella DMZ.

```ad-success
title: Obiettivo
Creare una zona cuscinetto tra Internet e la rete interna.
Bastion host nella DMZ funge da intermediario sicuro, minimizzando i rischi per la rete interna in caso di compromissione.

```

### Screened Subnet Using Two Routers/Firewalls
![[PND/images PND/20a.png]]
**Internet** – Rete esterna non sicura.
**Exterior Router (o Firewall esterno)** – Filtra il traffico in ingresso dalla rete Internet.
**Bastion Host** – Server esposto nella **perimeter network (DMZ)**, spesso usato per servizi pubblici.
**Perimeter Network (DMZ)** – Rete isolata che ospita sistemi esposti verso l’esterno, ma separati dalla rete interna.
**Interior Router (o Firewall interno)** – Controlla il traffico tra la DMZ e la **internal network**.
**Internal Network** – Rete privata aziendale, che deve essere protetta da accessi non autorizzati.

Flusso del traffico:
- Il **traffico da Internet** passa prima attraverso l’**exterior router**, che filtra le richieste.
- Solo il traffico consentito raggiunge il **bastion host** nella DMZ.
- Il **traffico dalla DMZ verso l’interno** (o viceversa) passa attraverso l’**interior router**, che applica un secondo livello di filtraggio.

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

## Packet filters (stateless firewall)
Drop packets based on their source or destination addresses or port numbers or
flags (No context, only contents). Can operate on:
- incoming interface
- outgoing interface
- both of them
Check packets with fake IP addresses:
- From outside ("ingress filtering")
- From inside ("egress filtering")

### Packet filters operating layers
![[24a.png]]

**Three-Step Process**
1. Know your policy
2. Translate the policy in a formal language
3. Rewrite the policy in terms of the firewall syntax

General mechanism:
- Rules are checked from top to bottom
- The first matching rule is applied
- One implicit rule is assumed if no rule matches
	- Block everything (default deny)
	- Allow everything (default allow)

![[25a.png]]


## How to check the direction of TCP?

TCP three-way handshake e come i firewall determinano la direzione di una connessione analizzando i flag TCP e i numeri di sequenza.

![[26a.png|600]]

I firewall analizzano questi elementi per:  
✅ **Identificare chi ha iniziato la connessione** (il primo **SYN** viene dal client).  
✅ **Verificare la legittimità dei pacchetti** (i numeri di ACK devono essere **cseq+1** e **sseq+1**).  
✅ **Distinguere connessioni in uscita (outbound) da quelle in entrata (inbound)**.


```ad-example
We distinguish the replies to our SMTP connection considering the ACK
flag.

![[27a.png]]
```


# Filter rules for network firewalls

**More complex network topology because we have multiple network**
![[28a.png]]
**Internet** → Rete esterna
**Router/Firewall** → Protegge tutte le reti interne
**Mail GW (Gateway)** → Server di posta situato in una DMZ
**Internal Net 1** → **DMZ** (zona demilitarizzata, ospita solo il Mail GW)
**Internal Net 2 e Net 3** → Reti interne con accesso a Internet

==Firewall Policy==:
- Internal Net 1 is a DMZ and only hosts Mail GW
- Very limited connections between Mail GW and Internet (only partner servers)
- Limited connections allowed between Mail GW and net 2 and net 3
-  Comunicazione libera tra Net 2 e Net 3
-  Outgoing requests only between net 2 or net 3 and the link to the Internet

>Tutto il traffico passa attraverso il router/firewall, che applica queste regole.

>Isolamento della DMZ: Il Mail GW è esposto parzialmente a Internet ma separato dalle reti interne critiche.

==Requirements==
Non è sufficiente controllare solo la **destinazione** dei pacchetti (_egress filtering_).
- Se permettiamo a **Net 2** di ricevere traffico **solo da Net 3**, un attaccante esterno potrebbe falsificare l’indirizzo IP sorgente (_IP spoofing_), fingendo di provenire da Net 3.

Dobbiamo implementare regole basate anche sull’**interfaccia di ingresso** (_ingress filtering_):
1. **Verifica dell’IP sorgente** (_egress filtering_) → Solo pacchetti con IP in **Net 3** possono raggiungere **Net 2**.
2. **Verifica dell’interfaccia di provenienza** (_ingress filtering_) → I pacchetti devono arrivare **fisicamente dall’interfaccia di Net 3**, non da Internet.

## Interfaccia verso Internet
![[PND/images PND/30a.png]]

>ACK flag means that is a reply to any of connections that started from the inside

## Interface on net 1
![[PND/images PND/31a.png]]

## Interface on net 2 (net 3 is similar)
![[32a.png]]


```ad-failure
title: Problems with Packet Filters
Packet filter presentano diversi limiti:
- controllano pochi parametri (regole possono essere troppo generali e/o specifiche)
- Non analizzano il contenuto (nei payload TCP)
- Log limitati
- Nessun suipporto per l-autenticazione
- Vulnerabili ad attacchi che sfruttano bug nei protocolli TCP/IP

```


### Filter, rules 1
![[PND/images PND/41a.png]]

Let's see why this is not the best solution:
### Filter rules, 2
![[PND/images PND/42a.png]]

### Filter rules, 3
New scenario, now suppose that an external server whant to communicate with an Internal client.
![[PND/images PND/43a.png]]

### Filter rules, 4
![[PND/images PND/44a.png]]

### Filter rules, 5
Where is the problems?
Suppose an attacker that want to connect to an internal server that is not SMTP.
It will use a packet coming from sourceport 5150 and source port 8080.
![[PND/images PND/45a.png]]

### Filter rules, 6
Tutte le richieste ad altri server che arrivano dall'esterno passano senza problemi e non vengono bloccate dato che nelle regole $B$ e $D$ permettiamo tutto ciò che ha come destport `> 1023`
![[46a.png]]
### Filter rules, 7
In order to fix this problem, we need to also consider the source port.
![[47a.png]]


### Filter rules, 8
We don't fix all the problems, because the attacker can pretend and impersonificate an SMTP server.
![[48a.png]]

### Filter rules, 9
![[49a.png]]

>So, we need yet more information to get the desired effect!

## IP Fragmentation
La frammentazione IP è un meccanismo che permette a un router di dividere un pacchetto IP troppo grande in frammenti più piccoli per adattarsi alla MTU (Maximum Transmission Unit) della rete.

**Overlap**
Si verifica quando frammenti diversi contengono porzioni sovrapposte degli stessi dati. Durante la riassemblaggio, questo può causare:
- Corruzione dei dati
- Comportamenti imprevedibili


![[Pasted image 20250624125832.png]]

## Incoming TCP connections with IP fragmentation
Security Vulnerability called TCP IP Fragmentation Attack.

**Il problema:**
- Il firewall blocca connessioni TCP in entrata ma permette pacchetti ACK in uscita
- Allow packets with the ACK flag.
- Un attaccante può sfruttare la frammentazione IP per aggirare questa protezione

**Come funziona l'attacco:**
1. L'attaccante invia due frammenti IP (FRAG1 e FRAG2) che contengono entrambi il flag ACK
2. Il firewall vede solo i frammenti con ACK e li lascia passare
3. L'host interno riassembla i frammenti creando un pacchetto SYN (senza ACK)
4. Questo pacchetto SYN può iniziare una connessione TCP, aggirando le regole del firewall

Tipi di attacchi:
- Syn Attack
- Create TCP connection
- SYN Flood - DoS

![[51a.png|400]]


# Statefull firewalls
The solution to solve this kind of problem is to introduce the concept of statefuless. 
Means "keep track of the connection established by a network".
## Stateful packet inspection
==Stateful Inspection Firewalls (or Dynamic Packet Filters)== can keep track of established connections. Can drop packets based on their source or destination IP addresses, port numbers and possibly TCP flags.

>Solve one major problem of simple packet filters, since they can check that incoming traffic for a high-numbered port is a genuine response to a previous outgoing request to set up a connection.


## Stateful Firewall
![[52a.png]]
Questo diagramma mostra come un **firewall stateful** traccia le connessioni TCP attraverso il
- **Stabilimento connessione:**
    - Client invia SYN → Firewall crea stato "NEW"
    - Server risponde SYN/ACK → Stato diventa "ESTABLISHED"
    - Client invia ACK finale → Connessione completamente stabilita
- **Trasferimento dati:**
    - Tutti i pacchetti successivi (ACK, FIN/ACK) vengono tracciati nello stato "ESTABLISHED"
    - Il firewall conosce la direzione e sequenza dei pacchetti
- **Chiusura connessione:**
    - FIN/ACK inizia la chiusura → Rimane "ESTABLISHED"
    - ACK di conferma → Ancora "ESTABLISHED"
    - Ultimo ACK → Stato diventa "CLOSED"

## Connection tracking
Il diagramma mostra come un firewall stateful traccia il ciclo di vita completo delle connessioni TCP: dalla fase di setup (3-way handshake SYN → SYN/ACK → ACK) allo stato ESTABLISHED per il trasferimento dati, fino alla chiusura ordinata (4-way handshake con FIN da entrambe le parti) e al timeout finale, garantendo che solo pacchetti appartenenti a connessioni valide vengano accettati.

![[53a.png|400]]
This mechanism work well with FTP or HTTP that use TCP.

With TCP connection the statefulness is quite straightforward.
What about stateless protocol? UDP, ICMP...
They don't have a complex mechanism like this. 
What can we do? UDP is connectionless protocol like ICMP. 

We introduce the idea of a time.
We introduce statefulness or stateless protocol considering also a connection 
receive a packet come from internal network to outside. We create a connection only if we see a packet that has be sent from the inside. we accept answers from the outside only if 

![[54a.png|400]]




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
