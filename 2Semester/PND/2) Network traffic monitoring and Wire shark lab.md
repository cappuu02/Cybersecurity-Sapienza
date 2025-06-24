>PDF 04 classroom
# Layering Concepts
Network communication between hosts is divided into levels, each with a specific task.
Each layer offers a service to the layer above and uses the services of the layer below.
The rules that govern how data is handled at a certain level are defined by a protocol.

```ad-example
title: Example
- Il **livello N-1** (es. la rete fisica o IP) **non è sicuro**: i dati possono essere intercettati.
    
- Il **protocollo del livello N** (es. TLS sopra TCP/IP) **cripta i messaggi** prima di trasmetterli su N-1.
    
- Così, anche se il livello N-1 non è sicuro, **il livello N garantisce la riservatezza**.

```

>in the header i have information about packet
# Encapsulation/Decapsulation
Nel modello a strati (layered model), quando **un'applicazione vuole inviare dati attraverso la rete**, questi dati devono attraversare tutti i livelli della pila (stack) di protocolli, sia nel mittente che nel destinatario.

Encapsulation $\to$ Sender
1. **_Application Layer_**: genera i dati da inviare (es. messaggio HTTP).
2.  **_Transport Layer_**: incapsula i dati con un header (es. TCP/UDP).
3. **_Network Layer_**: aggiunge l’header IP per indirizzamento.
4. **_Data Link Layer_**: aggiunge un header (e talvolta trailer) per la consegna locale (es. MAC address).
5. **_Physical Layer_**: converte tutto in segnali elettrici/ottici/bit su un cavo o mezzo fisico.

Decapsulation $\to$ Receiver
1. **Physical Layer**: riceve i segnali e li converte in bit.
2. **Data Link Layer**: legge e rimuove il proprio header/trailer, passa i dati al livello superiore.
3. **Network Layer**: legge l’header IP, decide il routing, rimuove l’header e passa i dati su.
4. **Transport Layer**: riassembla il messaggio, controlla errori, rimuove header.
5. **Application Layer**: riceve i dati originali.

# 2 layered architectures
- ISO/OSI model: based on a reference model with 7 layer. 
- TCP/IP model: created by the IETF, based on a reference model with 4 layers.
- Common idea: **packet switched network**
## Architecture comparison
![[134a.png]]

# TCP/IP Model
- **Application layer**: Corresponds to the top three layers of the OSI model. 
	- Protocols: SMTP (sending e-mail), HTTP (web), FTP (file transfer), and others 
- **Transport layer**: Equivalent to Layer 4 (Transport) of the OSI model 
	- Protocols: TCP, UDP 
- **Internet**: Equivalent to layer 3 (network) of the OSI model. 
	- Protocols: IP, ICMP, IPSec 
- **Datalink**: Equivalent to layer 2 (data link) of the OSI model. 
	- Protocols: Ethernet, WiFi, ARP, etc. 
- **Physical layer**: Equivalent to Layer 1 (Physical) of the OSI model. 
	- NOTE: Datalink + physical layers are known as Network access layer.

# Client-server communication example
![[135a.png|600]]

# Layer ideal representation
- **Transport**: the illusion of direct end-to-end connection between processes in arbitrary systems. (TCP/UDP)
- **Network**: transferring data between arbitrary nodes. (routing mechanism performed thanks to network layer) (Ip, ICMP, OSPF)
- **Data Link**: transferring data between directly connected systems/devices (via direct cable or shared medium).

![[136a.png]]

# Addresses in the architectures
Each layer has a type of address: 
- **Application layer**: Internet name, egcre. `www.sapienza.it `
- **Transport layer**: Port number, in the range `[0..65535]` that identifies the client or server. For example 80 for HTTP server. 
- **Internet layer**: IP address that identifies a network card, for example 151.100.17.4 
- **Datalink layer**: MAC address, also identifies a network cards, for example `49:bd:d2:c7:56:2a`

# Encapsulation in TCP/IP
![[137a.png|600]]

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
- **FTP** on port 20 and 21 
- **SSH** on port 22 
- **Telnet** on port 23 
- **SMTP** on port 25 
- **HTTP** on port 80 
- **IMAP** on port 143 
- **SSL** on port 443

## Services relying on UDP
- **DNS** on port 53 
- **DHCP** on ports 67 and 68 
- **TFTP** on port 69 
- **SNMP** on port 161 
- **RIP** on port 520

# DNS (Domain Name Service)
Un servizio per ottenere l'indirizzo IP da un nome di dominio di facile comprensione, come `www.sapienza.it`.  Gerarchia di entità responsabili dei nomi di dominio.

![[143a.png]]

```ad-example
![[144a.png]]

```

# Dive Into Packets
To capture packets flow in the network we can use different tolls like:
- **dumpcat**
- **wireshark/tshark**
- **tcpdump**

All of them can visualize and save the captured data.
Wireshark and tcpdump can also analyze (decode) the captured packets.

## Wireshark
Quando si analizzano i dati provenienti da una **network interface** (scheda di rete), il traffico è suddiviso in:

- **Frames** (Data Link Layer – es. Ethernet)
- **Packets** (Network Layer – es. IP)
- **Segments** (Transport Layer – es. TCP o UDP)

Ogni unità contiene **intestazioni (header)** e **payload**, e viene "dissezionata" (dissected) per:

- Capire **dove inizia e finisce** ogni livello di protocollo.
- **Interpretare** il contenuto secondo i protocolli coinvolti (es. HTTP, DNS, TLS).
- **Visualizzare** questi dati in strumenti come **Wireshark**.

```ad-important
title: Promiscuous Mode

Permette alla scheda di rete di **catturare tutto il traffico** che passa sul link, **anche se non è destinato al dispositivo locale**.
```

**Logic of Whireshark**
🧲 Cattura dei frame
    - Wireshark riceve i **frame grezzi** direttamente dall’interfaccia di rete (NIC).
    - Se in modalità **promiscua** o **monitor**, cattura anche quelli non destinati al proprio host.
**🔬 Processo di dissezione (packet dissection)**
    - Ogni frame viene **analizzato strato per strato**, dal livello più basso (fisico/link) fino al livello applicativo.
    - Ogni strato è analizzato da un **“dissezionatore”** (dissector) specifico per quel protocollo.

# Alternative way to capture traffic info
Traffic represented as “connections”. We can use ==Netflow== for statistics and monitoring or ==Zeek== that is a framework for traffic inspection and monitoring.

## Netflow
Suite of tools:
- **nfcapd**: Capture and save netflows
- **nfdump**: Analyze netflow files
- **nfsen**: Graphical tool to access captured netflows

# Wireshark Activity
Capturing is way too easy, too many packets....
Use Filters! They allow to only focus on requested packets or certain activity by network devices.

Two kinds of filters: ==display filters== and ==capture filters==:
- **Capture filters** to limit the amount of network data that goes into processing and is getting saved (really limits crossed by wireshark, used at beginning)
- **Display filters** to inspect only the packets you want to analyze once the data has been processed (use only to display captured packets, used at the end of capture)

## Capture filters – wireshark/tcpdump
Capture filters usati prima della cattura: decidono **quali pacchetti catturare**. Quelli non corrispondenti **non vengono mai registrati** → persi per sempre.

- **Protocol**: ether, tcp, udp, ip, ip6, arp 
- **Direction**: src, dst 
- **Type**: host, port, net, portrange 
- **Other primitives**: less, greater, gateway, broadcast 
- **Combinations with operators**: and (&&), or (||), not (!)

Display only captured packets matching the filters 
- Packets are not discarded or lost 
Easy but refined syntax: only packets evaluating true are displayed 
- Comparison operators 
- Filters use types (strings where numbers are required return errors) 
- Common logical operators 
Filters can be built interacting with the packets

Come già accennato:
1. I **frame** vengono raccolti dalla rete.
2. Passano in sequenza attraverso vari **dissezionatori** (uno per livello).
3. I protocolli sono **rilevati**:
    - **Direttamente**, se il livello inferiore contiene un campo tipo (es: Ethernet indica IP).
    - **Indirettamente**, con **port mapping** (es: TCP port 80 → HTTP) o **heuristiche** (es: pattern nel payload).

🛑 Attenzione: **se un protocollo usa porte non standard**, il rilevamento potrebbe fallire.


## How to capture network traffic

```ad-abstract
title: Promiscuous Mode
La scheda di rete riceve **tutti i pacchetti** che passano sul collegamento, non solo quelli indirizzati al proprio MAC. 

```

Funziona bene con gli Hub ma non con gli switch, che inoltrano i pacchetti solo alla porta giusta.

```ad-abstract
title: Physical Tap
Dispositivo hardware inserito fisicamente tra due host per copiare passivamente tutto il traffico.

```

```ad-abstract
title: Port Mirroring
Su switch gestiti (managed), una porta può essere configurata per **duplicare il traffico** verso un’altra porta di analisi.

![[Pasted image 20250620165730.png]]

```


>NOTICE: on virtualized environments and SDN, this can be easier or harder

## Less conventional approaches for sniffing
- AR P cache poisoning (or spoofing)
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
