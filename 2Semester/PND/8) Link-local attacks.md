## Network Sniffing
Capturing packets from the network transmitted by others' nodes and reading the data content in search of sensitive information (e.g., passwords, session tokens).  

- **Tools**: Network sniffers/protocol analyzers like Ettercap, bettercap, NetworkMiner, driftnet, dsniff, macof, etc. (non-exhaustive list).  
- **Analysis**: Protocol decoding and stream reassembly of collected data.  
- **Passive Mode**: Packets are captured, copied, and passed to user level for analysis without active interference.  
- **Requirements**: Attacker must be on the same network path or broadcasting domain.

## Realize network sniffing
L'interfaccia di rete deve operare in **modalità promiscua** per lo sniffing. Lo sniffer deve essere posizionato lungo il percorso di rete o almeno all'interno dello stesso segmento di rete. Nelle LAN non commutate (che utilizzano hub), questo rappresenta lo scenario ideale, poiché gli hub duplicano ogni frame su tutte le porte. Negli ambienti LAN commutate, gli aggressori devono aggirare la segmentazione dello switch attraverso tecniche come il flooding dello switch con frame eccessivi (MAC flooding) per sovraccaricarne la tabella CAM, o l'esecuzione di attacchi ARP spoofing per reindirizzare il traffico tra le porte, il che consente potenziali attacchi Man-in-the-Middle. Per le LAN wireless, lo sniffing diventa fattibile sia quando non viene implementata alcuna crittografia, sia quando viene utilizzata una crittografia debole (come WEP), riducendo di fatto lo scenario a condizioni equivalenti a quelle di una LAN basata su hub.

## Breaking the switch segmentation mechanism
- _Bridges_ were the initial solution for reducing collisions and segmenting networks:
    - Feature two ports connecting network segments
    - Only forward frames destined for the opposite segment (filtering)
    - Operate in "store & forward" mode - reading and regenerating frames only when necessary
- _Switches_ evolved as multiport bridges:
    - Precisely regenerate frames only to the destination segment
    - Dynamically learn host locations in real-time

## MAC Address/CAM Table Review
## Revisione della tabella indirizzi MAC/CAM
La tabella Content Addressable Memory (CAM) è un componente fondamentale dello switching che memorizza gli indirizzi MAC insieme alle relative porte fisiche e ai parametri VLAN. Queste tabelle hanno una limitazione di dimensione fissa. Mentre il traffico di rete attraversa lo switch, la tabella CAM apprende dinamicamente la posizione dei dispositivi registrando l'indirizzo MAC sorgente dei frame in ingresso e associandoli alla porta di ingresso specifica. Quando lo switch incontra un indirizzo MAC sconosciuto, adotta un comportamento di flooding, replicando il frame su tutte le porte della VLAN interessata per garantirne la consegna.

**Panoramica sulla CAM**
Questo attacco teorico è diventato pratico nel maggio 1999 con il rilascio dello strumento "macof", originariamente sviluppato da Ian Viteck in circa 100 righe di codice Perl. Dug Song lo ha successivamente convertito in C per includerlo nella suite "`dsniff`". L'attacco sfrutta la limitazione di dimensione fissa delle tabelle CAM negli switch di rete. La maggior parte degli switch utilizza algoritmi hash per organizzare gli indirizzi MAC nella tabella CAM, in modo simile alle liste hash con bucket a capacità limitata. Quando più indirizzi MAC vengono convertiti in hash con lo stesso valore, il sistema utilizza più bucket (n) per l'archiviazione. Se tutti i bucket corrispondenti si riempiono, lo switch torna al comportamento di flooding per i nuovi indirizzi MAC sconosciuti, aggirando di fatto i vantaggi della segmentazione tipici dello switching.

# ARP spoofing
An ARP request message should be placed in a frame and broadcast to all computers on the network. Each computer receives the request and examines the IP address.
The computer mentioned in the request sends a response; all other computers process and discard the request without sending a response.

![[2Semester/PND/images PND/151.png]]

**HOW IT WORK**
Host A has the IP address of host B
It knows it is in the same network has to use→ Ethernet
It needs to know the MAC address of host B
It broadcasts an ARP request for IP of host B (MAC Dest = `ff:ff:ff:ff:ff:ff`)

![[2Semester/PND/images PND/152.png]]

Host B sends back an ARP- reply
The ARP reply has the MAC address of B as source and MAC address of A as destination
(It was in the original ARP-request). Then Host A can finally send the IP packet.

![[2Semester/PND/images PND/153.png]]

## ARP Table
Dynamic table that holds the IP-MAC pairings
- It is accessed before sending any Ethernet frame
- It starts empty and is filled as the MAC addresses are collected
- Unused MAC addresses are removed after a timeout (address ageing) in the order of minutes
- IP-MAC pairing is updated (age and pairing...)

## Gratuitous ARP responses
`Gratuitous ARP` is used by hosts to “announce” their IP address to the local network and avoid duplicate IP addresses on the network. Routers and other network hardware may use cache information gained from gratuitous ARP responses. Gratuitous ARP is a broadcast packet (like an ARP-request).

![[154.png]]

## Misuse of Gratuitous ARP
ARP has no security or ownership of IP or MAC addresses
- Host W broadcasts I’m 1.2.3.1 with MAC 12:34:56:78:9A:BC
-  Wait 5 seconds, and then host W broadcasts I’m 1.2.3.1 with MAC 12:34:56:78:9A:BC
- Repeat...
What happens?

![[2Semester/PND/images PND/155.png]]

Host X and Y will likely ignore the message unless they currently have an ARP table entry for 1.2.3.1

When host Y requests the MAC of 1.2.3.1 the real router will reply and communications will work until host W sends a gratuitous ARP again. Even a static ARP entry for 1.2.3.1 on Y will get overwritten by the Gratuitous ARP on some OSs.

## Hijacking in the local network
Through ARP spoofing, an attacker can impersonate any network entity - whether it's another host, the default gateway, DNS servers, or other critical infrastructure. At its most basic level, this technique enables denial-of-service attacks by disrupting legitimate network communications. More significantly, it facilitates sophisticated man-in-the-middle (MITM) attacks where the attacker intercepts traffic, potentially reroutes it to harvest responses, and can then forward those responses while simultaneously sniffing, forging, or altering the data in transit. This raises important security questions about protocols like SSH and SSL - while these encrypted protocols provide protection against content inspection, the initial traffic redirection through ARP spoofing can still enable certain attack vectors before encryption takes effect.

# Man in the Middle
![[2Semester/PND/images PND/156.png]]
![[2Semester/PND/images PND/157.png]]
